import * as assetFolders from './assetFolders'
import * as assets from './assets'
import * as components from './components'
import * as spaces from './spaces'
import * as stories from './stories'

import {IApiClient, ICredentials} from './interfaces'

/**
 * get a object with API accessing methods
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns an object of API accessing methods
 * @example
 * const storyblok = require('storyblok-management-api-wrapper')({
 *   spaceId: 12345,
 *   apiToken: fake_api_token,
 * })
 *
 * return storyblok.space.get()
 *   .then(space => console.log('space id:', space.id)) // => space id: 12345
 */
export function getApiClient(credentials: ICredentials): IApiClient {
  return {
    assetFolders: {
      create: name => assetFolders.create(credentials, name),
      delete: id => assetFolders.deleteAssetFolder(credentials, id),
      deleteExisting: () => assetFolders.deleteExisting(credentials),
      get: id => assetFolders.get(credentials, id),
      getExisting: () => assetFolders.getExisting(credentials),
      searchByName: name => assetFolders.searchByName(credentials, name),
    },
    assets: {
      count: () => assets.count(credentials),
      createFromImage: (asset, filePath, compress, dimensionLimit) =>
        assets.createFromImage(
          credentials,
          asset,
          filePath,
          compress,
          dimensionLimit
        ),
      delete: id => assets.deleteAsset(credentials, id),
      deleteExisting: () => assets.deleteExisting(credentials),
      get: id => assets.get(credentials, id),
      getExisting: () => assets.getExisting(credentials),
      register: filename => assets.register(credentials, filename),
      searchByUrl: publicUrl => assets.searchByUrl(credentials, publicUrl),
      upload: (buffer, signedResponse) =>
        assets.upload(credentials, buffer, signedResponse),
    },

    components: {
      create: component => components.create(credentials, component),
      delete: id => components.deleteComponent(credentials, id),
      deleteExisting: () => components.deleteExisting(credentials),
      getExisting: () => components.getExisting(credentials),
    },

    spaces: {
      get: () => spaces.get(credentials),
    },

    stories: {
      count: () => stories.count(credentials),
      create: story => stories.create(credentials, story),
      delete: id => stories.deleteStory(credentials, id),
      deleteExisting: () => stories.deleteExisting(credentials),
      get: id => stories.get(credentials, id),
      getExisting: () => stories.getExisting(credentials),
      publish: id => stories.publish(credentials, id),
      publishPendings: () => stories.publishPendings(credentials),
      reorder: (id, afterId) => stories.reorder(credentials, id, afterId),
    },
  }
}
