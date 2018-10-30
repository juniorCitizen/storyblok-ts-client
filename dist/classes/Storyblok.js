"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var p_throttle_1 = require("p-throttle");
var apiServerUrl = 'http://api.storyblok.com/v1/spaces';
var throttleLimit = 3;
/**
 * A class to provide basic CRUD request methods to Storyblok's management API with failure-retry options and built-in request throttling.  Uses axios library to facilitation the API calls.
 *
 * @export
 * @class Storyblok
 * @implements {IStoryblokClass}
 * @param {string} apiToken - API access token.
 * @example
 * const {Storyblok} = require('storyblok-ts-client')
 * const storyblok = new Storyblok('fake_api_token')
 */
var Storyblok = /** @class */ (function () {
    function Storyblok(apiToken) {
        this.apiToken = apiToken;
        this.axiosInstance = axios_1.default.create({
            baseURL: apiServerUrl,
            headers: { Authorization: this.apiToken },
        });
        this.throttled = {
            delete: p_throttle_1.default(this.axiosInstance.delete, throttleLimit, 1000),
            get: p_throttle_1.default(this.axiosInstance.get, throttleLimit, 1000),
            post: p_throttle_1.default(this.axiosInstance.post, throttleLimit, 1000),
            put: p_throttle_1.default(this.axiosInstance.put, throttleLimit, 1000),
        };
    }
    /**
     * DELETE request method.
     *
     * @param {string} [url='/'] - Request url.
     * @param {ICustomAxiosRequestConfig} [config] - Request config.
     * @returns {Promise<any>}
     * @example
     * const {Storyblok} = require('storyblok-ts-client')
     * const storyblok = new Storyblok('fake_api_token')
     * const spaceId = 12345
     * const storyId = 123456
     * const url = `/${spaceId}/stories/${storyId}`
     * storyblok.delete(url, {retries: 3, retryDelay: 1000})
     *   .then(res => console.log('deleted story id:', res.story.id))
     * // => deleted story id: 123456
     * @name Storyblok#delete
     * @memberof Storyblok
     */
    Storyblok.prototype.delete = function (url, config) {
        var _this = this;
        if (url === void 0) { url = '/'; }
        var interceptor = this.activateRetry();
        return this.throttled
            .delete(url, config || {})
            .then(function (response) {
            _this.deactivateRetry(interceptor);
            return response;
        })
            .catch(function (error) {
            _this.deactivateRetry(interceptor);
            return Promise.reject(error);
        });
    };
    /**
     * GET request method.
     *
     * @param {string} [url='/'] - Request url.
     * @param {ICustomAxiosRequestConfig} [config] - Request config.
     * @returns {Promise<any>}
     * @example
     * const {Storyblok} = require('storyblok-ts-client')
     * const storyblok = new Storyblok('fake_api_token')
     * const spaceId = 12345
     * const url = `/${spaceId}`
     * storyblok.get(url, {retries: 3, retryDelay: 1000})
     *   .then(res => console.log('space id:', res.space.id))
     * // => space id: 12345
     * @name Storyblok#get
     * @memberof Storyblok
     */
    Storyblok.prototype.get = function (url, config) {
        var _this = this;
        if (url === void 0) { url = '/'; }
        var interceptor = this.activateRetry();
        return this.throttled
            .get(url, config || {})
            .then(function (response) {
            _this.deactivateRetry(interceptor);
            return response;
        })
            .catch(function (error) {
            _this.deactivateRetry(interceptor);
            return Promise.reject(error);
        });
    };
    /**
     * POST request method.
     *
     * @param {string} [url='/'] - Request url.
     * @param {any} [data] - Request data body.
     * @param {ICustomAxiosRequestConfig} [config] - Request config.
     * @returns {Promise<any>}
     * @example
     * const {Storyblok} = require('storyblok-ts-client')
     * const storyblok = new Storyblok('fake_api_token')
     * const spaceId = 12345
     * const url = `/${spaceId}/stories`
     * const story = {
     *   name: 'test',
     *   slug: 'test',
     * }
     * storyblok.post(url, {story}, {retries: 3, retryDelay: 1000})
     *   .then(res => console.log('new story id:', res.story.id))
     * // => new story id: 123456
     * @name Storyblok#post
     * @memberof Storyblok
     */
    Storyblok.prototype.post = function (url, data, config) {
        var _this = this;
        if (url === void 0) { url = '/'; }
        var interceptor = this.activateRetry();
        return this.throttled
            .post(url, data || undefined, config || {})
            .then(function (response) {
            _this.deactivateRetry(interceptor);
            return response;
        })
            .catch(function (error) {
            _this.deactivateRetry(interceptor);
            return Promise.reject(error);
        });
    };
    /**
     * PUT request method.
     *
     * @param {string} [url='/'] - Request url.
     * @param {any} [data] - Request data body.
     * @param {ICustomAxiosRequestConfig} [config] - Request config.
     * @returns {Promise<any>}
     * @example
     * const {Storyblok} = require('storyblok-ts-client')
     * const storyblok = new Storyblok('fake_api_token')
     * const spaceId = 12345
     * const url = `/${spaceId}/stories`
     * const story = {name: 'test', slug: 'test'}
     * storyblok.post(url, {story}, {retries: 3, retryDelay: 1000})
     *   .then(res => {
     *     const newStoryId = res.story.id
     *     console.log('new story id:', newStoryId)
     *     console.log('new story name:', res.story.name)
     *     const updateContent = {name: 'new test', slug: 'test'}
     *     return storyblok.put(
     *       url + `/${newStoryId}`,
     *       {story: updateContent},
     *       {retries: 3, retryDelay: 1000}
     *     )
     *   })
     *   .then(res => console.log('updated story name:', res.story.name))
     *   .catch(e => console.log(e.config))
     * // => new story id: 123456
     * // => new story name: test
     * // => updated story name: new test
     * @name Storyblok#put
     * @memberof Storyblok
     */
    Storyblok.prototype.put = function (url, data, config) {
        var _this = this;
        if (url === void 0) { url = '/'; }
        var interceptor = this.activateRetry();
        return this.throttled
            .put(url, data || undefined, config || {})
            .then(function (response) {
            _this.deactivateRetry(interceptor);
            return response;
        })
            .catch(function (error) {
            _this.deactivateRetry(interceptor);
            return Promise.reject(error);
        });
    };
    /**
     * Uses axios's interceptors to faciliate failure-retry's.  Based on: "http://www.itomtan.com/2017/10/17/vue-axios-timeout-retry-callback"
     *
     * @private
     * @returns {number} - Id for the interceptor, so failure-retry action can be removed after the API request is completed.
     * @memberof Storyblok
     */
    Storyblok.prototype.activateRetry = function () {
        var _this = this;
        return this.axiosInstance.interceptors.response.use(function (response) { return Promise.resolve(response); }, function (error) {
            var config = error.config;
            if (!config || !config.retries) {
                return Promise.reject(error);
            }
            config.retryCount = config.retryCount || 0;
            if (config.retryCount > config.retries) {
                console.log('retry threshhold reached, promise is rejected');
                return Promise.reject(error);
            }
            var response = error.response;
            if (response) {
                if (response.status !== 429 && response.status < 500) {
                    console.log('terminal failure, promise is rejected');
                    console.log('status:', response.status);
                    console.log('message:', response.data);
                    console.dir(response.config);
                    return Promise.reject(error);
                }
                else {
                    config.retryCount += 1;
                    return new Promise(function (resolve) {
                        var variance = function () { return Math.floor(Math.random() * 500) + 1; };
                        var delay = (config.retryDelay || 1250) - variance();
                        var factor = config.retryCount;
                        setTimeout(function () {
                            console.log("retry no. " + config.retryCount);
                            console.log(config.method + ' - ' + config.url);
                            console.log(response.status + ' error: ' + response.data.error ||
                                response.statusText);
                            return resolve();
                        }, delay * factor);
                    }).then(function () { return _this.axiosInstance(config); });
                }
            }
        });
    };
    /**
     * Used to deactivate the failure-retry mechanism, by removing the interceptor.
     *
     * @private
     * @param {number} interceptor - Id of the interceptor
     * @memberof Storyblok
     */
    Storyblok.prototype.deactivateRetry = function (interceptor) {
        this.axiosInstance.interceptors.response.eject(interceptor);
    };
    return Storyblok;
}());
exports.Storyblok = Storyblok;
//# sourceMappingURL=Storyblok.js.map