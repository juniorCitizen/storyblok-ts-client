"use strict";
/**
 * @module Storyblok
 */
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var p_throttle_1 = require("p-throttle");
/**
 * Basic Storyblok management API CRUD client using axios.  See "https://api.storyblok.com/docs" for details.
 *
 * @class
 * @example
 * const {Storyblok} = require('storyblok-ts-client')
 * const storyblok = Storyblok('fake_api_token')
 *
 * return storyblok.get('/12345')
 *   .then(res => console.log('space id:', res.data.id))
 *   // => space id: 12345
 */
var Storyblok = /** @class */ (function () {
    /**
     * Class instantiation.
     *
     * @param {string} apiToken - API access token.
     */
    function Storyblok(apiToken) {
        this.apiToken = apiToken;
        this.axiosInst = axios_1.default.create({
            baseURL: "https://api.storyblok.com/v1/spaces",
            headers: { Authorization: this.apiToken },
        });
        var callsPerInterval = 3;
        var interval = 1000;
        this.throttledRequests = {
            delete: p_throttle_1.default(this.axiosInst.delete, callsPerInterval, interval),
            get: p_throttle_1.default(this.axiosInst.get, callsPerInterval, interval),
            post: p_throttle_1.default(this.axiosInst.post, callsPerInterval, interval),
            put: p_throttle_1.default(this.axiosInst.put, callsPerInterval, interval),
            request: p_throttle_1.default(this.axiosInst.request, callsPerInterval, interval),
        };
    }
    /**
     * General purpose 'delete' method to Storyblok using axios.
     *
     * @name Storyblok#delete
     * @param {string} url - Request url.
     * @param {AxiosRequestConfig} [config] - (optional) Request config.
     * @returns {Promise}
     * @fulfil {any} Resolved value.
     * @reject {any} Axios error.
     */
    Storyblok.prototype.delete = function (url, config) {
        return this.throttledRequests.delete(url, config || undefined);
    };
    /**
     * General purpose 'get' method to Storyblok using axios.
     *
     * @name Storyblok#get
     * @param {string} url - Request url.
     * @param {AxiosRequestConfig} [config] - (optional) Request config.
     * @returns {Promise}
     * @fulfil {any} Resolved value.
     * @reject {any} Axios error.
     */
    Storyblok.prototype.get = function (url, config) {
        return this.throttledRequests.get(url, config || undefined);
    };
    /**
     * General purpose 'post' method to Storyblok using axios.
     *
     * @name Storyblok#post
     * @param {string} url - Request url.
     * @param {any} [data] - (optional) Request body.
     * @param {AxiosRequestConfig} [config] - (optional) Request config.
     * @returns {Promise}
     * @fulfil {any} Resolved value.
     * @reject {any} Axios error.
     */
    Storyblok.prototype.post = function (url, data, config) {
        return this.throttledRequests.post(url, data || undefined, config || undefined);
    };
    /**
     * General purpose 'put' method to Storyblok using axios.
     *
     * @name Storyblok#put
     * @param {string} url - Request url.
     * @param {any} [data] - (optional) Request body.
     * @param {AxiosRequestConfig} [config] - (optional) Request config.
     * @returns {Promise}
     * @fulfil {any} Resolved value.
     * @reject {any} Axios error.
     */
    Storyblok.prototype.put = function (url, data, config) {
        return this.throttledRequests.put(url, data || undefined, config || undefined);
    };
    /**
     * All-purpose purpose request method to Storyblok using axios.
     *
     * @name Storyblok#request
     * @param {AxiosRequestConfig} config - Request config.
     * @returns {Promise}
     * @fulfil {any} Resolved value.
     * @reject {any} Axios error.
     */
    Storyblok.prototype.request = function (config) {
        return this.throttledRequests.request(config);
    };
    return Storyblok;
}());
exports.Storyblok = Storyblok;
//# sourceMappingURL=Storyblok.js.map