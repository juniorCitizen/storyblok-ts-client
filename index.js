const axios = require('axios')
const axiosRetry = require('axios-retry')
const Promise = require('bluebird')
const retryingRequest = require('promise-request-retry')
const sharp = require('sharp')

const defaults = {
  maxRetries: 5,
  perPage: 100,
  maxPerPage: 1000,
  concurrency: 10,
}
let axiosInst = null
let spaceId = null
let token = null

/**
 * @typedef {Object} ApiMethods
 * @property {Function} createComponent - create a component on server
 * @property {Function} createImageAsset - register an image as a Storyblok asset and upload to server
 * @property {Function} createStory - create a story on server
 * @property {Function} deleteAsset - delete an asset by its id
 * @property {Function} deleteComponent - delete a component by its id
 * @property {Function} deleteExistingAssets - delete all existing assets
 * @property {Function} deleteExistingComponents - delete all existing components
 * @property {Function} deleteExistingStories - delete all existing stories from server
 * @property {Function} deleteStory - delete a story from server by its id
 * @property {Function} getAssets - get a full listing of assets from server
 * @property {Function} getComponent - get component definition by its id
 * @property {Function} getComponents - list existing components from server
 * @property {Function} getSpace - get information on working space
 * @property {Function} getStories - get a full listing of stories from server
 * @property {Function} getStory - get details of a story by its id
 * @property {Function} publishExistingStories - publish all existing but unpublished stories
 * @property {Function} publishStory - publish a story by its id
 * @property {Function} restoreComponents - create or update components on server from a list of component definitions
 * @property {Function} signAsset - register a file as a Storyblok asset
 * @property {Function} updateComponent - update a component by its id
 * @property {Function} updateStory - update a story by id
 * @property {Function} uploadAsset - physically uploading an asset after it is registered with 'signAsset()' function
 */

/**
 * Storyblok management API wrapper module.
 *
 * @param {number} _spaceId - Working space id.
 * @param {string} _token - Storyblok account management API token.
 * @returns {ApiMethods} Storyblok API methods.
 */
module.exports = (_spaceId, _token) => {
  spaceId = _spaceId
  token = _token
  axiosInst = axios.create({
    baseURL: 'https://api.storyblok.com/v1/spaces',
    headers: {Authorization: token},
  })
  return {
    createComponent,
    createImageAsset,
    createStory,
    deleteAsset,
    deleteComponent,
    deleteExistingAssets,
    deleteExistingComponents,
    deleteExistingStories,
    deleteStory,
    getAssets,
    getComponent,
    getComponents,
    getSpace,
    getStories,
    getStory,
    publishExistingStories,
    publishStory,
    restoreComponents,
    signAsset,
    updateComponent,
    updateStory,
    uploadAsset,
  }
}

/**
 * Using 'sharp' library to read an image into buffer.
 *
 * @param {string} imageFilePath - Absolute path to image file.
 * @throws Error on failure.
 * @returns {Promise<Buffer>} Buffered image data.
 */
async function bufferImage(imageFilePath) {
  try {
    return await sharp(imageFilePath, {failOnError: true})
      .rotate()
      .toBuffer()
  } catch (error) {
    throw error
  }
}

/**
 * Create a component on server.
 *
 * @param {Object} definition - Storyblok component definition object.
 * @returns {Object|Promise} Details of component that was created or error on failure.
 */
function createComponent(definition) {
  let data = {component: definition}
  return axiosInst
    .post(`/${spaceId}/components`, data)
    .then(res => res.data.component)
    .catch(error => Promise.reject(error))
}

/**
 * Register an image as a Storyblok asset and upload to server.
 *
 * @param {string} imageFilePath - Absolute file path to image.
 * @returns {string} Public url to access the asset.
 */
async function createImageAsset(imageFilePath) {
  let imageFileName = imageFilePath.split('\\').pop()
  try {
    let buffer = await bufferImage(imageFilePath)
    let signedRequest = await signAsset(imageFileName)
    return await uploadAsset(buffer, signedRequest)
  } catch (error) {
    throw error
  }
}

/**
 * Create a story.
 *
 * @param {Object} storyData - Storyblok story data object.
 * @returns {Object|Promise} Details of story that was created or error on failure.
 */
function createStory(storyData) {
  let data = {story: storyData}
  return axiosInst
    .post(`/${spaceId}/stories`, data)
    .then(res => res.data.story)
    .catch(error => Promise.reject(error))
}

