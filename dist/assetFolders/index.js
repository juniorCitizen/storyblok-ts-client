"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var p_throttle_1 = require("p-throttle");
var config = require("../config");
var utilities_1 = require("../utilities");
var baseURL = config.baseURL;
var apiRequest = p_throttle_1.default(axios_1.default, config.callsPerInterval, config.interval);
/**
 * create an asset folder
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param name - name of asset folder to create
 * @returns details of the asset folder created
 */
function create(_a, name) {
    var spaceId = _a.spaceId, apiToken = _a.apiToken;
    return apiRequest({
        baseURL: baseURL,
        data: { asset_folder: { name: name } },
        headers: { Authorization: apiToken },
        method: 'post',
        url: spaceId + "/asset_folders",
    })
        .then(function (res) { return res.data.asset_folder; })
        .catch(function (error) {
        return Promise.reject(utilities_1.axiosErrorHandler(error, 'assetFolders.create()'));
    });
}
exports.create = create;
/**
 * delete a specific asset folder
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param id - id of asset folder to be deleted
 */
function deleteAssetFolder(_a, id) {
    var spaceId = _a.spaceId, apiToken = _a.apiToken;
    return apiRequest({
        baseURL: baseURL,
        headers: { Authorization: apiToken },
        method: 'delete',
        url: spaceId + "/asset_folders/" + id,
    })
        .then(function () { return Promise.resolve(); })
        .catch(function (error) {
        return Promise.reject(utilities_1.axiosErrorHandler(error, 'assetFolders.deleteAssetFolder()'));
    });
}
exports.deleteAssetFolder = deleteAssetFolder;
/**
 * delete all existing asset folders
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 */
function deleteExisting(credentials) {
    return getExisting(credentials)
        .then(function (existingAssetFolders) {
        var mapFn = function (assetFolder) {
            return deleteAssetFolder(credentials, assetFolder.id);
        };
        return Promise.all(existingAssetFolders.map(mapFn));
    })
        .catch(function (error) { return Promise.reject(error); });
}
exports.deleteExisting = deleteExisting;
/**
 * get a specific asset folder
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param id - asset folder id to get
 * @returns asset folder information
 */
function get(_a, id) {
    var spaceId = _a.spaceId, apiToken = _a.apiToken;
    return apiRequest({
        baseURL: baseURL,
        headers: { Authorization: apiToken },
        method: 'get',
        url: spaceId + "/asset_folders/" + id,
    })
        .then(function (res) { return res.data.asset_folder; })
        .catch(function (error) {
        return Promise.reject(utilities_1.axiosErrorHandler(error, 'assetFolders.get()'));
    });
}
exports.get = get;
/**
 * get existing asset folders
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns list of existing asset folders
 */
function getExisting(_a) {
    var spaceId = _a.spaceId, apiToken = _a.apiToken;
    return apiRequest({
        baseURL: baseURL,
        headers: { Authorization: apiToken },
        method: 'get',
        url: spaceId + "/asset_folders?search",
    })
        .then(function (res) { return res.data.asset_folders; })
        .catch(function (error) {
        return Promise.reject(utilities_1.axiosErrorHandler(error, 'assetFolders.getExisting()'));
    });
}
exports.getExisting = getExisting;
/**
 * search asset folders by matching asset folder names to the supplied string
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param name - string to search asset folders by
 * @returns list of asset folders that matches the name string
 */
function searchByName(_a, name) {
    var spaceId = _a.spaceId, apiToken = _a.apiToken;
    return apiRequest({
        baseURL: baseURL,
        headers: { Authorization: apiToken },
        method: 'get',
        url: spaceId + "/asset_folders?search=" + name,
    })
        .then(function (res) { return res.data.asset_folders; })
        .catch(function (error) {
        return Promise.reject(utilities_1.axiosErrorHandler(error, 'assetFolders.searchByName()'));
    });
}
exports.searchByName = searchByName;
//# sourceMappingURL=index.js.map