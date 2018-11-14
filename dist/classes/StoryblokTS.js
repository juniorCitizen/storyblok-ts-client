"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var p_throttle_1 = require("p-throttle");
var qs = require("qs");
var memory = {};
/**
 * This is a thin wrapper for the Storyblok API's to use in Node.js and the browser.  It is a typescript conversion of the Universal Javascript SDK library (https://www.npmjs.com/package/storyblok-js-client).
 *
 * @export
 * @class StoryblokTS
 * @param {any} config - Configurations.
 * @param {string} config.accessToken - The preview token you can find in your space dashboard at https://app.storyblok.com.
 * @param {any} [config.cache] - Cache types.
 * @param {string} config.cache.type - 'none' or 'memory'.
 * @param {string} config.cache.clear - 'auto' or 'manual'.
 * @param {any} [config.headers] - Request headers.
 * @param {string} [config.region] - Region.
 * @param {boolean} [config.https] - Switch for https.
 * @param {string} [config.oauthToken] - Management API key.
 * @param {number} [rateLimit] - Throttle value (defaults to 3 for management api and 5 for cdn api).
 * @param {string} [endpoint] - API endpoint.
 * @example
 * // Example for using the content delivery api
 * // 1. Require the Storyblok client
 * const {StoryblokTS} = require('storyblok-ts-client')
 * // 2. Initialize the client with the preview
 * //    token from your space dashboard at
 * //    https://app.storyblok.com
 * let Storyblok = new StoryblokClient({
 *   accessToken: 'your_access_token'
 * })
 *
 * // Example for using the content management api
 * // 1. Require the Storyblok client
 * const {StoryblokTS} = require('storyblok-ts-client')
 * const spaceId = 12345
 * // 2. Initialize the client with the oauth token
 * //    from the my account area at
 * //    https://app.storyblok.com
 * let Storyblok = new StoryblokClient({
 *   oauthToken: 'YOUR_OAUTH_TOKEN'
 * })
 * Storyblok.post(`spaces/${spaceId}/stories`, {story: {name: 'xy', slug: 'xy'}})
 * Storyblok.put(`spaces/${spaceId}/stories/1`, {story: {name: 'xy', slug: 'xy'}})
 * Storyblok.delete(`spaces/${spaceId}/stories/1`, null)
 */
var StoryblokTS = /** @class */ (function () {
    function StoryblokTS(config, endpoint) {
        this.cacheVersion = undefined;
        if (!endpoint) {
            var region = config.region ? "-" + config.region : '';
            var protocol = config.https === false ? 'http' : 'https';
            endpoint = protocol + "://api" + region + ".storyblok.com/v1";
        }
        var headers = __assign({}, config.headers);
        var rateLimit = 5; // per second for cdn api
        if (typeof config.oauthToken !== 'undefined') {
            headers.Authorization = config.oauthToken;
            rateLimit = 3; // per second for management api
        }
        if (typeof config.rateLimit !== 'undefined') {
            rateLimit = config.rateLimit;
        }
        this.throttle = p_throttle_1.default(this.throttledRequest, rateLimit, 1000);
        this.cacheVersion = this.cacheVersion || this.newVersion();
        this.accessToken = config.accessToken;
        this.cache = config.cache || { clear: 'manual' };
        this.client = axios_1.default.create({
            baseURL: endpoint,
            headers: headers,
            proxy: config.proxy || false,
            timeout: config.timeout || 0,
        });
    }
    StoryblokTS.prototype.get = function (slug, params) {
        var query = params || {};
        var url = "/" + slug;
        if (url.indexOf('/cdn/') > -1) {
            if (!query.version) {
                query.version = 'published';
            }
            if (!query.cv) {
                query.cv = this.cacheVersion;
            }
            if (!query.token) {
                query.token = this.getToken();
            }
        }
        return this.cacheResponse(url, query);
    };
    StoryblokTS.prototype.post = function (slug, params) {
        return this.throttle('post', "/" + slug, params);
    };
    StoryblokTS.prototype.put = function (slug, params) {
        return this.throttle('put', "/" + slug, params);
    };
    StoryblokTS.prototype.delete = function (slug, params) {
        return this.throttle('delete', "/" + slug, params);
    };
    StoryblokTS.prototype.flushCache = function () {
        this.cacheVersion = this.newVersion();
        this.cacheProvider().flush();
        return this;
    };
    StoryblokTS.prototype.getStories = function (params) {
        return this.get('cdn/stories', params);
    };
    StoryblokTS.prototype.getStory = function (slug, params) {
        return this.get("cdn/stories/" + slug, params);
    };
    StoryblokTS.prototype.setToken = function (token) {
        this.accessToken = token;
    };
    StoryblokTS.prototype.getToken = function () {
        return this.accessToken;
    };
    StoryblokTS.prototype.cacheResponse = function (url, params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var cacheKey = qs.stringify({ url: url, params: params }, { arrayFormat: 'brackets' });
            var provider = _this.cacheProvider();
            var cache = provider.get(cacheKey);
            if (_this.cache.clear === 'auto' && params.version === 'draft') {
                _this.flushCache();
            }
            if (params.version === 'published' && cache) {
                resolve(cache);
            }
            else {
                var opts_1 = { arrayFormat: 'brackets' };
                var serializer = function (p) { return qs.stringify(p, opts_1); };
                _this.throttle('get', url, { params: params, paramsSerializer: serializer })
                    .then(function (res) {
                    var response = { data: res.data, headers: res.headers };
                    if (res.headers['per-page']) {
                        response = __assign({}, response, { perPage: parseInt(res.headers['per-page'], 10), total: parseInt(res.headers.total, 10) });
                    }
                    if (res.status !== 200) {
                        return reject(res);
                    }
                    if (params.version === 'published') {
                        provider.set(cacheKey, response);
                    }
                    resolve(response);
                })
                    .catch(reject);
            }
        });
    };
    StoryblokTS.prototype.throttledRequest = function (type, url, params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client[type](url, params)
                .then(resolve)
                .catch(reject);
        });
    };
    StoryblokTS.prototype.newVersion = function () {
        return new Date().getTime();
    };
    StoryblokTS.prototype.cacheProvider = function () {
        switch (this.cache.type) {
            case 'memory':
                return {
                    get: function (key) {
                        return memory[key];
                    },
                    set: function (key, content) {
                        memory[key] = content;
                    },
                    flush: function () {
                        memory = {};
                    },
                };
                break;
            default:
                this.cacheVersion = this.newVersion();
                return {
                    get: function () {
                        return;
                    },
                    set: function () {
                        return;
                    },
                    flush: function () {
                        return;
                    },
                };
        }
    };
    return StoryblokTS;
}());
exports.StoryblokTS = StoryblokTS;
//# sourceMappingURL=StoryblokTS.js.map