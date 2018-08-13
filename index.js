const axios = require("axios")
const axiosRetry = require("axios-retry")
const Promise = require("bluebird")
const requestWithRetries = require("promise-request-retry")

const defaults = {
  maxRetries: 5,
  perPage: 100,
  maxPerPage: 1000,
  concurrency: 10
}

class StoryblokManagementApi {
  constructor({ spaceId, token }) {
    this.maxRetries = defaults.maxRetries
    this.defaultPerPage = defaults.perPage
    this.maxPerPage = defaults.maxPerPage
    this.axiosInst = axios.create({
      baseURL: "https://api.storyblok.com/v1/spaces",
      headers: { Authorization: token }
    })
    this.spaceId = spaceId
  }

  createComponent({ componentDefinition }) {
    return createComponent({
      axiosInst: this.axiosInst,
      spaceId: this.spaceId,
      componentDefinition
    })
  }

  createStory({ storyData }) {
    return createStory({
      axiosInst: this.axiosInst,
      spaceId: this.spaceId,
      storyData
    })
  }

  deleteAsset({ assetId }) {
    return deleteAsset({
      axiosInst: this.axiosInst,
      spaceId: this.spaceId,
      assetId,
      retries: this.maxRetries
    })
  }

  deleteComponent({ componentId }) {
    return deleteComponent({
      axiosInst: this.axiosInst,
      spaceId: this.spaceId,
      componentId
    })
  }

  deleteExistingAssets() {
    return deleteExistingAssets({
      axiosInst: this.axiosInst,
      spaceId: this.spaceId,
      retries: this.maxRetries
    })
  }

  deleteExistingComponents() {
    return deleteExistingComponents({
      axiosInst: this.axiosInst,
      spaceId: this.spaceId
    })
  }

  deleteExistingStories() {
    return deleteExistingStories({
      axiosInst: this.axiosInst,
      spaceId: this.spaceId
    })
  }

  deleteStory({ storyId }) {
    return deleteStory({
      axiosInst: this.axiosInst,
      spaceId: this.spaceId,
      storyId
    })
  }

  getAssets() {
    return getAssets({
      axiosInst: this.axiosInst,
      spaceId: this.spaceId,
      perPage: this.maxPerPage
    })
  }

  getComponent({ componentId }) {
    return getComponent({
      axiosInst: this.axiosInst,
      spaceId: this.spaceId,
      componentId
    })
  }

  getComponents() {
    return getComponents({ axiosInst: this.axiosInst, spaceId: this.spaceId })
  }

  getSpace() {
    return getSpace({ axiosInst: this.axiosInst, spaceId: this.spaceId })
  }

  getStory({ storyId }) {
    return getStory({
      axiosInst: this.axiosInst,
      spaceId: this.spaceId,
      storyId
    })
  }

  getStories() {
    return getStories({
      axiosInst: this.axiosInst,
      spaceId: this.spaceId,
      perPage: this.maxPerPage
    })
  }

  publishStory({ storyId }) {
    return publishStory({
      axiosInst: this.axiosInst,
      spaceId: this.spaceId,
      storyId
    })
  }

  publishExistingStories() {
    return publishExistingStories({
      axiosInst: this.axiosInst,
      spaceId: this.spaceId
    })
  }

  restoreComponents({ componentDefinitions }) {
    return restoreComponents({
      axiosInst: this.axiosInst,
      spaceId: this.spaceId,
      componentDefinitions
    })
  }

  signAsset({ fileName }) {
    return signAsset({
      axiosInst: this.axiosInst,
      spaceId: this.spaceId,
      fileName
    })
  }

  updateComponent({ componentId, componentDefinition }) {
    return updateComponent({
      axiosInst: this.axiosInst,
      spaceId: this.spaceId,
      componentId,
      componentDefinition
    })
  }

  updateStory({ storyId, storyData }) {
    return updateStory({
      axiosInst: this.axiosInst,
      spaceId: this.spaceId,
      storyId,
      storyData
    })
  }

  uploadAsset({ buffer, signedRequest }) {
    return uploadAsset({
      axiosInst: this.axiosInst,
      spaceId: this.spaceId,
      buffer,
      signedRequest
    })
  }
}

module.exports = StoryblokManagementApi

function createComponent({ axiosInst, spaceId, componentDefinition }) {
  let data = { component: componentDefinition }
  return axiosInst
    .post(`/${spaceId}/components`, data)
    .then(res => res.data.component)
    .catch(error => Promise.reject(error))
}

function createStory({ axiosInst, spaceId, storyData }) {
  let data = { story: storyData }
  return axiosInst
    .post(`/${spaceId}/stories`, data)
    .then(res => res.data.story)
    .catch(error => Promise.reject(error))
}

