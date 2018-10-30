import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import pThrottle from 'p-throttle'

const apiServerUrl = 'http://api.storyblok.com/v1/spaces'

const throttleLimit: number = 3

export interface ICustomAxiosRequestConfig extends AxiosRequestConfig {
  retries?: number
  retryDelay?: number
}

interface ICustomAxiosRequestConfigInternal extends ICustomAxiosRequestConfig {
  retryCount?: number
}

type RequestWithConfig = (
  url: string,
  config?: ICustomAxiosRequestConfig
) => Promise<AxiosResponse>

type RequestWithConfigAndData = (
  url: string,
  data?: any,
  config?: ICustomAxiosRequestConfig
) => Promise<AxiosResponse>

interface IStoryblokClass {
  delete: RequestWithConfig
  get: RequestWithConfig
  post: RequestWithConfigAndData
  put: RequestWithConfigAndData
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
export class Storyblok implements IStoryblokClass {
  private apiToken: string
  private axiosInstance: AxiosInstance
  private throttled: {
    delete: RequestWithConfig
    get: RequestWithConfig
    post: RequestWithConfigAndData
    put: RequestWithConfigAndData
  }
  constructor(apiToken: string) {
    this.apiToken = apiToken
    this.axiosInstance = axios.create({
      baseURL: apiServerUrl,
      headers: {Authorization: this.apiToken},
    })
    this.throttled = {
      delete: pThrottle(this.axiosInstance.delete, throttleLimit, 1000),
      get: pThrottle(this.axiosInstance.get, throttleLimit, 1000),
      post: pThrottle(this.axiosInstance.post, throttleLimit, 1000),
      put: pThrottle(this.axiosInstance.put, throttleLimit, 1000),
    }
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
  public delete(
    url: string = '/',
    config?: ICustomAxiosRequestConfig
  ): Promise<AxiosResponse> {
    const interceptor = this.activateRetry()
    return this.throttled
      .delete(url, config || {})
      .then(
        (response: AxiosResponse): AxiosResponse => {
          this.deactivateRetry(interceptor)
          return response
        }
      )
      .catch((error: AxiosError) => {
        this.deactivateRetry(interceptor)
        return Promise.reject(error)
      })
  }

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
  public get(
    url: string = '/',
    config?: ICustomAxiosRequestConfig
  ): Promise<AxiosResponse> {
    const interceptor = this.activateRetry()
    return this.throttled
      .get(url, config || {})
      .then(
        (response: AxiosResponse): AxiosResponse => {
          this.deactivateRetry(interceptor)
          return response
        }
      )
      .catch((error: AxiosError) => {
        this.deactivateRetry(interceptor)
        return Promise.reject(error)
      })
  }

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
  public post(
    url: string = '/',
    data?: any,
    config?: ICustomAxiosRequestConfig
  ): Promise<AxiosResponse> {
    const interceptor = this.activateRetry()
    return this.throttled
      .post(url, data || undefined, config || {})
      .then(
        (response: AxiosResponse): AxiosResponse => {
          this.deactivateRetry(interceptor)
          return response
        }
      )
      .catch((error: AxiosError) => {
        this.deactivateRetry(interceptor)
        return Promise.reject(error)
      })
  }

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
  public put(
    url: string = '/',
    data?: any,
    config?: ICustomAxiosRequestConfig
  ): Promise<any> {
    const interceptor = this.activateRetry()
    return this.throttled
      .put(url, data || undefined, config || {})
      .then(
        (response: AxiosResponse): AxiosResponse => {
          this.deactivateRetry(interceptor)
          return response
        }
      )
      .catch((error: AxiosError) => {
        this.deactivateRetry(interceptor)
        return Promise.reject(error)
      })
  }

  /**
   * Uses axios's interceptors to faciliate failure-retry's.  Based on: "http://www.itomtan.com/2017/10/17/vue-axios-timeout-retry-callback"
   *
   * @private
   * @returns {number} - Id for the interceptor, so failure-retry action can be removed after the API request is completed.
   * @memberof Storyblok
   */
  private activateRetry(): number {
    return this.axiosInstance.interceptors.response.use(
      response => Promise.resolve(response),
      (error: AxiosError) => {
        const config: ICustomAxiosRequestConfigInternal = error.config
        if (!config || !config.retries) {
          return Promise.reject(error)
        }
        config.retryCount = config.retryCount || 0
        if (config.retryCount > config.retries) {
          console.log('retry threshhold reached, promise is rejected')
          return Promise.reject(error)
        }
        const response = error.response
        if (response) {
          if (response.status !== 429) {
            console.log('terminal failure, promise is rejected')
            console.log('status:', response.status)
            console.log('message:', response.data)
            console.dir(response.config)
            return Promise.reject(error)
          } else {
            config.retryCount += 1
            return new Promise(resolve => {
              const variance = Math.floor(Math.random() * 500) + 1
              const delay: number = (config.retryDelay || 1250) - variance
              const factor: number = config.retryCount as number
              setTimeout(() => {
                console.log('status:', response.status)
                console.log('message:', response.data)
                console.log('retry attempt:', config.retryCount)
                return resolve()
              }, delay * factor)
            }).then(() => this.axiosInstance(config))
          }
        }
      }
    )
  }

  /**
   * Used to deactivate the failure-retry mechanism, by removing the interceptor.
   *
   * @private
   * @param {number} interceptor - Id of the interceptor
   * @memberof Storyblok
   */
  private deactivateRetry(interceptor: number): void {
    this.axiosInstance.interceptors.response.eject(interceptor)
  }
}
