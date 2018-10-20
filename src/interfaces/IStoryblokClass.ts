import {AxiosRequestConfig} from 'axios'

/**
 * Interface of Storyblok class.
 *
 * @interface
 */
export interface IStoryblokClass {
  delete: (url: string, config?: AxiosRequestConfig) => Promise<any>
  get: (url: string, config?: AxiosRequestConfig) => Promise<any>
  post: (
    url: string,
    data?: {[key: string]: any},
    config?: AxiosRequestConfig
  ) => Promise<any>
  put: (
    url: string,
    data?: {[key: string]: any},
    config?: AxiosRequestConfig
  ) => Promise<any>
  request: (config: AxiosRequestConfig) => Promise<any>
}
