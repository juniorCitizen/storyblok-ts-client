const axios = require('axios')
const Promise = require('bluebird')
const promiseRetry = require('promise-retry')
const requestPromise = require('request-promise')
const sharp = require('sharp')

const defaults = {
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
    headers: { Authorization: token },
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

function axiosErrorHandler(error, functionName) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
  }
  console.log(error.config)
  const handledError = new Error(`axios error from function ${functionName}`)
  throw handledError
}

/**
 * Using 'sharp' library to read an image into buffer.
 *
 * @param {string} imageFilePath - Absolute path to image file.
 * @returns {Buffer} Buffered image data.
 */
function bufferImage(imageFilePath) {
  const options = { failOnError: true }
  return sharp(imageFilePath, options)
    .rotate()
    .toBuffer()
    .then(buffer => buffer)
    .catch(error => Promise.reject(error))
}

/**
 * Create a component on server.
 *
 * @param {Object} definition - Storyblok component definition object.
 * @returns {Object} Details of component that was created
 */
function createComponent(definition) {
  const data = { component: definition }
  return promiseRetry(retry => {
    return axiosInst
      .post(`/${spaceId}/components`, data)
      .then(res => res.data.component)
      .catch(retry)
  }).catch(error => axiosErrorHandler(error, 'createComponent'))
}

/**
 * Register an image as a Storyblok asset and upload to server.
 *
 * @param {string} imageFilePath - Absolute file path to image.
 * @returns {string} Public url to access the asset.
 */
function createImageAsset(imageFilePath) {
  const imageFileName = imageFilePath.split('\\').pop()
  return Promise.all([bufferImage(imageFilePath), signAsset(imageFileName)])
    .then(([buffer, signedRequest]) => uploadAsset(buffer, signedRequest))
    .catch(error => Promise.reject(error))
}

/**
 * Create a story.
 *
 * @param {Object} storyData - Storyblok story data object.
 * @returns {Object} Details of story that was created
 */
function createStory(storyData) {
  const data = { story: storyData }
  return promiseRetry(retry => {
    return axiosInst
      .post(`/${spaceId}/stories`, data)
      .then(res => res.data.story)
      .catch(retry)
  }).catch(error => axiosErrorHandler(error, 'createStory'))
}

/**
 * Delete an asset by its id.
 *
 * @param {number} assetId - Id of asset to be deleted.
 * @returns {number} AssetId is returned on successful delete request
 */
function deleteAsset(assetId) {
  return promiseRetry(retry => {
    return axiosInst
      .delete(`/${spaceId}/assets/${assetId}`)
      .then(() => assetId)
      .catch(retry)
  }).catch(error => {
    // allow continuation if the error is 'not found (404)'
    if (error.response.status !== 404) axiosErrorHandler(error, 'deleteAsset')
    else return assetId
  })
}

/**
 * Delete a component by its id.
 *
 * @param {number} componentId - Id of component to be deleted.
 * @returns {number} ComponentId is returned on successful delete request
 */
function deleteComponent(componentId) {
  return promiseRetry(retry => {
    return axiosInst
      .delete(`/${spaceId}/components/${componentId}`)
      .then(() => componentId)
      .catch(retry)
  }).catch(error => axiosErrorHandler(error, 'deleteComponent'))
}

/**
 * Delete all existing assets.
 *
 * @param {number} concurrency - Promise.map concurrency option value
 * @returns {number[]} Array of asset id that was removed
 */
function deleteExistingAssets(concurrency = defaults.concurrency) {
  return getAssets()
    .then(existingAssets => {
      const deleteFn = asset => deleteAsset(asset.id)
      return Promise.map(existingAssets, deleteFn, { concurrency })
        .then(() => existingAssets.map(asset => asset.id))
        .catch(error => Promise.reject(error))
    })
    .catch(error => Promise.reject(error))
}

/**
 * Delete all existing components.
 *
 * @param {number} concurrency - Promise.map concurrency option value
 * @returns {number[]} Array of component id that was removed
 */
