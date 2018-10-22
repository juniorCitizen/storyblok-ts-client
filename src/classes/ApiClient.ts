/**
 * @module ApiClient
 */

import {AxiosError, AxiosPromise, AxiosResponse} from 'axios'
import * as rp from 'request-promise-native'

import {
  IAsset,
  IAssetFolder,
  IAssetSigningResponse,
  IAssetSigningResponseFields,
  IComponent,
  ISpace,
  IStory,
} from '../interfaces'

import {imageToBuffer, promiseRetry} from '../utilities'

import {Storyblok} from './Storyblok'

/**
 * Class to facilitate Storyblok management API interface.
 *
 * @class
 * @example
 * const {ApiClient} = require('storyblok-ts-client')
 * const apiClient = ApiClient('fake_api_token', 12345)
 *
 * return apiClient.spaces.get()
 *   .then(space => console.log('space id:', space.id))
 *   // => space id: 12345
 */
export class ApiClient {
  /**
   * Storyblok working space id.
   *
   * @name Storyblok#spaceId
   * @type number
   */
  private spaceId: number
  /**
   * Storyblok class instance
   *
   * @name Storyblok#storyblok
   * @type Storyblok
   */
  private storyblok: Storyblok

  /**
   * Class instantiation.
   *
   * @param {string} apiToken - API access token.
   * @param {number} spaceId - Storyblok working space id.
   */
  constructor(apiToken: string, spaceId: number) {
    this.spaceId = spaceId
    this.storyblok = new Storyblok(apiToken)
  }

