import { AxiosRequestConfig, AxiosResponse } from 'axios';
export interface ICustomAxiosRequestConfig extends AxiosRequestConfig {
    retries?: number;
    retryDelay?: number;
}
declare type RequestWithConfig = (url: string, config?: ICustomAxiosRequestConfig) => Promise<AxiosResponse>;
declare type RequestWithConfigAndData = (url: string, data?: any, config?: ICustomAxiosRequestConfig) => Promise<AxiosResponse>;
interface IStoryblokClass {
    delete: RequestWithConfig;
    get: RequestWithConfig;
    post: RequestWithConfigAndData;
    put: RequestWithConfigAndData;
}
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
export declare class Storyblok implements IStoryblokClass {
    private apiToken;
    private axiosInstance;
    private throttled;
    constructor(apiToken: string);
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
    delete(url?: string, config?: ICustomAxiosRequestConfig): Promise<AxiosResponse>;
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
    get(url?: string, config?: ICustomAxiosRequestConfig): Promise<AxiosResponse>;
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
    post(url?: string, data?: any, config?: ICustomAxiosRequestConfig): Promise<AxiosResponse>;
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
    put(url?: string, data?: any, config?: ICustomAxiosRequestConfig): Promise<any>;
    /**
     * Uses axios's interceptors to faciliate failure-retry's.  Based on: "http://www.itomtan.com/2017/10/17/vue-axios-timeout-retry-callback"
     *
     * @private
     * @returns {number} - Id for the interceptor, so failure-retry action can be removed after the API request is completed.
     * @memberof Storyblok
     */
    private activateRetry;
    /**
     * Used to deactivate the failure-retry mechanism, by removing the interceptor.
     *
     * @private
     * @param {number} interceptor - Id of the interceptor
     * @memberof Storyblok
     */
    private deactivateRetry;
}
export {};
//# sourceMappingURL=Storyblok.d.ts.map