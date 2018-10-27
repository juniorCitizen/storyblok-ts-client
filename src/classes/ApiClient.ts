import {AxiosResponse} from 'axios'
import * as FormData from 'form-data'

import {
  IAsset,
  IAssetFolder,
  IComponent,
  IPendingAsset,
  IPendingAssetFolder,
  IPendingComponent,
  IPendingStory,
  IRegistration,
  ISpace,
  IStory,
} from '../interfaces'

import {imageToBuffer} from '../utilities/imageProcessing'
import {ICustomAxiosRequestConfig, Storyblok} from './Storyblok'

export const retrySettings: {
  burst: ICustomAxiosRequestConfig
  extended: ICustomAxiosRequestConfig
} = {
  burst: {
    retries: 3,
    retryDelay: 1000,
  },
  extended: {
    retries: 10,
    retryDelay: 1000,
  },
}

interface IApiClientClass {
  assetFolders: {
    create: (n: string) => Promise<IAssetFolder>
    delete: (i: number) => Promise<void>
    deleteExisting: () => Promise<void[]>
    get: (i: number) => Promise<IAssetFolder>
    getByName: (s: string) => Promise<IAssetFolder[]>
    getExisting: () => Promise<IAssetFolder[]>
  }
  assets: {
    count: () => Promise<number>
    createFromImage: (
      d: IPendingAsset,
      f: string,
      c?: boolean,
      s?: number
    ) => Promise<IAsset>
    delete: (i: number) => Promise<IAsset>
    deleteExisting: () => Promise<IAsset[]>
    get: (i: number) => Promise<IAsset>
    getByPage: (p?: number, pp?: number) => Promise<IAsset[]>
    getByUrl: (u: string) => Promise<IAsset>
    getExisting: () => Promise<IAsset[]>
    register: (d: IPendingAsset) => Promise<IRegistration>
    upload: (b: Buffer, r: IRegistration) => Promise<string>
  }
  components: {
    create: (d: IPendingComponent) => Promise<IComponent>
    delete: (i: number) => Promise<IComponent>
    deleteExisting: () => Promise<IComponent[]>
    get: (i: number) => Promise<IComponent>
    getExisting: () => Promise<IComponent[]>
  }
  spaces: {
    get: () => Promise<ISpace>
  }
  stories: {
    count: () => Promise<number>
    countPages: (p: number) => Promise<number>
    create: (d: IPendingStory) => Promise<IStory>
    delete: (i: number) => Promise<IStory>
    deleteExisting: () => Promise<IStory[]>
    get: (i: number) => Promise<IStory>
    getByPage: (p?: number, pp?: number) => Promise<IStory[]>
    getExisting: () => Promise<IStory[]>
    publish: (i: number) => Promise<IStory>
    publishPendings: () => Promise<IStory[]>
    reorder: (i: number, ai: number) => Promise<IStory>
    update: (d: IStory) => Promise<IStory>
  }
}

/**
 * Management API wrapper around Storyblok class.
 *
 * @export
 * @class ApiClient
 * @implements {IStoryblokClass}
 * @param {string} apiToken - API access token.
 * @param {number} spaceId - Storyblok working space id.
 * @example
 * const {ApiClient} = require('storyblok-ts-client')
 * const apiClient = new ApiClient('fake_api_token', 12345)
 */
export class ApiClient implements IApiClientClass {
  private spaceId: number
  private storyblok: Storyblok
  constructor(apiToken: string, spaceId: number) {
    this.spaceId = spaceId
    this.storyblok = new Storyblok(apiToken)
  }

