import axios, {AxiosInstance, AxiosProxyConfig, AxiosResponse} from 'axios'
import pThrottle from 'p-throttle'
import * as qs from 'qs'

interface ICache {
  type: string
  clear?: string
}

interface IHeaders {
  [prop: string]: any
}

interface IConstructorConfig {
  accessToken: string
  cache: ICache
  headers?: IHeaders
  https?: boolean
  oauthToken?: string
  proxy?: AxiosProxyConfig
  rateLimit?: number
  region?: string
  timeout?: number
}

interface IExtAxiosInstance extends AxiosInstance {
  [prop: string]: any
}

let memory: {
  [prop: string]: any
} = {}

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
export class StoryblokTS {
  private accessToken: string
  private cache: ICache
  private cacheVersion: number | undefined = undefined
  private client: IExtAxiosInstance
  private throttle: any
  constructor(config: IConstructorConfig, endpoint?: string) {
    if (!endpoint) {
      const region = config.region ? `-${config.region}` : ''
      const protocol = config.https === false ? 'http' : 'https'
      endpoint = `${protocol}://api${region}.storyblok.com/v1`
    }
    const headers: IHeaders = {...config.headers}
    let rateLimit = 5 // per second for cdn api
    if (typeof config.oauthToken !== 'undefined') {
      headers.Authorization = config.oauthToken
      rateLimit = 3 // per second for management api
    }
    if (typeof config.rateLimit !== 'undefined') {
      rateLimit = config.rateLimit
    }
    this.throttle = pThrottle(this.throttledRequest, rateLimit, 1000)
    this.cacheVersion = this.cacheVersion || this.newVersion()
    this.accessToken = config.accessToken
    this.cache = config.cache || {clear: 'manual'}
    this.client = axios.create({
      baseURL: endpoint,
      headers,
      proxy: config.proxy || false,
      timeout: config.timeout || 0,
    })
  }

  public get(slug: string, params: any) {
    const query = params || {}
    const url = `/${slug}`
    if (url.indexOf('/cdn/') > -1) {
      if (!query.version) {
        query.version = 'published'
      }
      if (!query.cv) {
        query.cv = this.cacheVersion
      }
      if (!query.token) {
        query.token = this.getToken()
      }
    }
    return this.cacheResponse(url, query)
  }

  public post(slug: string, params: any) {
    return this.throttle('post', `/${slug}`, params)
  }

  public put(slug: string, params: any) {
    return this.throttle('put', `/${slug}`, params)
  }

  public delete(slug: string, params: any) {
    return this.throttle('delete', `/${slug}`, params)
  }

  public flushCache(): this {
    this.cacheVersion = this.newVersion()
    this.cacheProvider().flush()
    return this
  }

  public getStories(params: any) {
    return this.get('cdn/stories', params)
  }

  public getStory(slug: string, params: any) {
    return this.get(`cdn/stories/${slug}`, params)
  }

  public setToken(token: string) {
    this.accessToken = token
  }

  private getToken() {
    return this.accessToken
  }

  private cacheResponse(url: string, params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const cacheKey = qs.stringify({url, params}, {arrayFormat: 'brackets'})
      const provider = this.cacheProvider()
      const cache = provider.get(cacheKey)
      if (this.cache.clear === 'auto' && params.version === 'draft') {
        this.flushCache()
      }
      if (params.version === 'published' && cache) {
        resolve(cache)
      } else {
        const opts: qs.IStringifyOptions = {arrayFormat: 'brackets'}
        const serializer = (p: any): string => qs.stringify(p, opts)
        this.throttle('get', url, {params, paramsSerializer: serializer})
          .then((res: AxiosResponse) => {
            let response: {
              data: any
              headers: any
              perPage?: number
              total?: number
            } = {data: res.data, headers: res.headers}
            if (res.headers['per-page']) {
              response = {
                ...response,
                perPage: parseInt(res.headers['per-page'] as string, 10),
                total: parseInt(res.headers.total as string, 10),
              }
            }
            if (res.status !== 200) {
              return reject(res)
            }
            if (params.version === 'published') {
              provider.set(cacheKey, response)
            }
            resolve(response)
          })
          .catch(reject)
      }
    })
  }

  private throttledRequest(type: string, url: string, params: any) {
    return new Promise((resolve, reject) => {
      this.client[type](url, params)
        .then(resolve)
        .catch(reject)
    })
  }

  private newVersion(): number {
    return new Date().getTime()
  }

  private cacheProvider() {
    switch (this.cache.type) {
      case 'memory':
        return {
          get(key: string) {
            return memory[key]
          },
          set(key: string, content: any) {
            memory[key] = content
          },
          flush() {
            memory = {}
          },
        }
        break
      default:
        this.cacheVersion = this.newVersion()
        return {
          get() {
            return
          },
          set() {
            return
          },
          flush() {
            return
          },
        }
    }
  }
}
