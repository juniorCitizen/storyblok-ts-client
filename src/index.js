const axios = require('axios')
const Promise = require('bluebird')
const pThrottle = require('p-throttle')
// const qs = require('qs')
const requestPromise = require('request-promise')
const sharp = require('sharp')

const defaults = {
  imageDimensionLimit: null,
  maxPerPage: 1000,
  rateLimit: 3,
}

/** instance of Storyblok API interface */
class StoryblokApiClient {
  /**
   * initialize an instance
   *
   * @param {Object} config - setup parameters
   * @param {string} config.region - string(optional)
   * @param {number} config.timeout - timeout
   * @param {boolean} config.https - request protocol
   * @param {number} config.rateLimit - manually set request rate limit
   * @param {number|string} config.spaceId - working spaceId
   * @param {string} config.apiKey - management API access key
   */
  constructor(config) {
    let region = config.region ? `-${config.region}` : ''
    let protocol = config.https === false ? 'http' : 'https'
    this.spaceId = config.spaceId
    this.apiClient = axios.create({
      baseURL: `${protocol}://api${region}.storyblok.com/v1/spaces/`,
      timeout: config.timeout || 0,
      headers: { Authorization: config.apiKey },
    })
    let rateLimit = config.rateLimit || defaults.rateLimit
    this.get = pThrottle(this.apiClient.get, rateLimit, 1000)
    this.post = pThrottle(this.apiClient.post, rateLimit, 1000)
    this.put = pThrottle(this.apiClient.put, rateLimit, 1000)
    this.delete = pThrottle(this.apiClient.delete, rateLimit, 1000)
  }

  /**
   * Using 'sharp' library to generate data buffer
   * image compression is applied accordingly
   *
   * @param {string} filePath - absolute path to image file
   * @param {boolean} compression - flag to compress image
   * @param {number} dimLimit - resizing dimension limit value
   * @returns {Promise<Buffer>} buffered image data
   */
  bufferImage(
    filePath,
    compression = false,
    dimLimit = defaults.imageDimensionLimit
  ) {
    const options = { failOnError: true }
    const image = sharp(filePath, options).rotate()
    return resizeImage(image, dimLimit)
      .then(image => compressImage(image, compression))
      .then(image => image.toBuffer())
      .catch(error => Promise.reject(error))
  }

  /**
   * create an asset folder on server
   *
   * @param {string} name - name of folder to create
   * @returns {Object} asset folder information
   */
  createAssetFolder(name) {
    return this.post(`/${this.spaceId}/asset_folders`, { name })
      .then(createdFolder => createdFolder.asset_folder)
      .catch(error => apiErrorHandler(error, 'createAssetFolder'))
  }

  /**
   * register an image as a Storyblok asset and upload to server
   *
   * @param {string} filePath - absolute file path to image
   * @param {boolean} compression - flag to compress image
   * @param {number} dimLimit - resize dimension limit value
   * @returns {string} Public url to access the asset.
   */
  createImageAsset(
    filePath,
    compression = false,
    dimLimit = defaults.imageDimensionLimit
  ) {
    const fileName = filePath.split('\\').pop()
    return Promise.all([
      this.bufferImage(filePath, compression, dimLimit),
      this.signAsset(fileName),
    ])
      .then(([buffer, signedRequest]) => {
        return this.uploadAsset(buffer, signedRequest)
      })
      .catch(error => Promise.reject(error))
  }

  /**
   * delete an asset from server by its id
   *
   * @param {number} assetId - id of the asset to be deleted
   * @returns {number} assetId
   */
  deleteAsset(assetId) {
    return this.delete(`/${this.spaceId}/assets/${assetId}`)
      .then(() => assetId)
      .catch(error => apiErrorHandler(error, 'deleteAsset'))
  }

  /**
   * delete all existing assets from server
   *
   * @returns {number[]} array of asset id's that was removed
   */
  deleteExistingAssets() {
    return this.getAssets()
      .then(existingAssets => {
        const mapFn = asset => this.deleteAsset(asset.id)
        return Promise.mapSeries(existingAssets, mapFn)
      })
      .catch(error => Promise.reject(error))
  }

  /**
   * get total number of assets existing on server
   *
   * @returns {number} count of existing assets
   */
  getAssetCount() {
    return this.getSpace()
      .then(space => space.assets_count)
      .catch(error => Promise.reject(error))
  }

