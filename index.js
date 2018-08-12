const axios = require("axios")
const Promise = require("bluebird")
const axiosRetry = require("axios-retry")
const { pathExists, writeJson } = require("fs-extra")
const path = require("path")
const requestWithRetries = require("promise-request-retry")

const apiUrl = "https://api.storyblok.com/v1"
const defaultValues = {
  retries: 5,
  perPage: 25,
  maxPerPage: 500
}

const defaultSpaceId = parseInt(process.env.STORYBLOK_SPACE_ID)
const token = process.env.STORYBLOK_MANAGEMENT_API_TOKEN

const defaultBackupPath = path.resolve("./data/backup")

module.exports = ({ spaceId, token }) => {
  const axiosInst = axios.create({
    baseURL: `${apiUrl}/spaces`,
    headers: { Authorization: token }
  })
  return {
    getSpace: getSpace(spaceId, axiosInst)
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
  }
}

function getSpace(spaceId, axiosInst) {
  return axiosInst
    .get(`/${spaceId}`)
    .then(res => res.data.space)
    .catch(error => Promise.reject(error))
}

// function getAssetCount(spaceId, axiosInst) {
//   return getSpace(spaceId, axiosInst)
//     .then(spaceData => spaceData.assets_count)
//     .catch(error => Promise.reject(error))
// }

// function getAssetPaginationPageCount(spaceId, perPage, axiosInst) {
//   return getAssetCount(spceId, axiosInst)
//     .then(assetCount => Math.ceil(assetCount / perPage))
//     .catch(error => Promise.reject(error))
// }

// function getAssetsAtPaginationPage(spaceId, per_page, page, axiosInst) {
//   let paramsOpt = { params: { per_page, page } }
//   return axiosInst
//     .get(`${spaceId}/assets`, paramsOpt)
//     .then(res => res.data.assets)
//     .catch(error => Promise.reject(error))
// }

// function getAssets(spaceId, axiosInst) {
//   return ({ perPage: per_page, page }) => {
//     const getPageCountFn = getAssetPaginationPageCount(
//       spaceId,
//       perPage,
//       axiosInst
//     )
//     const getAssetsFn = getAssetsAtPaginationPage(
//       spaceId,
//       perPage,
//       page,
//       axiosInst
//     )
//     const defaultMaxPerPage = defaultValues.maxPerPage
//     return getPageCountFn({ spaceId, perPage: defaultMaxPerPage })
//       .then(pageCount => {
//         let requestList = []
//         for (let x = 1; x <= pageCount; x++) {
//           requestList.push(getAssetsFn)
//         }
//         let assets = []
//         return Promise.each(requestList, (request, index) => {
//           let page = index + 1
//           return request({ spaceId, perPage, page })
//             .then(res => {
//               assets = assets.concat(res)
//               return
//             })
//             .catch(error => Promise.reject(error))
//         })
//           .then(() => assets)
//           .catch(error => Promise.reject(error))
//       })
//       .catch(error => Promise.reject(error))
//   }
// }

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

// function deleteAsset(
//   {
//     spaceId = defaultSpaceId,
//     assetId = missingParameter("assetId")
//   } = missingObjectParameter()
// ) {
//   axiosRetry(axiosInst, {
//     retries: defaultValues.retries,
//     retryDelay: axiosRetry.exponentialDelay
//   })
//   return axiosInst
//     .delete(`/${spaceId}/assets/${assetId}`)
//     .then(() => console.log(`asset removed (id: ${assetId})`))
//     .catch(error => {
//       if (error.response.status !== 404) {
//         return Promise.reject(error)
//       } else {
//         console.log(`asset (id: ${assetId}) not found, removal is skipped`)
//       }
//     })
// }

