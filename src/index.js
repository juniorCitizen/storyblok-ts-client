const asyncRetry = require('async-retry')
const axios = require('axios')
const Promise = require('bluebird')
const EventEmitter = require('events')
const pThrottle = require('p-throttle')
const requestPromise = require('request-promise')
const sharp = require('sharp')
const { parseString: parseXml } = require('xml2js')

const defaults = {
  failureRetries: 3,
  imageDimensionLimit: null,
  maxPerPage: 1000,
  rateLimit: 3,
  jpegQuality: { quality: 70 },
  pngCompressionLevel: { compressionLevel: 7 },
}

/**
 * instance of Storyblok API interface
 * @example
 * // 1. require the StoryblokApiClient
 * const StoryblokApiClient = require("storyblok-management-api-wrapper")
 *
 * // 2. initialize the client with spaceId and apiKey
 * const spaceId = 123456
 * const apiKey = asdfklasjdfaksjfdaksjdfasjk
 * const apiClient = new StoryblokApiClient({ spaceId, apiKey })
 */
class StoryblokApiClient {
  /**
   * initialize an instance
   *
   * @param {Object} config - setup parameters
   * @param {number|string} config.spaceId - working spaceId
   * @param {string} config.apiKey - management API oauth token
   * @param {string} config.region - region, default: undefined (optional)
   * @param {number} config.timeout - timeout, default: 0 (optional)
   * @param {boolean} config.https - request protocol, default: undefined (optional)
   * @param {number} config.rateLimit - request rate limit, default: 3 (optional)
   * @param {boolean} config.verbose - flag to broadcast debug messages, default: false (optional)
   */
  constructor(config) {
    let region = config.region ? `-${config.region}` : ''
    let protocol = config.https === false ? 'http' : 'https'
    this.spaceId = parseInt(config.spaceId)
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
    this.broadcaster = new EventEmitter()
    this.broadcaster.on('broadcast', message => {
      if (config.verbose) console.log(message)
    })
  }

  /**
   * get total number of existing assets
   *
   * @returns {number} get a count of existing assets
   */
  countAssets() {
    return this.getSpace()
      .then(space => space.assets_count)
      .catch(error => Promise.reject(error))
  }

  /**
   * get total number of existing stories
   *
   * Storyblok API's space info does not account 'folders' as stories, so "this.getSpace({ spaceId }).then(space => space.stories_count)" does not work for the purpose of this function
   * must be manually retrieved
   *
   * @returns {number} get a count of existing stories
   */
  countStories() {
    return this.get(`/${this.spaceId}/stories`)
      .then(res => res.headers.total)
      .catch(error => this.apiClient(error, 'countStories'))
  }

  /**
   * create an asset folder
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
   * create a component
   *
   * @param {Object} definition - Storyblok component definition object
   * @returns {Object} details of component that was created
   */
  createComponent(definition) {
    const data = { component: definition }
    return this.post(`/${this.spaceId}/components`, data)
      .then(res => res.data.component)
      .catch(error => apiErrorHandler(error, 'createComponent'))
  }

  /**
   * create a content story
   *
   * @param {Object} storyData - Storyblok story data object
   * @returns {Object} details of story that was created
   */
  createStory(storyData) {
    const data = { story: storyData }
    return this.post(`/${this.spaceId}/stories`, data)
      .then(res => res.data.story)
      .catch(error => apiErrorHandler(error, 'createStory'))
  }

  /**
   * create an asset from image
   * compression and resize using the `sharp.js` library
   *
   * @param {string} filePath - absolute file path to image
   * @param {boolean} compression - flag to compress image
   * @param {number} dimLimit - resize dimension limit value
   * @returns {string} public url to access the asset
   */
  createImageAsset(
    filePath,
    compression = false,
    dimLimit = defaults.imageDimensionLimit
  ) {
    const fileName = filePath.split('\\').pop()
    return Promise.all([
      bufferImage(filePath, compression, dimLimit),
      this.signAsset(fileName),
    ])
      .then(([buffer, signedRequest]) => {
        return this.uploadAsset(buffer, signedRequest)
      })
      .catch(error => Promise.reject(error))
  }

  /**
   * delete a specific asset
   *
   * @param {number} assetId - id of the asset to be deleted
   * @returns {number} assetId is returned on success
   */
  deleteAsset(assetId) {
    return this.delete(`/${this.spaceId}/assets/${assetId}`)
      .then(() => assetId)
      .catch(error => {
        // allow continuation if the error is "not found (404)"
        // sometimes an asset is registered but a corresponding physical file is not uploaded for some reason.  A delete request will result in 404 error, but the registered reference is removed successfully
        if (parseInt(error.response.status) === 404) {
          return Promise.resolve(assetId)
        } else {
          return apiErrorHandler(error, 'deleteAsset')
        }
      })
  }