function deleteAsset({
  axiosInst,
  spaceId,
  assetId,
  retries = defaults.maxRetries
}) {
  axiosRetry(axiosInst, {
    retries,
    retryDelay: axiosRetry.exponentialDelay
  })
  return axiosInst
    .delete(`/${spaceId}/assets/${assetId}`)
    .then(() => assetId) // id of asset that was deleted
    .catch(error => {
      return error.response.status !== 404
        ? Promise.reject(error)
        : Promise.resolve(assetId) // allow continuation if not found
    })
}

function deleteComponent({ axiosInst, spaceId, componentId }) {
  return axiosInst
    .delete(`/${spaceId}/components/${componentId}`)
    .then(() => componentId) // id of component that was deleted
    .catch(error => Promise.reject(error))
}

function deleteExistingAssets({
  axiosInst,
  spaceId,
  retries = defaults.maxRetries
}) {
  return getAssets({ axiosInst, spaceId }).then(existingAssets => {
    return Promise.map(
      existingAssets,
      asset => deleteAsset({ axiosInst, spaceId, assetId: asset.id, retries }),
      { concurrency: defaults.concurrency }
    )
  })
}

function deleteExistingComponents({ axiosInst, spaceId }) {
  return getComponents({ axiosInst, spaceId })
    .then(components => {
      return Promise.each(components, component => {
        let componentId = component.id
        return deleteComponent({ axiosInst, spaceId, componentId })
      })
    })
    .catch(error => Promise.reject(error))
}

function deleteExistingStories({ axiosInst, spaceId }) {
  return getStories({ axiosInst, spaceId })
    .then(stories => {
      // get root folders
      let rootFolders = stories.filter(story => {
        let isAtRoot = story.parent_id === 0
        let isFolder = story.is_folder === true
        return isAtRoot && isFolder
      })
      // delete root folders
      return Promise.map(rootFolders, rootFolder => {
        let storyId = rootFolder.id
        return deleteStory({ axiosInst, spaceId, storyId })
      })
        .then(() => getStories({ axiosInst, spaceId }))
        .then(stories => {
          // delete all stories left at root level
          return Promise.map(stories, story => {
            let storyId = story.id
            return deleteStory({ axiosInst, spaceId, storyId })
          })
        })
        .catch(error => Promise.reject(error))
    })
    .catch(error => Promise.reject(error))
}

function deleteStory({ axiosInst, spaceId, storyId }) {
  return axiosInst
    .delete(`/${spaceId}/stories/${storyId}`)
    .then(() => storyId) // id of story that was deleted
    .catch(error => Promise.reject(error))
}

function getAssetCount({ axiosInst, spaceId }) {
  return getSpace({ axiosInst, spaceId })
    .then(spaceData => spaceData.assets_count)
    .catch(error => Promise.reject(error))
}

function getAssetPaginationPageCount({ axiosInst, spaceId, perPage }) {
  return getAssetCount({ axiosInst, spaceId })
    .then(assetCount => Math.ceil(assetCount / perPage))
    .catch(error => Promise.reject(error))
}

function getAssets({ axiosInst, spaceId, perPage }) {
  let assets = []
  return getAssetPaginationPageCount({ axiosInst, spaceId, perPage })
    .then(pageCount => {
      let requestList = []
      for (let x = 1; x <= pageCount; x++) {
        requestList.push(getAssetsAtPaginationPage)
      }
      return Promise.each(requestList, (request, index) => {
        let page = index + 1
        return request({ axiosInst, spaceId, perPage, page })
          .then(res => {
            assets = assets.concat(res)
            return
          })
          .catch(error => Promise.reject(error))
      })
    })
    .then(() => assets)
    .catch(error => Promise.reject(error))
}

function getAssetsAtPaginationPage({ axiosInst, spaceId, perPage, page }) {
  let per_page = perPage
  let paramsOpt = { params: { per_page, page } }
  return axiosInst
    .get(`${spaceId}/assets`, paramsOpt)
    .then(res => res.data.assets)
    .catch(error => Promise.reject(error))
}

function getComponent({ axiosInst, spaceId, componentId }) {
  return axiosInst
    .get(`/${spaceId}/components/${componentId}`)
    .then(res => res.data.component)
    .catch(error => Promise.reject(error))
}

function getComponents({ axiosInst, spaceId }) {
  return axiosInst
    .get(`/${spaceId}/components`)
    .then(res => res.data.components)
    .catch(error => Promise.reject(error))
}

function getSpace({ axiosInst, spaceId }) {
  return axiosInst
    .get(`/${spaceId}`)
    .then(res => res.data.space)
    .catch(error => Promise.reject(error))
}

