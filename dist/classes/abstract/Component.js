"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiClient_1 = require("../ApiClient");
var Component = /** @class */ (function () {
    function Component(credentials, data) {
        this.credentials = credentials;
        this.apiClient = new ApiClient_1.ApiClient(this.credentials.apiToken, this.credentials.spaceId);
        this.data = data;
    }
    Object.defineProperty(Component.prototype, "schema", {
        get: function () {
            return this.data.schema;
        },
        enumerable: true,
        configurable: true
    });
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
    Component.prototype.updateSchema = function (schema) {
        var _this = this;
        var updatedData = JSON.parse(JSON.stringify(this.data));
        updatedData.schema = schema;
        return this.apiClient.components
            .update(updatedData)
            .then(function (updatedComponent) {
            _this.data = updatedComponent;
            return Promise.resolve();
        })
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