  /**
   * delete a specific asset folder
   *
   * @param {number} assetFolderId - id of asset folder to be deleted
   * @returns {number} assetFolderId is returned on success
   */
  deleteAssetFolder(assetFolderId) {
    return this.delete(`/${this.spaceId}/asset_folders/${assetFolderId}`)
      .then(() => assetFolderId)
      .catch(error => apiErrorHandler(error, 'deleteAssetFolder'))
  }

  /**
   * delete a specific component
   *
   * @param {number} componentId - id of component to be deleted
   * @returns {number} componentId is returned on success
   */
  deleteComponent(componentId) {
    return this.delete(`/${this.spaceId}/components/${componentId}`)
      .then(() => componentId)
      .catch(error => apiErrorHandler(error, 'deleteComponent'))
  }

  /**
   * delete all existing assets
   *
   * @returns {number[]} array of asset id's that were removed
   */
  deleteExistingAssets() {
    return this.getExistingAssets()
      .then(existingAssets => {
        const mapFn = asset => this.deleteAsset(asset.id)
        return Promise.mapSeries(existingAssets, mapFn)
      })
      .catch(error => Promise.reject(error))
  }

  /**
   * delete all existing components
   *
   * @returns {number[]} array of component id's that were removed
   */
  deleteExistingComponents() {
    return this.getExistingComponents()
      .then(existingComponents => {
        const mapFn = component => this.deleteComponent(component.id)
        return Promise.mapSeries(existingComponents, mapFn)
      })
      .catch(error => Promise.reject(error))
  }

  /** delete all existing stories */
  deleteExistingStories() {
    const filterRootFoldersFn = story => {
      let isAtRoot = story.parent_id === 0
      let isFolder = story.is_folder === true
      return isAtRoot && isFolder
    }
    const mapFn = story => this.deleteStory(story.id)
    const deleteRootFolders = () => {
      return this.getExistingStories()
        .then(stories => stories.filter(filterRootFoldersFn))
        .then(rootFolders => Promise.mapSeries(rootFolders, mapFn))
        .catch(error => Promise.reject(error))
    }
    const deleteRootLevelStories = () => {
      return this.getExistingStories()
        .then(stories => Promise.mapSeries(stories, mapFn))
        .catch(error => Promise.reject(error))
    }
    return deleteRootFolders()
      .then(() => deleteRootLevelStories())
      .catch(error => Promise.reject(error))
  }

  /**
   * delete a specific story
   *
   * @param {number} storyId - id of the story to be deleted
   * @returns {number} id of story that was removed
   */
  deleteStory(storyId) {
    return this.delete(`/${this.spaceId}/stories/${storyId}`)
      .then(() => storyId)
      .catch(error => apiErrorHandler(error, 'deleteStory'))
  }

  /**
   * get a specific component
   *
   * @param {number} componentId - id of component
   * @returns {Object} component definition
   */
  getComponent(componentId) {
    return this.get(`/${this.spaceId}/components/${componentId}`)
      .then(res => res.data.component)
      .catch(error => apiErrorHandler(error, 'getComponent'))
  }

  /**
   * list all existing assets
   *
   * @returns {Object[]} full list of existing assets
   */
  getExistingAssets() {
    return this.countAssets()
      .then(assetCount => Math.ceil(assetCount / defaults.maxPerPage))
      .then(pageCount => {
        const requests = Array.from(Array(pageCount).keys())
        const assets = []
        const mapFn = pageIndex => {
          const per_page = defaults.maxPerPage
          const page = pageIndex + 1
          const params = { per_page, page }
          return this.get(`${this.spaceId}/assets`, { params })
            .then(res => assets.push(...res.data.assets))
            .catch(error => apiErrorHandler(error, 'getExistingAssets'))
        }
        return Promise.mapSeries(requests, mapFn)
          .then(() => assets)
          .catch(error => Promise.reject(error))
      })
      .catch(error => Promise.reject(error))
  }

  /**
   * list all existing asset folders
   *
   * @returns {Object[]} List of asset folder details
   */
  getExistingAssetFolders() {
    const url = `/${this.spaceId}/asset_folders`
    const query = `?search=`
    return this.get(url + query)
      .then(res => res.data.asset_folders)
      .catch(error => apiErrorHandler(error, 'getExistingAssetFolders'))
  }

  /**
   * list all existing components
   * (it is assumed that the working space has at most 1000 existing components)
   *
   * @returns {Object[]} List of component definitions
   */
  getExistingComponents() {
    const options = { per_page: defaults.maxPerPage }
    return this.get(`/${this.spaceId}/components`, options)
      .then(res => res.data.components)
      .catch(error => apiErrorHandler(error, 'getExistingComponents'))
  }

