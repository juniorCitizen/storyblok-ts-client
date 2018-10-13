import axios, {AxiosError, AxiosResponse} from 'axios'
import pThrottle from 'p-throttle'

import * as config from '../config'
import {IAssetFolder, ICredentials} from '../interfaces'
import {axiosErrorHandler} from '../utilities'

const baseURL = config.baseURL
const apiRequest = pThrottle(axios, config.callsPerInterval, config.interval)

/**
 * create an asset folder
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param name - name of asset folder to create
 * @returns details of the asset folder created
 */
export function create(
  {spaceId, apiToken}: ICredentials,
  name: string
): Promise<IAssetFolder> {
  return apiRequest({
    baseURL,
    data: {asset_folder: {name}},
    headers: {Authorization: apiToken},
    method: 'post',
    url: `${spaceId}/asset_folders`,
  })
    .then((res: AxiosResponse): IAssetFolder => res.data.asset_folder)
    .catch((error: AxiosError) => {
      return Promise.reject(axiosErrorHandler(error, 'assetFolders.create()'))
    })
}

/**
 * delete a specific asset folder
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param id - id of asset folder to be deleted
 */
export function deleteAssetFolder(
  {spaceId, apiToken}: ICredentials,
  id: number | undefined
) {
  return apiRequest({
    baseURL,
    headers: {Authorization: apiToken},
    method: 'delete',
    url: `${spaceId}/asset_folders/${id}`,
  })
    .then(() => Promise.resolve())
    .catch((error: AxiosError) => {
      return Promise.reject(
        axiosErrorHandler(error, 'assetFolders.deleteAssetFolder()')
      )
    })
}

/**
 * delete all existing asset folders
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 */
export function deleteExisting(credentials: ICredentials) {
  return getExisting(credentials)
    .then(existingAssetFolders => {
      const mapFn = (assetFolder: IAssetFolder) =>
        deleteAssetFolder(credentials, assetFolder.id)
      return Promise.all(existingAssetFolders.map(mapFn))
    })
    .catch(error => Promise.reject(error))
}

/**
 * get a specific asset folder
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param id - asset folder id to get
 * @returns asset folder information
 */
export function get(
  {spaceId, apiToken}: ICredentials,
  id: number | undefined
): Promise<IAssetFolder> {
  return apiRequest({
    baseURL,
    headers: {Authorization: apiToken},
    method: 'get',
    url: `${spaceId}/asset_folders/${id}`,
  })
    .then((res: AxiosResponse): IAssetFolder => res.data.asset_folder)
    .catch((error: AxiosError) => {
      return Promise.reject(axiosErrorHandler(error, 'assetFolders.get()'))
    })
}

/**
 * get existing asset folders
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns list of existing asset folders
 */
export function getExisting({
  spaceId,
  apiToken,
}: ICredentials): Promise<IAssetFolder[]> {
  return apiRequest({
    baseURL,
    headers: {Authorization: apiToken},
    method: 'get',
    url: `${spaceId}/asset_folders?search`,
  })
    .then((res: AxiosResponse): IAssetFolder[] => res.data.asset_folders)
    .catch((error: AxiosError) => {
      return Promise.reject(
        axiosErrorHandler(error, 'assetFolders.getExisting()')
      )
    })
}

/**
 * search asset folders by matching asset folder names to the supplied string
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param name - string to search asset folders by
 * @returns list of asset folders that matches the name string
 */
export function searchByName(
  {spaceId, apiToken}: ICredentials,
  name: string
): Promise<IAssetFolder[]> {
  return apiRequest({
    baseURL,
    headers: {Authorization: apiToken},
    method: 'get',
    url: `${spaceId}/asset_folders?search=${name}`,
  })
    .then((res: AxiosResponse): IAssetFolder[] => res.data.asset_folders)
    .catch((error: AxiosError) => {
      return Promise.reject(
        axiosErrorHandler(error, 'assetFolders.searchByName()')
      )
    })
}