  /**
   * Object that contains API methods for asset folder operations
   *
   * @readonly
   * @name ApiClient#assetFolders
   * @memberof ApiClient
   */
  public get assetFolders() {
    return {
      /**
       * Create an asset folder.
       *
       * @name ApiClient#assetFolders#create
       * @param {string} name - Name of asset folder to create.
       * @returns {Promise}
       * @fulfil {IAssetFolder} Details of the asset folder created.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#assetFolders
       */
      create: (name: string): Promise<IAssetFolder> =>
        this.createAssetFolder(name),
      /**
       * Delete a specific asset folder.
       *
       * @name ApiClient#assetFolders#delete
       * @param {number} id - Id of asset folder to be deleted.
       * @returns {Promise}
       * @fulfil {void}
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#assetFolders
       */
      delete: (id: number): Promise<void> => this.deleteAssetFolder(id),
      /**
       * Delete all existing asset folders.
       *
       * @name ApiClient#assetFolders#deleteExisting
       * @returns {Promise}
       * @fulfil {void[]}
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#assetFolders
       */
      deleteExisting: (): Promise<void[]> => this.deleteExistingAssetFolders(),
      /**
       * Get a specific asset folder.
       *
       * @name ApiClient#assetFolders#get
       * @param {number} id - Id of the target asset folder.
       * @returns {Promise}
       * @fulfil {IAssetFolder} Asset folder information.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#assetFolders
       */
      get: (id: number): Promise<IAssetFolder> => this.getAssetFolder(id),
      /**
       * Get asset folders by matching asset folders names to the supplied string.
       *
       * @name ApiClient#assetFolders#getByName
       * @param {string} searchString - String to search by.
       * @returns {Promise}
       * @fulfil {IAssetFolder[]} List of matched asset folders.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#assetFolders
       */
      getByName: (searchString: string): Promise<IAssetFolder[]> =>
        this.getAssetFolderByName(searchString),
      /**
       * Get existing asset folders.
       *
       * @name ApiClient#assetFolders#getExisting
       * @returns {Promise}
       * @fulfil {IAssetFolder[]} List of existing asset folders.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#assetFolders
       */
      getExisting: (): Promise<IAssetFolder[]> =>
        this.getExistingAssetFolders(),
    }
  }

  /**
   * Object that contains API methods for asset operations
   *
   * @readonly
   * @name ApiClient#assets
   * @memberof ApiClient
   */
  public get assets() {
    return {
      /**
       * Get total number of existing assets.
       *
       * @name ApiClient#assets#count
       * @returns {Promise}
       * @fulfil {number} A count of existing assets.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#assets
       */
      count: (): Promise<number> => this.countAssets(),
      /**
       * Create and asset and upload the physical file.
       *
       * @name ApiClient#assets#createFromImage
       * @param {IPendingAsset} data - Asset information.
       * @param {string} filePath - Absolute file path to the image.
       * @param {boolean} compress - Flag to compress image.
       * @param {number} sizeLimit - Resizing dimension limit value.
       * @returns {Promise}
       * @fulfil {IAsset} Information on the new asset.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#assets
       */
      createFromImage: (
        data: IPendingAsset,
        filePath: string,
        compress?: boolean,
        sizeLimit?: number
      ): Promise<IAsset> =>
        this.createAssetFromImage(data, filePath, compress, sizeLimit),
      /**
       * Delete a specific asset.
       *
       * @name ApiClient#assets#delete
       * @param {number} id - Id of the asset to be deleted.
       * @returns {Promise}
       * @fulfil {IAsset} Information of the deleted asset.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#assets
       */
      delete: (id: number): Promise<IAsset> => this.deleteAsset(id),
      /**
       * Delete all existing assets.
       *
       * @name ApiClient#assets#deleteExisting
       * @returns {Promise}
       * @fulfil {IAsset[]} Information on the deleted assets.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#assets
       */
      deleteExisting: (): Promise<IAsset[]> => this.deleteExistingAssets(),
      /**
       * Get a specific asset.
       *
       * @name ApiClient#assets#get
       * @param {number} id - Id of asset to fetch.
       * @returns {Promise}
       * @fulfil {IAsset} Details of the asset.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#assets
       */
      get: (id: number): Promise<IAsset> => this.getAsset(id),
      /**
       * Get asset on a specific pagination page number.
       *
       * @name ApiClient#assets#getByPage
       * @param {number} [page=1] - Pagination page.
       * @param {number} [perPage=25] - Assets per page.
       * @returns {Promise<IAsset[]>}
       * @fulfil {IAsset[]} Assets on the pagination page.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#assets
       */
      getByPage: (page?: number, perPage?: number): Promise<IAsset[]> =>
        this.getAssetsByPage(page, perPage),
      /**
       * Find a specific asset by its public url.
       *
       * @name ApiClient#assets#getByUrl
       * @param {string} url - Url to match by.
       * @returns {Promise}
       * @fulfil {IAsset} Matched asset.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient
       */
      getByUrl: (url: string): Promise<IAsset> => this.getAssetByUrl(url),
      /**
       * List all existing assets.
       *
       * @name ApiClient#assets#getExisting
       * @returns {Promise}
       * @fulfil {IAsset[]} A list of existing assets.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#assets
       */
      getExisting: (): Promise<IAsset[]> => this.getExistingAssets(),
      /**
       * Register a Storyblok asset.
       *
       * @name ApiClient#assets#register
       * @param {IPendingAsset} asset - Information to create asset from.
       * @param {string} asset.filename - File name to register for.
       * @param {number} [asset.asset_folder_id] - (optional) Assign a asset folder.
       * @param {number} [asset.id] - (optional) Id of existing asset to replace with this new asset.
       * @returns {Promise}
       * @fulfil {IRegistration} Asset registration info (used for uploading).
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#assets
       */
      register: (data: IPendingAsset): Promise<IRegistration> =>
        this.registerAsset(data),
      /**
       * Upload a registered asset.
       *
       * @name ApiClient#assets#upload
       * @param {Buffer} buffer - Buffered asset data.
       * @param {IRegistration} registration - Registration info.
       * @returns {Promise}
       * @fulfil {string} Access url of the uploaded asset.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#assets
       */
      upload: (buffer: Buffer, registration: IRegistration): Promise<string> =>
        this.uploadAsset(buffer, registration),
    }
  }