/**
 * Delete an asset by its id.
 *
 * @param {number} assetId - Id of asset to be deleted.
 * @param {number} retries - Numbers of retries with defaults.
 * @returns {number|Promise} AssetId is returned on successful delete request or error on failure.
 */
function deleteAsset(assetId, retries = defaults.maxRetries) {
  let retryDelay = axiosRetry.exponentialDelay
  axiosRetry(axiosInst, {retries, retryDelay})
  return axiosInst
    .delete(`/${spaceId}/assets/${assetId}`)
    .then(() => assetId)
    .catch(error => {
      // allow continuation if the error is 'not found (404)'
      return error.response.status !== 404 ? Promise.reject(error) : Promise.resolve(assetId)
    })
}

/**
 * Delete a component by its id.
 *
 * @param {number} componentId - Id of component to be deleted.
 * @returns {number|Promise} ComponentId is returned on successful delete request or error on failure.
 */
function deleteComponent(componentId) {
  return axiosInst
    .delete(`/${spaceId}/components/${componentId}`)
    .then(() => componentId)
    .catch(error => Promise.reject(error))
}

/**
 * Delete all existing assets.
 *
 * @returns {number[]|Promise} Array of asset id that was removed or error on failure.
 */
function deleteExistingAssets() {
  let concurrency = {concurrency: defaults.concurrency}
  return getAssets().then(existingAssets => {
    let deleteFn = asset => deleteAsset(asset.id)
    return Promise.map(existingAssets, deleteFn, concurrency)
      .then(() => existingAssets.map(asset => asset.id))
      .catch(error => Promise.reject(error))
  })
}

/**
 * Delete all existing components.
 *
 * @returns {number[]|Promise} Array of component id that was removed or error on failure.
 */
function deleteExistingComponents() {
  let concurrency = {concurrency: defaults.concurrency}
  return getComponents().then(existingComponents => {
    let deleteFn = component => deleteComponent(component.id)
    return Promise.each(existingComponents, deleteFn, concurrency)
      .then(() => existingComponents.map(component => component.id))
      .catch(error => Promise.reject(error))
  })
}

/**
 * Delete all existing stories from server.
 *
 * @returns {Promise} Pending status of operation.
 */
function deleteExistingStories() {
  return getStories().then(stories => {
    let deleteFn = story => deleteStory(story.id)
    // filter for a list of root folders
    let rootFolders = stories.filter(story => {
      let isAtRoot = story.parent_id === 0
      let isFolder = story.is_folder === true
      return isAtRoot && isFolder
    })
    // delete root folders
    return Promise.map(rootFolders, deleteFn)
      .then(() => getStories()) // get stories again (only stories at root is left)
      .then(stories => Promise.map(stories, deleteFn)) // delete root level stories
      .catch(error => Promise.reject(error))
  })
}

/**
 * Delete a story from server.
 *
 * @param {number} storyId - Id of story to be deleted.
 * @returns {number|Promise} Id of story that was removed or error on failure.
 */
function deleteStory(storyId) {
  return axiosInst
    .delete(`/${spaceId}/stories/${storyId}`)
    .then(() => storyId) // id of the deleted story
    .catch(error => Promise.reject(error))
}

/**
 * Get total number of assets existing on server.
 *
 * @returns {number|Promise} Count of existing assets or error on failure.
 */
function getAssetCount() {
  return getSpace()
    .then(spaceData => spaceData.assets_count)
    .catch(error => Promise.reject(error))
}

/**
 * Count number of pagination pages on assets.
 *
 * @param {number} perPage - How many assets per page (defaults to server max limit of 1000).
 * @returns {number|Promise} Count of pagination pages or error on failure.
 */
function getAssetPaginationPageCount(perPage = defaults.maxPerPage) {
  return getAssetCount()
    .then(assetCount => Math.ceil(assetCount / perPage))
    .catch(error => Promise.reject(error))
}

/**
 * Get a full listing of assets from server.
 *
 * @param {number} perPage - How many assets per page (defaults to server max limit of 1000).
 * @returns {Object[]|Promise} Full list of existing assets or error on failure.
 */
function getAssets(perPage = defaults.maxPerPage) {
  let assets = []
  // find out how many pagination pages exists
  return getAssetPaginationPageCount(perPage)
    .then(pageCount => {
      // prep a list of get assets request for each pagination page
      let requestList = []
      for (let x = 1; x <= pageCount; x++) {
        requestList.push(getAssetsAtPaginationPage)
      }
      // execute the get requests sequentially
      return Promise.each(requestList, (request, index) => {
        let page = index + 1
        // make the request and
        // append results to master list
        return request(perPage, page)
          .then(res => (assets = assets.concat(res)))
          .catch(error => Promise.reject(error))
      })
    })
    .then(() => assets) // return master list
    .catch(error => Promise.reject(error))
}