  /**
   * get total number of pagination pages of existing assets on server
   *
   * @param {number} perPage - number to list per page
   * @returns {number} count of pagination pages
   */
  getAssetPaginationPageCount(perPage = defaults.maxPerPage) {
    return this.getAssetCount()
      .then(assetCount => Math.ceil(assetCount / perPage))
      .catch(error => Promise.reject(error))
  }

  /**
   * get full listing of assets from server
   *
   * @param {number} perPage - How many assets per page (defaults to server max limit of 1000).
   * @returns {Object[]} Full list of existing assets
   */
  getAssets(perPage = defaults.maxPerPage) {
    return this.getSpace(space => Math.ceil(space.assets_count / perPage))
      .then(pageCount => {
        const requests = Array.from(Array(pageCount).keys())
        const assets = []
        const mapFn = pageIndex => {
          const per_page = perPage
          const options = { params: { per_page, page: pageIndex + 1 } }
          return this.get(`${this.spaceId}/assets`, options)
            .then(res => assets.push(...res.data.assets))
            .catch(error => Promise.reject(error))
        }
        return Promise.mapSeries(requests, mapFn)
          .then(() => assets)
          .catch(error => Promise.reject(error))
      })
      .catch(error => apiErrorHandler(error, 'getAssets'))
  }

  /**
   * get space information
   *
   * @returns {Object} space information
   */
  getSpace() {
    return this.get(`/${this.spaceId}`)
      .then(res => res.data.space)
      .catch(error => apiErrorHandler(error, 'getSpace'))
  }

  /**
   * Register a file as a Storyblok asset
   *
   * @param {string} filename - file name to be register
   * @returns {Object} asset signing info
   */
  signAsset(filename) {
    return this.post(`${this.spaceId}/assets`, { filename })
      .then(res => res.data)
      .catch(error => apiErrorHandler(error, 'signAsset'))
  }

  /**
   * Physically uploading an asset after it is registered with 'signAsset()' function.
   *
   * @param {Buffer} buffer - Buffered asset.
   * @param {Object} signedRequest - The returned object from 'signAsset()' function, containing info to enable the actual physical file upload
   * @returns {string} Url to access the asset
   */
  uploadAsset(buffer, signedRequest) {
    const filename = signedRequest.public_url.split('/').pop()
    const contentType = signedRequest.fields['Content-Type']
    const formData = signedRequest.fields
    formData.file = {
      value: buffer,
      options: { filename, contentType },
    }
    const options = {
      method: 'post',
      url: signedRequest.post_url,
      formData,
    }
    return requestPromise(options)
      .then(() => signedRequest.pretty_url)
      .catch(error => Promise.reject(error))
  }
}

module.exports = StoryblokApiClient

/**
 * API error handler
 *
 * @param {Object} error - error object provided by the request
 * @param {string} fnName - function name where the error occured
 */
function apiErrorHandler(error, fnName) {
  console.error(`axios request error occured at '${fnName}'`)
  if (error.response) {
    console.log('http error code:', error.response.status)
    console.log(error.response.data.error)
  } else {
    console.log('Error:', error.message)
  }
  throw error
}

/**
 * takes a sharp.js image object and compress as specified
 *
 * @param {Object} image - sharp.js image object
 * @param {boolean} compression - flag to compress image
 * @returns {Object} processed sharp.js image object
 */
function compressImage(image, compression) {
  if (!compression) return Promise.resolve(image)
  return image
    .metadata()
    .then(({ format }) => {
      if (format === 'jpeg') {
        return image.jpeg(defaults.jpegQuality)
      } else if (format === 'png') {
        return image.png(defaults.pngCompressionLevel)
      } else {
        return image
      }
    })
    .catch(error => Promise.reject(error))
}

/**
 * takes a sharp.js image object and resize as specified
 *
 * @param {Object} image - sharp.js image object
 * @param {number} dimLimit - value to limit image dimension
 * @returns {Object} processed sharp.js image object
 */
function resizeImage(image, dimLimit) {
  if (!dimLimit) return Promise.resolve(image)
  return image
    .metadata()
    .then(({ height, width }) => {
      const isSquare = height === width
      const isWider = height < width
      const resizedImage = isSquare
        ? image.resize(dimLimit, dimLimit)
        : isWider
          ? image.resize(dimLimit, null)
          : image.resize(null, dimLimit)
      return resizedImage
    })
    .catch(error => Promise.reject(error))
}