  /**
   * Object that contains API methods for component operations
   *
   * @name ApiClient#components
   * @readonly
   * @memberof ApiClient
   */
  public get components() {
    return {
      /**
       * Create a component.
       *
       * @name ApiClient#components#create
       * @param {IPendingComponent} data - Info on component to be created.
       * @returns {Promise}
       * @fulfil {IComponent} Details of the component that was created.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#components
       */
      create: (data: IPendingComponent): Promise<IComponent> =>
        this.createComponent(data),
      /**
       * Delete a specific component.
       *
       * @name ApiClient#components#delete
       * @param {number} id - Id of component to be deleted.
       * @returns {Promise}
       * @fulfil {IComponent} Details of the deleted component.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#components
       */
      delete: (id: number): Promise<IComponent> => this.deleteComponent(id),
      /**
       * Delete existing components.
       *
       * @name ApiClient#components#deleteExisting
       * @returns {Promise}
       * @fulfil {IComponent[]} A list of deleted components details.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#components
       */
      deleteExisting: (): Promise<IComponent[]> =>
        this.deleteExistingComponents(),
      /**
       * Fetch for a specific component.
       *
       * @name ApiClient#components#get
       * @param {number} id - Component id to fetch by.
       * @returns {Promise}
       * @fulfil {IComponent} Details of the component definition.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#components
       */
      get: (id: number): Promise<IComponent> => this.getComponent(id),
      /**
       * List existing components.
       *
       * @name ApiClient#components#getExisting
       * @returns {Promise}
       * @fulfil {IComponent[]} A list of component definitions.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#components
       */
      getExisting: (): Promise<IComponent[]> => this.getExistingComponents(),
    }
  }

  /**
   * Object that contains API methods for space operations
   *
   * @name ApiClient#spaces
   * @readonly
   * @memberof ApiClient
   */
  public get spaces() {
    return {
      /**
       * Get information on the working Storyblok space.
       *
       * @name ApiClient#spaces#get
       * @returns {Promise}
       * @fulfil {ISpace} Working space information.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#spaces
       */
      get: (): Promise<ISpace> => this.getSpace(),
    }
  }