/**
 * Get assets from server from a particular pagination page.
 *
 * @param {number} perPage - How many assets per page (defaults to server max limit of 1000).
 * @param {number} page - Page intended.
 * @returns {Object[]|Promise} List of assets or error on failure.
 */
function getAssetsAtPaginationPage(perPage = defaults.maxPerPage, page) {
  let per_page = perPage
  let paramsOpt = {params: {per_page, page}}
  return axiosInst
    .get(`${spaceId}/assets`, paramsOpt)
    .then(res => res.data.assets)
    .catch(error => Promise.reject(error))
}

/**
 * Get component definition by its id.
 *
 * @param {number} componentId - Id of component.
 * @returns {Object|Promise} Component definition or error on failure.
 */
function getComponent(componentId) {
  return axiosInst
    .get(`/${spaceId}/components/${componentId}`)
    .then(res => res.data.component)
    .catch(error => Promise.reject(error))
}

/**
 * List existing components from server.
 *
 * @returns {Object[]|Promise} List of component definitions or error on failure.
 */
function getComponents() {
  return axiosInst
    .get(`/${spaceId}/components`)
    .then(res => res.data.components)
    .catch(error => Promise.reject(error))
}

/**
 * Get information on working space.
 *
 * @returns {Object|Promise} Space info object or error on failure.
 */
function getSpace() {
  return axiosInst
    .get(`/${spaceId}`)
    .then(res => res.data.space)
    .catch(error => Promise.reject(error))
}

/**
 * Get number of stories existed on server.  Storyblok API's space info does not account 'folders' as stories, so "return getSpace({ spaceId }).then(space => space.stories_count)" does not work for the purpose of this function.  Stories are therefore manually counted.
 *
 * @returns {number|Promise} Number of stories existing on server or error on failure.
 */
function getStoryCount() {
  return axiosInst
    .get(`/${spaceId}/stories`)
    .then(res => res.headers.total)
    .catch(error => Promise.reject(error))
}

/**
 * Count numnber of pagination pages of existing stories.
 *
 * @param {number} perPage - How many stories per page (defaults to server max limit of 1000).
 * @returns {number|Promise} Count of pagination pages or error on failure.
 */
function getStoryPaginationPageCount(perPage = defaults.maxPerPage) {
  return getStoryCount()
    .then(storyCount => Math.ceil(storyCount / perPage))
    .catch(error => Promise.reject(error))
}

/**
 * Get stories from server from a particular pagination page.
 *
 * @param {number} perPage - How many stories per page (defaults to server max limit of 1000).
 * @param {number} page - Page intended.
 * @returns {Object[]|Promise} List of stories or error on failure.
 */
function getStoriesAtPaginationPage(perPage = defaults.maxPerPage, page) {
  let per_page = perPage
  let paramsOpt = {params: {per_page, page}}
  return axiosInst
    .get(`${spaceId}/stories`, paramsOpt)
    .then(res => res.data.stories)
    .catch(error => Promise.reject(error))
}

/**
 * Get a full listing of stories from server.
 *
 * @param {number} perPage - How many stories per page (defaults to server max limit of 1000).
 * @returns {Object[]|Promise} Full list of existing stories or error on failure.
 */
function getStories(perPage = defaults.maxPerPage) {
  let stories = []
  // find out how many pagination pages exists
  return getStoryPaginationPageCount(perPage)
    .then(pageCount => {
      // prep a list of get stories request for each pagination page
      let requestList = []
      for (let x = 1; x <= pageCount; x++) {
        requestList.push(getStoriesAtPaginationPage)
      }
      // execute the get requests sequentially
      return Promise.each(requestList, (request, index) => {
        let page = index + 1
        // make the request and
        // append results to master list
        return request(perPage, page)
          .then(res => (stories = stories.concat(res)))
          .catch(error => Promise.reject(error))
      })
    })
    .then(() => stories) // return the master list
    .catch(error => Promise.reject(error))
}

/**
 * Get details of a story by its id.
 *
 * @param {number} storyId - Id of Story.
 * @returns {Object|Promise} Details of story or error on failure.
 */
function getStory(storyId) {
  return axiosInst
    .get(`/${spaceId}/stories/${storyId}`)
    .then(res => res.data.story)
    .catch(error => Promise.reject(error))
}

