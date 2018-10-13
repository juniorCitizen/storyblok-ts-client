import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'
import pThrottle from 'p-throttle'

import * as config from '../config'
import {ICredentials, IStory} from '../interfaces'
import {
  axiosErrorHandler,
  calcPageCount,
  generateIndexArray,
} from '../utilities'

const baseURL = config.baseURL
const apiRequest = pThrottle(axios, config.callsPerInterval, config.interval)

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
export function count({spaceId, apiToken}: ICredentials): Promise<number> {
  return apiRequest({
    baseURL,
    headers: {Authorization: apiToken},
    method: 'get',
    url: `${spaceId}/stories`,
  })
    .then(
      (res: AxiosResponse): number => {
        if (!res.headers.total) {
          throw new Error('property "total" is missing')
        }
        return parseInt(res.headers.total, 10)
      }
    )
    .catch((error: AxiosError) => {
      return Promise.reject(axiosErrorHandler(error, 'stories.count()'))
    })
}

/**
 * create a story
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param story - Storyblok story data object
 * @returns details of story that was created
 */
export function create(
  {spaceId, apiToken}: ICredentials,
  story: IStory
): Promise<IStory> {
  return apiRequest({
    baseURL,
    data: {story},
    headers: {Authorization: apiToken},
    method: 'post',
    url: `${spaceId}/stories`,
  })
    .then((res: AxiosResponse): IStory => res.data.story)
    .catch((error: AxiosError) => {
      return Promise.reject(axiosErrorHandler(error, 'stories.create()'))
    })
}

/**
 * delete a specific story
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param storyId - id of the story to be deleted
 * @returns details of the story that was removed
 */
export function deleteStory(
  {spaceId, apiToken}: ICredentials,
  storyId: number | undefined
) {
  return apiRequest({
    baseURL,
    headers: {Authorization: apiToken},
    method: 'delete',
    url: `${spaceId}/stories/${storyId}`,
  })
    .then((res: AxiosResponse): IStory => res.data.story)
    .catch((error: AxiosError) => {
      return Promise.reject(axiosErrorHandler(error, 'stories.deleteStory()'))
    })
}

/**
 * delete all existing stories
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns a list of details of deleted stories
 */
export function deleteExisting(credentials: ICredentials): Promise<IStory[]> {
  const filterFn = (story: IStory) => story.parent_id === 0
  const mapFn = (story: IStory) => deleteStory(credentials, story.id)
  return getExisting(credentials)
    .then(stories => stories.filter(filterFn))
    .then(rootStories => Promise.all(rootStories.map(mapFn)))
    .catch(error => Promise.reject(error))
}

/**
 * get a specific story
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param storyId - id of the content story
 * @returns details of content story
 */
export function get(
  {spaceId, apiToken}: ICredentials,
  storyId: number | undefined
): Promise<IStory> {
  return apiRequest({
    baseURL,
    headers: {Authorization: apiToken},
    method: 'get',
    url: `${spaceId}/stories/${storyId}`,
  })
    .then((res: AxiosResponse): IStory => res.data.story)
    .catch((error: AxiosError) => {
      return Promise.reject(axiosErrorHandler(error, 'stories.get()'))
    })
}

/**
 * list all existing stories
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns full list of existing content stories
 */
export function getExisting({
  spaceId,
  apiToken,
}: ICredentials): Promise<IStory[]> {
  return count({spaceId, apiToken})
    .then(storyCount => calcPageCount(storyCount))
    .then(pageCount => {
      const reqConfigList: AxiosRequestConfig[] = generateIndexArray(
        pageCount
      ).map(
        (pageIndex: number): AxiosRequestConfig => {
          return {
            baseURL,
            headers: {Authorization: apiToken},
            method: 'get',
            params: {per_page: config.maxPerPage, page: pageIndex + 1},
            url: `${spaceId}/stories`,
          }
        }
      )
      return Promise.all(reqConfigList.map(reqConfig => apiRequest(reqConfig)))
        .then(arrayOfResponses => arrayOfResponses.map(res => res.data.stories))
        .then(arraysOfStories => [].concat(...arraysOfStories))
        .catch((error: AxiosError) => {
          return Promise.reject(
            axiosErrorHandler(error, 'stories.getExisting()')
          )
        })
    })
    .catch(error => Promise.reject(error))
}

/**
 * publish a specific story
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param storyId - story id
 * @returns published story
 */
export function publish(
  {spaceId, apiToken}: ICredentials,
  storyId: number | undefined
): Promise<IStory> {
  return apiRequest({
    baseURL,
    headers: {Authorization: apiToken},
    method: 'get',
    url: `/${spaceId}/stories/${storyId}/publish`,
  })
    .then((res: AxiosResponse): IStory => res.data.story)
    .catch((error: AxiosError) => {
      return Promise.reject(axiosErrorHandler(error, 'stories.publish()'))
    })
}

/**
 * publish all unpublished stories
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns list of published stories
 */
export function publishPendings(credentials: ICredentials) {
  const filterFn = (story: IStory): boolean =>
    !story.is_folder && !story.published
  const mapFn = (story: IStory) => publish(credentials, story.id)
  return getExisting(credentials)
    .then(stories => stories.filter(filterFn))
    .then(unpublished => Promise.all(unpublished.map(mapFn)))
    .catch(error => Promise.reject(error))
}

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
export function reorder(
  {spaceId, apiToken}: ICredentials,
  storyId: number | undefined,
  afterId: number | undefined
): Promise<IStory> {
  return apiRequest({
    baseURL,
    headers: {Authorization: apiToken},
    method: 'put',
    url: `/${spaceId}/stories/${storyId}/move?after_id=${afterId}`,
  })
    .then(() => get({spaceId, apiToken}, storyId))
    .catch((error: AxiosError) => {
      return Promise.reject(axiosErrorHandler(error, 'stories.reorder()'))
    })
}

/**
 * update a story
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param story - Storyblok story data object with modified info
 * @returns details of story that was updated
 */
export function update(
  {spaceId, apiToken}: ICredentials,
  story: IStory
): Promise<IStory> {
  return apiRequest({
    baseURL,
    data: {story},
    headers: {Authorization: apiToken},
    method: 'put',
    url: `${spaceId}/stories/${story.id}`,
  })
    .then((res: AxiosResponse): IStory => res.data.story)
    .catch((error: AxiosError) => {
      return Promise.reject(axiosErrorHandler(error, 'stories.update()'))
    })
}