  /**
   * Object that contains API methods for story operations
   *
   * @name ApiClient#stories
   * @readonly
   * @memberof ApiClient
   */
  public get stories() {
    return {
      /**
       * Get total number of existing stories (including folders).
       *
       * @name ApiClient#stories#count
       * @returns {Promise}
       * @fulfil {number} A count of existing stories.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#stories
       */
      count: (): Promise<number> => this.countStories(),
      /**
       * Get total pagination page count.
       *
       * @name ApiClient#stories#countPages
       * @param {number} [perPage] - (optional) How many stories per page.  Defaults to 25.
       * @returns {Promise}
       * @fulfil {number} Total story pagination page count.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#stories
       */
      countPages: (perPage: number = 25): Promise<number> =>
        this.countStoryPages(perPage),
      /**
       * Create a story.
       *
       * @name ApiClient#stories#create
       * @param {IPendingStory} data - Storyblok story data object.
       * @returns {Promise}
       * @fulfil {IStory} Details of story that was created.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#stories
       */
      create: (data: IPendingStory): Promise<IStory> => this.createStory(data),
      /**
       * Delete a specific story.
       *
       * @name ApiClient#stories#delete
       * @param {IStory} id - Id of the story to be deleted.
       * @returns {Promise}
       * @fulfil {IStory} Details of the story that was deleted.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#stories
       */
      delete: (id: number): Promise<IStory> => this.deleteStory(id),
      /**
       * Delete all existing stories.
       *
       * @name ApiClient#stories#deleteExisting
       * @returns {Promise}
       * @fulfil {IStory[]} A list of deleted stories details.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#stories
       */
      deleteExisting: (): Promise<IStory[]> => this.deleteExistingStories(),
      /**
       * Get a specific story.
       *
       * @name ApiClient#stories#get
       * @param {number} id - Id of the content story.
       * @returns {Promise}
       * @fulfil {IStory} Details of content story.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#stories
       */
      get: (id: number): Promise<IStory> => this.getStory(id),
      /**
       * Get stories on a pagination page.
       *
       * @name ApiClient#stories#getByPage
       * @param {number} page - Pagination page number.
       * @param {number} [perPage] - (optional) How many stories per page.  Defaults to 25.
       * @returns {Promise}
       * @fulfil {IStory[]} A page of stories.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#stories
       */
      getByPage: (page?: number, perPage?: number): Promise<IStory[]> =>
        this.getStoriesByPage(page, perPage),
      /**
       * List all existing stories.
       *
       * @name ApiClient#stories#getExisting
       * @returns {Promise}
       * @fulfil {IStory[]} A list of existing content stories.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#stories
       */
      getExisting: (): Promise<IStory[]> => this.getExistingStories(),
      /**
       * Publish a specific story.
       *
       * @name ApiClient#stories#publish
       * @param {number} id - Id of the story to publish
       * @returns {Promise}
       * @fulfil {IStory} Details of the published story
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#stories
       */
      publish: (id: number): Promise<IStory> => this.publishStory(id),
      /**
       * Publish all unpublished stories.
       *
       * @name ApiClient#stories#publishPendings
       * @returns {Promise}
       * @fulfil {IStory[]} List of published stories.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#stories
       */
      publishPendings: (): Promise<IStory[]> => this.publishPendingStories(),
      /**
       * Update a story's sequential order.
       *
       * @name ApiClient#stories#reorder
       * @param {number} id - Id of the story to be moved.
       * @param {number} afterId - Id of reference story to position after.
       * @returns {Promise}
       * @fulfil {IStory} Details of the moved story.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#stories
       */
      reorder: (id: number, afterId: number): Promise<IStory> =>
        this.reorderStory(id, afterId),
      /**
       * Update a story.
       *
       * @name ApiClient#stories#update
       * @param {IStory} data - Modified story info.
       * @returns {Promise}
       * @fulfil {IStory} Details of story that was updated.
       * @reject {AxiosError} Axios error.
       * @memberof ApiClient#stories
       */
      update: (data: IStory): Promise<IStory> => this.updateStory(data),
    }
  }

