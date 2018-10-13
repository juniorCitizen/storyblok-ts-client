import {IAssetFolder} from './assetFolders/interfaces'
import {IAsset, IAssetSigningResponse} from './assets/interfaces'
import {IComponent} from './components/interfaces'
import {ISpace} from './spaces/interfaces'
import {IStory} from './stories/interfaces'

export * from './assetFolders/interfaces'
export * from './assets/interfaces'
export * from './components/interfaces'
export * from './spaces/interfaces'
export * from './stories/interfaces'

export interface ICredentials {
  spaceId: number | undefined
  apiToken: string | undefined
}

export interface IApiClient {
  assetFolders: {
    /**
     * create an asset folder
     *
     * @param name - name of asset folder to create
     * @returns details of the asset folder created
     */
    create: (name: string) => Promise<IAssetFolder>
    /**
     * delete a specific asset folder
     *
     * @param id - id of asset folder to be deleted
     */
    delete: (id: number | undefined) => void
    /**
     * delete all existing asset folders
     */
    deleteExisting: () => void
    /**
     * get a specific asset folder
     *
     * @param id - asset folder id to get
     * @returns asset folder information
     */
    get: (id: number | undefined) => Promise<IAssetFolder>
    /**
     * get existing asset folders
     *
     * @returns list of existing asset folders
     */
    getExisting: () => Promise<IAssetFolder[]>
    /**
     * search asset folders by matching asset folder names to the supplied string
     *
     * @param name - string to search asset folders by
     * @returns list of asset folders that matches the name string
     */
    searchByName: (name: string) => Promise<IAssetFolder[]>
  }

  assets: {
    /**
     * get total number of existing assets
     *
     * @returns a count of existing assets
     */
    count: () => Promise<number>
    /**
     * create an asset from image.  This method calls the assets.register(), resize/compress the image then finally upload the physical file with assets.upload() at one go
     *
     * @param filePath - absolute file path to the image
     * @param compress - flag to compress image
     * @param dimensionLimit - resizing dimension limit value
     * @returns information of the created asset
     */
    createFromImage: (
      asset: IAsset | undefined,
      filePath: string,
      compress?: boolean,
      dimensionLimit?: number
    ) => Promise<IAsset | undefined>
    /**
     * delete a specific asset
     *
     * @param id - id of the asset to be deleted
     * @return information on the deleted asset
     */
    delete: (id: number | undefined) => Promise<IAsset | void>
    /**
     * delete all existing assets
     *
     * @return information on the deleted assets
     */
    deleteExisting: () => Promise<Array<IAsset | void>>
    /**
     * get a specific asset
     *
     * @param id - id of asset to fetch for
     * @returns details of the asset found
     */
    get: (id: number | undefined) => Promise<IAsset | undefined>
    /**
     * list all existing assets
     *
     * @returns full list of existing assets
     */
    getExisting: () => Promise<IAsset[]>
    /**
     * register a file as a Storyblok asset (the physical file still has to be uploaded AWS S3 bucket)
     *
     * @param asset - information to create asset from
     * @param asset.filename - file name to register for
     * @param [asset.asset_folder_id] - information to create asset from
     * @param [asset.id] - 	if the id of the asset is provided it will be replaced by this
     * @returns asset signing result info
     */
    register: (asset: IAsset) => Promise<IAssetSigningResponse>
    /**
     * find a specific asset by access url
     *
     * @param publicUrl - url to match by
     * @returns matched asset
     */
    searchByUrl: (publicUrl: string) => Promise<IAsset | undefined>
    /**
     * upload an asset after it is registered as a Storyblok asset
     *
     * @param buffer - buffered asset
     * @param registration - asset registration info
     * @returns information of the uploaded asset
     */
    upload: (
      buffer: Buffer,
      signedResponse: IAssetSigningResponse
    ) => Promise<IAsset | undefined>
  }

  components: {
    /**
     * create a component
     *
     * @param component - info on component to be created
     * @returns details of the component that was created
     */
    create: (component: IComponent) => Promise<IComponent>
    /**
     * delete a specific component
     *
     * @param id - id of component to be deleted
     * @returns details of the deleted component
     */
    delete: (id: number | undefined) => Promise<IComponent>
    /**
     * delete all existing components
     *
     * @returns a list of deleted components details
     */
    deleteExisting: () => Promise<IComponent[]>
    /**
     * list all existing components (it is assumed that the working space has only 1,000 existing components at most)
     *
     * @returns List of component definitions
     */
    getExisting: () => Promise<IComponent[]>
  }

  spaces: {
    /**
     * get working space information
     *
     * @returns space information
     */
    get: () => Promise<ISpace>
  }

  stories: {
    /**
     * get total number of existing stories (including folders)
     *
     * Storyblok API's space info does not account 'folders' as stories, and must be manually retrieved
     *
     * @returns a count of existing stories
     */
    count: () => Promise<number>
    /**
     * create a story
     *
     * @param story - Storyblok story data object
     * @returns details of story that was created
     */
    create: (story: IStory) => Promise<IStory>
    /**
     * delete a specific story
     *
     * @param storyId - id of the story to be deleted
     * @returns details of the story that was removed
     */
    delete: (storyId: number | undefined) => Promise<IStory>
    /**
     * delete all existing stories
     *
     * @returns a list of details of deleted stories
     */
    deleteExisting: () => Promise<IStory[]>
    /**
     * get a specific story
     *
     * @param storyId - id of the content story
     * @returns details of content story
     */
    get: (storyId: number | undefined) => Promise<IStory>
    /**
     * list all existing stories
     *
     * @returns full list of existing content stories
     */
    getExisting: () => Promise<IStory[]>
    /**
     * publish a specific story
     *
     * @param storyId - story id
     * @returns published story
     */
    publish: (storyId: number | undefined) => Promise<IStory>
    /**
     * publish all unpublished stories
     *
     * @returns list of published stories
     */
    publishPendings: () => Promise<IStory[]>
    /**
     * modify a story's sequential order
     *
     * @param storyId - id of the story to be moved
     * @param afterId - to be positioned after story of this id
     * @returns details of the moved story
     */
    reorder: (
      storyId: number | undefined,
      afterId: number | undefined
    ) => Promise<IStory>
  }
}
