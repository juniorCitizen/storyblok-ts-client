"use strict";
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
var FormData = require("form-data");
var imageProcessing_1 = require("../utilities/imageProcessing");
var Storyblok_1 = require("./Storyblok");
exports.retrySettings = {
    burst: {
        retries: 20,
        retryDelay: 1750,
    },
    extended: {
        retries: 40,
        retryDelay: 1250,
    },
};
var storyblok;
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
var ApiClient = /** @class */ (function () {
    function ApiClient(apiToken, spaceId) {
        this.spaceId = spaceId;
        if (!storyblok) {
            storyblok = new Storyblok_1.Storyblok(apiToken);
        }
        this.storyblok = storyblok;
    }
    Object.defineProperty(ApiClient.prototype, "assetFolders", {
        /**
         * Object that contains API methods for asset folder operations
         *
         * @readonly
         * @name ApiClient#assetFolders
         * @memberof ApiClient
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
                 * @memberof ApiClient#assetFolders
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
                 * @memberof ApiClient#assetFolders
                 */
                delete: function (id) { return _this.deleteAssetFolder(id); },
                /**
                 * Delete all existing asset folders.
                 *
                 * @name ApiClient#assetFolders#deleteExisting
                 * @returns {Promise}
                 * @fulfil {void[]}
                 * @reject {AxiosError} Axios error.
                 * @memberof ApiClient#assetFolders
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
                 * @memberof ApiClient#assetFolders
                 */
                get: function (id) { return _this.getAssetFolder(id); },
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
                 * @memberof ApiClient#assetFolders
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
         * Object that contains API methods for asset operations
         *
         * @readonly
         * @name ApiClient#assets
         * @memberof ApiClient
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
                 * @memberof ApiClient#assets
                 */
                count: function () { return _this.countAssets(); },
                /**
                 * Create an asset and upload the physical file.
                 *
                 * @name ApiClient#assets#createFromImage
                 * @param {IPendingAsset} data - Asset information.
                 * @param {string} filePath - Absolute file path to the image.
                 * @param {boolean} compress - Flag to compress image.
                 * @param {number} sizeLimit - Resizing dimension limit value.
                 * @returns {Promise}
                 * @fulfil {string} public access url of the new asset.
                 * @reject {AxiosError} Axios error.
                 * @memberof ApiClient#assets
                 */
                createFromImage: function (data, filePath, compress, sizeLimit) {
                    return _this.createAssetFromImage(data, filePath, compress, sizeLimit);
                },
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
                delete: function (id) { return _this.deleteAsset(id); },
                /**
                 * Delete all existing assets.
                 *
                 * @name ApiClient#assets#deleteExisting
                 * @returns {Promise}
                 * @fulfil {IAsset[]} Information on the deleted assets.
                 * @reject {AxiosError} Axios error.
                 * @memberof ApiClient#assets
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
                 * @memberof ApiClient#assets
                 */
                get: function (id) { return _this.getAsset(id); },
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
                getByPage: function (page, perPage) {
                    return _this.getAssetsByPage(page, perPage);
                },
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
                getByUrl: function (url) { return _this.getAssetByUrl(url); },
                /**
                 * List all existing assets.
                 *
                 * @name ApiClient#assets#getExisting
                 * @returns {Promise}
                 * @fulfil {IAsset[]} A list of existing assets.
                 * @reject {AxiosError} Axios error.
                 * @memberof ApiClient#assets
                 */
                getExisting: function () { return _this.getExistingAssets(); },
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
                register: function (data) {
                    return _this.registerAsset(data);
                },
                /**
                 * Upload a registered asset with failure-retry (20 retries and incremental delay period of 1250ms with +/- 500ms variance).
                 *
                 * @name ApiClient#assets#upload
                 * @param {Buffer} buffer - Buffered asset data.
                 * @param {IRegistration} registration - Registration info.
                 * @returns {Promise}
                 * @fulfil {string} Access url of the uploaded asset.
                 * @reject {AxiosError} Axios error.
                 * @memberof ApiClient#assets
                 */
                upload: function (buffer, registration) {
                    return _this.uploadAsset(buffer, registration);
                },
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiClient.prototype, "components", {
        /**
         * Object that contains API methods for component operations
         *
         * @name ApiClient#components
         * @readonly
         * @memberof ApiClient
         */
        get: function () {
            var _this = this;
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
                create: function (data) {
                    return _this.createComponent(data);
                },
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
                delete: function (id) { return _this.deleteComponent(id); },
                /**
                 * Delete existing components.
                 *
                 * @name ApiClient#components#deleteExisting
                 * @returns {Promise}
                 * @fulfil {IComponent[]} A list of deleted components details.
                 * @reject {AxiosError} Axios error.
                 * @memberof ApiClient#components
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
                 * @memberof ApiClient#components
                 */
                get: function (id) { return _this.getComponent(id); },
                /**
                 * List existing components.
                 *
                 * @name ApiClient#components#getExisting
                 * @returns {Promise}
                 * @fulfil {IComponent[]} A list of component definitions.
                 * @reject {AxiosError} Axios error.
                 * @memberof ApiClient#components
                 */
                getExisting: function () { return _this.getExistingComponents(); },
                /**
                 * Update a component.
                 *
                 * @name ApiClient#components#update
                 * @param {IComponent} data - Storyblok component data object with modified info.
                 * @returns {Promise}
                 * @fulfil {IComponent} Details of component that was updated.
                 * @reject {AxiosError} Axios error.
                 * @memberof ApiClient
                 */
                update: function (data) {
                    return _this.updateComponent(data);
                },
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiClient.prototype, "spaces", {
        /**
         * Object that contains API methods for space operations
         *
         * @name ApiClient#spaces
         * @readonly
         * @memberof ApiClient
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
                 * @memberof ApiClient#spaces
                 */
                get: function () { return _this.getSpace(); },
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiClient.prototype, "stories", {
        /**
         * Object that contains API methods for story operations
         *
         * @name ApiClient#stories
         * @readonly
         * @memberof ApiClient
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
                 * @memberof ApiClient#stories
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
                 * @memberof ApiClient#stories
                 */
                countPages: function (perPage) {
                    if (perPage === void 0) { perPage = 25; }
                    return _this.countStoryPages(perPage);
                },
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
                create: function (data) { return _this.createStory(data); },
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
                delete: function (id) { return _this.deleteStory(id); },
                /**
                 * Delete all existing stories.
                 *
                 * @name ApiClient#stories#deleteExisting
                 * @returns {Promise}
                 * @fulfil {IStory[]} A list of deleted stories details.
                 * @reject {AxiosError} Axios error.
                 * @memberof ApiClient#stories
                 */
                deleteExisting: function () { return _this.deleteExistingStories(); },
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
                get: function (id) { return _this.getStory(id); },
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
                getByPage: function (page, perPage) {
                    return _this.getStoriesByPage(page, perPage);
                },
                /**
                 * List all existing stories.
                 *
                 * @name ApiClient#stories#getExisting
                 * @returns {Promise}
                 * @fulfil {IStory[]} A list of existing content stories.
                 * @reject {AxiosError} Axios error.
                 * @memberof ApiClient#stories
                 */
                getExisting: function () { return _this.getExistingStories(); },
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
                publish: function (id) { return _this.publishStory(id); },
                /**
                 * Publish all unpublished stories.
                 *
                 * @name ApiClient#stories#publishPendings
                 * @returns {Promise}
                 * @fulfil {IStory[]} List of published stories.
                 * @reject {AxiosError} Axios error.
                 * @memberof ApiClient#stories
                 */
                publishPendings: function () { return _this.publishPendingStories(); },
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
                reorder: function (id, afterId) {
                    return _this.reorderStory(id, afterId);
                },
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
                update: function (data) { return _this.updateStory(data); },
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
     * @memberof ApiClient
     */
    ApiClient.prototype.countAssets = function () {
        return this.getSpace()
            .then(function (s) { return s.assets_count; })
            .catch(function (e) { return Promise.reject(e); });
    };
    /**
     * Get total number of existing stories (including folders).
     *
     * @name ApiClient#countStories
     * @returns {Promise}
     * @fulfil {number} A count of existing stories.
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    ApiClient.prototype.countStories = function () {
        return this.getExistingStories()
            .then(function (ss) { return ss.length; })
            .catch(function (e) { return Promise.reject(e); });
    };
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
    ApiClient.prototype.countStoryPages = function (perPage) {
        if (perPage === void 0) { perPage = 25; }
        var url = "/" + this.spaceId + "/stories";
        var responseHandler = function (r) {
            var total = r.headers.total;
            return Math.ceil(total / perPage);
        };
        return this.storyblok
            .get(url, exports.retrySettings.burst)
            .then(responseHandler)
            .catch(function (r) { return Promise.reject(r); });
    };
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
    ApiClient.prototype.createAssetFolder = function (name) {
        var url = "/" + this.spaceId + "/asset_folders";
        var data = { name: name };
        return this.storyblok
            .post(url, { asset_folder: data }, exports.retrySettings.burst)
            .then(function (r) { return r.data.asset_folder; })
            .catch(function (e) { return Promise.reject(e); });
    };
    /**
     * Create an asset and upload the physical file.
     *
     * @name ApiClient#createAssetFromImage
     * @param {IPendingAsset} data - Asset information.
     * @param {string} filePath - Absolute file path to the image.
     * @param {boolean} compress - Flag to compress image.
     * @param {number} sizeLimit - Resizing dimension limit value.
     * @returns {Promise}
     * @fulfil {string} Public access url of the new asset.
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    ApiClient.prototype.createAssetFromImage = function (data, filePath, compress, sizeLimit) {
        if (compress === void 0) { compress = true; }
        if (sizeLimit === void 0) { sizeLimit = 640; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, registration, buffer, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, Promise.all([
                                this.registerAsset(data),
                                imageProcessing_1.imageToBuffer(filePath, compress, sizeLimit),
                            ])];
                    case 1:
                        _a = _b.sent(), registration = _a[0], buffer = _a[1];
                        return [4 /*yield*/, this.uploadAsset(buffer, registration)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3:
                        e_1 = _b.sent();
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
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
    ApiClient.prototype.createComponent = function (data) {
        var url = "/" + this.spaceId + "/components";
        return this.storyblok
            .post(url, { component: data }, exports.retrySettings.burst)
            .then(function (r) { return r.data.component; })
            .catch(function (e) { return Promise.reject(e); });
    };
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
    ApiClient.prototype.createStory = function (data) {
        var url = "/" + this.spaceId + "/stories";
        return this.storyblok
            .post(url, { story: data }, exports.retrySettings.burst)
            .then(function (r) { return r.data.story; })
            .catch(function (e) { return Promise.reject(e); });
    };
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
    ApiClient.prototype.deleteAsset = function (id) {
        var url = "/" + this.spaceId + "/assets/" + id;
        return this.storyblok
            .delete(url, exports.retrySettings.burst)
            .then(function (r) { return r.data; })
            .catch(function (e) { return Promise.reject(e); });
    };
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
    ApiClient.prototype.deleteAssetFolder = function (id) {
        var url = "/" + this.spaceId + "/asset_folders/" + id;
        return this.storyblok
            .delete(url, exports.retrySettings.burst)
            .then(function () { return Promise.resolve(); })
            .catch(function (e) { return Promise.reject(e); });
    };
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
    ApiClient.prototype.deleteComponent = function (id) {
        var url = "/" + this.spaceId + "/components/" + id;
        return this.storyblok
            .delete(url, exports.retrySettings.burst)
            .then(function (r) { return r.data.component; })
            .catch(function (e) { return Promise.reject(e); });
    };
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
    ApiClient.prototype.deleteStory = function (id) {
        var url = "/" + this.spaceId + "/stories/" + id;
        return this.storyblok
            .delete(url, exports.retrySettings.burst)
            .then(function (r) { return r.data.story; })
            .catch(function (e) { return Promise.reject(e); });
    };
    /**
     * Delete all existing asset folders.
     *
     * @name ApiClient#deleteExistingAssetFolders
     * @returns {Promise}
     * @fulfil {void[]}
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    ApiClient.prototype.deleteExistingAssetFolders = function () {
        var _this = this;
        var mapFn = function (af) { return _this.deleteAssetFolder(af.id); };
        return this.getExistingAssetFolders()
            .then(function (afs) { return Promise.all(afs.map(mapFn)); })
            .catch(function (e) { return Promise.reject(e); });
    };
    /**
     * Delete all existing assets.
     *
     * @name ApiClient#deleteExistingAssets
     * @returns {Promise}
     * @fulfil {IAsset[]} Information on the deleted assets.
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    ApiClient.prototype.deleteExistingAssets = function () {
        var _this = this;
        var mapFn = function (a) { return _this.deleteAsset(a.id); };
        return this.getExistingAssets()
            .then(function (as) { return Promise.all(as.map(mapFn)); })
            .catch(function (e) { return Promise.reject(e); });
    };
    /**
     * Delete existing components.
     *
     * @name ApiClient#deleteExistingComponents
     * @returns {Promise}
     * @fulfil {IComponent[]} A list of deleted components details.
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    ApiClient.prototype.deleteExistingComponents = function () {
        var _this = this;
        var mapFn = function (c) { return _this.deleteComponent(c.id); };
        return this.getExistingComponents()
            .then(function (cs) { return Promise.all(cs.map(mapFn)); })
            .catch(function (e) { return Promise.reject(e); });
    };
    /**
     * Delete all existing stories.
     *
     * @name ApiClient#deleteExistingStories
     * @returns {Promise}
     * @fulfil {IStory[]} A list of deleted stories details.
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    ApiClient.prototype.deleteExistingStories = function () {
        return __awaiter(this, void 0, void 0, function () {
            var existing, filterFn, root, mapFn, deleted, remainder, _a, _b, e_2;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.getExistingStories()];
                    case 1:
                        existing = _c.sent();
                        filterFn = function (s) { return s.parent_id === 0; };
                        root = existing.filter(filterFn);
                        mapFn = function (s) { return _this.deleteStory(s.id); };
                        return [4 /*yield*/, Promise.all(root.map(mapFn))];
                    case 2:
                        deleted = _c.sent();
                        return [4 /*yield*/, this.getExistingStories()];
                    case 3:
                        remainder = _c.sent();
                        _b = (_a = deleted).concat;
                        return [4 /*yield*/, Promise.all(remainder.map(mapFn))];
                    case 4: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                    case 5:
                        e_2 = _c.sent();
                        throw e_2;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
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
    ApiClient.prototype.getAsset = function (id) {
        var url = "/" + this.spaceId + "/assets/" + id;
        return this.storyblok
            .get(url, exports.retrySettings.burst)
            .then(function (r) { return r.data; })
            .catch(function (e) { return Promise.reject(e); });
    };
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
    ApiClient.prototype.getAssetByUrl = function (url) {
        var responseHandler = function (as) {
            var findFn = function (a) { return a.filename === url; };
            var asset = as.find(findFn);
            if (!asset) {
                throw new Error('unable to find an asset by this url');
            }
            else {
                return asset;
            }
        };
        return this.getExistingAssets()
            .then(responseHandler)
            .catch(function (e) { return Promise.reject(e); });
    };
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
    ApiClient.prototype.getAssetFolder = function (id) {
        var url = "/" + this.spaceId + "/asset_folders/" + id;
        return this.storyblok
            .get(url, exports.retrySettings.burst)
            .then(function (r) { return r.data.asset_folder; })
            .catch(function (e) { return Promise.reject(e); });
    };
    /**
     * Get asset folders by matching asset folders names to the supplied string.
     *
     * @name ApiClient#getAssetFolderByName
     * @param {string} searchString - String to search by.
     * @returns {Promise}
     * @fulfil {IAssetFolder[]} List of matched asset folders.
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    ApiClient.prototype.getAssetFolderByName = function (searchString) {
        var url = "/" + this.spaceId + "/asset_folders";
        var query = "?search=" + searchString;
        return this.storyblok
            .get(url + query, exports.retrySettings.burst)
            .then(function (r) { return r.data.asset_folders; })
            .catch(function (e) { return Promise.reject(e); });
    };
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
    ApiClient.prototype.getAssetsByPage = function (page, perPage) {
        if (page === void 0) { page = 1; }
        if (perPage === void 0) { perPage = 25; }
        var url = "/" + this.spaceId + "/assets";
        var query = "?per_page=" + perPage + "&page=" + page;
        return this.storyblok
            .get(url + query, exports.retrySettings.burst)
            .then(function (r) { return r.data.assets; })
            .catch(function (e) { return Promise.reject(e); });
    };
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
    ApiClient.prototype.getComponent = function (id) {
        var url = "/" + this.spaceId + "/components/" + id;
        return this.storyblok
            .get(url, exports.retrySettings.burst)
            .then(function (r) { return r.data.component; })
            .catch(function (e) { return Promise.reject(e); });
    };
    /**
     * List all existing assets.
     *
     * @name ApiClient#getExistingAssets
     * @returns {Promise}
     * @fulfil {IAsset[]} A list of existing assets.
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    ApiClient.prototype.getExistingAssets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var perPage_1, total, pageCount, pageIndices, mapFn, arrayOfAssets, e_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        perPage_1 = 1000;
                        return [4 /*yield*/, this.countAssets()];
                    case 1:
                        total = _a.sent();
                        pageCount = Math.ceil(total / perPage_1);
                        if (pageCount === 0) {
                            return [2 /*return*/, []];
                        }
                        pageIndices = Array.from(Array(pageCount).keys());
                        mapFn = function (pi) { return _this.getAssetsByPage(pi + 1, perPage_1); };
                        return [4 /*yield*/, Promise.all(pageIndices.map(mapFn))];
                    case 2:
                        arrayOfAssets = _a.sent();
                        return [2 /*return*/, [].concat.apply([], arrayOfAssets)];
                    case 3:
                        e_3 = _a.sent();
                        throw e_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * List existing components.
     *
     * @name ApiClient#getExistingComponents
     * @returns {Promise}
     * @fulfil {IComponent[]} A list of component definitions.
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    ApiClient.prototype.getExistingComponents = function () {
        var url = "/" + this.spaceId + "/components";
        return this.storyblok
            .get(url, exports.retrySettings.burst)
            .then(function (r) { return r.data.components; })
            .catch(function (e) { return Promise.reject(e); });
    };
    /**
     * Get existing asset folders.
     *
     * @name ApiClient#getExistingAssetFolders
     * @returns {Promise}
     * @fulfil {IAssetFolder[]} List of existing asset folders.
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    ApiClient.prototype.getExistingAssetFolders = function () {
        var url = "/" + this.spaceId + "/asset_folders?search";
        return this.storyblok
            .get(url, exports.retrySettings.burst)
            .then(function (r) { return r.data.asset_folders; })
            .catch(function (e) { return Promise.reject(e); });
    };
    /**
     * List all existing stories.
     *
     * @name ApiClient#getExistingStories
     * @returns {Promise}
     * @fulfil {IStory[]} A list of existing content stories.
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    ApiClient.prototype.getExistingStories = function () {
        return __awaiter(this, void 0, void 0, function () {
            var perPage_2, pageCount, pageIndices, mapFn, arrayOfStories, e_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        perPage_2 = 1000;
                        return [4 /*yield*/, this.countStoryPages(perPage_2)];
                    case 1:
                        pageCount = _a.sent();
                        if (pageCount === 0) {
                            return [2 /*return*/, []];
                        }
                        pageIndices = Array.from(Array(pageCount).keys());
                        mapFn = function (pi) { return _this.getStoriesByPage(pi + 1, perPage_2); };
                        return [4 /*yield*/, Promise.all(pageIndices.map(mapFn))];
                    case 2:
                        arrayOfStories = _a.sent();
                        return [2 /*return*/, [].concat.apply([], arrayOfStories)];
                    case 3:
                        e_4 = _a.sent();
                        throw e_4;
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
     * @memberof ApiClient
     */
    ApiClient.prototype.getSpace = function () {
        var url = "/" + this.spaceId;
        return this.storyblok
            .get(url, exports.retrySettings.burst)
            .then(function (r) { return r.data.space; })
            .catch(function (e) { return Promise.reject(e); });
    };
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
    ApiClient.prototype.getStoriesByPage = function (page, perPage) {
        if (page === void 0) { page = 1; }
        if (perPage === void 0) { perPage = 25; }
        var url = "/" + this.spaceId + "/stories";
        var query = "?per_page=" + perPage + "&page=" + page;
        return this.storyblok
            .get(url + query, exports.retrySettings.burst)
            .then(function (r) { return r.data.stories; })
            .catch(function (e) { return Promise.reject(e); });
    };
    ApiClient.prototype.getStory = function (id) {
        var url = "/" + this.spaceId + "/stories/" + id;
        return this.storyblok
            .get(url, exports.retrySettings.burst)
            .then(function (r) { return r.data.story; })
            .catch(function (e) { return Promise.reject(e); });
    };
    /**
     * Publish all unpublished stories.
     *
     * @name ApiClient#stories#publishPendings
     * @returns {Promise}
     * @fulfil {IStory[]} List of published stories.
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    ApiClient.prototype.publishPendingStories = function () {
        return __awaiter(this, void 0, void 0, function () {
            var existing, filterFn, pendings, mapFn, e_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getExistingStories()];
                    case 1:
                        existing = _a.sent();
                        filterFn = function (s) { return !s.is_folder && !s.published; };
                        pendings = existing.filter(filterFn);
                        mapFn = function (s) { return _this.publishStory(s.id); };
                        return [4 /*yield*/, Promise.all(pendings.map(mapFn))];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        e_5 = _a.sent();
                        throw e_5;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
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
    ApiClient.prototype.publishStory = function (id) {
        var url = "/" + this.spaceId + "/stories/" + id + "/publish";
        return this.storyblok
            .get(url, exports.retrySettings.burst)
            .then(function (r) { return r.data.story; })
            .catch(function (e) { return Promise.reject(e); });
    };
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
    ApiClient.prototype.registerAsset = function (data) {
        var url = "/" + this.spaceId + "/assets";
        return this.storyblok
            .post(url, data, exports.retrySettings.extended)
            .then(function (r) { return r.data; })
            .catch(function (e) { return Promise.reject(e); });
    };
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
    ApiClient.prototype.reorderStory = function (id, afterId) {
        var _this = this;
        var url = "/" + this.spaceId + "/stories/" + id + "/move";
        var query = "?after_id=" + afterId;
        return this.storyblok
            .put(url + query, exports.retrySettings.burst)
            .then(function () { return _this.getStory(id); })
            .catch(function (e) { return Promise.reject(e); });
    };
    /**
     * Update a component.
     *
     * @name ApiClient#updateComponent
     * @param {IComponent} data - Storyblok component data object with modified info.
     * @returns {Promise}
     * @fulfil {IComponent} Details of component that was updated.
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    ApiClient.prototype.updateComponent = function (data) {
        var url = "/" + this.spaceId + "/components/" + data.id;
        return this.storyblok
            .put(url, { component: data }, exports.retrySettings.burst)
            .then(function (r) { return r.data.component; })
            .catch(function (e) { return Promise.reject(e); });
    };
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
    ApiClient.prototype.updateStory = function (data) {
        var url = "/" + this.spaceId + "/stories/" + data.id;
        return this.storyblok
            .put(url, { story: data }, exports.retrySettings.burst)
            .then(function (r) { return r.data.story; })
            .catch(function (e) { return Promise.reject(e); });
    };
    /**
     * Upload a registered asset with failure-retry (20 retries and incremental delay period of 1250ms with +/- 500ms variance).
     *
     * @name ApiClient#uploadAsset
     * @param {Buffer} buffer - Buffered asset data.
     * @param {IRegistration} registration - Registration info.
     * @returns {Promise}
     * @fulfil {string} Access url of the uploaded asset.
     * @reject {AxiosError} Axios error.
     * @memberof ApiClient
     */
    ApiClient.prototype.uploadAsset = function (buffer, registration) {
        var formData = new FormData();
        var formFields = registration.fields;
        for (var key in formFields) {
            if (key in formFields) {
                formData.append(key, formFields[key]);
            }
        }
        formData.append('file', buffer);
        return new Promise(function (resolve, reject) {
            var variance = function () { return Math.floor(Math.random() * 500) + 1; };
            var retries = 20;
            var retryDelay = 1250;
            var retryCount = 0;
            var callback = function (e) {
                if (!e || retryCount > retries) {
                    return e ? reject(e) : resolve(registration.pretty_url);
                }
                else {
                    retryCount += 1;
                    return new Promise(function (r) {
                        setTimeout(function () {
                            console.log("retry no. " + retryCount);
                            console.log("asset: " + registration.public_url);
                            console.log("post - " + registration.post_url);
                            console.log(e);
                            return r();
                        }, (retryDelay - variance()) * retryCount);
                    }).then(function () { return formData.submit(registration.post_url, callback); });
                }
            };
            formData.submit(registration.post_url, callback);
        });
    };
    return ApiClient;
}());
exports.ApiClient = ApiClient;
//# sourceMappingURL=ApiClient.js.map