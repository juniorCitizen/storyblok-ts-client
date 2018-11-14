"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiClient_1 = require("./ApiClient");
var Component = /** @class */ (function () {
    function Component(credentials, data) {
        this.apiToken = credentials.apiToken;
        this.spaceId = credentials.spaceId;
        this.apiClient = new ApiClient_1.ApiClient(this.apiToken, this.spaceId);
        this.data = data;
    }
    Object.defineProperty(Component.prototype, "id", {
        get: function () {
            if (!this.data.id) {
                throw new Error('uninitialized component');
            }
            return this.data.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "name", {
        get: function () {
            return this.data.name;
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.generate = function () {
        var _this = this;
        return this.sync()
            .then(function () { return console.log("'" + _this.name + "' component generated"); })
            .catch(function (e) { return Promise.reject(e); });
    };
    Component.prototype.sync = function () {
        var _this = this;
        var request = !this.data.id
            ? this.apiClient.components.create(this.data)
            : this.apiClient.components.get(this.data.id);
        return request
            .then(function (component) {
            _this.data = component;
            return Promise.resolve();
        })
            .catch(function (e) { return Promise.reject(e); });
    };
    return Component;
}());
exports.Component = Component;
//# sourceMappingURL=Component.js.map