function deleteExistingComponents(concurrency = defaults.concurrency) {
  return getComponents()
    .then(existingComponents => {
      const deleteFn = component => deleteComponent(component.id)
      return Promise.map(existingComponents, deleteFn, { concurrency })
        .then(() => existingComponents.map(component => component.id))
        .catch(error => Promise.reject(error))
    })
    .catch(error => Promise.reject(error))
}

/**
 * Delete all existing stories from server.
 *
 * @param {number} concurrency - Promise.map concurrency option value
 */
async function deleteExistingStories(concurrency = defaults.concurrency) {
  try {
    const existingStories = await getStories()
    // filter for a list of root folders
    const rootFolders = existingStories.filter(story => {
      let isAtRoot = story.parent_id === 0
      let isFolder = story.is_folder === true
      return isAtRoot && isFolder
    })
    const deleteFn = story => deleteStory(story.id)
    await Promise.map(rootFolders, deleteFn, { concurrency }) // delete root level folders
    // get stories from Storyblok server again
    // at this point, only stories at root should be left
    const rootStories = await getStories()
    await Promise.map(rootStories, deleteFn, { concurrency }) // delete root level stories
  } catch (error) {
    throw error
  }
}

/**
 * Delete a story from server.
 *
 * @param {number} storyId - Id of story to be deleted.
 * @returns {number} Id of story that was removed
 */
function deleteStory(storyId) {
  return promiseRetry(retry => {
    return axiosInst
      .delete(`/${spaceId}/stories/${storyId}`)
      .then(() => storyId)
      .catch(retry)
  }).catch(error => axiosErrorHandler(error, 'deleteStory'))
}

/**
 * Get total number of assets existing on server.
 *
 * @returns {number} Count of existing assets
 */
function getAssetCount() {
  return getSpace()
    .then(spaceData => spaceData.asset_count)
    .catch(error => Promise.reject(error))
}

/**
 * Count number of pagination pages on assets.
 *
 * @param {number} perPage - How many assets per page (defaults to server max limit of 1000).
 * @returns {number} Count of pagination pages
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
 * @returns {Object[]} Full list of existing assets
 */
async function getAssets(perPage = defaults.maxPerPage) {
  try {
    // find out how many pagination pages exists
    const pageCount = await getAssetPaginationPageCount(perPage)
    // prep a list of get assets request for each pagination page
    const requestList = []
    for (let x = 1; x <= pageCount; x++) {
      requestList.push(getAssetsAtPaginationPage)
    }
    // execute the get requests sequentially and append result in a master array
    let assets = []
    await Promise.map(
      requestList,
      (request, index) => {
        const page = index + 1
        return request(perPage, page)
          .then(assetsAtPage => {
            assets = assets.concat(assetsAtPage)
            return
          })
          .catch(error => Promise.reject(error))
      },
      { concurrency: defaults.concurrency }
    )
    return assets // return master asset list
  } catch (error) {
    throw error
  }
}

/**
 * Get assets from server from a particular pagination page.
 *
 * @param {number} perPage - How many assets per page (defaults to server max limit of 1000).
 * @param {number} page - Page intended.
 * @returns {Object[]} List of assets
 */
function getAssetsAtPaginationPage(perPage = defaults.maxPerPage, page) {
  const per_page = perPage
  const paramsOpt = { params: { per_page, page } }
  return promiseRetry(retry => {
    return axiosInst
      .get(`${spaceId}/assets`, paramsOpt)
      .then(res => res.data.assets)
      .catch(retry)
  }).catch(error => axiosErrorHandler(error, 'getAssetsAtPaginationPage'))
}

/**
 * Get component definition by its id.
 *
 * @param {number} componentId - Id of component.
 * @returns {Object} Component definition
 */
function getComponent(componentId) {
  return promiseRetry(retry => {
    return axiosInst
      .get(`/${spaceId}/components/${componentId}`)
      .then(res => res.data.component)
      .catch(retry)
  }).catch(error => axiosErrorHandler(error, 'getComponent'))
}

