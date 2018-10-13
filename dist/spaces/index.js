"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var p_throttle_1 = require("p-throttle");
var config = require("../config");
var utilities_1 = require("../utilities");
var baseURL = config.baseURL;
var apiRequest = p_throttle_1.default(axios_1.default, config.callsPerInterval, config.interval);
/**
 * get working space information
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns space information
 */
function get(_a) {
    var spaceId = _a.spaceId, apiToken = _a.apiToken;
    return apiRequest({
        baseURL: baseURL,
        headers: { Authorization: apiToken },
        method: 'get',
        url: "" + spaceId,
    })
        .then(function (res) { return res.data.space; })
        .catch(function (error) {
        return Promise.reject(utilities_1.axiosErrorHandler(error, 'spaces.get()'));
    });
}
exports.get = get;
//# sourceMappingURL=index.js.map