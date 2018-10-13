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
var axios_1 = require("axios");
var p_throttle_1 = require("p-throttle");
var requestPromise = require("request-promise");
var config = require("../config");
var spaces = require("../spaces");
var utilities_1 = require("../utilities");
var baseURL = config.baseURL;
var apiRequest = p_throttle_1.default(axios_1.default, config.callsPerInterval, config.interval);
/**
 * get total number of existing assets
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns a count of existing assets
 */
function count(credentials) {
    return spaces
        .get(credentials)
        .then(function (space) { return space.assets_count; })
        .catch(function (error) { return Promise.reject(error); });
}
exports.count = count;
/**
 * create an asset from image.  This method calls the assets.register(), resize/compress the image then finally upload the physical file with assets.upload() at one go
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param filePath - absolute file path to the image
 * @param compress - flag to compress image
 * @param dimensionLimit - resizing dimension limit value
 * @returns information of the created asset
 */
function createFromImage(credentials, asset, filePath, compress, dimensionLimit) {
    return Promise.all([
        register(credentials, asset),
        utilities_1.imageToBuffer(filePath, compress || true, dimensionLimit || 640),
    ])
        .then(function (_a) {
        var registration = _a[0], buffer = _a[1];
        return upload(credentials, buffer, registration);
    })
        .catch(function (error) { return Promise.reject(error); });
}
exports.createFromImage = createFromImage;
/**
 * delete a specific asset
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param id - id of the asset to be deleted
 * @return information on the deleted asset
 */
function deleteAsset(_a, id) {
    var spaceId = _a.spaceId, apiToken = _a.apiToken;
    return apiRequest({
        baseURL: baseURL,
        headers: { Authorization: apiToken },
        method: 'delete',
        url: spaceId + "/assets/" + id,
    })
        .then(function (res) { return res.data.assets; })
        .catch(function (error) {
        // resolves the request if the error is "not found (404)".  Sometimes an asset is registered but a corresponding physical file is not uploaded for some reason.  A delete request will result in 404 error, but the registered reference will be removed successfully
        return error.response && error.response.status === 404
            ? Promise.resolve()
            : Promise.reject(utilities_1.axiosErrorHandler(error, 'assets.deleteAsset()'));
    });
}
exports.deleteAsset = deleteAsset;
/**
 * delete all existing assets
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 */
function deleteExisting(credentials) {
    var mapFn = function (a) { return deleteAsset(credentials, a.id); };
    return getExisting(credentials)
        .then(function (existingAssets) { return Promise.all(existingAssets.map(mapFn)); })
        .catch(function (error) { return Promise.reject(error); });
}
exports.deleteExisting = deleteExisting;
/**
 * get a specific asset
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param id - id of asset to fetch for
 * @returns details of the asset found
 */
function get(_a, id) {
    var spaceId = _a.spaceId, apiToken = _a.apiToken;
    return apiRequest({
        baseURL: baseURL,
        headers: { Authorization: apiToken },
        method: 'get',
        url: spaceId + "/assets/" + id,
    })
        .then(function (res) { return res.data; })
        .catch(function (error) {
        return Promise.reject(utilities_1.axiosErrorHandler(error, 'assets.get()'));
    });
}
exports.get = get;
/**
 * list all existing assets
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns full list of existing assets
 */
function getExisting(_a) {
    var spaceId = _a.spaceId, apiToken = _a.apiToken;
    return count({ spaceId: spaceId, apiToken: apiToken })
        .then(function (assetCount) { return utilities_1.calcPageCount(assetCount); })
        .then(function (pageCount) {
        var indexArray = utilities_1.generateIndexArray(pageCount);
        var reqConfigList = indexArray.map(function (pageIndex) {
            return {
                baseURL: baseURL,
                headers: { Authorization: apiToken },
                method: 'get',
                params: { per_page: config.maxPerPage, page: pageIndex + 1 },
                url: spaceId + "/assets",
            };
        });
        return Promise.all(reqConfigList.map(function (reqConfig) { return apiRequest(reqConfig); }))
            .then(function (arrayOfResponses) { return arrayOfResponses.map(function (res) { return res.data.assets; }); })
            .then(function (arraysOfAssets) { return [].concat.apply([], arraysOfAssets); })
            .catch(function (error) {
            return Promise.reject(utilities_1.axiosErrorHandler(error, 'assets.getExisting()'));
        });
    })
        .catch(function (error) { return Promise.reject(error); });
}
exports.getExisting = getExisting;
/**
 * register a file as a Storyblok asset (the physical file still has to be uploaded AWS S3 bucket)
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param asset - information to create asset from
 * @param asset.filename - file name to register for
 * @param [asset.asset_folder_id] - information to create asset from
 * @param [asset.id] - 	if the id of the asset is provided it will be replaced by this
 * @returns asset signing result info
 */
function register(_a, asset) {
    var spaceId = _a.spaceId, apiToken = _a.apiToken;
    return apiRequest({
        baseURL: baseURL,
        data: asset,
        headers: { Authorization: apiToken },
        method: 'post',
        url: spaceId + "/assets",
    })
        .then(function (res) { return res.data; })
        .catch(function (error) {
        return Promise.reject(utilities_1.axiosErrorHandler(error, 'assets.register()'));
    });
}
exports.register = register;
/**
 * find a specific asset by access url
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param publicUrl - url to match by
 * @returns matched asset
 */
function searchByUrl(credentials, publicUrl) {
    return getExisting(credentials)
        .then(function (assets) { return assets.find(function (asset) { return asset.filename === publicUrl; }); })
        .catch(function (error) { return Promise.reject(error); });
}
exports.searchByUrl = searchByUrl;
/**
 * upload an asset after it is registered as a Storyblok asset
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param buffer - buffered asset
 * @param registration - asset registration info
 * @returns information of the uploaded asset
 */
function upload(credentials, buffer, registration) {
    return __awaiter(this, void 0, void 0, function () {
        var filename, contentType, formData, requestOptions;
        return __generator(this, function (_a) {
            filename = utilities_1.extractFileNameFromUrl(registration.public_url);
            contentType = registration.fields['Content-Type'];
            formData = registration.fields;
            formData.file = {
                options: { filename: filename, contentType: contentType },
                value: buffer,
            };
            requestOptions = {
                formData: formData,
                method: 'post',
                url: registration.post_url,
            };
            return [2 /*return*/, utilities_1.promiseRetry(function () { return requestPromise(requestOptions); }, 3)
                    .then(function () { return searchByUrl(credentials, registration.public_url); })
                    .then(function (asset) {
                    if (!asset) {
                        throw new Error('error uploading asset to server');
                    }
                    else {
                        return get(credentials, asset.id);
                    }
                })
                    .catch(function (error) { return Promise.reject(error); })];
        });
    });
}
exports.upload = upload;
//# sourceMappingURL=index.js.map