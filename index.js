const axios = require("axios")
const axiosRetry = require("axios-retry")
const Promise = require("bluebird")
// const { pathExists, writeJson } = require("fs-extra")
// const path = require("path")
// const requestWithRetries = require("promise-request-retry")

// const methods = {
//   getSpace: getSpace(spaceId, axiosInst)
// getAssetCount: getAssetCount(spaceId, axiosInst),
// getAssets: getAssets(spaceId, axiosInst),
// createAsset,
// signAsset,
// uploadAsset,
// deleteAsset,
// deleteAssets,
// getComponent,
// getComponents,
// createComponent,
// updateComponent,
// deleteComponent,
// backupComponents,
// restoreComponents,
// deleteComponents,
// getStories,
// getStoriesByPaginationPage,
// getStory,
// getStoryCount,
// getStoryPaginationPageCount,
// getUnpublishedStories,
// createStory,
// updateStory,
// publishStory,
// deleteStory,
// deleteStories
// }

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

  getStories() {
    return getStories({
      axiosInst: this.axiosInst,
      spaceId: this.spaceId,
      perPage: this.maxPerPage
    })
  }
}

module.exports = StoryblokManagementApi

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

function getAssetsAtPaginationPage({ axiosInst, spaceId, perPage, page }) {
  let per_page = perPage
  let paramsOpt = { params: { per_page, page } }
  return axiosInst
    .get(`${spaceId}/assets`, paramsOpt)
    .then(res => res.data.assets)
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

// register an Storyblok asset
// actual asset still requires to be upload with uploadAsset
// function signAsset(
//   {
//     spaceId = defaultSpaceId,
//     fileName = missingParameter("fileName")
//   } = missingObjectParameter()
// ) {
//   return axiosInst
//     .post(`${spaceId}/assets`, { filename: fileName })
//     .then(res => res.data)
//     .catch(error => Promise.reject(error))
// }

// function uploadAsset({
//   // spaceId = defaultSpaceId, // upload to S3 bucket, not storyblok
//   buffer = missingParameter("buffer"),
//   // request result from signAsset() (for S3 upload authorization)
//   signedRequest = missingParameter("signedRequest")
// }) {
//   let formData = signedRequest.fields
//   formData.file = {
//     value: buffer,
//     options: {
//       filename: signedRequest.public_url.split("/").pop(),
//       contentType: signedRequest.fields["Content-Type"]
//     }
//   }
//   return requestWithRetries({
//     method: "post",
//     url: signedRequest.post_url,
//     formData,
//     retry: defaultValues.retries
//   })
//     .then(() => Promise.resolve())
//     .catch(error => Promise.reject(error))
// }

// function createAsset(
//   {
//     spaceId = defaultSpaceId,
//     filePath = missingParameter("filePath"),
//     buffer = missingParameter("buffer")
//   } = missingObjectParameter()
// ) {
//   let filename = filePath.split("\\").pop()
//   return pathExists(filePath)
//     .then(exists => {
//       let error = new Error(`image: '${filePath}' does not exist`)
//       return !exists ? Promise.reject(error) : Promise.resolve()
//     })
//     .then(() => axiosInst.post(`${spaceId}/assets`, { filename }))
//     .then(res => {
//       let signedRequest = res.data
//       let formData = signedRequest.fields
//       formData.file = {
//         value: buffer,
//         options: {
//           filename,
//           contentType: signedRequest.fields["Content-Type"]
//         }
//       }
//       return requestWithRetries({
//         method: "post",
//         url: signedRequest.post_url,
//         formData,
//         retry: defaultValues.retries
//       })
//         .then(() => signedRequest.pretty_url)
//         .catch(error => Promise.reject(error))
//     })
//     .then(prettyUrl => prettyUrl)
//     .catch(error => Promise.reject(error))
// }

// function createComponent(
//   {
//     spaceId = defaultSpaceId,
//     componentDefinition = missingParameter("componentDefinition")
//   } = missingObjectParameter()
// ) {
//   let data = { component: componentDefinition }
//   return axiosInst
//     .post(`/${spaceId}/components`, data)
//     .then(res => Promise.resolve(res.data.component))
//     .catch(error => Promise.reject(error))
// }

// function updateComponent(
//   {
//     spaceId = defaultSpaceId,
//     componentId = missingParameter("componentId"),
//     componentDefinition = missingParameter("componentDefinition")
//   } = missingObjectParameter()
// ) {
//   let data = { component: componentDefinition }
//   return axiosInst
//     .put(`/${spaceId}/components/${componentId}`, data)
//     .then(res => Promise.resolve(res.data.component))
//     .catch(error => Promise.reject(error))
// }

// function backupComponents(
//   {
//     spaceId = defaultSpaceId,
//     backupFilePath = path.join(defaultBackupPath, "components.backup.json")
//   } = {
//     spaceId: defaultSpaceId,
//     backupFilePath: path.join(defaultBackupPath, "components.backup.json")
//   }
// ) {
//   return getComponents({ spaceId })
//     .then(components => components.map(component => component.id))
//     .then(componentIdList => {
//       let components = []
//       return Promise.each(componentIdList, componentId => {
//         return getComponent({ spaceId, componentId })
//           .then(component => {
//             components.push({
//               name: component.name,
//               schema: component.schema,
//               is_root: component.is_root,
//               is_nestable: component.is_nestable
//             })
//             return Promise.resolve()
//           })
//           .catch(error => Promise.reject(error))
//       })
//         .then(() => writeJson(backupFilePath, components))
//         .catch(error => Promise.reject(error))
//     })
//     .catch(error => Promise.reject(error))
// }

// function restoreComponents(
//   {
//     spaceId = defaultSpaceId,
//     componentDefinitions = missingParameter("componentDefinitions")
//   } = missingObjectParameter()
// ) {
//   return getComponents({ spaceId })
//     .then(components => components.map(component => component.name))
//     .then(componentNames => {
//       return Promise.each(componentDefinitions, componentDefinition => {
//         if (!existsInArray(componentDefinition.name, componentNames)) {
//           return createComponent({ spaceId, componentDefinition })
//         } else {
//           return Promise.resolve()
//         }
//       }).catch(error => Promise.reject(error))
//     })
//     .catch(error => Promise.reject(error))
// }

// function existsInArray(searchTarget, array) {
//   return (
//     array.findIndex(item => {
//       return item === searchTarget
//     }) !== -1
//   )
// }

// function getStory(
//   {
//     spaceId = defaultSpaceId,
//     storyId = missingParameter("storyId")
//   } = missingObjectParameter()
// ) {
//   return axiosInst
//     .get(`/${spaceId}/stories/${storyId}`)
//     .then(res => Promise.resolve(res.data.story))
//     .catch(error => Promise.reject(error))
// }

// function getUnpublishedStories(
//   { spaceId = defaultSpaceId } = { spaceId: defaultSpaceId }
// ) {
//   return getStories({ spaceId })
//     .then(stories => stories.filter(story => !story.published))
//     .catch(error => Promise.reject(error))
// }

// function createStory(
//   {
//     spaceId = spaceId,
//     storyData = missingParameter("storyData")
//   } = missingObjectParameter()
// ) {
//   let data = { story: storyData }
//   return axiosInst
//     .post(`/${spaceId}/stories`, data)
//     .then(res => res.data.story)
//     .catch(error => Promise.reject(error))
// }

// function updateStory(
//   {
//     storyData = missingParameter("storyData"),
//     storyId = missingParameter("storyId"),
//     spaceId = spaceId
//   } = missingObjectParameter()
// ) {
//   let data = { story: storyData }
//   return axiosInst
//     .put(`/${spaceId}/stories/${storyId}`, data)
//     .then(res => Promise.resolve(res.data.story))
//     .catch(error => Promise.reject(error))
// }

// function publishStory(
//   {
//     spaceId = spaceId,
//     storyId = missingParameter("storyId")
//   } = missingObjectParameter()
// ) {
//   return axiosInst
//     .get(`/${spaceId}/stories/${storyId}/publish`)
//     .catch(error => Promise.reject(error))
// }

// function deleteStories(
//   { spaceId = defaultSpaceId } = { spaceId: defaultSpaceId }
// ) {
//   return getStories({ spaceId })
//     .then(existingStories => {
//       return Promise.each(existingStories, existingStory => {
//         let storyId = existingStory.id
//         return deleteStory({ spaceId, storyId })
//       })
//     })
//     .catch(error => Promise.reject(error))
// }
