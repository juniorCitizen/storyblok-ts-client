/**
 * @module ApiClient
 */
/// <reference types="node" />
import { IAsset, IAssetFolder, IAssetSigningResponse, IComponent, ISpace, IStory } from '../interfaces';
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
export declare class ApiClient {
    /**
     * Storyblok working space id.
     *
     * @name Storyblok#spaceId
     * @type number
     */
    private spaceId;
    /**
     * Storyblok class instance
     *
     * @name Storyblok#storyblok
     * @type Storyblok
     */
    private storyblok;
    /**
     * Class instantiation.
     *
     * @param {string} apiToken - API access token.
     * @param {number} spaceId - Storyblok working space id.
     */
    constructor(apiToken: string, spaceId: number);
    /**
     * Provides API methods for asset folders.
     *
     * @name ApiClient#assetFolders
     * @returns {Object}
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
         */
        delete: (id: number) => Promise<void>;
        /**
         * Delete all existing asset folders.
         *
         * @name ApiClient#assetFolders#deleteExisting
         * @returns {Promise}
         * @fulfil {void[]}
         * @reject {AxiosError} Axios error.
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
         */
        get: (id: number) => Promise<IAssetFolder>;
        /**
         * Get a list of asset folders by matching asset folders names to the supplied string.
         *
         * @name ApiClient#assetFolders#getByName
         * @param {string} name - String to search asset folders by.
         * @returns {Promise}
         * @fulfil {IAssetFolder[]} List of asset folders that matches the name string.
         * @reject {AxiosError} Axios error.
         */
        getByName: (searchString: string) => Promise<IAssetFolder[]>;
        /**
         * Get existing asset folders.
         *
         * @name ApiClient#assetFolders#getExisting
         * @returns {Promise}
         * @fulfil {IAssetFolder[]} List of existing asset folders.
         * @reject {AxiosError} Axios error.
         */
        getExisting: () => Promise<IAssetFolder[]>;
    };
    /**
     * Provides API methods for assets.
     *
     * @name ApiClient#assets
     * @returns {Object} Asset API methods.
     */
    readonly assets: {
        /**
         * Get total number of existing assets.
         *
         * @name ApiClient#assets#count
         * @returns {Promise}
         * @fulfil {number} A count of existing assets.
         * @reject {AxiosError} Axios error.
         */
        count: () => Promise<number>;
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
        createFromImage: (asset: IAsset, filePath: string, compress?: boolean | undefined, dimensionLimit?: number | undefined) => Promise<IAsset>;
        /**
         * Delete a specific asset.
         *
         * @name ApiClient#assets#delete
         * @param {number} id - Id of the asset to be deleted.
         * @returns {Promise}
         * @fulfil {IAsset} Information of the deleted asset.
         * @reject {AxiosError} Axios error.
         */
        delete: (id: number) => Promise<IAsset>;
        /**
         * Delete all existing assets.
         *
         * @name ApiClient#assets#deleteExisting
         * @returns {Promise}
         * @fulfil {IAsset[]} Information on the deleted assets.
         * @reject {AxiosError} Axios error.
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
         */
        get: (id: number) => Promise<IAsset>;
        /**
         * Find a specific asset by its public url.
         *
         * @name ApiClient#assets#getByUrl
         * @param {string} url - Url to match by.
         * @returns {Promise}
         * @fulfil {IAsset | undefined} Matched asset or undefined if not fund.
         * @reject {AxiosError} Axios error.
         */
        getByUrl: (url: string) => Promise<IAsset | undefined>;
        /**
         * List all existing assets.
         *
         * @name ApiClient#assets#getExisting
         * @returns {Promise}
         * @fulfil {IAsset[]} A list of existing assets.
         * @reject {AxiosError} Axios error.
         */
        getExisting: () => Promise<IAsset[]>;
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
        register: (asset: IAsset) => Promise<IAssetSigningResponse>;
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
        upload: (buffer: Buffer, registration: IAssetSigningResponse) => Promise<IAsset>;
    };
    /**
     * Provides API methods for components.
     *
     * @name ApiClient#components
     * @returns {Object} Component API methods.
     */
    readonly components: {
        /**
         * Create a component.
         *
         * @name ApiClient#components#create
         * @param {IComponent} component - Info on component to be created.
         * @returns {Promise}
         * @fulfil {IComponent} Details of the component that was created.
         * @reject {AxiosError} Axios error.
         */
        create: (component: IComponent) => Promise<IComponent>;
        /**
         * Delete a specific component.
         *
         * @name ApiClient#components#delete
         * @param {number} id - Id of component to be deleted.
         * @returns {Promise}
         * @fulfil {IComponent} Details of the deleted component.
         * @reject {AxiosError} Axios error.
         */
        delete: (id: number) => Promise<IComponent>;
        /**
         * Delete all existing components.
         *
         * @name ApiClient#components#deleteExistingAssetFolders
         * @returns {Promise}
         * @fulfil {IComponent[]} A list of deleted components details.
         * @reject {AxiosError} Axios error.
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
         */
        get: (id: number) => Promise<IComponent>;
        /**
         * List all existing components.
         *
         * @name ApiClient#components#getExisting
         * @returns {Promise}
         * @fulfil {IComponent[]} A list of component definitions.
         * @reject {AxiosError} Axios error.
         */
        getExisting: () => Promise<IComponent[]>;
    };
    /**
     * Provides API methods for the working space.
     *
     * @name ApiClient#spaces
     * @returns {Object} Working space API methods.
     */
    readonly spaces: {
        /**
         * Get information on the working Storyblok space.
         *
         * @name ApiClient#spaces#get
         * @returns {Promise}
         * @fulfil {ISpace} Working space information.
         * @reject {AxiosError} Axios error.
         */
        get: () => Promise<ISpace>;
    };
    /**
     * Provides API methods for stories.
     *
     * @name ApiClient#stories
     * @returns {Object} Story API methods.
     */
    readonly stories: {
        /**
         * Get total number of existing stories (including folders).
         *
         * @name ApiClient#stories#count
         * @returns {Promise}
         * @fulfil {number} A count of existing stories.
         * @reject {AxiosError} Axios error.
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
         */
        countPages: (perPage?: number | undefined) => Promise<number>;
        /**
         * Create a story.
         *
         * @name ApiClient#stories#create
         * @param {IStory} story - Storyblok story data object.
         * @returns {Promise}
         * @fulfil {IStory} Details of story that was created.
         * @reject {AxiosError} Axios error.
         */
        create: (story: IStory) => Promise<IStory>;
        /**
         * Delete a specific story.
         *
         * @name ApiClient#stories#delete
         * @param {IStory} storyId - Id of the story to be deleted.
         * @returns {Promise}
         * @fulfil {IStory} Details of the story that was deleted.
         * @reject {AxiosError} Axios error.
         */
        delete: (storyId: number) => Promise<IStory>;
        /**
         * Delete all existing stories.
         *
         * @name ApiClient#stories#deleteExisting
         * @returns {Promise}
         * @fulfil {IStory[]} A list of deleted stories details.
         * @reject {AxiosError} Axios error.
         */
        deleteExisting: () => Promise<IStory[]>;
        /**
         * Get a specific story.
         *
         * @name ApiClient#stories#get
         * @param {number} storyId - Id of the content story.
         * @returns {Promise}
         * @fulfil {IStory} Details of content story.
         * @reject {AxiosError} Axios error.
         */
        get: (storyId: number) => Promise<IStory>;
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
        getByPage: (page: number, perPage?: number | undefined) => Promise<IStory[]>;
        /**
         * List all existing stories.
         *
         * @name ApiClient#stories#getExisting
         * @returns {Promise}
         * @fulfil {IStory[]} A full list of existing content stories.
         * @reject {AxiosError} Axios error.
         */
        getExisting: () => Promise<IStory[]>;
        /**
         * Publish a specific story.
         *
         * @name ApiClient#stories#publish
         * @param {number} storyId - Id of the story to publish
         * @returns {Promise}
         * @fulfil {IStory} Details of the published story
         * @reject {AxiosError} Axios error.
         */
        publish: (storyId: number) => Promise<IStory>;
        /**
         * Publish all unpublished stories.
         *
         * @name ApiClient#stories#publishPendings
         * @returns {Promise}
         * @fulfil {IStory[]} List of published stories.
         * @reject {AxiosError} Axios error.
         */
        publishPendings: () => Promise<IStory[]>;
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
        reorder: (storyId: number, afterId: number) => Promise<IStory>;
        /**
         * Update a story.
         *
         * @name ApiClient#stories#update
         * @param {IStory} story - Storyblok story data object with modified info.
         * @returns {Promise}
         * @fulfil {IStory} Details of story that was updated.
         * @reject {AxiosError} Axios error.
         */
        update: (story: IStory) => Promise<IStory>;
    };
    /**
     * Get total number of existing assets.
     *
     * @name ApiClient#countAssets
     * @returns {Promise}
     * @fulfil {number} A count of existing assets.
     * @reject {AxiosError} Axios error.
     */
    private countAssets;
    /**
     * Get total number of existing stories (including folders).  Storyblok API's space info does not account 'folders' as stories, so this is manually counted.
     *
     * @name ApiClient#countStories
     * @returns {Promise}
     * @fulfil {number} A count of existing stories.
     * @reject {AxiosError} Axios error.
     */
    private countStories;
    /**
     * Create an asset folder.
     *
     * @name ApiClient#createAssetFolder
     * @param {string} name - Name of asset folder to create.
     * @returns {Promise}
     * @fulfil {IAssetFolder} Details of the asset folder created.
     * @reject {AxiosError} Axios error.
     */
    private createAssetFolder;
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
    private createAssetFromImage;
    /**
     * Create a component.
     *
     * @name ApiClient#createComponent
     * @param {IComponent} component - Info on component to be created.
     * @returns {Promise}
     * @fulfil {IComponent} Details of the component that was created.
     * @reject {AxiosError} Axios error.
     */
    private createComponent;
    /**
     * Create a story.
     *
     * @name ApiClient#createStory
     * @param {IStory} story - Storyblok story data object.
     * @returns {Promise}
     * @fulfil {IStory} Details of story that was created.
     * @reject {AxiosError} Axios error.
     */
    private createStory;
    /**
     * Delete a specific asset.
     *
     * @name ApiClient#deleteAsset
     * @param {number} id - Id of the asset to be deleted.
     * @returns {Promise}
     * @fulfil {IAsset} Information on the deleted asset.
     * @reject {AxiosError} Axios error.
     */
    private deleteAsset;
    /**
     * Delete a specific asset folder.
     *
     * @name ApiClient#deleteAssetFolder
     * @param {number} id - Id of asset folder to be deleted.
     * @returns {Promise}
     * @fulfil {void}
     * @reject {AxiosError} Axios error.
     */
    private deleteAssetFolder;
    /**
     * Delete a specific component.
     *
     * @name ApiClient#deleteComponent
     * @param {number} id - Id of component to be deleted.
     * @returns {Promise}
     * @fulfil {IComponent} Details of the deleted component.
     * @reject {AxiosError} Axios error.
     */
    private deleteComponent;
    /**
     * Delete all existing asset folders.
     *
     * @name ApiClient#deleteExistingAssetFolders
     * @returns {Promise}
     * @fulfil {void[]}
     * @reject {AxiosError} Axios error.
     */
    private deleteExistingAssetFolders;
    /**
     * Delete all existing assets.
     *
     * @name ApiClient#deleteExistingAssets
     * @returns {Promise}
     * @fulfil {IAsset[]} Details of the deleted assets.
     * @reject {AxiosError} Axios error.
     */
    private deleteExistingAssets;
    /**
     * Delete all existing components.
     *
     * @name ApiClient#deleteExistingComponents
     * @returns {Promise}
     * @fulfil {IComponent[]} A list of deleted components details.
     * @reject {AxiosError} Axios error.
     */
    private deleteExistingComponents;
    /**
     * Delete all existing stories.
     *
     * @name ApiClient#deleteExistingStories
     * @returns {Promise}
     * @fulfil {IStory[]} A list of deleted stories details.
     * @reject {AxiosError} Axios error.
     */
    private deleteExistingStories;
    /**
     * Delete a specific story.
     *
     * @name ApiClient#deleteStory
     * @param {number} storyId - Id of the story to be deleted.
     * @returns {Promise}
     * @fulfil {IStory} Details of the story that was deleted.
     * @reject {AxiosError} Axios error.
     */
    private deleteStory;
    /**
     * Get a specific asset.
     *
     * @name ApiClient#getAsset
     * @param {number} id - Id of asset to fetch.
     * @returns {Promise}
     * @fulfil {IAsset} Details of the asset.
     * @reject {AxiosError} Axios error.
     */
    private getAsset;
    /**
     * Find a specific asset by its public url.
     *
     * @name ApiClient#getAssetByUrl
     * @param {string} url - Url to match by.
     * @returns {Promise}
     * @fulfil {IAsset | undefined} Matched asset or undefined if not fund.
     * @reject {AxiosError} Axios error.
     */
    private getAssetByUrl;
    /**
     * Get a specific asset folder.
     *
     * @name ApiClient#getAssetFolder
     * @param {number} id - Id of the target asset folder.
     * @returns {Promise}
     * @fulfil {IAssetFolder} Asset folder information.
     * @reject {AxiosError} Axios error.
     */
    private getAssetFolder;
    /**
     * Get a list of asset folders by matching asset folders names to the supplied string.
     *
     * @name ApiClient#getAssetFolderByName
     * @param {string} searchString - String to search asset folders by.
     * @returns {Promise}
     * @fulfil {IAssetFolder[]} List of asset folders that matches the name string.
     * @reject {AxiosError} Axios error.
     */
    private getAssetFolderByName;
    /**
     * Fetch for a specific component.
     *
     * @name ApiClient#getComponent
     * @param {number} id - Component id to fetch by.
     * @returns {Promise}
     * @fulfil {IComponent} Details of the component definition.
     * @reject {AxiosError} Axios error.
     */
    private getComponent;
    /**
     * Get existing asset folders.
     *
     * @name ApiClient#getExistingAssetFolders
     * @returns {Promise}
     * @fulfil {IAssetFolder[]} List of existing asset folders.
     * @reject {AxiosError} Axios error.
     */
    private getExistingAssetFolders;
    /**
     * List all existing assets.
     *
     * @name ApiClient#getExistingAssets
     * @returns {Promise}
     * @fulfil {IAsset[]} A list of existing assets.
     * @reject {AxiosError} Axios error.
     */
    private getExistingAssets;
    /**
     * List all existing components.  It is assumed that the working space has only 1,000 existing components at most.
     *
     * @name ApiClient#getExistingComponents
     * @returns {Promise}
     * @fulfil {IComponent[]} A list of component definitions.
     * @reject {AxiosError} Axios error.
     */
    private getExistingComponents;
    /**
     * List all existing stories.
     *
     * @name ApiClient#getExistingStories
     * @returns {Promise}
     * @fulfil {IStory[]} A list of existing content stories.
     * @reject {AxiosError} Axios error.
     */
    private getExistingStories;
    /**
     * Get information on the working Storyblok space.
     *
     * @name ApiClient#getSpace
     * @returns {Promise}
     * @fulfil {ISpace} Working space information.
     * @reject {AxiosError} Axios error.
     */
    private getSpace;
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
    private getStoriesByPage;
    /**
     * Get a specific story.
     *
     * @name ApiClient#getStory
     * @param {number} storyId - Id of the content story.
     * @returns {Promise}
     * @fulfil {IStory} Details of content story.
     * @reject {AxiosError} Axios error.
     */
    private getStory;
    /**
     * Get total pagination page count.
     *
     * @name ApiClient#countStoryPages
     * @param {number} [perPage] - (optional) How many stories per page.  Defaults to 25.
     * @returns {Promise}
     * @fulfil {number} Total story pagination page count.
     * @reject {AxiosError} Axios error.
     */
    private countStoryPages;
    /**
     * Publish all unpublished stories.
     *
     * @name ApiClient#publishPendingStories
     * @returns {Promise}
     * @fulfil {IStory[]} List of published stories.
     * @reject {AxiosError} Axios error.
     */
    private publishPendingStories;
    /**
     * Publish a specific story.
     *
     * @name ApiClient#publishStory
     * @param storyId - Id of the story to publish
     * @returns {Promise}
     * @fulfil {IStory} Details of the published story.
     * @reject {AxiosError} Axios error.
     */
    private publishStory;
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
    private registerAsset;
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
    private reorderStory;
    /**
     * Update a story.
     *
     * @name ApiClient#updateStory
     * @param {IStory} story - Storyblok story data object with modified info.
     * @returns {Promise}
     * @fulfil {IStory} Details of story that was updated.
     * @reject {AxiosError} Axios error.
     */
    private updateStory;
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
    private uploadAsset;
}
//# sourceMappingURL=ApiClient.d.ts.map