/**
 * List existing components from server.
 *
 * @returns {Object[]} List of component definitions
 */
function getComponents() {
  return promiseRetry(retry => {
    return axiosInst
      .get(`/${spaceId}/components`)
      .then(res => res.data.components)
      .catch(retry)
  }).catch(error => axiosErrorHandler(error, 'getComponents'))
}

/**
 * Get information on working space.
 *
 * @returns {Object} Space info object
 */
function getSpace() {
  return promiseRetry(retry => {
    return axiosInst
      .get(`/${spaceId}`)
      .then(res => res.data.space)
      .catch(retry)
  }).catch(error => axiosErrorHandler(error, 'getSpace'))
}

/**
 * Get number of stories existed on server.  Storyblok API's space info does not account 'folders' as stories, so "return getSpace({ spaceId }).then(space => space.stories_count)" does not work for the purpose of this function.  Stories are therefore manually counted.
 *
 * @returns {number} Number of stories existing on server
 */
function getStoryCount() {
  return promiseRetry(retry => {
    return axiosInst
      .get(`/${spaceId}/stories`)
      .then(res => res.headers.total)
      .catch(retry)
  }).catch(error => axiosErrorHandler(error, 'getStoryCount'))
}

/**
 * Count numnber of pagination pages of existing stories.
 *
 * @param {number} perPage - How many stories per page (defaults to server max limit of 1000).
 * @returns {number} Count of pagination pages
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
 * @returns {Object[]} List of stories
 */
function getStoriesAtPaginationPage(perPage = defaults.maxPerPage, page) {
  const per_page = perPage
  const paramsOpt = { params: { per_page, page } }
  return requestPromise(retry => {
    return axiosInst
      .get(`${spaceId}/stories`, paramsOpt)
      .then(res => res.data.stories)
      .catch(retry)
  }).catch(error => axiosErrorHandler(error, 'getStoriesAtPaginationPage'))
}

/**
 * Get a full listing of stories from server.
 *
 * @param {number} perPage - How many stories per page (defaults to server max limit of 1000).
 * @returns {Object[]} Full list of existing stories
 */
async function getStories(perPage = defaults.maxPerPage) {
  try {
    // find out how many pagination pages exists
    const pageCount = await getStoryPaginationPageCount(perPage)
    // prep a list of get stories request for each pagination page
    const requestList = []
    for (let x = 1; x <= pageCount; x++) {
      requestList.push(getStoriesAtPaginationPage)
    }
    // execute the get requests sequentially and append result in a master array
    let stories = []
    await Promise.map(
      requestList,
      (request, index) => {
        const page = index + 1
        return request(perPage, page)
          .then(storiesAtPage => {
            stories = stories.concat(storiesAtPage)
            return
          })
          .catch(error => Promise.reject(error))
      },
      { concurrency: defaults.concurrency }
    )
    return stories // return the master list
  } catch (error) {
    throw error
  }
}

/**
 * Get details of a story by its id.
 *
 * @param {number} storyId - Id of Story.
 * @returns {Object} Details of story
 */
function getStory(storyId) {
  return promiseRetry(retry => {
    return axiosInst
      .get(`/${spaceId}/stories/${storyId}`)
      .then(res => res.data.story)
      .catch(retry)
  }).catch(error => axiosErrorHandler(error, 'getStory'))
}

/**
 * Get a list of id's on unpublished stories.
 *
 * @returns {number[]} List id's of unpublished stories
 */
function getUnpublishedStorieIds() {
  return getStories()
    .then(existingStories => {
      const filterFn = story => !story.published && !story.is_folder
      return existingStories.filter(filterFn).map(story => story.id)
    })
    .catch(error => Promise.reject(error))
}

/**
 * Publish all existing but unpublished stories.
 *
 * @param {number} concurrency - Promise.map concurrency option value
 * @returns {number[]} List of id's on stories that were published by execution of this function
 */
