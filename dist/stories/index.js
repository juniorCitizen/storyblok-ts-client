"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var p_throttle_1 = require("p-throttle");
var config = require("../config");
var utilities_1 = require("../utilities");
var baseURL = config.baseURL;
var apiRequest = p_throttle_1.default(axios_1.default, config.callsPerInterval, config.interval);
/**
 * get total number of existing stories (including folders)
 *
 * Storyblok API's space info does not account 'folders' as stories, and must be manually retrieved
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns a count of existing stories
 */
function count(_a) {
    var spaceId = _a.spaceId, apiToken = _a.apiToken;
    return apiRequest({
        baseURL: baseURL,
        headers: { Authorization: apiToken },
        method: 'get',
        url: spaceId + "/stories",
    })
        .then(function (res) {
        if (!res.headers.total) {
            throw new Error('property "total" is missing');
        }
        return parseInt(res.headers.total, 10);
    })
        .catch(function (error) {
        return Promise.reject(utilities_1.axiosErrorHandler(error, 'stories.count()'));
    });
}
exports.count = count;
/**
 * create a story
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param story - Storyblok story data object
 * @returns details of story that was created
 */
function create(_a, story) {
    var spaceId = _a.spaceId, apiToken = _a.apiToken;
    return apiRequest({
        baseURL: baseURL,
        data: { story: story },
        headers: { Authorization: apiToken },
        method: 'post',
        url: spaceId + "/stories",
    })
        .then(function (res) { return res.data.story; })
        .catch(function (error) {
        return Promise.reject(utilities_1.axiosErrorHandler(error, 'stories.create()'));
    });
}
exports.create = create;
/**
 * delete a specific story
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param storyId - id of the story to be deleted
 * @returns details of the story that was removed
 */
function deleteStory(_a, storyId) {
    var spaceId = _a.spaceId, apiToken = _a.apiToken;
    return apiRequest({
        baseURL: baseURL,
        headers: { Authorization: apiToken },
        method: 'delete',
        url: spaceId + "/stories/" + storyId,
    })
        .then(function (res) { return res.data.story; })
        .catch(function (error) {
        return Promise.reject(utilities_1.axiosErrorHandler(error, 'stories.deleteStory()'));
    });
}
exports.deleteStory = deleteStory;
/**
 * delete all existing stories
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns a list of details of deleted stories
 */
function deleteExisting(credentials) {
    var filterFn = function (story) { return story.parent_id === 0; };
    var mapFn = function (story) { return deleteStory(credentials, story.id); };
    return getExisting(credentials)
        .then(function (stories) { return stories.filter(filterFn); })
        .then(function (rootStories) { return Promise.all(rootStories.map(mapFn)); })
        .catch(function (error) { return Promise.reject(error); });
}
exports.deleteExisting = deleteExisting;
/**
 * get a specific story
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param storyId - id of the content story
 * @returns details of content story
 */
function get(_a, storyId) {
    var spaceId = _a.spaceId, apiToken = _a.apiToken;
    return apiRequest({
        baseURL: baseURL,
        headers: { Authorization: apiToken },
        method: 'get',
        url: spaceId + "/stories/" + storyId,
    })
        .then(function (res) { return res.data.story; })
        .catch(function (error) {
        return Promise.reject(utilities_1.axiosErrorHandler(error, 'stories.get()'));
    });
}
exports.get = get;
/**
 * list all existing stories
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns full list of existing content stories
 */
function getExisting(_a) {
    var spaceId = _a.spaceId, apiToken = _a.apiToken;
    return count({ spaceId: spaceId, apiToken: apiToken })
        .then(function (storyCount) { return utilities_1.calcPageCount(storyCount); })
        .then(function (pageCount) {
        var reqConfigList = utilities_1.generateIndexArray(pageCount).map(function (pageIndex) {
            return {
                baseURL: baseURL,
                headers: { Authorization: apiToken },
                method: 'get',
                params: { per_page: config.maxPerPage, page: pageIndex + 1 },
                url: spaceId + "/stories",
            };
        });
        return Promise.all(reqConfigList.map(function (reqConfig) { return apiRequest(reqConfig); }))
            .then(function (arrayOfResponses) { return arrayOfResponses.map(function (res) { return res.data.stories; }); })
            .then(function (arraysOfStories) { return [].concat.apply([], arraysOfStories); })
            .catch(function (error) {
            return Promise.reject(utilities_1.axiosErrorHandler(error, 'stories.getExisting()'));
        });
    })
        .catch(function (error) { return Promise.reject(error); });
}
exports.getExisting = getExisting;
/**
 * publish a specific story
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param storyId - story id
 * @returns published story
 */
function publish(_a, storyId) {
    var spaceId = _a.spaceId, apiToken = _a.apiToken;
    return apiRequest({
        baseURL: baseURL,
        headers: { Authorization: apiToken },
        method: 'get',
        url: "/" + spaceId + "/stories/" + storyId + "/publish",
    })
        .then(function (res) { return res.data.story; })
        .catch(function (error) {
        return Promise.reject(utilities_1.axiosErrorHandler(error, 'stories.publish()'));
    });
}
exports.publish = publish;
/**
 * publish all unpublished stories
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns list of published stories
 */
function publishPendings(credentials) {
    var filterFn = function (story) {
        return !story.is_folder && !story.published;
    };
    var mapFn = function (story) { return publish(credentials, story.id); };
    return getExisting(credentials)
        .then(function (stories) { return stories.filter(filterFn); })
        .then(function (unpublished) { return Promise.all(unpublished.map(mapFn)); })
        .catch(function (error) { return Promise.reject(error); });
}
exports.publishPendings = publishPendings;
/**
 * modify a story's sequential order
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param storyId - id of the story to be moved
 * @param afterId - to be positioned after story of this id
 * @returns details of the moved story
 */
function reorder(_a, storyId, afterId) {
    var spaceId = _a.spaceId, apiToken = _a.apiToken;
    return apiRequest({
        baseURL: baseURL,
        headers: { Authorization: apiToken },
        method: 'put',
        url: "/" + spaceId + "/stories/" + storyId + "/move?after_id=" + afterId,
    })
        .then(function () { return get({ spaceId: spaceId, apiToken: apiToken }, storyId); })
        .catch(function (error) {
        return Promise.reject(utilities_1.axiosErrorHandler(error, 'stories.reorder()'));
    });
}
exports.reorder = reorder;
/**
 * update a story
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param story - Storyblok story data object with modified info
 * @returns details of story that was updated
 */
function update(_a, story) {
    var spaceId = _a.spaceId, apiToken = _a.apiToken;
    return apiRequest({
        baseURL: baseURL,
        data: { story: story },
        headers: { Authorization: apiToken },
        method: 'put',
        url: spaceId + "/stories/" + story.id,
    })
        .then(function (res) { return res.data.story; })
        .catch(function (error) {
        return Promise.reject(utilities_1.axiosErrorHandler(error, 'stories.update()'));
    });
}
exports.update = update;
//# sourceMappingURL=index.js.map