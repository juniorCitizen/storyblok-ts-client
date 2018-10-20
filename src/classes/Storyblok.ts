/**
 * @module Storyblok
 */

import axios, {AxiosInstance, AxiosRequestConfig} from 'axios'
import pThrottle from 'p-throttle'

import {IStoryblokClass, IThrottledRequests} from '../interfaces'

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
export class Storyblok implements IStoryblokClass {
  /**
   * API access token.
   *
   * @name Storyblok#apiToken
   * @type string
   */
  private apiToken: string
  /**
   * Axios instance.
   *
   * @name Storyblok#axiosInst
   * @type AxiosInstance
   */
  private axiosInst: AxiosInstance
  /**
   * Throttled Axios request methods.
   *
   * @name Storyblok#throttledRequests
   * @type IThrottledRequests
   */
  private throttledRequests: IThrottledRequests

  /**
   * Class instantiation.
   *
   * @param {string} apiToken - API access token.
   */
  constructor(apiToken: string) {
    this.apiToken = apiToken
    this.axiosInst = axios.create({
      baseURL: `https://api.storyblok.com/v1/spaces`,
      headers: {Authorization: this.apiToken},
    })
    const callsPerInterval = 3
    const interval = 1000
    this.throttledRequests = {
      delete: pThrottle(this.axiosInst.delete, callsPerInterval, interval),
      get: pThrottle(this.axiosInst.get, callsPerInterval, interval),
      post: pThrottle(this.axiosInst.post, callsPerInterval, interval),
      put: pThrottle(this.axiosInst.put, callsPerInterval, interval),
      request: pThrottle(this.axiosInst.request, callsPerInterval, interval),
    }
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
  public delete(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.throttledRequests.delete(url, config || undefined)
  }

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
  public get(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.throttledRequests.get(url, config || undefined)
  }

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
  public post(
    url: string,
    data?: {[key: string]: any},
    config?: AxiosRequestConfig
  ): Promise<any> {
    return this.throttledRequests.post(
      url,
      data || undefined,
      config || undefined
    )
  }

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
  public put(
    url: string,
    data?: {[key: string]: any},
    config?: AxiosRequestConfig
  ): Promise<any> {
    return this.throttledRequests.put(
      url,
      data || undefined,
      config || undefined
    )
  }

  /**
   * All-purpose purpose request method to Storyblok using axios.
   *
   * @name Storyblok#request
   * @param {AxiosRequestConfig} config - Request config.
   * @returns {Promise}
   * @fulfil {any} Resolved value.
   * @reject {any} Axios error.
   */
  public request(config: AxiosRequestConfig): Promise<any> {
    return this.throttledRequests.request(config)
  }
}