function publishExistingStories(concurrency = defaults.concurrency) {
  return getUnpublishedStorieIds()
    .then(unpublishedStoryIds => {
      const publishFn = storyId => publishStory(storyId)
      return Promise.map(unpublishedStoryIds, publishFn, { concurrency })
        .then(() => unpublishedStoryIds)
        .catch(error => Promise.reject(error))
    })
    .catch(error => Promise.reject(error))
}

/**
 * Publish a story by its id.
 *
 * @param {number} storyId - Id of story to be published.
 * @returns {number} Id of the story that was published
 */
function publishStory(storyId) {
  return promiseRetry(retry => {
    return axiosInst
      .get(`/${spaceId}/stories/${storyId}/publish`)
      .then(() => storyId)
      .catch(retry)
  }).catch(error => axiosErrorHandler(error, 'getStory'))
}

/**
 * Create or update components on server from a list of component definitions.
 *
 * @param {Object[]} componentDefinitions - Definition of a component.
 * @returns {number[]} Id of components created/modified
 */
async function restoreComponents(componentDefinitions) {
  try {
    // get existing components from server work space
    const existingComponents = await getComponents()
    // loop through definitions and compare by name for existence check
    const concurrency = defaults.concurrency
    return await Promise.map(
      componentDefinitions,
      componentDefinition => {
        // attempt to find an existing component by name
        const findFn = (name, components) => {
          return components.find(component => component.name === name)
        }
        const existed = findFn(componentDefinition.name, existingComponents)
        // create if not exist, else update
        return !existed
          ? createComponent(componentDefinition)
          : updateComponent(existed.id, componentDefinition)
      },
      { concurrency }
    )
  } catch (error) {
    throw error
  }
}

/**
 * Register a file as a Storyblok asset
 * the asset still requires to be physically uploaded with 'uploadAsset()'.
 *
 * @param {string} fileName - Name of file to be registered as an asset.
 * @returns {Object} Object with information to enable the physical asset upload operation
 */
function signAsset(fileName) {
  return promiseRetry(retry => {
    return axiosInst
      .post(`${spaceId}/assets`, { filename: fileName })
      .then(res => res.data)
      .catch(retry)
  }).catch(error => axiosErrorHandler(error, 'signAsset'))
}

/**
 * Update a component by id.
 *
 * @param {number} componentId - id of component.
 * @param {Object} componentDefinition - Defintion of component.
 * @returns {Object} Updated information of the component
 */
function updateComponent(componentId, componentDefinition) {
  const data = { component: componentDefinition }
  return promiseRetry(retry => {
    return axiosInst
      .put(`/${spaceId}/components/${componentId}`, data)
      .then(res => res.data.component)
      .catch(retry)
  }).catch(error => axiosErrorHandler(error, 'updateComponent'))
}

/**
 * Update a story by id.
 *
 * @param {number} storyId - id of a story
 * @param {Object} storyData - data to update a story with
 * @returns {Object|Promise} Updated information of the story or error on failure.
 */
function updateStory(storyId, storyData) {
  const data = { story: storyData }
  return promiseRetry(retry => {
    return axiosInst
      .put(`/${spaceId}/stories/${storyId}`, data)
      .then(res => res.data.story)
      .catch(retry)
  }).catch(error => axiosErrorHandler(error, 'updateStory'))
}

/**
 * Physically uploading an asset after it is registered with 'signAsset()' function.
 *
 * @param {Buffer} buffer - Buffered asset.
 * @param {Object} signedRequest - The returned object from 'signAsset()' function, containing info to enable the actual physical file upload
 * @returns {string} Url to access the asset
 */
function uploadAsset(buffer, signedRequest) {
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
  return promiseRetry(retry => {
    return requestPromise(options)
      .then(() => signedRequest.pretty_url)
      .catch(retry)
  }).catch(error => Promise.reject(error))
}
