"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Asset_1 = require("./Asset");
var AssetFolder_1 = require("./AssetFolder");
var Component_1 = require("./Component");
var Content_1 = require("./Content");
var Folder_1 = require("./Folder");
var FolderIndex_1 = require("./FolderIndex");
var RootFolder_1 = require("./RootFolder");
var Space_1 = require("./Space");
var Story_1 = require("./Story");
var Subfolder_1 = require("./Subfolder");
var ApiClient_1 = require("../ApiClient");
var apiClient;
function abstraction(credentials) {
    if (!apiClient) {
        if (!credentials) {
            throw new Error('API access credentials must be provided at initial call');
        }
        apiClient = new ApiClient_1.ApiClient(credentials.apiToken, credentials.spaceId);
    }
    return {
        Asset: function (filePath, assetFolder) {
            return new Asset_1.Asset(apiClient, filePath, assetFolder);
        },
        AssetFolder: function (data) { return new AssetFolder_1.AssetFolder(apiClient, data); },
        Component: function (data) { return new Component_1.Component(apiClient, data); },
        Content: function (data, parent) { return new Content_1.Content(apiClient, data, parent); },
        Folder: function (data) { return new Folder_1.Folder(apiClient, data); },
        FolderIndex: function (data, parent) { return new FolderIndex_1.FolderIndex(apiClient, data, parent); },
        RootFolder: function (data) { return new RootFolder_1.RootFolder(apiClient, data); },
        Space: function () { return new Space_1.Space(apiClient); },
        Story: function (data) { return new Story_1.Story(apiClient, data); },
        Subfolder: function (data, parent) { return new Subfolder_1.Subfolder(apiClient, data, parent); },
    };
}
exports.abstraction = abstraction;
//# sourceMappingURL=index.js.map