  /**
   * Get total number of existing assets.
   *
   * @name ApiClient#countAssets
   * @returns {Promise}
   * @fulfil {number} A count of existing assets.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public countAssets(): Promise<number> {
    return this.getSpace()
      .then(s => s.assets_count)
      .catch(e => Promise.reject(e))
  }

  /**
   * Get total number of existing stories (including folders).
   *
   * @name ApiClient#countStories
   * @returns {Promise}
   * @fulfil {number} A count of existing stories.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public countStories(): Promise<number> {
    return this.getExistingStories()
      .then(ss => ss.length)
      .catch(e => Promise.reject(e))
  }

  /**
   * Get total pagination page count.
   *
   * @name ApiClient#countStoryPages
   * @param {number} [perPage] - (optional) How many stories per page.  Defaults to 25.
   * @returns {Promise}
   * @fulfil {number} Total story pagination page count.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public countStoryPages(perPage: number = 25): Promise<number> {
    const url = `/${this.spaceId}/stories`
    type R = (r: AxiosResponse) => number
    const responseHandler: R = r => {
      const total = r.headers.total as number
      return Math.ceil(total / perPage)
    }
    return this.storyblok
      .get(url, retrySettings.burst)
      .then(responseHandler)
      .catch(r => Promise.reject(r))
  }

  /**
   * Create an asset folder.
   *
   * @name ApiClient#createAssetFolder
   * @param {string} name - Name of asset folder to create.
   * @returns {Promise}
   * @fulfil {IAssetFolder} Details of the asset folder created.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public createAssetFolder(name: string): Promise<IAssetFolder> {
    const url = `/${this.spaceId}/asset_folders`
    const data: IPendingAssetFolder = {name}
    return this.storyblok
      .post(url, {asset_folder: data}, retrySettings.burst)
      .then(r => r.data.asset_folder)
      .catch(e => Promise.reject(e))
  }

  /**
   * Create and asset and upload the physical file.
   *
   * @name ApiClient#createAssetFromImage
   * @param {IPendingAsset} data - Asset information.
   * @param {string} filePath - Absolute file path to the image.
   * @param {boolean} compress - Flag to compress image.
   * @param {number} sizeLimit - Resizing dimension limit value.
   * @returns {Promise}
   * @fulfil {IAsset} Information on the new asset.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public async createAssetFromImage(
    data: IPendingAsset,
    filePath: string,
    compress: boolean = true,
    sizeLimit: number = 640
  ): Promise<IAsset> {
    try {
      const [registration, buffer] = await Promise.all([
        this.registerAsset(data),
        imageToBuffer(filePath, compress, sizeLimit),
      ])
      const [asset] = await Promise.all([
        this.getAssetByUrl(registration.public_url),
        this.uploadAsset(buffer, registration),
      ])
      if (!asset) {
        throw new Error('asset was not created properly')
      } else {
        return asset
      }
    } catch (e) {
      throw e
    }
  }

  /**
   * Create a component.
   *
   * @name ApiClient#components#create
   * @param {IPendingComponent} data - Info on component to be created.
   * @returns {Promise}
   * @fulfil {IComponent} Details of the component that was created.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public createComponent(data: IPendingComponent): Promise<IComponent> {
    const url = `/${this.spaceId}/components`
    return this.storyblok
      .post(url, {component: data}, retrySettings.burst)
      .then(r => r.data.component)
      .catch(e => Promise.reject(e))
  }

  /**
   * Create a story.
   *
   * @name ApiClient#createStory
   * @param {IPendingStory} data - Storyblok story data object.
   * @returns {Promise}
   * @fulfil {IStory} Details of story that was created.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public createStory(data: IPendingStory): Promise<IStory> {
    const url = `/${this.spaceId}/stories`
    return this.storyblok
      .post(url, {story: data}, retrySettings.burst)
      .then(r => r.data.story)
      .catch(e => Promise.reject(e))
  }

  /**
   * Delete a specific asset.
   *
   * @name ApiClient#deleteAsset
   * @param {number} id - Id of the asset to be deleted.
   * @returns {Promise}
   * @fulfil {IAsset} Information of the deleted asset.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public deleteAsset(id: number): Promise<IAsset> {
    const url: string = `/${this.spaceId}/assets/${id}`
    return this.storyblok
      .delete(url, retrySettings.burst)
      .then(r => r.data)
      .catch(e => Promise.reject(e))
  }

  /**
   * Delete a specific asset folder.
   *
   * @name ApiClient#deleteAssetFolder
   * @param {number} id - Id of asset folder to be deleted.
   * @returns {Promise}
   * @fulfil {void}
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public deleteAssetFolder(id: number): Promise<void> {
    const url = `/${this.spaceId}/asset_folders/${id}`
    return this.storyblok
      .delete(url, retrySettings.burst)
      .then(() => Promise.resolve())
      .catch(e => Promise.reject(e))
  }

  /**
   * Delete a specific component.
   *
   * @name ApiClient#deleteComponent
   * @param {number} id - Id of component to be deleted.
   * @returns {Promise}
   * @fulfil {IComponent} Details of the deleted component.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public deleteComponent(id: number): Promise<IComponent> {
    const url = `/${this.spaceId}/components/${id}`
    return this.storyblok
      .delete(url, retrySettings.burst)
      .then(r => r.data.component)
      .catch(e => Promise.reject(e))
  }

  /**
   * Delete a specific story.
   *
   * @name ApiClient#deleteStory
   * @param {IStory} id - Id of the story to be deleted.
   * @returns {Promise}
   * @fulfil {IStory} Details of the story that was deleted.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public deleteStory(id: number): Promise<IStory> {
    const url = `/${this.spaceId}/stories/${id}`
    return this.storyblok
      .delete(url, retrySettings.burst)
      .then(r => r.data.story)
      .catch(e => Promise.reject(e))
  }

  /**
   * Delete all existing asset folders.
   *
   * @name ApiClient#deleteExistingAssetFolders
   * @returns {Promise}
   * @fulfil {void[]}
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public deleteExistingAssetFolders(): Promise<void[]> {
    type M = (af: IAssetFolder) => Promise<void>
    const mapFn: M = af => this.deleteAssetFolder(af.id as number)
    return this.getExistingAssetFolders()
      .then(afs => Promise.all(afs.map(mapFn)))
      .catch(e => Promise.reject(e))
  }

  /**
   * Delete all existing assets.
   *
   * @name ApiClient#deleteExistingAssets
   * @returns {Promise}
   * @fulfil {IAsset[]} Information on the deleted assets.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public deleteExistingAssets(): Promise<IAsset[]> {
    type M = (a: IAsset) => Promise<IAsset>
    const mapFn: M = a => this.deleteAsset(a.id as number)
    return this.getExistingAssets()
      .then(as => Promise.all(as.map(mapFn)))
      .catch(e => Promise.reject(e))
  }

  /**
   * Delete existing components.
   *
   * @name ApiClient#deleteExistingComponents
   * @returns {Promise}
   * @fulfil {IComponent[]} A list of deleted components details.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public deleteExistingComponents(): Promise<IComponent[]> {
    type M = (c: IComponent) => Promise<IComponent>
    const mapFn: M = c => this.deleteComponent(c.id as number)
    return this.getExistingComponents()
      .then(cs => Promise.all(cs.map(mapFn)))
      .catch(e => Promise.reject(e))
  }

  /**
   * Delete all existing stories.
   *
   * @name ApiClient#deleteExistingStories
   * @returns {Promise}
   * @fulfil {IStory[]} A list of deleted stories details.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public async deleteExistingStories(): Promise<IStory[]> {
    try {
      const existing: IStory[] = await this.getExistingStories()
      type F = (s: IStory) => boolean
      const filterFn: F = s => (s.parent_id as number) === 0
      const root: IStory[] = existing.filter(filterFn)
      type M = (s: IStory) => Promise<IStory>
      const mapFn: M = s => this.deleteStory(s.id as number)
      const deleted: IStory[] = await Promise.all(root.map(mapFn))
      const remainder: IStory[] = await this.getExistingStories()
      return deleted.concat(await Promise.all(remainder.map(mapFn)))
    } catch (e) {
      throw e
    }
  }

  /**
   * Get a specific asset.
   *
   * @name ApiClient#getAsset
   * @param {number} id - Id of asset to fetch.
   * @returns {Promise}
   * @fulfil {IAsset} Details of the asset.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public getAsset(id: number): Promise<IAsset> {
    const url = `/${this.spaceId}/assets/${id}`
    return this.storyblok
      .get(url, retrySettings.burst)
      .then(r => r.data)
      .catch(e => Promise.reject(e))
  }

  /**
   * Find a specific asset by its public url.
   *
   * @name ApiClient#getAssetByUrl
   * @param {string} url - Url to match by.
   * @returns {Promise}
   * @fulfil {IAsset} Matched asset.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public getAssetByUrl(url: string): Promise<IAsset> {
    type RH = (as: IAsset[]) => IAsset
    const responseHandler: RH = as => {
      type F = (a: IAsset) => boolean
      const findFn: F = a => a.filename === url
      const asset = as.find(findFn)
      if (!asset) {
        throw new Error('unable to find an asset by this url')
      } else {
        return asset
      }
    }
    return this.getExistingAssets()
      .then(responseHandler)
      .catch(e => Promise.reject(e))
  }

  /**
   * Get a specific asset folder.
   *
   * @name ApiClient#getAssetFolder
   * @param {number} id - Id of the target asset folder.
   * @returns {Promise}
   * @fulfil {IAssetFolder} Asset folder information.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public getAssetFolder(id: number): Promise<IAssetFolder> {
    const url = `/${this.spaceId}/asset_folders/${id}`
    return this.storyblok
      .get(url, retrySettings.burst)
      .then(r => r.data.asset_folder)
      .catch(e => Promise.reject(e))
  }

  /**
   * Get asset folders by matching asset folders names to the supplied string.
   *
   * @name ApiClient#assetFolders#getByName
   * @param {string} searchString - String to search by.
   * @returns {Promise}
   * @fulfil {IAssetFolder[]} List of matched asset folders.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public getAssetFolderByName(searchString: string): Promise<IAssetFolder[]> {
    const url = `/${this.spaceId}/asset_folders`
    const query = `?search=${searchString}`
    return this.storyblok
      .get(url + query, retrySettings.burst)
      .then(r => r.data.asset_folders)
      .catch(e => Promise.reject(e))
  }

  /**
   * Get asset on a specific pagination page number.
   *
   * @param {number} [page=1] - Pagination page.
   * @param {number} [perPage=25] - Assets per page.
   * @returns {Promise<IAsset[]>}
   * @fulfil {IAsset[]} Assets on the pagination page.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public getAssetsByPage(
    page: number = 1,
    perPage: number = 25
  ): Promise<IAsset[]> {
    const url = `/${this.spaceId}/assets`
    const query = `?per_page=${perPage}&page=${page}`
    return this.storyblok
      .get(url + query, retrySettings.burst)
      .then(r => r.data.assets)
      .catch(e => Promise.reject(e))
  }

  /**
   * Fetch for a specific component.
   *
   * @name ApiClient#getComponent
   * @param {number} id - Component id to fetch by.
   * @returns {Promise}
   * @fulfil {IComponent} Details of the component definition.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public getComponent(id: number): Promise<IComponent> {
    const url = `/${this.spaceId}/components/${id}`
    return this.storyblok
      .get(url, retrySettings.burst)
      .then(r => r.data.component)
      .catch(e => Promise.reject(e))
  }

  /**
   * List all existing assets.
   *
   * @name ApiClient#getExistingAssets
   * @returns {Promise}
   * @fulfil {IAsset[]} A list of existing assets.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public async getExistingAssets(): Promise<IAsset[]> {
    try {
      const perPage = 1000
      const total = await this.countAssets()
      const pageCount = Math.ceil(total / perPage)
      if (pageCount === 0) {
        return []
      }
      const pageIndices = Array.from(Array(pageCount).keys())
      type M = (pi: number) => Promise<IAsset[]>
      const mapFn: M = pi => this.getAssetsByPage(pi + 1, perPage)
      const arrayOfAssets = await Promise.all(pageIndices.map(mapFn))
      return [].concat(...(arrayOfAssets as any[]))
    } catch (e) {
      throw e
    }
  }

  /**
   * List existing components.
   *
   * @name ApiClient#getExistingComponents
   * @returns {Promise}
   * @fulfil {IComponent[]} A list of component definitions.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public getExistingComponents(): Promise<IComponent[]> {
    const url = `/${this.spaceId}/components`
    return this.storyblok
      .get(url, retrySettings.burst)
      .then(r => r.data.components)
      .catch(e => Promise.reject(e))
  }

  /**
   * Get existing asset folders.
   *
   * @name ApiClient#getExistingAssetFolders
   * @returns {Promise}
   * @fulfil {IAssetFolder[]} List of existing asset folders.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public getExistingAssetFolders(): Promise<IAssetFolder[]> {
    const url = `/${this.spaceId}/asset_folders?search`
    return this.storyblok
      .get(url, retrySettings.burst)
      .then(r => r.data.asset_folders)
      .catch(e => Promise.reject(e))
  }

  /**
   * List all existing stories.
   *
   * @name ApiClient#getExistingStories
   * @returns {Promise}
   * @fulfil {IStory[]} A list of existing content stories.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public async getExistingStories(): Promise<IStory[]> {
    try {
      const perPage = 1000
      const pageCount = await this.countStoryPages(perPage)
      if (pageCount === 0) {
        return []
      }
      const pageIndices = Array.from(Array(pageCount).keys())
      type M = (pi: number) => Promise<IStory[]>
      const mapFn: M = pi => this.getStoriesByPage(pi + 1, perPage)
      const arrayOfStories = await Promise.all(pageIndices.map(mapFn))
      return [].concat(...(arrayOfStories as any[]))
    } catch (e) {
      throw e
    }
  }

  /**
   * Get information on the working Storyblok space.
   *
   * @name ApiClient#getSpace
   * @returns {Promise}
   * @fulfil {ISpace} Working space information.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public getSpace(): Promise<ISpace> {
    const url = `/${this.spaceId}`
    return this.storyblok
      .get(url, retrySettings.burst)
      .then(r => r.data.space)
      .catch(e => Promise.reject(e))
  }

  /**
   * Get stories on a pagination page.
   *
   * @name ApiClient#getStoriesByPage
   * @param {number} page - Pagination page number.
   * @param {number} [perPage] - (optional) How many stories per page.  Defaults to 25.
   * @returns {Promise}
   * @fulfil {IStory[]} A page of stories.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public getStoriesByPage(
    page: number = 1,
    perPage: number = 25
  ): Promise<IStory[]> {
    const url = `/${this.spaceId}/stories`
    const query = `?per_page=${perPage}&page=${page}`
    return this.storyblok
      .get(url + query, retrySettings.burst)
      .then(r => r.data.stories)
      .catch(e => Promise.reject(e))
  }

  public getStory(id: number): Promise<IStory> {
    const url = `/${this.spaceId}/stories/${id}`
    return this.storyblok
      .get(url, retrySettings.burst)
      .then(r => r.data.story)
      .catch(e => Promise.reject(e))
  }

  /**
   * Publish all unpublished stories.
   *
   * @name ApiClient#stories#publishPendings
   * @returns {Promise}
   * @fulfil {IStory[]} List of published stories.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public async publishPendingStories(): Promise<IStory[]> {
    try {
      const existing = await this.getExistingStories()
      type F = (s: IStory) => boolean
      const filterFn: F = s => !s.is_folder && !s.published
      const pendings = existing.filter(filterFn)
      type M = (s: IStory) => Promise<IStory>
      const mapFn: M = s => this.publishStory(s.id as number)
      return await Promise.all(pendings.map(mapFn))
    } catch (e) {
      throw e
    }
  }

  /**
   * Publish a specific story.
   *
   * @name ApiClient#publishStory
   * @param {number} id - Id of the story to publish
   * @returns {Promise}
   * @fulfil {IStory} Details of the published story
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public publishStory(id: number): Promise<IStory> {
    const url = `/${this.spaceId}/stories/${id}/publish`
    return this.storyblok
      .get(url, retrySettings.burst)
      .then(r => r.data.story)
      .catch(e => Promise.reject(e))
  }

  /**
   * Register a Storyblok asset.
   *
   * @name ApiClient#registerAsset
   * @param {IPendingAsset} asset - Information to create asset from.
   * @param {string} asset.filename - File name to register for.
   * @param {number} [asset.asset_folder_id] - (optional) Assign a asset folder.
   * @param {number} [asset.id] - (optional) Id of existing asset to replace with this new asset.
   * @returns {Promise}
   * @fulfil {IRegistration} Asset registration info (used for uploading).
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public registerAsset(data: IPendingAsset): Promise<IRegistration> {
    const url = `/${this.spaceId}/assets`
    return this.storyblok
      .post(url, data, retrySettings.extended)
      .then(r => r.data)
      .catch(e => Promise.reject(e))
  }

  /**
   * Update a story's sequential order.
   *
   * @name ApiClient#reorderStory
   * @param {number} id - Id of the story to be moved.
   * @param {number} afterId - Reference story to position after.
   * @returns {Promise}
   * @fulfil {IStory} Details of the moved story.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public reorderStory(id: number, afterId: number): Promise<IStory> {
    const url = `/${this.spaceId}/stories/${id}/move`
    const query = `?after_id=${afterId}`
    return this.storyblok
      .put(url + query, retrySettings.burst)
      .then(() => this.getStory(id))
      .catch(e => Promise.reject(e))
  }

  /**
   * Update a story.
   *
   * @name ApiClient#updateStory
   * @param {IStory} data - Storyblok story data object with modified info.
   * @returns {Promise}
   * @fulfil {IStory} Details of story that was updated.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public updateStory(data: IStory): Promise<IStory> {
    const url = `/${this.spaceId}/stories`
    return this.storyblok
      .put(url, {story: data}, retrySettings.burst)
      .then(r => r.data.story)
      .catch(e => Promise.reject(e))
  }

  /**
   * Upload a registered asset.
   *
   * @name ApiClient#uploadAsset
   * @param {Buffer} buffer - Buffered asset data.
   * @param {IRegistration} registration - Registration info.
   * @returns {Promise}
   * @fulfil {string} Access url of the uploaded asset.
   * @reject {AxiosError} Axios error.
   * @memberof ApiClient
   */
  public uploadAsset(
    buffer: Buffer,
    registration: IRegistration
  ): Promise<string> {
    const formData = new FormData()
    const formFields = registration.fields
    for (const key in formFields) {
      if (key in formFields) {
        formData.append(key, formFields[key])
      }
    }
    formData.append('file', buffer)
    return new Promise((resolve, reject) => {
      formData.submit(registration.post_url, e => {
        return e ? reject(e) : resolve(registration.pretty_url)
      })
    })
  }
}