  /**
   * list all existing stories
   *
   * @returns {Object[]} full list of existing content stories
   */
  getExistingStories() {
    // find out how many pagination pages existed
    return this.countStories()
      .then(storyCount => Math.ceil(storyCount / defaults.maxPerPage))
      .then(pageCount => {
        const requests = Array.from(Array(pageCount).keys())
        const stories = []
        const mapFn = pageIndex => {
          const per_page = defaults.maxPerPage
          const page = pageIndex + 1
          const params = { per_page, page }
          return this.get(`${this.spaceId}/stories`, { params })
            .then(res => stories.push(...res.data.stories))
            .catch(error => apiErrorHandler(error, 'getStories'))
        }
        return Promise.mapSeries(requests, mapFn)
          .then(() => stories)
          .catch(error => Promise.reject(error))
      })
      .catch(error => Promise.reject(error))
  }

  /**
   * get information on the working space
   *
   * @returns {Object} space information
   */
  getSpace() {
    return this.get(`/${this.spaceId}`)
      .then(res => res.data.space)
      .catch(error => apiErrorHandler(error, 'getSpace'))
  }

  /**
   * get a specific story
   *
   * @param {number} storyId - id of the content story
   * @returns {Object} details of content story
   */
  getStory(storyId) {
    return this.get(`/${this.spaceId}/stories/${storyId}`)
      .then(res => res.data.story)
      .catch(error => apiErrorHandler(error, 'getStory'))
  }

  /**
   * publish existing stories
   *
   * @returns {number[]} list of published story id's
   */
  publishExistingStories() {
    const filterFn = story => {
      const isFolder = story.is_folder
      const isPublished = story.published
      return !isFolder && !isPublished
    }
    const mapFn = story => this.publishStory(story.id)
    return this.getExistingStories()
      .then(stories => stories.filter(filterFn))
      .then(unPubStories => Promise.mapSeries(unPubStories, mapFn))
      .then(pubStoryIds => pubStoryIds)
      .catch(error => Promise.reject(error))
  }

  /**
   * publish a specific story
   *
   * @param {number} storyId - story id
   * @returns {number} published story id
   */
  publishStory(storyId) {
    return this.get(`/${this.spaceId}/stories/${storyId}/publish`)
      .then(() => storyId)
      .catch(error => apiErrorHandler(error, 'publishStory'))
  }

  /**
   * modify a story's sequential order
   *
   * @param {string} storyId - id of the story to be moved
   * @param {string} afterId - to be positioned after story of this id
   * @returns {Object} details of the moved story
   */
  reorderStory(storyId, afterId) {
    const url = `/${this.spaceId}/stories/${storyId}/move`
    const query = `?after_id=${afterId}`
    return this.put(url + query)
      .then(() => this.getStory(storyId))
      .then(res => res.data.story)
      .catch(error => apiErrorHandler(error, 'reorderStory'))
  }

  /**
   * register a file as a Storyblok asset
   * the physical file still has to be uploaded
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
   * physically upload an asset after it is registered with 'signAsset()' method
   *
   * @param {Buffer} buffer - buffered asset
   * @param {Object} signedRequest - the server response from 'signAsset()' method
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
    const retryOptions = {
      retries: defaults.failureRetries,
      minTimeout: 100,
      maxTimout: 500,
      onRetry: () => console.log('asset upload retried'),
    }
    return asyncRetry((bail, attempt) => {
      return requestPromise({
        method: 'post',
        url: signedRequest.post_url,
        formData,
      })
        .then(() => signedRequest.pretty_url)
        .catch(requestError => {
          if (requestError.status === 500) {
            parseXml(
              requestError,
              { trim: true },
              (parseError, parsedErrorMessage) => {
                if (parseError) {
                  bail(parseError)
                  return
                }
                console.log(`${attempt - 1}/${retryOptions.retries}`)
                console.log(JSON.parse(parsedErrorMessage))
              }
            )
          }
        })
    }, retryOptions)
      .then(prettyUrl => prettyUrl)
      .catch(requestError => {
        parseXml(
          requestError,
          { trim: true },
          (parseError, parsedErrorMessage) => {
            if (parseError) return Promise.reject(parseError)
            const error = new Error(JSON.parse(parsedErrorMessage))
            return Promise.reject(error)
          }
        )
      })
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
 * Using 'sharp' library to generate data buffer
 * image compression is applied accordingly
 *
 * @param {string} filePath - absolute path to image file
 * @param {boolean} compression - flag to compress image
 * @param {number} dimLimit - resizing dimension limit value
 * @returns {Promise<Buffer>} buffered image data
 */
function bufferImage(
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
