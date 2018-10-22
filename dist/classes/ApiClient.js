"use strict";
/**
 * @module ApiClient
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var rp = require("request-promise-native");
var utilities_1 = require("../utilities");
var Storyblok_1 = require("./Storyblok");
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
var ApiClient = /** @class */ (function () {
    /**
     * Class instantiation.
     *
     * @param {string} apiToken - API access token.
     * @param {number} spaceId - Storyblok working space id.
     */
    function ApiClient(apiToken, spaceId) {
        this.spaceId = spaceId;
        this.storyblok = new Storyblok_1.Storyblok(apiToken);
    }
    Object.defineProperty(ApiClient.prototype, "assetFolders", {
        /**
         * Provides API methods for asset folders.
         *
         * @name ApiClient#assetFolders
         * @returns {Object}
         */
        get: function () {
            var _this = this;
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
                create: function (name) {
                    return _this.createAssetFolder(name);
                },
                /**
                 * Delete a specific asset folder.
                 *
                 * @name ApiClient#assetFolders#delete
                 * @param {number} id - Id of asset folder to be deleted.
                 * @returns {Promise}
                 * @fulfil {void}
                 * @reject {AxiosError} Axios error.
                 */
                delete: function (id) { return _this.deleteAssetFolder(id); },
                /**
                 * Delete all existing asset folders.
                 *
                 * @name ApiClient#assetFolders#deleteExisting
                 * @returns {Promise}
                 * @fulfil {void[]}
                 * @reject {AxiosError} Axios error.
                 */
                deleteExisting: function () { return _this.deleteExistingAssetFolders(); },
                /**
                 * Get a specific asset folder.
                 *
                 * @name ApiClient#assetFolders#get
                 * @param {number} id - Id of the target asset folder.
                 * @returns {Promise}
                 * @fulfil {IAssetFolder} Asset folder information.
                 * @reject {AxiosError} Axios error.
                 */
                get: function (id) { return _this.getAssetFolder(id); },
                /**
                 * Get a list of asset folders by matching asset folders names to the supplied string.
                 *
                 * @name ApiClient#assetFolders#getByName
                 * @param {string} name - String to search asset folders by.
                 * @returns {Promise}
                 * @fulfil {IAssetFolder[]} List of asset folders that matches the name string.
                 * @reject {AxiosError} Axios error.
                 */
                getByName: function (searchString) {
                    return _this.getAssetFolderByName(searchString);
                },
                /**
                 * Get existing asset folders.
                 *
                 * @name ApiClient#assetFolders#getExisting
                 * @returns {Promise}
                 * @fulfil {IAssetFolder[]} List of existing asset folders.
                 * @reject {AxiosError} Axios error.
                 */
                getExisting: function () {
                    return _this.getExistingAssetFolders();
                },
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiClient.prototype, "assets", {
        /**
         * Provides API methods for assets.
         *
         * @name ApiClient#assets
         * @returns {Object} Asset API methods.
         */
        get: function () {
            var _this = this;
            return {
                /**
                 * Get total number of existing assets.
                 *
                 * @name ApiClient#assets#count
                 * @returns {Promise}
                 * @fulfil {number} A count of existing assets.
                 * @reject {AxiosError} Axios error.
                 */
                count: function () { return _this.countAssets(); },
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
                createFromImage: function (asset, filePath, compress, dimensionLimit) {
                    return _this.createAssetFromImage(asset, filePath, compress, dimensionLimit);
                },
                /**
                 * Delete a specific asset.
                 *
                 * @name ApiClient#assets#delete
                 * @param {number} id - Id of the asset to be deleted.
                 * @returns {Promise}
                 * @fulfil {IAsset} Information of the deleted asset.
                 * @reject {AxiosError} Axios error.
                 */
                delete: function (id) { return _this.deleteAsset(id); },
                /**
                 * Delete all existing assets.
                 *
                 * @name ApiClient#assets#deleteExisting
                 * @returns {Promise}
                 * @fulfil {IAsset[]} Information on the deleted assets.
                 * @reject {AxiosError} Axios error.
                 */
                deleteExisting: function () { return _this.deleteExistingAssets(); },
                /**
                 * Get a specific asset.
                 *
                 * @name ApiClient#assets#get
                 * @param {number} id - Id of asset to fetch.
                 * @returns {Promise}
                 * @fulfil {IAsset} Details of the asset.
                 * @reject {AxiosError} Axios error.
                 */
                get: function (id) { return _this.getAsset(id); },
                /**
                 * Find a specific asset by its public url.
                 *
                 * @name ApiClient#assets#getByUrl
                 * @param {string} url - Url to match by.
                 * @returns {Promise}
                 * @fulfil {IAsset | undefined} Matched asset or undefined if not fund.
                 * @reject {AxiosError} Axios error.
                 */
                getByUrl: function (url) {
                    return _this.getAssetByUrl(url);
                },
                /**
                 * List all existing assets.
                 *
                 * @name ApiClient#assets#getExisting
                 * @returns {Promise}
                 * @fulfil {IAsset[]} A list of existing assets.
                 * @reject {AxiosError} Axios error.
                 */
                getExisting: function () { return _this.getExistingAssets(); },
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
                register: function (asset) {
                    return _this.registerAsset(asset);
                },
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
                upload: function (buffer, registration) { return _this.uploadAsset(buffer, registration); },
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiClient.prototype, "components", {
        /**
         * Provides API methods for components.
         *
         * @name ApiClient#components
         * @returns {Object} Component API methods.
         */
        get: function () {
            var _this = this;
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
                create: function (component) {
                    return _this.createComponent(component);
                },
                /**
                 * Delete a specific component.
                 *
                 * @name ApiClient#components#delete
                 * @param {number} id - Id of component to be deleted.
                 * @returns {Promise}
                 * @fulfil {IComponent} Details of the deleted component.
                 * @reject {AxiosError} Axios error.
                 */
                delete: function (id) { return _this.deleteComponent(id); },
                /**
                 * Delete all existing components.
                 *
                 * @name ApiClient#components#deleteExistingAssetFolders
                 * @returns {Promise}
                 * @fulfil {IComponent[]} A list of deleted components details.
                 * @reject {AxiosError} Axios error.
                 */
                deleteExisting: function () {
                    return _this.deleteExistingComponents();
                },
                /**
                 * Fetch for a specific component.
                 *
                 * @name ApiClient#components#get
                 * @param {number} id - Component id to fetch by.
                 * @returns {Promise}
                 * @fulfil {IComponent} Details of the component definition.
                 * @reject {AxiosError} Axios error.
                 */
                get: function (id) { return _this.getComponent(id); },
                /**
                 * List all existing components.
                 *
                 * @name ApiClient#components#getExisting
                 * @returns {Promise}
                 * @fulfil {IComponent[]} A list of component definitions.
                 * @reject {AxiosError} Axios error.
                 */
                getExisting: function () { return _this.getExistingComponents(); },
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiClient.prototype, "spaces", {
        /**
         * Provides API methods for the working space.
         *
         * @name ApiClient#spaces
         * @returns {Object} Working space API methods.
         */
        get: function () {
            var _this = this;
            return {
                /**
                 * Get information on the working Storyblok space.
                 *
                 * @name ApiClient#spaces#get
                 * @returns {Promise}
                 * @fulfil {ISpace} Working space information.
                 * @reject {AxiosError} Axios error.
                 */
                get: function () { return _this.getSpace(); },
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiClient.prototype, "stories", {
        /**
         * Provides API methods for stories.
         *
         * @name ApiClient#stories
         * @returns {Object} Story API methods.
         */
        get: function () {
            var _this = this;
            return {
                /**
                 * Get total number of existing stories (including folders).
                 *
                 * @name ApiClient#stories#count
                 * @returns {Promise}
                 * @fulfil {number} A count of existing stories.
                 * @reject {AxiosError} Axios error.
                 */
                count: function () { return _this.countStories(); },
                /**
                 * Get total pagination page count.
                 *
                 * @name ApiClient#stories#countPages
                 * @param {number} [perPage] - (optional) How many stories per page.  Defaults to 25.
                 * @returns {Promise}
                 * @fulfil {number} Total story pagination page count.
                 * @reject {AxiosError} Axios error.
                 */
                countPages: function (perPage) {
                    return _this.countStoryPages(perPage || 25);
                },
                /**
                 * Create a story.
                 *
                 * @name ApiClient#stories#create
                 * @param {IStory} story - Storyblok story data object.
                 * @returns {Promise}
                 * @fulfil {IStory} Details of story that was created.
                 * @reject {AxiosError} Axios error.
                 */
                create: function (story) { return _this.createStory(story); },
                /**
                 * Delete a specific story.
                 *
                 * @name ApiClient#stories#delete
                 * @param {IStory} storyId - Id of the story to be deleted.
                 * @returns {Promise}
                 * @fulfil {IStory} Details of the story that was deleted.
                 * @reject {AxiosError} Axios error.
                 */
                delete: function (storyId) { return _this.deleteStory(storyId); },
                /**
                 * Delete all existing stories.
                 *
                 * @name ApiClient#stories#deleteExisting
                 * @returns {Promise}
                 * @fulfil {IStory[]} A list of deleted stories details.
                 * @reject {AxiosError} Axios error.
                 */
                deleteExisting: function () { return _this.deleteExistingStories(); },
                /**
                 * Get a specific story.
                 *
                 * @name ApiClient#stories#get
                 * @param {number} storyId - Id of the content story.
                 * @returns {Promise}
                 * @fulfil {IStory} Details of content story.
                 * @reject {AxiosError} Axios error.
                 */
                get: function (storyId) { return _this.getStory(storyId); },
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
                getByPage: function (page, perPage) {
                    return _this.getStoriesByPage(page, perPage || 25);
                },
                /**
                 * List all existing stories.
                 *
                 * @name ApiClient#stories#getExisting
                 * @returns {Promise}
                 * @fulfil {IStory[]} A full list of existing content stories.
                 * @reject {AxiosError} Axios error.
                 */
                getExisting: function () { return _this.getExistingStories(); },
                /**
                 * Publish a specific story.
                 *
                 * @name ApiClient#stories#publish
                 * @param {number} storyId - Id of the story to publish
                 * @returns {Promise}
                 * @fulfil {IStory} Details of the published story
                 * @reject {AxiosError} Axios error.
                 */
                publish: function (storyId) { return _this.publishStory(storyId); },
                /**
                 * Publish all unpublished stories.
                 *
                 * @name ApiClient#stories#publishPendings
                 * @returns {Promise}
                 * @fulfil {IStory[]} List of published stories.
                 * @reject {AxiosError} Axios error.
                 */
                publishPendings: function () { return _this.publishPendingStories(); },
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
                reorder: function (storyId, afterId) {
                    return _this.reorderStory(storyId, afterId);
                },
                /**
                 * Update a story.
                 *
                 * @name ApiClient#stories#update
                 * @param {IStory} story - Storyblok story data object with modified info.
                 * @returns {Promise}
                 * @fulfil {IStory} Details of story that was updated.
                 * @reject {AxiosError} Axios error.
                 */
                update: function (story) { return _this.updateStory(story); },
            };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get total number of existing assets.
     *
     * @name ApiClient#countAssets
     * @returns {Promise}
     * @fulfil {number} A count of existing assets.
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.countAssets = function () {
        return this.getSpace()
            .then(function (space) { return space.assets_count; })
            .catch(function (error) { return Promise.reject(error); });
    };
    /**
     * Get total number of existing stories (including folders).  Storyblok API's space info does not account 'folders' as stories, so this is manually counted.
     *
     * @name ApiClient#countStories
     * @returns {Promise}
     * @fulfil {number} A count of existing stories.
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.countStories = function () {
        return this.getExistingStories()
            .then(function (stories) { return stories.length; })
            .catch(function (error) { return Promise.reject(error); });
    };
    /**
     * Create an asset folder.
     *
     * @name ApiClient#createAssetFolder
     * @param {string} name - Name of asset folder to create.
     * @returns {Promise}
     * @fulfil {IAssetFolder} Details of the asset folder created.
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.createAssetFolder = function (name) {
        var url = this.spaceId + "/asset_folders";
        var data = { asset_folder: { name: name } };
        return this.storyblok
            .post(url, data)
            .then(function (res) { return res.data.asset_folder; })
            .catch(function (error) { return Promise.reject(error); });
    };
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
    ApiClient.prototype.createAssetFromImage = function (asset, filePath, compress, dimensionLimit) {
        var _this = this;
        return Promise.all([
            utilities_1.imageToBuffer(filePath, compress || true, dimensionLimit || 640),
            this.registerAsset(asset),
        ])
            .then(function (_a) {
            var buffer = _a[0], registration = _a[1];
            return _this.uploadAsset(buffer, registration);
        })
            .catch(function (error) { return Promise.reject(error); });
    };
    /**
     * Create a component.
     *
     * @name ApiClient#createComponent
     * @param {IComponent} component - Info on component to be created.
     * @returns {Promise}
     * @fulfil {IComponent} Details of the component that was created.
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.createComponent = function (component) {
        var url = this.spaceId + "/components";
        var data = { component: component };
        return this.storyblok
            .post(url, data)
            .then(function (res) { return res.data.component; })
            .catch(function (error) { return Promise.reject(error); });
    };
    /**
     * Create a story.
     *
     * @name ApiClient#createStory
     * @param {IStory} story - Storyblok story data object.
     * @returns {Promise}
     * @fulfil {IStory} Details of story that was created.
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.createStory = function (story) {
        var url = this.spaceId + "/stories";
        var data = { story: story };
        return this.storyblok
            .post(url, data)
            .then(function (res) { return res.data.story; })
            .catch(function (error) { return Promise.reject(error); });
    };
    /**
     * Delete a specific asset.
     *
     * @name ApiClient#deleteAsset
     * @param {number} id - Id of the asset to be deleted.
     * @returns {Promise}
     * @fulfil {IAsset} Information on the deleted asset.
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.deleteAsset = function (id) {
        var url = this.spaceId + "/assets/" + id;
        return this.storyblok
            .delete(url)
            .then(function (res) { return res.data.assets; })
            .catch(function (error) { return Promise.reject(error); });
    };
    /**
     * Delete a specific asset folder.
     *
     * @name ApiClient#deleteAssetFolder
     * @param {number} id - Id of asset folder to be deleted.
     * @returns {Promise}
     * @fulfil {void}
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.deleteAssetFolder = function (id) {
        var url = this.spaceId + "/asset_folders/" + id;
        return this.storyblok
            .delete(url)
            .then(function () { return Promise.resolve(); })
            .catch(function (error) { return Promise.reject(error); });
    };
    /**
     * Delete a specific component.
     *
     * @name ApiClient#deleteComponent
     * @param {number} id - Id of component to be deleted.
     * @returns {Promise}
     * @fulfil {IComponent} Details of the deleted component.
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.deleteComponent = function (id) {
        var url = this.spaceId + "/components/" + id;
        return this.storyblok
            .delete(url)
            .then(function (res) { return res.data.component; })
            .catch(function (error) { return Promise.reject(error); });
    };
    /**
     * Delete all existing asset folders.
     *
     * @name ApiClient#deleteExistingAssetFolders
     * @returns {Promise}
     * @fulfil {void[]}
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.deleteExistingAssetFolders = function () {
        var _this = this;
        var mapFn = function (assetFolder) {
            return _this.deleteAssetFolder(assetFolder.id);
        };
        return this.getExistingAssetFolders()
            .then(function (assetFolders) { return Promise.all(assetFolders.map(mapFn)); })
            .catch(function (error) { return Promise.reject(error); });
    };
    /**
     * Delete all existing assets.
     *
     * @name ApiClient#deleteExistingAssets
     * @returns {Promise}
     * @fulfil {IAsset[]} Details of the deleted assets.
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.deleteExistingAssets = function () {
        var _this = this;
        var mapFn = function (asset) { return _this.deleteAsset(asset.id); };
        var responseHandler = function (assets) { return Promise.all(assets.map(mapFn)); };
        return this.getExistingAssets()
            .then(responseHandler)
            .catch(function (error) { return Promise.reject(error); });
    };
    /**
     * Delete all existing components.
     *
     * @name ApiClient#deleteExistingComponents
     * @returns {Promise}
     * @fulfil {IComponent[]} A list of deleted components details.
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.deleteExistingComponents = function () {
        var _this = this;
        var mapFn = function (comp) { return _this.deleteComponent(comp.id); };
        return this.getExistingComponents()
            .then(function (components) { return Promise.all(components.map(mapFn)); })
            .catch(function (error) { return Promise.reject(error); });
    };
    /**
     * Delete all existing stories.
     *
     * @name ApiClient#deleteExistingStories
     * @returns {Promise}
     * @fulfil {IStory[]} A list of deleted stories details.
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.deleteExistingStories = function () {
        var _this = this;
        var filterFn = function (story) { return story.parent_id === 0; };
        var mapFn = function (story) { return _this.deleteStory(story.id); };
        return this.getExistingStories()
            .then(function (stories) { return stories.filter(filterFn); })
            .then(function (rootStories) { return Promise.all(rootStories.map(mapFn)); })
            .catch(function (error) { return Promise.reject(error); });
    };
    /**
     * Delete a specific story.
     *
     * @name ApiClient#deleteStory
     * @param {number} storyId - Id of the story to be deleted.
     * @returns {Promise}
     * @fulfil {IStory} Details of the story that was deleted.
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.deleteStory = function (storyId) {
        var url = this.spaceId + "/stories/" + storyId;
        return this.storyblok
            .delete(url)
            .then(function (res) { return res.data.story; })
            .catch(function (error) { return Promise.reject(error); });
    };
    /**
     * Get a specific asset.
     *
     * @name ApiClient#getAsset
     * @param {number} id - Id of asset to fetch.
     * @returns {Promise}
     * @fulfil {IAsset} Details of the asset.
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.getAsset = function (id) {
        var url = this.spaceId + "/assets/" + id;
        return this.storyblok
            .get(url)
            .then(function (res) { return res.data; })
            .catch(function (error) { return Promise.reject(error); });
    };
    /**
     * Find a specific asset by its public url.
     *
     * @name ApiClient#getAssetByUrl
     * @param {string} url - Url to match by.
     * @returns {Promise}
     * @fulfil {IAsset | undefined} Matched asset or undefined if not fund.
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.getAssetByUrl = function (url) {
        var predicate = function (asset) {
            return asset.filename === url;
        };
        var responseHandler = function (assets) { return assets.find(predicate); };
        return this.getExistingAssets()
            .then(responseHandler)
            .catch(function (error) { return Promise.reject(error); });
    };
    /**
     * Get a specific asset folder.
     *
     * @name ApiClient#getAssetFolder
     * @param {number} id - Id of the target asset folder.
     * @returns {Promise}
     * @fulfil {IAssetFolder} Asset folder information.
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.getAssetFolder = function (id) {
        var url = this.spaceId + "/asset_folders/" + id;
        return this.storyblok
            .get(url)
            .then(function (res) { return res.data.asset_folder; })
            .catch(function (error) { return Promise.reject(error); });
    };
    /**
     * Get a list of asset folders by matching asset folders names to the supplied string.
     *
     * @name ApiClient#getAssetFolderByName
     * @param {string} searchString - String to search asset folders by.
     * @returns {Promise}
     * @fulfil {IAssetFolder[]} List of asset folders that matches the name string.
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.getAssetFolderByName = function (searchString) {
        var url = this.spaceId + "/asset_folders?search=" + searchString;
        return this.storyblok
            .get(url)
            .then(function (res) { return res.data.asset_folders; })
            .catch(function (error) { return Promise.reject(error); });
    };
    /**
     * Fetch for a specific component.
     *
     * @name ApiClient#getComponent
     * @param {number} id - Component id to fetch by.
     * @returns {Promise}
     * @fulfil {IComponent} Details of the component definition.
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.getComponent = function (id) {
        var url = this.spaceId + "/components/" + id;
        return this.storyblok
            .get(url)
            .then(function (res) { return res.data.component; })
            .catch(function (error) { return Promise.reject(error); });
    };
    /**
     * Get existing asset folders.
     *
     * @name ApiClient#getExistingAssetFolders
     * @returns {Promise}
     * @fulfil {IAssetFolder[]} List of existing asset folders.
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.getExistingAssetFolders = function () {
        var url = this.spaceId + "/asset_folders?search";
        return this.storyblok
            .get(url)
            .then(function (res) { return res.data.asset_folders; })
            .catch(function (error) { return Promise.reject(error); });
    };
    /**
     * List all existing assets.
     *
     * @name ApiClient#getExistingAssets
     * @returns {Promise}
     * @fulfil {IAsset[]} A list of existing assets.
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.getExistingAssets = function () {
        var _this = this;
        var maxPerPage = 1000;
        var countPage = function (total) { return Math.ceil(total / maxPerPage); };
        return this.countAssets()
            .then(countPage)
            .then(function (pageCount) {
            var url = _this.spaceId + "/assets";
            var mapFn = function (pageIndex) {
                var page = pageIndex + 1;
                var params = { page: page, per_page: maxPerPage };
                return _this.storyblok.get(url, { params: params });
            };
            var pageIndices = Array.from(Array(pageCount).keys());
            return Promise.all(pageIndices.map(mapFn))
                .then(function (resArray) { return resArray.map(function (res) { return res.data.assets; }); })
                .then(function (arrayOfAssets) { return [].concat.apply([], arrayOfAssets); })
                .catch(function (error) { return Promise.reject(error); });
        })
            .catch(function (error) { return Promise.reject(error); });
    };
    /**
     * List all existing components.  It is assumed that the working space has only 1,000 existing components at most.
     *
     * @name ApiClient#getExistingComponents
     * @returns {Promise}
     * @fulfil {IComponent[]} A list of component definitions.
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.getExistingComponents = function () {
        var url = this.spaceId + "/components";
        return this.storyblok
            .get(url)
            .then(function (res) { return res.data.components; })
            .catch(function (error) { return Promise.reject(error); });
    };
    /**
     * List all existing stories.
     *
     * @name ApiClient#getExistingStories
     * @returns {Promise}
     * @fulfil {IStory[]} A list of existing content stories.
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.getExistingStories = function () {
        return __awaiter(this, void 0, void 0, function () {
            var maxPerPage_1, pageCount, indicies, mapFn, arrayOfStories, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        maxPerPage_1 = 1000;
                        return [4 /*yield*/, this.countStoryPages(maxPerPage_1)];
                    case 1:
                        pageCount = _a.sent();
                        if (pageCount === 0) {
                            return [2 /*return*/, []];
                        }
                        indicies = Array.from(Array(pageCount).keys());
                        mapFn = function (index) { return _this.getStoriesByPage(index + 1, maxPerPage_1); };
                        return [4 /*yield*/, Promise.all(indicies.map(mapFn))];
                    case 2:
                        arrayOfStories = _a.sent();
                        return [2 /*return*/, [].concat.apply([], arrayOfStories)];
                    case 3:
                        error_1 = _a.sent();
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get information on the working Storyblok space.
     *
     * @name ApiClient#getSpace
     * @returns {Promise}
     * @fulfil {ISpace} Working space information.
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.getSpace = function () {
        var url = "/" + this.spaceId;
        return this.storyblok
            .get(url)
            .then(function (res) { return res.data.space; })
            .catch(function (error) { return Promise.reject(error); });
    };
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
    ApiClient.prototype.getStoriesByPage = function (page, perPage) {
        var url = this.spaceId + "/stories";
        var query = "?per_page=" + perPage + "&page=" + page;
        return this.storyblok
            .get(url + query)
            .then(function (res) { return res.data.stories; })
            .catch(function (error) { return Promise.reject(error); });
    };
    /**
     * Get a specific story.
     *
     * @name ApiClient#getStory
     * @param {number} storyId - Id of the content story.
     * @returns {Promise}
     * @fulfil {IStory} Details of content story.
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.getStory = function (storyId) {
        var url = this.spaceId + "/stories/" + storyId;
        return this.storyblok
            .get(url)
            .then(function (res) { return res.data.story; })
            .catch(function (error) { return Promise.reject(error); });
    };
    /**
     * Get total pagination page count.
     *
     * @name ApiClient#countStoryPages
     * @param {number} [perPage] - (optional) How many stories per page.  Defaults to 25.
     * @returns {Promise}
     * @fulfil {number} Total story pagination page count.
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.countStoryPages = function (perPage) {
        var url = this.spaceId + "/stories";
        var resHander = function (res) {
            var total = res.headers.total;
            return Math.ceil(total / (perPage || 25));
        };
        return this.storyblok
            .get(url)
            .then(resHander)
            .catch(function (error) { return Promise.reject(error); });
    };
    /**
     * Publish all unpublished stories.
     *
     * @name ApiClient#publishPendingStories
     * @returns {Promise}
     * @fulfil {IStory[]} List of published stories.
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.publishPendingStories = function () {
        var _this = this;
        var filterFn = function (stories) {
            var filter = function (s) { return !s.is_folder && !s.published; };
            return stories.filter(filter);
        };
        var publishFn = function (stories) {
            var mapFn = function (story) { return _this.publishStory(story.id); };
            return Promise.all(stories.map(mapFn));
        };
        return this.getExistingStories()
            .then(filterFn)
            .then(publishFn)
            .catch(function (error) { return Promise.reject(error); });
    };
    /**
     * Publish a specific story.
     *
     * @name ApiClient#publishStory
     * @param storyId - Id of the story to publish
     * @returns {Promise}
     * @fulfil {IStory} Details of the published story.
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.publishStory = function (storyId) {
        var url = this.spaceId + "/stories/" + storyId + "/publish";
        return this.storyblok
            .get(url)
            .then(function (res) { return res.data.story; })
            .catch(function (error) { return Promise.reject(error); });
    };
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
    ApiClient.prototype.registerAsset = function (asset) {
        var url = this.spaceId + "/assets";
        return this.storyblok
            .post(url, asset)
            .then(function (res) { return res.data; })
            .catch(function (error) { return Promise.reject(error); });
    };
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
    ApiClient.prototype.reorderStory = function (storyId, afterId) {
        var _this = this;
        var url = this.spaceId + "/stories/" + storyId + "/move";
        var query = "?after_id=" + afterId;
        return this.storyblok
            .put(url + query)
            .then(function () { return _this.getStory(storyId); })
            .catch(function (error) { return Promise.reject(error); });
    };
    /**
     * Update a story.
     *
     * @name ApiClient#updateStory
     * @param {IStory} story - Storyblok story data object with modified info.
     * @returns {Promise}
     * @fulfil {IStory} Details of story that was updated.
     * @reject {AxiosError} Axios error.
     */
    ApiClient.prototype.updateStory = function (story) {
        var url = this.spaceId + "/stories";
        var data = { story: story };
        return this.storyblok
            .put(url, { data: data })
            .then(function (res) { return res.data.story; })
            .catch(function (error) { return Promise.reject(error); });
    };
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
    ApiClient.prototype.uploadAsset = function (buffer, registration) {
        var _this = this;
        var publicUrl = registration.public_url;
        var filename = publicUrl.split('\\').pop();
        var contentType = registration.fields['Content-Type'];
        var formData = registration.fields;
        formData.file = {
            options: { filename: filename, contentType: contentType },
            value: buffer,
        };
        var requestOptions = {
            formData: formData,
            method: 'post',
            url: registration.post_url,
        };
        var uploadFn = function (options) {
            return rp(options)
                .then(function (res) { return Promise.resolve(res); })
                .catch(function (error) { return Promise.reject(error); });
        };
        return utilities_1.promiseRetry(uploadFn, [requestOptions], 3, 500)
            .then(function () { return _this.getAssetByUrl(publicUrl); })
            .then(function (asset) {
            if (!asset) {
                throw new Error('asset upload failure');
            }
            else {
                return _this.getAsset(asset.id);
            }
        })
            .catch(function (error) { return Promise.reject(error); });
    };
    return ApiClient;
}());
exports.ApiClient = ApiClient;
//# sourceMappingURL=ApiClient.js.map