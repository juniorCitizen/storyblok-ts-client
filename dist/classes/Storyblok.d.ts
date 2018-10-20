/**
 * @module Storyblok
 */
import { AxiosRequestConfig } from 'axios';
import { IStoryblokClass } from '../interfaces';
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
export declare class Storyblok implements IStoryblokClass {
    /**
     * API access token.
     *
     * @name Storyblok#apiToken
     * @type string
     */
    private apiToken;
    /**
     * Axios instance.
     *
     * @name Storyblok#axiosInst
     * @type AxiosInstance
     */
    private axiosInst;
    /**
     * Throttled Axios request methods.
     *
     * @name Storyblok#throttledRequests
     * @type IThrottledRequests
     */
    private throttledRequests;
    /**
     * Class instantiation.
     *
     * @param {string} apiToken - API access token.
     */
    constructor(apiToken: string);
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
    delete(url: string, config?: AxiosRequestConfig): Promise<any>;
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
    get(url: string, config?: AxiosRequestConfig): Promise<any>;
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
    post(url: string, data?: {
        [key: string]: any;
    }, config?: AxiosRequestConfig): Promise<any>;
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
    put(url: string, data?: {
        [key: string]: any;
    }, config?: AxiosRequestConfig): Promise<any>;
    /**
     * All-purpose purpose request method to Storyblok using axios.
     *
     * @name Storyblok#request
     * @param {AxiosRequestConfig} config - Request config.
     * @returns {Promise}
     * @fulfil {any} Resolved value.
     * @reject {any} Axios error.
     */
    request(config: AxiosRequestConfig): Promise<any>;
}
//# sourceMappingURL=Storyblok.d.ts.map