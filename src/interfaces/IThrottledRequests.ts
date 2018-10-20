import {AxiosPromise, AxiosRequestConfig} from 'axios'

/**
 * Interface for objects holding throttled requests.
 *
 * @interface IThrottledRequests
 */
export interface IThrottledRequests {
  delete: (url: string, config?: AxiosRequestConfig) => AxiosPromise<any>
  get: (url: string, config?: AxiosRequestConfig) => AxiosPromise<any>
  post: (
    url: string,
    data?: {[key: string]: any},
    config?: AxiosRequestConfig
  ) => AxiosPromise<any>
  put: (
    url: string,
    data?: {[key: string]: any},
    config?: AxiosRequestConfig
  ) => AxiosPromise<any>
  request: (config: AxiosRequestConfig) => AxiosPromise<any>
}