function getStoryCount({ axiosInst, spaceId }) {
  // Storyblok API's space information does not
  // account folders as stories.  Following does not work
  // ========================================
  // return getSpace({ spaceId })
  //   .then(space => space.stories_count)
  //   .catch(error => Promise.reject(error))
  // ========================================
  // stories must be manually counted if folders are to be counted as stories
  return axiosInst
    .get(`/${spaceId}/stories`)
    .then(res => res.headers.total)
    .catch(error => Promise.reject(error))
}

function getStoryPaginationPageCount({ axiosInst, spaceId, perPage }) {
  return getStoryCount({ axiosInst, spaceId })
    .then(storyCount => Math.ceil(storyCount / perPage))
    .catch(error => Promise.reject(error))
}

function getStoriesAtPaginationPage({ axiosInst, spaceId, perPage, page }) {
  let per_page = perPage
  let paramsOpt = { params: { per_page, page } }
  return axiosInst
    .get(`${spaceId}/stories`, paramsOpt)
    .then(res => res.data.stories)
    .catch(error => Promise.reject(error))
}

function getStories({ axiosInst, spaceId, perPage = defaults.maxPerPage }) {
  let stories = []
  return getStoryPaginationPageCount({ axiosInst, spaceId, perPage })
    .then(pageCount => {
      let requestList = []
      for (let x = 1; x <= pageCount; x++) {
        requestList.push(getStoriesAtPaginationPage)
      }
      return Promise.each(requestList, (request, index) => {
        let page = index + 1
        return request({ axiosInst, spaceId, perPage, page })
          .then(res => {
            stories = stories.concat(res)
            return
          })
          .catch(error => Promise.reject(error))
      })
    })
    .then(() => stories)
    .catch(error => Promise.reject(error))
}

function getStory({ axiosInst, spaceId, storyId }) {
  return axiosInst
    .get(`/${spaceId}/stories/${storyId}`)
    .then(res => res.data.story)
    .catch(error => Promise.reject(error))
}

function getUnpublishedStories({ axiosInst, spaceId }) {
  return getStories({ axiosInst, spaceId })
    .then(stories => stories.filter(story => !story.published))
    .catch(error => Promise.reject(error))
}

function publishExistingStories({ axiosInst, spaceId }) {
  return getUnpublishedStories({ axiosInst, spaceId })
    .then(stories => {
      return stories
        .filter(story => story.is_folder === false)
        .map(story => story.id)
    })
    .then(storyIds => {
      return Promise.map(storyIds, storyId => {
        return publishStory({ axiosInst, spaceId, storyId })
      })
    })
    .catch(error => Promise.reject(error))
}

function publishStory({ axiosInst, spaceId, storyId }) {
  return axiosInst
    .get(`/${spaceId}/stories/${storyId}/publish`)
    .then(() => storyId) // storyId of story that's been published
    .catch(error => Promise.reject(error))
}

function restoreComponents({ axiosInst, spaceId, componentDefinitions }) {
  return getComponents({ axiosInst, spaceId })
    .then(components => {
      return Promise.map(componentDefinitions, componentDefinition => {
        let componentName = componentDefinition.name
        let findComponentByName = (name, components) => {
          return components.find(component => component.name === name)
        }
        let existed = findComponentByName(componentName, components)
        return !existed
          ? createComponent({ axiosInst, spaceId, componentDefinition })
          : updateComponent({
              axiosInst,
              spaceId,
              componentId: existed.id,
              componentDefinition
            })
      })
    })
    .catch(error => Promise.reject(error))
}

// register an Storyblok asset
// actual asset still requires to be upload with uploadAsset
function signAsset({ axiosInst, spaceId, fileName }) {
  let filename = fileName
  return axiosInst
    .post(`${spaceId}/assets`, { filename })
    .then(res => res.data)
    .catch(error => Promise.reject(error))
}

function updateComponent({
  axiosInst,
  spaceId,
  componentId,
  componentDefinition
}) {
  let data = { component: componentDefinition }
  return axiosInst
    .put(`/${spaceId}/components/${componentId}`, data)
    .then(res => res.data.component)
    .catch(error => Promise.reject(error))
}

function updateStory({ axiosInst, spaceId, storyId, storyData }) {
  let data = { story: storyData }
  return axiosInst
    .put(`/${spaceId}/stories/${storyId}`, data)
    .then(res => res.data.story)
    .catch(error => Promise.reject(error))
}

function uploadAsset({ buffer, signedRequest, retries = defaults.maxRetries }) {
  let filename = signedRequest.public_url.split("/").pop()
  let contentType = signedRequest.fields["Content-Type"]
  let formData = signedRequest.fields
  formData.file = {
    value: buffer,
    options: { filename, contentType }
  }
  return requestWithRetries({
    method: "post",
    url: signedRequest.post_url,
    formData,
    retry: retries
  })
}