// function deleteAssets(
//   { spaceId = defaultSpaceId } = { spaceId: defaultSpaceId }
// ) {
//   return getAssets({ spaceId })
//     .then(existingAssets => {
//       return Promise.map(
//         existingAssets,
//         asset => deleteAsset({ spaceId, assetId: asset.id }),
//         { concurrency: 10 }
//       )
//     })
//     .then(() => Promise.resolve())
//     .catch(error => Promise.reject(error))
// }

// function getComponent(
//   {
//     spaceId = defaultSpaceId,
//     componentId = missingParameter("componentId")
//   } = missingObjectParameter()
// ) {
//   return axiosInst
//     .get(`/${spaceId}/components/${componentId}`)
//     .then(res => Promise.resolve(res.data.component))
//     .catch(error => Promise.reject(error))
// }

// function getComponents(
//   { spaceId = defaultSpaceId } = { spaceId: defaultSpaceId }
// ) {
//   return axiosInst
//     .get(`/${spaceId}/components`)
//     .then(res => Promise.resolve(res.data.components))
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

// function deleteComponent(
//   {
//     spaceId = defaultSpaceId,
//     componentId = missingParameter("componentId")
//   } = missingObjectParameter()
// ) {
//   return axiosInst
//     .delete(`/${spaceId}/components/${componentId}`)
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

// function deleteComponents(
//   { spaceId = defaultSpaceId } = { spaceId: defaultSpaceId }
// ) {
//   return getComponents({ spaceId })
//     .then(existingComponents => {
//       return Promise.each(existingComponents, existingComponent => {
//         let componentId = existingComponent.id
//         return deleteComponent({ spaceId, componentId })
//       })
//     })
//     .catch(error => Promise.reject(error))
// }

// function getStories(
//   { spaceId = defaultSpaceId } = { spaceId: defaultSpaceId }
// ) {
//   let per_page = 100
//   let stories = []
//   return getStoryPaginationPageCount({ spaceId, per_page })
//     .then(pageCount => {
//       let requestList = []
//       for (let x = 1; x <= pageCount; x++) {
//         requestList.push(getStoriesByPaginationPage)
//       }
//       return Promise.each(requestList, (request, index) => {
//         return request({ spaceId, per_page, page: index + 1 })
//           .then(res => {
//             stories = stories.concat(res)
//             return Promise.resolve()
//           })
//           .catch(error => Promise.reject(error))
//       })
//     })
//     .then(() => Promise.resolve(stories))
//     .catch(error => Promise.reject(error))
// }

// function getStoriesByPaginationPage(
//   {
//     spaceId = defaultSpaceId,
//     per_page = defaultValues.perPage,
//     page = missingParameter("page")
//   } = missingObjectParameter()
// ) {
//   let paramsOpt = { params: { per_page, page } }
//   return axiosInst
//     .get(`${spaceId}/stories`, paramsOpt)
//     .then(res => Promise.resolve(res.data.stories))
//     .catch(error => Promise.reject(error))
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

// function getStoryCount(
//   { spaceId = defaultSpaceId } = { spaceId: defaultSpaceId }
// ) {
//   // // GetSpace() does not count folders as stories, WARNING !!!
//   // return getSpace({ spaceId })
//   //   .then(space => Promise.resolve(space.stories_count))
//   //   .catch(error => Promise.reject(error))
//   // // above does not work
//   return axiosInst
//     .get(`/${spaceId}/stories`)
//     .then(res => res.headers.total)
//     .catch(error => Promise.reject(error))
// }

// function getStoryPaginationPageCount(
//   { spaceId = defaultSpaceId, per_page = defaultValues.perPage } = {
//     spaceId: defaultSpaceId,
//     per_page: defaultValues.perPage
//   }
// ) {
//   return getStoryCount({ spaceId })
//     .then(total => Promise.resolve(Math.ceil(total / per_page)))
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

// function deleteStory(
//   {
//     storyId = missingParameter("storyId"),
//     spaceId = spaceId
//   } = missingObjectParameter()
// ) {
//   return axiosInst
//     .delete(`/${spaceId}/stories/${storyId}`)
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
