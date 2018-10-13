"use strict";
var assetFolders = require("./assetFolders");
var assets = require("./assets");
var components = require("./components");
var spaces = require("./spaces");
var stories = require("./stories");
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
function getApiClient(credentials) {
    return {
        assetFolders: {
            create: function (name) { return assetFolders.create(credentials, name); },
            delete: function (id) { return assetFolders.deleteAssetFolder(credentials, id); },
            deleteExisting: function () { return assetFolders.deleteExisting(credentials); },
            get: function (id) { return assetFolders.get(credentials, id); },
            getExisting: function () { return assetFolders.getExisting(credentials); },
            searchByName: function (name) { return assetFolders.searchByName(credentials, name); },
        },
        assets: {
            count: function () { return assets.count(credentials); },
            createFromImage: function (asset, filePath, compress, dimensionLimit) {
                return assets.createFromImage(credentials, asset, filePath, compress, dimensionLimit);
            },
            delete: function (id) { return assets.deleteAsset(credentials, id); },
            deleteExisting: function () { return assets.deleteExisting(credentials); },
            get: function (id) { return assets.get(credentials, id); },
            getExisting: function () { return assets.getExisting(credentials); },
            register: function (filename) { return assets.register(credentials, filename); },
            searchByUrl: function (publicUrl) { return assets.searchByUrl(credentials, publicUrl); },
            upload: function (buffer, signedResponse) {
                return assets.upload(credentials, buffer, signedResponse);
            },
        },
        components: {
            create: function (component) { return components.create(credentials, component); },
            delete: function (id) { return components.deleteComponent(credentials, id); },
            deleteExisting: function () { return components.deleteExisting(credentials); },
            getExisting: function () { return components.getExisting(credentials); },
        },
        spaces: {
            get: function () { return spaces.get(credentials); },
        },
        stories: {
            count: function () { return stories.count(credentials); },
            create: function (story) { return stories.create(credentials, story); },
            delete: function (id) { return stories.deleteStory(credentials, id); },
            deleteExisting: function () { return stories.deleteExisting(credentials); },
            get: function (id) { return stories.get(credentials, id); },
            getExisting: function () { return stories.getExisting(credentials); },
            publish: function (id) { return stories.publish(credentials, id); },
            publishPendings: function () { return stories.publishPendings(credentials); },
            reorder: function (id, afterId) { return stories.reorder(credentials, id, afterId); },
        },
    };
}
module.exports = getApiClient;
//# sourceMappingURL=index.js.map