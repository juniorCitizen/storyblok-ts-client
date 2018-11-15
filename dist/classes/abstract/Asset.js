"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var imageProcessing_1 = require("../../utilities/imageProcessing");
var ApiClient_1 = require("../ApiClient");
var Asset = /** @class */ (function () {
    function Asset(credentials, filePath, assetFolder) {
        this.credentials = credentials;
        this.apiClient = new ApiClient_1.ApiClient(this.credentials.apiToken, this.credentials.spaceId);
        this.assetFolder = assetFolder;
        this.filePath = filePath;
        this.data = {
            filename: path.parse(this.filePath).base,
        };
    }
    Object.defineProperty(Asset.prototype, "isSynced", {
        get: function () {
            var baseUrl = '//a.storyblok.com/f/';
            return this.data.filename.includes(baseUrl);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Asset.prototype, "prettyUrl", {
        get: function () {
            if (!this.isSynced) {
                throw new Error('uninitialized asset');
            }
            return this.data.filename;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Asset.prototype, "publicUrl", {
        get: function () {
            if (!this.isSynced) {
                throw new Error('uninitialized asset');
            }
            return this.data.filename.replace('//a.storyblok.com/f', 'https://s3.amazonaws.com/a.storyblok.com/f');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Asset.prototype, "folder", {
        get: function () {
            return this.assetFolder ? this.assetFolder.name : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Asset.prototype.generatePhoto = function () {
        var _this = this;
        this.setAssetFolder();
        return this.apiClient.assets
            .createFromImage(this.data, this.filePath, true, 640)
            .then(function (prettyUrl) {
            _this.data.filename = prettyUrl;
            return console.log("'" + _this.prettyUrl + "' is created");
        })
            .catch(function (e) { return Promise.reject(e); });
    };
    Asset.prototype.generateImage = function () {
        var _this = this;
        this.setAssetFolder();
        var methods = this.apiClient.assets;
        return methods
            .register(this.data)
            .then(function (registration) {
            return imageProcessing_1.imageToBuffer(_this.filePath, false)
                .then(function (buffer) { return methods.upload(buffer, registration); })
                .catch(function (e) { return Promise.reject(e); });
        })
            .then(function (prettyUrl) {
            _this.data.filename = prettyUrl;
            return console.log("'" + _this.prettyUrl + "' is created");
        })
            .catch(function (e) { return Promise.reject(e); });
    };
    Asset.prototype.setAssetFolder = function () {
        if (this.assetFolder && this.assetFolder.id) {
            this.data.asset_folder_id = this.assetFolder.id;
        }
    };
    return Asset;
}());
exports.Asset = Asset;
//# sourceMappingURL=Asset.js.map