/**
 * Get a list of id's on unpublished stories.
 *
 * @returns {number[]|Promise} List id's of unpublished stories or error on failure.
 */
function getUnpublishedStorieIds() {
  // exclude published stories and folders
  let filterFn = story => !story.published && !story.is_folder
  return getStories()
    .then(stories => stories.filter(filterFn))
    .then(stories => stories.map(story => story.id))
    .catch(error => Promise.reject(error))
}

/**
 * Publish all existing but unpublished stories.
 *
 * @returns {number[]|Promise} List of id's on stories that were published by execution of this function or error on failure.
 */
function publishExistingStories() {
  let publishFn = storyId => publishStory(storyId)
  let concurrency = {concurrency: defaults.concurrency}
  return getUnpublishedStorieIds().then(unpublishedStoryIds => {
    return Promise.map(unpublishedStoryIds, publishFn, concurrency)
      .then(() => unpublishedStoryIds)
      .catch(error => Promise.reject(error))
  })
}

/**
 * Publish a story by its id.
 *
 * @param {number} storyId - Id of story to be published.
 * @returns {number|Promise} Id of the story that was published or error on failure.
 */
function publishStory(storyId) {
  return axiosInst
    .get(`/${spaceId}/stories/${storyId}/publish`)
    .then(() => storyId)
    .catch(error => Promise.reject(error))
}

/**
 * Create or update components on server from a list of component definitions.
 *
 * @param {Object[]} componentDefinitions - Definition of a component.
 * @returns {number[]|Promise} Id of components created/modified or error on failure.
 */
function restoreComponents(componentDefinitions) {
  // get existing components from server work space
  return getComponents().then(components => {
    // loop through definitions and compare by name for existence check
    return Promise.map(componentDefinitions, componentDefinition => {
      let findFn = (name, components) => {
        return components.find(component => component.name === name)
      }
      let existed = findFn(componentDefinition.name, components)
      // create if not exist, else update
      return !existed ? createComponent(componentDefinition) : updateComponent(existed.id, componentDefinition)
    })

      .then(() => getComponents()) // get components again
      .then(components => {
        // return id list
        return components.map(component => component.id)
      })
      .catch(error => Promise.reject(error))
  })
}

/**
 * Register a file as a Storyblok asset
 * the asset still requires to be physically uploaded with 'uploadAsset()'.
 *
 * @param {string} fileName - Name of file to be registered as an asset.
 * @returns {Object|Promise} Object with information to enable the physical asset upload operation or error on failure.
 */
function signAsset(fileName) {
  let filename = fileName
  return axiosInst
    .post(`${spaceId}/assets`, {filename})
    .then(res => res.data)
    .catch(error => Promise.reject(error))
}

/**
 * Update a component by id.
 *
 * @param {number} componentId - id of component.
 * @param {Object} componentDefinition - Defintion of component.
 * @returns {Object|Promise} Updated information of the component or error on failure.
 */
function updateComponent(componentId, componentDefinition) {
  let data = {component: componentDefinition}
  return axiosInst
    .put(`/${spaceId}/components/${componentId}`, data)
    .then(res => res.data.component)
    .catch(error => Promise.reject(error))
}

/**
 * Update a story by id.
 *
 * @param {number} storyId - id of a story
 * @param {Object} storyData - data to update a story with
 * @returns {Object|Promise} Updated information of the story or error on failure.
 */
function updateStory(storyId, storyData) {
  let data = {story: storyData}
  return axiosInst
    .put(`/${spaceId}/stories/${storyId}`, data)
    .then(res => res.data.story)
    .catch(error => Promise.reject(error))
}

/**
 * Physically uploading an asset after it is registered with 'signAsset()' function.
 *
 * @param {Buffer} buffer - Buffered asset.
 * @param {Object} signedRequest - The returned object from 'signAsset()' function, containing info to enable the actual physical file upload.
 * @param {number} retries - Numbers of retries (defaults to 5).
 * @returns {string|Promise} Url to access the asset or error on failure.
 */
function uploadAsset(buffer, signedRequest, retries = defaults.maxRetries) {
  let filename = signedRequest.public_url.split('/').pop()
  let contentType = signedRequest.fields['Content-Type']
  let formData = signedRequest.fields
  formData.file = {
    value: buffer,
    options: {filename, contentType},
  }
  return retryingRequest({
    method: 'post',
    url: signedRequest.post_url,
    formData,
    retry: retries,
  })
    .then(() => signedRequest.pretty_url)
    .catch(error => Promise.reject(error))
}
