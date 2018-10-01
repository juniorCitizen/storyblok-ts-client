const axios = require('axios')
const Promise = require('bluebird')
const pThrottle = require('p-throttle')
// const qs = require('qs')

const defaults = {
  rateLimit: 3,
  maxPerPage: 1000,
}

/** instance of Storyblok API interface */
class Storyblok {
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
        return Promise.map(requests, mapFn, { concurrency: 1 })
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
}

module.exports = Storyblok

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
