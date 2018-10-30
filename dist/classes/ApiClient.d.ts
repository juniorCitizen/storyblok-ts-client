/// <reference types="node" />
import { IAsset, IAssetFolder, IComponent, IPendingAsset, IPendingComponent, IPendingStory, IRegistration, ISpace, IStory } from '../interfaces';
import { ICustomAxiosRequestConfig } from './Storyblok';
export declare const retrySettings: {
    burst: ICustomAxiosRequestConfig;
    extended: ICustomAxiosRequestConfig;
};
interface IApiClientClass {
    assetFolders: {
        create: (n: string) => Promise<IAssetFolder>;
        delete: (i: number) => Promise<void>;
        deleteExisting: () => Promise<void[]>;
        get: (i: number) => Promise<IAssetFolder>;
        getByName: (s: string) => Promise<IAssetFolder[]>;
        getExisting: () => Promise<IAssetFolder[]>;
    };
    assets: {
        count: () => Promise<number>;
        createFromImage: (d: IPendingAsset, f: string, c?: boolean, s?: number) => Promise<IAsset>;
        delete: (i: number) => Promise<IAsset>;
        deleteExisting: () => Promise<IAsset[]>;
        get: (i: number) => Promise<IAsset>;
        getByPage: (p?: number, pp?: number) => Promise<IAsset[]>;
        getByUrl: (u: string) => Promise<IAsset>;
        getExisting: () => Promise<IAsset[]>;
        register: (d: IPendingAsset) => Promise<IRegistration>;
        upload: (b: Buffer, r: IRegistration) => Promise<string>;
    };
    components: {
        create: (d: IPendingComponent) => Promise<IComponent>;
        delete: (i: number) => Promise<IComponent>;
        deleteExisting: () => Promise<IComponent[]>;
        get: (i: number) => Promise<IComponent>;
        getExisting: () => Promise<IComponent[]>;
    };
    spaces: {
        get: () => Promise<ISpace>;
    };
    stories: {
        count: () => Promise<number>;
        countPages: (p: number) => Promise<number>;
        create: (d: IPendingStory) => Promise<IStory>;
        delete: (i: number) => Promise<IStory>;
        deleteExisting: () => Promise<IStory[]>;
        get: (i: number) => Promise<IStory>;
        getByPage: (p?: number, pp?: number) => Promise<IStory[]>;
        getExisting: () => Promise<IStory[]>;
        publish: (i: number) => Promise<IStory>;
        publishPendings: () => Promise<IStory[]>;
        reorder: (i: number, ai: number) => Promise<IStory>;
        update: (d: IStory) => Promise<IStory>;
    };
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
export declare class ApiClient implements IApiClientClass {
    private spaceId;
    private storyblok;
    constructor(apiToken: string, spaceId: number);
    /**
     * Object that contains API methods for asset folder operations
     *
     * @readonly
     * @name ApiClient#assetFolders
     * @memberof ApiClient
     */
    readonly assetFolders: {
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
        create: (name: string) => Promise<IAssetFolder>;
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
        delete: (id: number) => Promise<void>;
        /**
         * Delete all existing asset folders.
         *
         * @name ApiClient#assetFolders#deleteExisting
         * @returns {Promise}
         * @fulfil {void[]}
         * @reject {AxiosError} Axios error.
         * @memberof ApiClient#assetFolders
         */
        deleteExisting: () => Promise<void[]>;
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
        get: (id: number) => Promise<IAssetFolder>;
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
        getByName: (searchString: string) => Promise<IAssetFolder[]>;
        /**
         * Get existing asset folders.
         *
         * @name ApiClient#assetFolders#getExisting
         * @returns {Promise}
         * @fulfil {IAssetFolder[]} List of existing asset folders.
         * @reject {AxiosError} Axios error.
         * @memberof ApiClient#assetFolders
         */
        getExisting: () => Promise<IAssetFolder[]>;
    };
    /**
     * Object that contains API methods for asset operations
     *
     * @readonly
     * @name ApiClient#assets
     * @memberof ApiClient
     */
    readonly assets: {
        /**
         * Get total number of existing assets.
         *
         * @name ApiClient#assets#count
         * @returns {Promise}
         * @fulfil {number} A count of existing assets.
         * @reject {AxiosError} Axios error.
         * @memberof ApiClient#assets
         */
        count: () => Promise<number>;
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
        createFromImage: (data: IPendingAsset, filePath: string, compress?: boolean | undefined, sizeLimit?: number | undefined) => Promise<IAsset>;
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
        delete: (id: number) => Promise<IAsset>;
        /**
         * Delete all existing assets.
         *
         * @name ApiClient#assets#deleteExisting
         * @returns {Promise}
         * @fulfil {IAsset[]} Information on the deleted assets.
         * @reject {AxiosError} Axios error.
         * @memberof ApiClient#assets
         */
        deleteExisting: () => Promise<IAsset[]>;
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
        get: (id: number) => Promise<IAsset>;
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
        getByPage: (page?: number | undefined, perPage?: number | undefined) => Promise<IAsset[]>;
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
        getByUrl: (url: string) => Promise<IAsset>;
        /**
         * List all existing assets.
         *
         * @name ApiClient#assets#getExisting
         * @returns {Promise}
         * @fulfil {IAsset[]} A list of existing assets.
         * @reject {AxiosError} Axios error.
         * @memberof ApiClient#assets
         */
        getExisting: () => Promise<IAsset[]>;
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
        register: (data: IPendingAsset) => Promise<IRegistration>;
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
        upload: (buffer: Buffer, registration: IRegistration) => Promise<string>;
    };
    /**
     * Object that contains API methods for component operations
     *
     * @name ApiClient#components
     * @readonly
     * @memberof ApiClient
     */
    readonly components: {
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
        create: (data: IPendingComponent) => Promise<IComponent>;
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
        delete: (id: number) => Promise<IComponent>;
        /**
         * Delete existing components.
         *
         * @name ApiClient#components#deleteExisting
         * @returns {Promise}
         * @fulfil {IComponent[]} A list of deleted components details.
         * @reject {AxiosError} Axios error.
         * @memberof ApiClient#components
         */
        deleteExisting: () => Promise<IComponent[]>;
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
        get: (id: number) => Promise<IComponent>;
        /**
         * List existing components.
         *
         * @name ApiClient#components#getExisting
         * @returns {Promise}
         * @fulfil {IComponent[]} A list of component definitions.
         * @reject {AxiosError} Axios error.
         * @memberof ApiClient#components
         */
        getExisting: () => Promise<IComponent[]>;
    };
    /**
     * Object that contains API methods for space operations
     *
     * @name ApiClient#spaces
     * @readonly
     * @memberof ApiClient
     */
    readonly spaces: {
        /**
         * Get information on the working Storyblok space.
         *
         * @name ApiClient#spaces#get
         * @returns {Promise}
         * @fulfil {ISpace} Working space information.
         * @reject {AxiosError} Axios error.
         * @memberof ApiClient#spaces
         */
        get: () => Promise<ISpace>;
    };
    /**
     * Object that contains API methods for story operations
     *
     * @name ApiClient#stories
     * @readonly
     * @memberof ApiClient
     */
    readonly stories: {
        /**
         * Get total number of existing stories (including folders).
         *
         * @name ApiClient#stories#count
         * @returns {Promise}
         * @fulfil {number} A count of existing stories.
         * @reject {AxiosError} Axios error.
         * @memberof ApiClient#stories
         */
        count: () => Promise<number>;
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
        countPages: (perPage?: number) => Promise<number>;
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
        create: (data: IPendingStory) => Promise<IStory>;
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
        delete: (id: number) => Promise<IStory>;
        /**
         * Delete all existing stories.
         *
         * @name ApiClient#stories#deleteExisting
         * @returns {Promise}
         * @fulfil {IStory[]} A list of deleted stories details.
         * @reject {AxiosError} Axios error.
         * @memberof ApiClient#stories
         */
        deleteExisting: () => Promise<IStory[]>;
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
        get: (id: number) => Promise<IStory>;
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
        getByPage: (page?: number | undefined, perPage?: number | undefined) => Promise<IStory[]>;
        /**
         * List all existing stories.
         *
         * @name ApiClient#stories#getExisting
         * @returns {Promise}
         * @fulfil {IStory[]} A list of existing content stories.
         * @reject {AxiosError} Axios error.
         * @memberof ApiClient#stories
         */
        getExisting: () => Promise<IStory[]>;
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
        publish: (id: number) => Promise<IStory>;
        /**
         * Publish all unpublished stories.
         *
         * @name ApiClient#stories#publishPendings
         * @returns {Promise}
         * @fulfil {IStory[]} List of published stories.
         * @reject {AxiosError} Axios error.
         * @memberof ApiClient#stories
         */
        publishPendings: () => Promise<IStory[]>;
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
        reorder: (id: number, afterId: number) => Promise<IStory>;
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
        update: (data: IStory) => Promise<IStory>;
    };
    /**
     * Get total number of existing assets.
     *
     * @name ApiClient#countAssets
     * @returns {Promise}
     * @fulfil {number} A count of existing assets.
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    countAssets(): Promise<number>;
    /**
     * Get total number of existing stories (including folders).
     *
     * @name ApiClient#countStories
     * @returns {Promise}
     * @fulfil {number} A count of existing stories.
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    countStories(): Promise<number>;
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
    countStoryPages(perPage?: number): Promise<number>;
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
    createAssetFolder(name: string): Promise<IAssetFolder>;
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
    createAssetFromImage(data: IPendingAsset, filePath: string, compress?: boolean, sizeLimit?: number): Promise<IAsset>;
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
    createComponent(data: IPendingComponent): Promise<IComponent>;
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
    createStory(data: IPendingStory): Promise<IStory>;
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
    deleteAsset(id: number): Promise<IAsset>;
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
    deleteAssetFolder(id: number): Promise<void>;
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
    deleteComponent(id: number): Promise<IComponent>;
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
    deleteStory(id: number): Promise<IStory>;
    /**
     * Delete all existing asset folders.
     *
     * @name ApiClient#deleteExistingAssetFolders
     * @returns {Promise}
     * @fulfil {void[]}
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    deleteExistingAssetFolders(): Promise<void[]>;
    /**
     * Delete all existing assets.
     *
     * @name ApiClient#deleteExistingAssets
     * @returns {Promise}
     * @fulfil {IAsset[]} Information on the deleted assets.
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    deleteExistingAssets(): Promise<IAsset[]>;
    /**
     * Delete existing components.
     *
     * @name ApiClient#deleteExistingComponents
     * @returns {Promise}
     * @fulfil {IComponent[]} A list of deleted components details.
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    deleteExistingComponents(): Promise<IComponent[]>;
    /**
     * Delete all existing stories.
     *
     * @name ApiClient#deleteExistingStories
     * @returns {Promise}
     * @fulfil {IStory[]} A list of deleted stories details.
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    deleteExistingStories(): Promise<IStory[]>;
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
    getAsset(id: number): Promise<IAsset>;
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
    getAssetByUrl(url: string): Promise<IAsset>;
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
    getAssetFolder(id: number): Promise<IAssetFolder>;
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
    getAssetFolderByName(searchString: string): Promise<IAssetFolder[]>;
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
    getAssetsByPage(page?: number, perPage?: number): Promise<IAsset[]>;
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
    getComponent(id: number): Promise<IComponent>;
    /**
     * List all existing assets.
     *
     * @name ApiClient#getExistingAssets
     * @returns {Promise}
     * @fulfil {IAsset[]} A list of existing assets.
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    getExistingAssets(): Promise<IAsset[]>;
    /**
     * List existing components.
     *
     * @name ApiClient#getExistingComponents
     * @returns {Promise}
     * @fulfil {IComponent[]} A list of component definitions.
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    getExistingComponents(): Promise<IComponent[]>;
    /**
     * Get existing asset folders.
     *
     * @name ApiClient#getExistingAssetFolders
     * @returns {Promise}
     * @fulfil {IAssetFolder[]} List of existing asset folders.
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    getExistingAssetFolders(): Promise<IAssetFolder[]>;
    /**
     * List all existing stories.
     *
     * @name ApiClient#getExistingStories
     * @returns {Promise}
     * @fulfil {IStory[]} A list of existing content stories.
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    getExistingStories(): Promise<IStory[]>;
    /**
     * Get information on the working Storyblok space.
     *
     * @name ApiClient#getSpace
     * @returns {Promise}
     * @fulfil {ISpace} Working space information.
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    getSpace(): Promise<ISpace>;
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
    getStoriesByPage(page?: number, perPage?: number): Promise<IStory[]>;
    getStory(id: number): Promise<IStory>;
    /**
     * Publish all unpublished stories.
     *
     * @name ApiClient#stories#publishPendings
     * @returns {Promise}
     * @fulfil {IStory[]} List of published stories.
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    publishPendingStories(): Promise<IStory[]>;
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
    publishStory(id: number): Promise<IStory>;
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
    registerAsset(data: IPendingAsset): Promise<IRegistration>;
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
    reorderStory(id: number, afterId: number): Promise<IStory>;
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
    updateStory(data: IStory): Promise<IStory>;
    /**
     * Upload a registered asset with failure-retry (3 retries and 500ms incremental delay period).
     *
     * @name ApiClient#uploadAsset
     * @param {Buffer} buffer - Buffered asset data.
     * @param {IRegistration} registration - Registration info.
     * @returns {Promise}
     * @fulfil {string} Access url of the uploaded asset.
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    uploadAsset(buffer: Buffer, registration: IRegistration): Promise<string>;
}
export {};
//# sourceMappingURL=ApiClient.d.ts.map