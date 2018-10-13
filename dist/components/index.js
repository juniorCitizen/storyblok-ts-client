"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var p_throttle_1 = require("p-throttle");
var config = require("../config");
var utilities_1 = require("../utilities");
var baseURL = config.baseURL;
var apiRequest = p_throttle_1.default(axios_1.default, config.callsPerInterval, config.interval);
/**
 * create a component
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param component - info on component to be created
 * @returns details of the component that was created
 */
function create(_a, component) {
    var spaceId = _a.spaceId, apiToken = _a.apiToken;
    return apiRequest({
        baseURL: baseURL,
        data: { component: component },
        headers: { Authorization: apiToken },
        method: 'post',
        url: spaceId + "/components",
    })
        .then(function (res) { return res.data.component; })
        .catch(function (error) {
        return Promise.reject(utilities_1.axiosErrorHandler(error, 'components.create()'));
    });
}
exports.create = create;
/**
 * delete a specific component
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param id - id of component to be deleted
 * @returns details of the deleted component
 */
function deleteComponent(_a, id) {
    var spaceId = _a.spaceId, apiToken = _a.apiToken;
    return apiRequest({
        baseURL: baseURL,
        headers: { Authorization: apiToken },
        method: 'delete',
        url: spaceId + "/components/" + id,
    })
        .then(function (res) { return res.data.component; })
        .catch(function (error) {
        return Promise.reject(utilities_1.axiosErrorHandler(error, 'components.deleteComponent()'));
    });
}
exports.deleteComponent = deleteComponent;
/**
 * delete all existing components
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns a list of deleted components details
 */
function deleteExisting(credentials) {
    return getExisting(credentials)
        .then(function (existingComponents) {
        var mapFn = function (component) {
            return deleteComponent(credentials, component.id);
        };
        return Promise.all(existingComponents.map(mapFn));
    })
        .catch(function (error) { return Promise.reject(error); });
}
exports.deleteExisting = deleteExisting;
/**
 * list all existing components (it is assumed that the working space has only 1,000 existing components at most)
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns List of component definitions
 */
function getExisting(_a) {
    var spaceId = _a.spaceId, apiToken = _a.apiToken;
    return apiRequest({
        baseURL: baseURL,
        headers: { Authorization: apiToken },
        method: 'get',
        params: { per_page: config.maxPerPage },
        url: spaceId + "/components",
    })
        .then(function (res) { return res.data.components; })
        .catch(function (error) {
        return Promise.reject(utilities_1.axiosErrorHandler(error, 'components.getExisting()'));
    });
}
exports.getExisting = getExisting;
//# sourceMappingURL=index.js.map