  /**
   * Provides API methods for asset folders.
   *
   * @name ApiClient#assetFolders
   * @returns {Object}
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
       */
      delete: (id: number): Promise<void> => this.deleteAssetFolder(id),
      /**
       * Delete all existing asset folders.
       *
       * @name ApiClient#assetFolders#deleteExisting
       * @returns {Promise}
       * @fulfil {void[]}
       * @reject {AxiosError} Axios error.
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
       */
      get: (id: number): Promise<IAssetFolder> => this.getAssetFolder(id),
      /**
       * Get a list of asset folders by matching asset folders names to the supplied string.
       *
       * @name ApiClient#assetFolders#getByName
       * @param {string} name - String to search asset folders by.
       * @returns {Promise}
       * @fulfil {IAssetFolder[]} List of asset folders that matches the name string.
       * @reject {AxiosError} Axios error.
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
       */
      getExisting: (): Promise<IAssetFolder[]> =>
        this.getExistingAssetFolders(),
    }
  }

  /**
   * Provides API methods for assets.
   *
   * @name ApiClient#assets
   * @returns {Object} Asset API methods.
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
       */
      count: (): Promise<number> => this.countAssets(),
      /**
       * Create an image asset at root.
       *
       * This method calls the ApiClient.registerAsset(), resize/compress the image then finally upload the physical file with ApiClient.uploadAsset() at one go.
       *
       * @name ApiClient#assets#createFromImage
       * @param {string} filePath - Absolute file path to the image.
       * @param {boolean} compress - Flag to compress image.
       * @param {number} dimensionLimit - Resizing dimension limit value.
       * @returns {Promise}
       * @fulfil {IAsset} Information of the created asset.
       * @reject {AxiosError} Axios error.
       */
      createFromImage: (
        asset: IAsset,
        filePath: string,
        compress?: boolean,
        dimensionLimit?: number
      ): Promise<IAsset> =>
        this.createAssetFromImage(asset, filePath, compress, dimensionLimit),
      /**
       * Delete a specific asset.
       *
       * @name ApiClient#assets#delete
       * @param {number} id - Id of the asset to be deleted.
       * @returns {Promise}
       * @fulfil {IAsset} Information of the deleted asset.
       * @reject {AxiosError} Axios error.
       */
      delete: (id: number): Promise<IAsset> => this.deleteAsset(id),
      /**
       * Delete all existing assets.
       *
       * @name ApiClient#assets#deleteExisting
       * @returns {Promise}
       * @fulfil {IAsset[]} Information on the deleted assets.
       * @reject {AxiosError} Axios error.
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
       */
      get: (id: number): Promise<IAsset> => this.getAsset(id),
      /**
       * Find a specific asset by its public url.
       *
       * @name ApiClient#assets#getByUrl
       * @param {string} url - Url to match by.
       * @returns {Promise}
       * @fulfil {IAsset | undefined} Matched asset or undefined if not fund.
       * @reject {AxiosError} Axios error.
       */
      getByUrl: (url: string): Promise<IAsset | undefined> =>
        this.getAssetByUrl(url),
      /**
       * List all existing assets.
       *
       * @name ApiClient#assets#getExisting
       * @returns {Promise}
       * @fulfil {IAsset[]} A list of existing assets.
       * @reject {AxiosError} Axios error.
       */
      getExisting: (): Promise<IAsset[]> => this.getExistingAssets(),
      /**
       * Register an image file as a Storyblok asset (the physical file still has to be uploaded).
       *
       * @name ApiClient#assets#register
       * @param {IAsset} asset - Information to create asset from.
       * @param {string} asset.filename - File name to register for.
       * @param {number} [asset.asset_folder_id] - (optional) Assign a asset folder.
       * @param {number} [asset.id] - (optional) Id of existing asset to replace with this new asset.
       * @returns {Promise}
       * @fulfil {IAssetSigningResponse} Asset registration info (used for uploading).
       * @reject {AxiosError} Axios error.
       */
      register: (asset: IAsset): Promise<IAssetSigningResponse> =>
        this.registerAsset(asset),
      /**
       * Upload a newly registered asset.
       *
       * @name ApiClient#assets#upload
       * @param {Buffer} buffer - Buffered asset data.
       * @param {IAssetSigningResponse} registration - Registration info.
       * @returns {Promise}
       * @fulfil {IAsset} Information of the uploaded asset.
       * @reject {AxiosError} Axios error.
       */
      upload: (
        buffer: Buffer,
        registration: IAssetSigningResponse
      ): Promise<IAsset> => this.uploadAsset(buffer, registration),
    }
  }

  /**
   * Provides API methods for components.
   *
   * @name ApiClient#components
   * @returns {Object} Component API methods.
   */
  public get components() {
    return {
      /**
       * Create a component.
       *
       * @name ApiClient#components#create
       * @param {IComponent} component - Info on component to be created.
       * @returns {Promise}
       * @fulfil {IComponent} Details of the component that was created.
       * @reject {AxiosError} Axios error.
       */
      create: (component: IComponent): Promise<IComponent> =>
        this.createComponent(component),
      /**
       * Delete a specific component.
       *
       * @name ApiClient#components#delete
       * @param {number} id - Id of component to be deleted.
       * @returns {Promise}
       * @fulfil {IComponent} Details of the deleted component.
       * @reject {AxiosError} Axios error.
       */
      delete: (id: number): Promise<IComponent> => this.deleteComponent(id),
      /**
       * Delete all existing components.
       *
       * @name ApiClient#components#deleteExistingAssetFolders
       * @returns {Promise}
       * @fulfil {IComponent[]} A list of deleted components details.
       * @reject {AxiosError} Axios error.
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
       */
      get: (id: number): Promise<IComponent> => this.getComponent(id),
      /**
       * List all existing components.
       *
       * @name ApiClient#components#getExisting
       * @returns {Promise}
       * @fulfil {IComponent[]} A list of component definitions.
       * @reject {AxiosError} Axios error.
       */
      getExisting: (): Promise<IComponent[]> => this.getExistingComponents(),
    }
  }

  /**
   * Provides API methods for the working space.
   *
   * @name ApiClient#spaces
   * @returns {Object} Working space API methods.
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
       */
      get: (): Promise<ISpace> => this.getSpace(),
    }
  }

  /**
   * Provides API methods for stories.
   *
   * @name ApiClient#stories
   * @returns {Object} Story API methods.
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
       */
      countPages: (perPage?: number): Promise<number> =>
        this.countStoryPages(perPage || 25),
      /**
       * Create a story.
       *
       * @name ApiClient#stories#create
       * @param {IStory} story - Storyblok story data object.
       * @returns {Promise}
       * @fulfil {IStory} Details of story that was created.
       * @reject {AxiosError} Axios error.
       */
      create: (story: IStory): Promise<IStory> => this.createStory(story),
      /**
       * Delete a specific story.
       *
       * @name ApiClient#stories#delete
       * @param {IStory} storyId - Id of the story to be deleted.
       * @returns {Promise}
       * @fulfil {IStory} Details of the story that was deleted.
       * @reject {AxiosError} Axios error.
       */
      delete: (storyId: number): Promise<IStory> => this.deleteStory(storyId),
      /**
       * Delete all existing stories.
       *
       * @name ApiClient#stories#deleteExisting
       * @returns {Promise}
       * @fulfil {IStory[]} A list of deleted stories details.
       * @reject {AxiosError} Axios error.
       */
      deleteExisting: (): Promise<IStory[]> => this.deleteExistingStories(),
      /**
       * Get a specific story.
       *
       * @name ApiClient#stories#get
       * @param {number} storyId - Id of the content story.
       * @returns {Promise}
       * @fulfil {IStory} Details of content story.
       * @reject {AxiosError} Axios error.
       */
      get: (storyId: number): Promise<IStory> => this.getStory(storyId),
      /**
       * Get paginated stories.
       *
       * @name ApiClient#stories#getByPage
       * @param {number} page - Pagination number.
       * @param {number} [perPage] - (optional) How many stories per page.  Defaults to 25.
       * @returns {Promise}
       * @fulfil {IStory[]} A page of stories.
       * @reject {AxiosError} Axios error.
       */
      getByPage: (page: number, perPage?: number): Promise<IStory[]> =>
        this.getStoriesByPage(page, perPage || 25),
      /**
       * List all existing stories.
       *
       * @name ApiClient#stories#getExisting
       * @returns {Promise}
       * @fulfil {IStory[]} A full list of existing content stories.
       * @reject {AxiosError} Axios error.
       */
      getExisting: (): Promise<IStory[]> => this.getExistingStories(),
      /**
       * Publish a specific story.
       *
       * @name ApiClient#stories#publish
       * @param {number} storyId - Id of the story to publish
       * @returns {Promise}
       * @fulfil {IStory} Details of the published story
       * @reject {AxiosError} Axios error.
       */
      publish: (storyId: number): Promise<IStory> => this.publishStory(storyId),
      /**
       * Publish all unpublished stories.
       *
       * @name ApiClient#stories#publishPendings
       * @returns {Promise}
       * @fulfil {IStory[]} List of published stories.
       * @reject {AxiosError} Axios error.
       */
      publishPendings: (): Promise<IStory[]> => this.publishPendingStories(),
      /**
       * Update a story's sequential order.
       *
       * @name ApiClient#stories#reorder
       * @param {number} storyId - Id of the story to be moved.
       * @param {number} afterId - Reference story to position after.
       * @returns {Promise}
       * @fulfil {IStory} Details of the moved story.
       * @reject {AxiosError} Axios error.
       */
      reorder: (storyId: number, afterId: number): Promise<IStory> =>
        this.reorderStory(storyId, afterId),
      /**
       * Update a story.
       *
       * @name ApiClient#stories#update
       * @param {IStory} story - Storyblok story data object with modified info.
       * @returns {Promise}
       * @fulfil {IStory} Details of story that was updated.
       * @reject {AxiosError} Axios error.
       */
      update: (story: IStory): Promise<IStory> => this.updateStory(story),
    }
  }

  /**
   * Get total number of existing assets.
   *
   * @name ApiClient#countAssets
   * @returns {Promise}
   * @fulfil {number} A count of existing assets.
   * @reject {AxiosError} Axios error.
   */
  private countAssets(): Promise<number> {
    return this.getSpace()
      .then((space: ISpace): number => space.assets_count)
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * Get total number of existing stories (including folders).  Storyblok API's space info does not account 'folders' as stories, so this is manually counted.
   *
   * @name ApiClient#countStories
   * @returns {Promise}
   * @fulfil {number} A count of existing stories.
   * @reject {AxiosError} Axios error.
   */
  private countStories(): Promise<number> {
    return this.getExistingStories()
      .then((stories: IStory[]): number => stories.length)
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * Create an asset folder.
   *
   * @name ApiClient#createAssetFolder
   * @param {string} name - Name of asset folder to create.
   * @returns {Promise}
   * @fulfil {IAssetFolder} Details of the asset folder created.
   * @reject {AxiosError} Axios error.
   */
  private createAssetFolder(name: string): Promise<IAssetFolder> {
    const url = `${this.spaceId}/asset_folders`
    const data = {asset_folder: {name}}
    return this.storyblok
      .post(url, data)
      .then((res: AxiosResponse): IAssetFolder => res.data.asset_folder)
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * Create an image asset at root.
   *
   * This method calls the ApiClient.registerAsset(), resize/compress the image then finally upload the physical file with ApiClient.uploadAsset() at one go.
   *
   * @name ApiClient#createAssetFromImage
   * @param {IAsset} asset - Information to create asset from.
   * @param {string} asset.filename - File name to register with.
   * @param {number} [asset.asset_folder_id] - (optional) Assign a asset folder.
   * @param {number} [asset.id] - (optional) Id of existing asset to replace with this new asset.
   * @param {string} filePath - Absolute file path to the image.
   * @param {boolean} compress - Flag to compress image.
   * @param {number} dimensionLimit - Resizing dimension limit value.
   * @returns {Promise}
   * @fulfil {IAsset} Information of the created asset.
   * @reject {AxiosError} Axios error.
   */
  private createAssetFromImage(
    asset: IAsset,
    filePath: string,
    compress?: boolean,
    dimensionLimit?: number
  ): Promise<IAsset> {
    return Promise.all([
      imageToBuffer(filePath, compress || true, dimensionLimit || 640),
      this.registerAsset(asset),
    ])
      .then(([buffer, registration]) => this.uploadAsset(buffer, registration))
      .catch((error: any) => Promise.reject(error))
  }

  /**
   * Create a component.
   *
   * @name ApiClient#createComponent
   * @param {IComponent} component - Info on component to be created.
   * @returns {Promise}
   * @fulfil {IComponent} Details of the component that was created.
   * @reject {AxiosError} Axios error.
   */
  private createComponent(component: IComponent): Promise<IComponent> {
    const url = `${this.spaceId}/components`
    const data = {component}
    return this.storyblok
      .post(url, data)
      .then((res: AxiosResponse): IComponent => res.data.component)
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * Create a story.
   *
   * @name ApiClient#createStory
   * @param {IStory} story - Storyblok story data object.
   * @returns {Promise}
   * @fulfil {IStory} Details of story that was created.
   * @reject {AxiosError} Axios error.
   */
  private createStory(story: IStory): Promise<IStory> {
    const url = `${this.spaceId}/stories`
    const data = {story}
    return this.storyblok
      .post(url, data)
      .then((res: AxiosResponse): IStory => res.data.story)
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * Delete a specific asset.
   *
   * @name ApiClient#deleteAsset
   * @param {number} id - Id of the asset to be deleted.
   * @returns {Promise}
   * @fulfil {IAsset} Information on the deleted asset.
   * @reject {AxiosError} Axios error.
   */
  private deleteAsset(id: number): Promise<IAsset> {
    const url = `${this.spaceId}/assets/${id}`
    return this.storyblok
      .delete(url)
      .then((res: AxiosResponse): IAsset => res.data.assets)
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * Delete a specific asset folder.
   *
   * @name ApiClient#deleteAssetFolder
   * @param {number} id - Id of asset folder to be deleted.
   * @returns {Promise}
   * @fulfil {void}
   * @reject {AxiosError} Axios error.
   */
  private deleteAssetFolder(id: number): Promise<void> {
    const url = `${this.spaceId}/asset_folders/${id}`
    return this.storyblok
      .delete(url)
      .then(() => Promise.resolve())
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * Delete a specific component.
   *
   * @name ApiClient#deleteComponent
   * @param {number} id - Id of component to be deleted.
   * @returns {Promise}
   * @fulfil {IComponent} Details of the deleted component.
   * @reject {AxiosError} Axios error.
   */
  private deleteComponent(id: number): Promise<IComponent> {
    const url = `${this.spaceId}/components/${id}`
    return this.storyblok
      .delete(url)
      .then((res: AxiosResponse): IComponent => res.data.component)
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * Delete all existing asset folders.
   *
   * @name ApiClient#deleteExistingAssetFolders
   * @returns {Promise}
   * @fulfil {void[]}
   * @reject {AxiosError} Axios error.
   */
  private deleteExistingAssetFolders(): Promise<void[]> {
    type MapFn = (assetFolder: IAssetFolder) => Promise<void>
    const mapFn: MapFn = assetFolder =>
      this.deleteAssetFolder(assetFolder.id as number)
    return this.getExistingAssetFolders()
      .then(assetFolders => Promise.all(assetFolders.map(mapFn)))
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * Delete all existing assets.
   *
   * @name ApiClient#deleteExistingAssets
   * @returns {Promise}
   * @fulfil {IAsset[]} Details of the deleted assets.
   * @reject {AxiosError} Axios error.
   */
  private deleteExistingAssets(): Promise<IAsset[]> {
    type MapFn = (asset: IAsset) => Promise<IAsset>
    const mapFn: MapFn = asset => this.deleteAsset(asset.id as number)
    type RHFn = (assets: IAsset[]) => Promise<IAsset[]>
    const responseHandler: RHFn = assets => Promise.all(assets.map(mapFn))
    return this.getExistingAssets()
      .then(responseHandler)
      .catch(error => Promise.reject(error))
  }

  /**
   * Delete all existing components.
   *
   * @name ApiClient#deleteExistingComponents
   * @returns {Promise}
   * @fulfil {IComponent[]} A list of deleted components details.
   * @reject {AxiosError} Axios error.
   */
  private deleteExistingComponents(): Promise<IComponent[]> {
    type MapFn = (component: IComponent) => Promise<IComponent>
    const mapFn: MapFn = comp => this.deleteComponent(comp.id as number)
    return this.getExistingComponents()
      .then(components => Promise.all(components.map(mapFn)))
      .catch(error => Promise.reject(error))
  }

  /**
   * Delete all existing stories.
   *
   * @name ApiClient#deleteExistingStories
   * @returns {Promise}
   * @fulfil {IStory[]} A list of deleted stories details.
   * @reject {AxiosError} Axios error.
   */
  private deleteExistingStories(): Promise<IStory[]> {
    type FilterFn = (story: IStory) => boolean
    const filterFn: FilterFn = story => (story.parent_id as number) === 0
    type MapFn = (story: IStory) => Promise<IStory>
    const mapFn: MapFn = story => this.deleteStory(story.id as number)
    return this.getExistingStories()
      .then((stories: IStory[]): IStory[] => stories.filter(filterFn))
      .then(rootStories => Promise.all(rootStories.map(mapFn)))
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * Delete a specific story.
   *
   * @name ApiClient#deleteStory
   * @param {number} storyId - Id of the story to be deleted.
   * @returns {Promise}
   * @fulfil {IStory} Details of the story that was deleted.
   * @reject {AxiosError} Axios error.
   */
  private deleteStory(storyId: number): Promise<IStory> {
    const url = `${this.spaceId}/stories/${storyId}`
    return this.storyblok
      .delete(url)
      .then((res: AxiosResponse): IStory => res.data.story)
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * Get a specific asset.
   *
   * @name ApiClient#getAsset
   * @param {number} id - Id of asset to fetch.
   * @returns {Promise}
   * @fulfil {IAsset} Details of the asset.
   * @reject {AxiosError} Axios error.
   */
  private getAsset(id: number): Promise<IAsset> {
    const url = `${this.spaceId}/assets/${id}`
    return this.storyblok
      .get(url)
      .then((res: AxiosResponse): IAsset => res.data)
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * Find a specific asset by its public url.
   *
   * @name ApiClient#getAssetByUrl
   * @param {string} url - Url to match by.
   * @returns {Promise}
   * @fulfil {IAsset | undefined} Matched asset or undefined if not fund.
   * @reject {AxiosError} Axios error.
   */
  private getAssetByUrl(url: string): Promise<IAsset | undefined> {
    type PredicateFn = (a: IAsset) => boolean
    const predicate: PredicateFn = asset => {
      return (asset.filename as string) === (url as string)
    }
    type ResponseHandlerFn = (a: IAsset[]) => IAsset | undefined
    const responseHandler: ResponseHandlerFn = assets => assets.find(predicate)
    return this.getExistingAssets()
      .then(responseHandler)
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * Get a specific asset folder.
   *
   * @name ApiClient#getAssetFolder
   * @param {number} id - Id of the target asset folder.
   * @returns {Promise}
   * @fulfil {IAssetFolder} Asset folder information.
   * @reject {AxiosError} Axios error.
   */
  private getAssetFolder(id: number): Promise<IAssetFolder> {
    const url = `${this.spaceId}/asset_folders/${id}`
    return this.storyblok
      .get(url)
      .then((res: AxiosResponse): IAssetFolder => res.data.asset_folder)
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * Get a list of asset folders by matching asset folders names to the supplied string.
   *
   * @name ApiClient#getAssetFolderByName
   * @param {string} searchString - String to search asset folders by.
   * @returns {Promise}
   * @fulfil {IAssetFolder[]} List of asset folders that matches the name string.
   * @reject {AxiosError} Axios error.
   */
  private getAssetFolderByName(searchString: string): Promise<IAssetFolder[]> {
    const url = `${this.spaceId}/asset_folders?search=${searchString}`
    return this.storyblok
      .get(url)
      .then((res: AxiosResponse): IAssetFolder[] => res.data.asset_folders)
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * Fetch for a specific component.
   *
   * @name ApiClient#getComponent
   * @param {number} id - Component id to fetch by.
   * @returns {Promise}
   * @fulfil {IComponent} Details of the component definition.
   * @reject {AxiosError} Axios error.
   */
  private getComponent(id: number): Promise<IComponent> {
    const url = `${this.spaceId}/components/${id}`
    return this.storyblok
      .get(url)
      .then((res: AxiosResponse): IComponent => res.data.component)
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * Get existing asset folders.
   *
   * @name ApiClient#getExistingAssetFolders
   * @returns {Promise}
   * @fulfil {IAssetFolder[]} List of existing asset folders.
   * @reject {AxiosError} Axios error.
   */
  private getExistingAssetFolders(): Promise<IAssetFolder[]> {
    const url = `${this.spaceId}/asset_folders?search`
    return this.storyblok
      .get(url)
      .then((res: AxiosResponse): IAssetFolder[] => res.data.asset_folders)
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * List all existing assets.
   *
   * @name ApiClient#getExistingAssets
   * @returns {Promise}
   * @fulfil {IAsset[]} A list of existing assets.
   * @reject {AxiosError} Axios error.
   */
  private getExistingAssets(): Promise<IAsset[]> {
    const maxPerPage = 1000
    type CountPageFn = (total: number) => number
    const countPage: CountPageFn = total => Math.ceil(total / maxPerPage)
    return this.countAssets()
      .then(countPage)
      .then(pageCount => {
        const url = `${this.spaceId}/assets`
        type MapFn = (pageIndex: number) => AxiosPromise<any>
        const mapFn: MapFn = pageIndex => {
          const page: number = pageIndex + 1
          const params = {page, per_page: maxPerPage}
          return this.storyblok.get(url, {params})
        }
        const pageIndices = Array.from(Array(pageCount).keys())
        return Promise.all(pageIndices.map(mapFn))
          .then(resArray => resArray.map(res => res.data.assets))
          .then(arrayOfAssets => [].concat(...arrayOfAssets))
          .catch((error: AxiosError) => Promise.reject(error))
      })
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * List all existing components.  It is assumed that the working space has only 1,000 existing components at most.
   *
   * @name ApiClient#getExistingComponents
   * @returns {Promise}
   * @fulfil {IComponent[]} A list of component definitions.
   * @reject {AxiosError} Axios error.
   */
  private getExistingComponents(): Promise<IComponent[]> {
    const url = `${this.spaceId}/components`
    return this.storyblok
      .get(url)
      .then((res: AxiosResponse): IComponent[] => res.data.components)
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * List all existing stories.
   *
   * @name ApiClient#getExistingStories
   * @returns {Promise}
   * @fulfil {IStory[]} A list of existing content stories.
   * @reject {AxiosError} Axios error.
   */
  private async getExistingStories(): Promise<IStory[]> {
    try {
      const maxPerPage: number = 1000
      const pageCount: number = await this.countStoryPages(maxPerPage)
      if (pageCount === 0) {
        return []
      }
      const indicies: number[] = Array.from(Array(pageCount).keys())
      type MapFn = (index: number) => Promise<IStory[]>
      const mapFn: MapFn = index => this.getStoriesByPage(index + 1, maxPerPage)
      const arrayOfStories = await Promise.all(indicies.map(mapFn))
      return [].concat(...(arrayOfStories as any[])) as IStory[]
    } catch (error) {
      throw error
    }
  }

  /**
   * Get information on the working Storyblok space.
   *
   * @name ApiClient#getSpace
   * @returns {Promise}
   * @fulfil {ISpace} Working space information.
   * @reject {AxiosError} Axios error.
   */
  private getSpace(): Promise<ISpace> {
    const url = `/${this.spaceId}`
    return this.storyblok
      .get(url)
      .then((res: AxiosResponse): ISpace => res.data.space)
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * Get paginated stories.
   *
   * @name ApiClient#getStoriesByPage
   * @param {number} page - Pagination number.
   * @param {number} [perPage] - (optional) How many stories per page.
   * @returns {Promise}
   * @fulfil {IStory[]} A page of stories.
   * @reject {AxiosError} Axios error.
   */
  private getStoriesByPage(page: number, perPage?: number): Promise<IStory[]> {
    const url = `${this.spaceId}/stories`
    const query = `?per_page=${perPage}&page=${page}`
    return this.storyblok
      .get(url + query)
      .then((res: AxiosResponse): IStory[] => res.data.stories)
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * Get a specific story.
   *
   * @name ApiClient#getStory
   * @param {number} storyId - Id of the content story.
   * @returns {Promise}
   * @fulfil {IStory} Details of content story.
   * @reject {AxiosError} Axios error.
   */
  private getStory(storyId: number): Promise<IStory> {
    const url = `${this.spaceId}/stories/${storyId}`
    return this.storyblok
      .get(url)
      .then((res: AxiosResponse): IStory => res.data.story)
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * Get total pagination page count.
   *
   * @name ApiClient#countStoryPages
   * @param {number} [perPage] - (optional) How many stories per page.  Defaults to 25.
   * @returns {Promise}
   * @fulfil {number} Total story pagination page count.
   * @reject {AxiosError} Axios error.
   */
  private countStoryPages(perPage?: number): Promise<number> {
    const url = `${this.spaceId}/stories`
    type ResHandler = (res: AxiosResponse) => number
    const resHander: ResHandler = res => {
      const total: number = res.headers.total as number
      return Math.ceil(total / ((perPage as number) || 25))
    }
    return this.storyblok
      .get(url)
      .then(resHander)
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * Publish all unpublished stories.
   *
   * @name ApiClient#publishPendingStories
   * @returns {Promise}
   * @fulfil {IStory[]} List of published stories.
   * @reject {AxiosError} Axios error.
   */
  private publishPendingStories(): Promise<IStory[]> {
    type FilterFn = (stories: IStory[]) => IStory[]
    const filterFn: FilterFn = stories => {
      type Filter = (story: IStory) => boolean
      const filter: Filter = s => !s.is_folder && !s.published
      return stories.filter(filter)
    }
    type PublishFn = (stories: IStory[]) => Promise<IStory[]>
    const publishFn: PublishFn = stories => {
      type MapFn = (story: IStory) => Promise<IStory>
      const mapFn: MapFn = story => this.publishStory(story.id as number)
      return Promise.all(stories.map(mapFn))
    }
    return this.getExistingStories()
      .then(filterFn)
      .then(publishFn)
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * Publish a specific story.
   *
   * @name ApiClient#publishStory
   * @param storyId - Id of the story to publish
   * @returns {Promise}
   * @fulfil {IStory} Details of the published story.
   * @reject {AxiosError} Axios error.
   */
  private publishStory(storyId: number): Promise<IStory> {
    const url = `${this.spaceId}/stories/${storyId}/publish`
    return this.storyblok
      .get(url)
      .then((res: AxiosResponse): IStory => res.data.story)
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * Register an image file as a Storyblok asset (the physical file still has to be uploaded).
   *
   * @name ApiClient#registerAsset
   * @param {IAsset} asset - Information to create asset from.
   * @param {string} asset.filename - File name to register with.
   * @param {number} [asset.asset_folder_id] - (optional) Assign a asset folder.
   * @param {number} [asset.id] - (optional) Id of existing asset to replace with this new asset.
   * @returns {Promise}
   * @fulfil {IAssetSigningResponse} Asset registration info (used for uploading).
   * @reject {AxiosError} Axios error.
   */
  private registerAsset(asset: IAsset): Promise<IAssetSigningResponse> {
    const url = `${this.spaceId}/assets`
    return this.storyblok
      .post(url, asset)
      .then((res: AxiosResponse): IAssetSigningResponse => res.data)
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * Update a story's sequential order.
   *
   * @name ApiClient#reorderStory
   * @param {number} storyId - Id of the story to be moved.
   * @param {number} afterId - Reference story to position after.
   * @returns {Promise}
   * @fulfil {IStory} Details of the moved story.
   * @reject {AxiosError} Axios error.
   */
  private reorderStory(storyId: number, afterId: number): Promise<IStory> {
    const url = `${this.spaceId}/stories/${storyId}/move`
    const query = `?after_id=${afterId}`
    return this.storyblok
      .put(url + query)
      .then((): Promise<IStory> => this.getStory(storyId))
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * Update a story.
   *
   * @name ApiClient#updateStory
   * @param {IStory} story - Storyblok story data object with modified info.
   * @returns {Promise}
   * @fulfil {IStory} Details of story that was updated.
   * @reject {AxiosError} Axios error.
   */
  private updateStory(story: IStory): Promise<IStory> {
    const url = `${this.spaceId}/stories`
    const data = {story}
    return this.storyblok
      .put(url, {data})
      .then((res: AxiosResponse): IStory => res.data.story)
      .catch((error: AxiosError) => Promise.reject(error))
  }

  /**
   * Upload a newly registered asset.
   *
   * @name ApiClient#uploadAsset
   * @param {Buffer} buffer - Buffered asset data.
   * @param {IAssetSigningResponse} registration - Registration info.
   * @returns {Promise}
   * @fulfil {IAsset} Information of the uploaded asset.
   * @reject {AxiosError} Axios error.
   */
  private uploadAsset(
    buffer: Buffer,
    registration: IAssetSigningResponse
  ): Promise<IAsset> {
    const publicUrl = registration.public_url
    const filename: string = publicUrl.split('\\').pop() as string
    const contentType = registration.fields['Content-Type']
    const formData: IAssetSigningResponseFields = registration.fields
    formData.file = {
      options: {filename, contentType},
      value: buffer,
    }
    const requestOptions: rp.Options = {
      formData,
      method: 'post',
      url: registration.post_url,
    }
    type UploadFn = (options: rp.Options) => Promise<any>
    const uploadFn: UploadFn = options =>
      rp(options)
        .then((res: any) => Promise.resolve(res))
        .catch((error: any) => Promise.reject(error))
    return promiseRetry(uploadFn, [requestOptions], 3, 500)
      .then((): Promise<IAsset | undefined> => this.getAssetByUrl(publicUrl))
      .then(
        (asset: IAsset | undefined): Promise<IAsset> => {
          if (!asset) {
            throw new Error('asset upload failure')
          } else {
            return this.getAsset(asset.id as number)
          }
        }
      )
      .catch((error: any) => Promise.reject(error))
  }
}
