"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./Asset"));
__export(require("./AssetFolder"));
__export(require("./Component"));
__export(require("./Content"));
__export(require("./Folder"));
__export(require("./FolderIndex"));
__export(require("./RootFolder"));
__export(require("./Space"));
__export(require("./Story"));
__export(require("./Subfolder"));
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