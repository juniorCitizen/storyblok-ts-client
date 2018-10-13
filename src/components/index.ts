import axios, {AxiosError, AxiosResponse} from 'axios'
import pThrottle from 'p-throttle'

import * as config from '../config'
import {IComponent, ICredentials} from '../interfaces'
import {axiosErrorHandler} from '../utilities'

const baseURL = config.baseURL
const apiRequest = pThrottle(axios, config.callsPerInterval, config.interval)

/**
 * create a component
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param component - info on component to be created
 * @returns details of the component that was created
 */
export function create(
  {spaceId, apiToken}: ICredentials,
  component: IComponent
): Promise<IComponent> {
  return apiRequest({
    baseURL,
    data: {component},
    headers: {Authorization: apiToken},
    method: 'post',
    url: `${spaceId}/components`,
  })
    .then((res: AxiosResponse): IComponent => res.data.component)
    .catch((error: AxiosError) => {
      return Promise.reject(axiosErrorHandler(error, 'components.create()'))
    })
}

/**
 * delete a specific component
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param id - id of component to be deleted
 * @returns details of the deleted component
 */
export function deleteComponent(
  {spaceId, apiToken}: ICredentials,
  id: number | undefined
): Promise<IComponent> {
  return apiRequest({
    baseURL,
    headers: {Authorization: apiToken},
    method: 'delete',
    url: `${spaceId}/components/${id}`,
  })
    .then((res: AxiosResponse): IComponent => res.data.component)
    .catch((error: AxiosError) => {
      return Promise.reject(
        axiosErrorHandler(error, 'components.deleteComponent()')
      )
    })
}

/**
 * delete all existing components
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns a list of deleted components details
 */
export function deleteExisting(
  credentials: ICredentials
): Promise<IComponent[]> {
  return getExisting(credentials)
    .then(existingComponents => {
      const mapFn = (component: IComponent) =>
        deleteComponent(credentials, component.id)
      return Promise.all(existingComponents.map(mapFn))
    })
    .catch(error => Promise.reject(error))
}

/**
 * list all existing components (it is assumed that the working space has only 1,000 existing components at most)
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns List of component definitions
 */
export function getExisting({
  spaceId,
  apiToken,
}: ICredentials): Promise<IComponent[]> {
  return apiRequest({
    baseURL,
    headers: {Authorization: apiToken},
    method: 'get',
    params: {per_page: config.maxPerPage},
    url: `${spaceId}/components`,
  })
    .then((res: AxiosResponse): IComponent[] => res.data.components)
    .catch((error: AxiosError) => {
      return Promise.reject(
        axiosErrorHandler(error, 'components.getExisting()')
      )
    })
}
