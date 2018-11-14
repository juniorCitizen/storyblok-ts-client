"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiClient_1 = require("./ApiClient");
var Space = /** @class */ (function () {
    function Space(credentials) {
        this.apiToken = credentials.apiToken;
        this.spaceId = credentials.spaceId;
        this.apiClient = new ApiClient_1.ApiClient(this.apiToken, this.spaceId);
        this.data = undefined;
    }
    Object.defineProperty(Space.prototype, "id", {
        get: function () {
            if (!this.data) {
                throw new Error('uninitialized space');
            }
            return this.data.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Space.prototype, "name", {
        get: function () {
            if (!this.data) {
                throw new Error('uninitialized space');
            }
            return this.data.name;
        },
        enumerable: true,
        configurable: true
    });
    Space.prototype.teardown = function () {
        var _this = this;
        return this.apiClient.stories
            .deleteExisting()
            .then(function (ss) { return console.log("deleted " + ss.length + " stories"); })
            .then(function () { return _this.apiClient.assets.deleteExisting(); })
            .then(function (as) { return console.log("deleted " + as.length + " assets"); })
            .then(function () { return _this.apiClient.assetFolders.deleteExisting(); })
            .then(function (afs) { return console.log("deleted " + afs.length + " asset folders"); })
            .then(function () { return _this.apiClient.components.deleteExisting(); })
            .then(function (c) { return console.log("deleted " + c.length + " components"); })
            .then(function () { return console.log('space teardown completed'); })
            .catch(function (e) { return Promise.reject(e); });
    };
    Space.prototype.publishAll = function () {
        return this.apiClient.stories
            .publishPendings()
            .then(function (stories) { return console.log("published " + stories.length + " stories"); })
            .catch(function (e) { return Promise.reject(e); });
    };
    Space.prototype.sync = function () {
        var _this = this;
        return this.apiClient.spaces
            .get()
            .then(function (space) {
            _this.data = space;
            var message = _this.name + "(id: " + _this.id + ") verified";
            return console.log(message);
        })
            .catch(function (e) { return Promise.reject(e); });
    };
    return Space;
}());
exports.Space = Space;
//# sourceMappingURL=Space.js.map