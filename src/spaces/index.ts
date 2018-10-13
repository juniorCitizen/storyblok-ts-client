import axios, {AxiosError, AxiosResponse} from 'axios'
import pThrottle from 'p-throttle'

import * as config from '../config'
import {ICredentials} from '../interfaces'
import {axiosErrorHandler} from '../utilities'
import {ISpace} from './interfaces'

const baseURL = config.baseURL
const apiRequest = pThrottle(axios, config.callsPerInterval, config.interval)

/**
 * get working space information
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns space information
 */
export function get({spaceId, apiToken}: ICredentials): Promise<ISpace> {
  return apiRequest({
    baseURL,
    headers: {Authorization: apiToken},
    method: 'get',
    url: `${spaceId}`,
  })
    .then((res: AxiosResponse): ISpace => res.data.space)
    .catch((error: AxiosError) => {
      return Promise.reject(axiosErrorHandler(error, 'spaces.get()'))
    })
}
