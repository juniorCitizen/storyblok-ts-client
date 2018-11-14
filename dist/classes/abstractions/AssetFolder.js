"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssetFolder = /** @class */ (function () {
    function AssetFolder(apiClient, data) {
        this.apiClient = apiClient;
        this.data = data;
    }
    Object.defineProperty(AssetFolder.prototype, "name", {
        get: function () {
            return this.data.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetFolder.prototype, "id", {
        get: function () {
            if (!this.data.id) {
                throw new Error('uninitialized asset folder');
            }
            return this.data.id;
        },
        enumerable: true,
        configurable: true
    });
    AssetFolder.prototype.generate = function () {
        var _this = this;
        return this.sync()
            .then(function () { return console.log("'" + _this.name + "' asset folder generated"); })
            .catch(function (e) { return Promise.reject(e); });
    };
    AssetFolder.prototype.sync = function () {
        var _this = this;
        var request = !this.data.id
            ? this.apiClient.assetFolders.create(this.name)
            : this.apiClient.assetFolders.get(this.data.id);
        return request
            .then(function (assetFolder) {
            _this.data = assetFolder;
            return Promise.resolve();
        })
            .catch(function (e) { return Promise.reject(e); });
    };
    return AssetFolder;
}());
exports.AssetFolder = AssetFolder;
//# sourceMappingURL=AssetFolder.js.map