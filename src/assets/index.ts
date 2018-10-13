import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'
import pThrottle from 'p-throttle'
import * as requestPromise from 'request-promise'

import * as config from '../config'
import {
  IAsset,
  IAssetSigningResponse,
  IAssetSigningResponseFields,
  ICredentials,
  ISpace,
} from '../interfaces'
import * as spaces from '../spaces'
import {
  axiosErrorHandler,
  calcPageCount,
  extractFileNameFromUrl,
  generateIndexArray,
  imageToBuffer,
  promiseRetry,
} from '../utilities'

const baseURL = config.baseURL
const apiRequest = pThrottle(axios, config.callsPerInterval, config.interval)

/**
 * get total number of existing assets
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns a count of existing assets
 */
export function count(credentials: ICredentials): Promise<number> {
  return spaces
    .get(credentials)
    .then((space: ISpace): number => space.assets_count)
    .catch(error => Promise.reject(error))
}

/**
 * create an asset from image.  This method calls the assets.register(), resize/compress the image then finally upload the physical file with assets.upload() at one go
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param filePath - absolute file path to the image
 * @param compress - flag to compress image
 * @param dimensionLimit - resizing dimension limit value
 * @returns information of the created asset
 */
export function createFromImage(
  credentials: ICredentials,
  asset: IAsset | undefined,
  filePath: string,
  compress?: boolean,
  dimensionLimit?: number
): Promise<IAsset | undefined> {
  return Promise.all([
    register(credentials, asset),
    imageToBuffer(filePath, compress || true, dimensionLimit || 640),
  ])
    .then(([registration, buffer]) => upload(credentials, buffer, registration))
    .catch(error => Promise.reject(error))
}

/**
 * delete a specific asset
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param id - id of the asset to be deleted
 * @return information on the deleted asset
 */
export function deleteAsset(
  {spaceId, apiToken}: ICredentials,
  id: number | undefined
): Promise<IAsset | void> {
  return apiRequest({
    baseURL,
    headers: {Authorization: apiToken},
    method: 'delete',
    url: `${spaceId}/assets/${id}`,
  })
    .then((res: AxiosResponse): IAsset => res.data.assets)
    .catch((error: AxiosError) => {
      // resolves the request if the error is "not found (404)".  Sometimes an asset is registered but a corresponding physical file is not uploaded for some reason.  A delete request will result in 404 error, but the registered reference will be removed successfully
      return error.response && error.response.status === 404
        ? Promise.resolve()
        : Promise.reject(axiosErrorHandler(error, 'assets.deleteAsset()'))
    })
}

/**
 * delete all existing assets
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 */
export function deleteExisting(credentials: ICredentials) {
  const mapFn = (a: IAsset) => deleteAsset(credentials, a.id)
  return getExisting(credentials)
    .then(existingAssets => Promise.all(existingAssets.map(mapFn)))
    .catch(error => Promise.reject(error))
}

/**
 * get a specific asset
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param id - id of asset to fetch for
 * @returns details of the asset found
 */
export function get(
  {spaceId, apiToken}: ICredentials,
  id: number | undefined
): Promise<IAsset | undefined> {
  return apiRequest({
    baseURL,
    headers: {Authorization: apiToken},
    method: 'get',
    url: `${spaceId}/assets/${id}`,
  })
    .then((res: AxiosResponse): IAsset | undefined => res.data)
    .catch((error: AxiosError) => {
      return Promise.reject(axiosErrorHandler(error, 'assets.get()'))
    })
}

/**
 * list all existing assets
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns full list of existing assets
 */
export function getExisting({
  spaceId,
  apiToken,
}: ICredentials): Promise<IAsset[]> {
  return count({spaceId, apiToken})
    .then(assetCount => calcPageCount(assetCount))
    .then(pageCount => {
      const indexArray = generateIndexArray(pageCount)
      const reqConfigList: AxiosRequestConfig[] = indexArray.map(
        (pageIndex: number): AxiosRequestConfig => {
          return {
            baseURL,
            headers: {Authorization: apiToken},
            method: 'get',
            params: {per_page: config.maxPerPage, page: pageIndex + 1},
            url: `${spaceId}/assets`,
          }
        }
      )
      return Promise.all(reqConfigList.map(reqConfig => apiRequest(reqConfig)))
        .then(arrayOfResponses => arrayOfResponses.map(res => res.data.assets))
        .then(arraysOfAssets => [].concat(...arraysOfAssets))
        .catch((error: AxiosError) => {
          return Promise.reject(
            axiosErrorHandler(error, 'assets.getExisting()')
          )
        })
    })
    .catch(error => Promise.reject(error))
}

/**
 * register a file as a Storyblok asset (the physical file still has to be uploaded AWS S3 bucket)
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param asset - information to create asset from
 * @param asset.filename - file name to register for
 * @param [asset.asset_folder_id] - information to create asset from
 * @param [asset.id] - 	if the id of the asset is provided it will be replaced by this
 * @returns asset signing result info
 */
export function register(
  {spaceId, apiToken}: ICredentials,
  asset: IAsset | undefined
): Promise<IAssetSigningResponse> {
  return apiRequest({
    baseURL,
    data: asset,
    headers: {Authorization: apiToken},
    method: 'post',
    url: `${spaceId}/assets`,
  })
    .then((res: AxiosResponse): IAssetSigningResponse => res.data)
    .catch((error: AxiosError) => {
      return Promise.reject(axiosErrorHandler(error, 'assets.register()'))
    })
}

/**
 * find a specific asset by access url
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param publicUrl - url to match by
 * @returns matched asset
 */
export function searchByUrl(
  credentials: ICredentials,
  publicUrl: string
): Promise<IAsset | undefined> {
  return getExisting(credentials)
    .then(assets => assets.find(asset => asset.filename === publicUrl))
    .catch(error => Promise.reject(error))
}

/**
 * upload an asset after it is registered as a Storyblok asset
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param buffer - buffered asset
 * @param registration - asset registration info
 * @returns information of the uploaded asset
 */
export async function upload(
  credentials: ICredentials,
  buffer: Buffer,
  registration: IAssetSigningResponse
): Promise<IAsset | undefined> {
  const filename = extractFileNameFromUrl(registration.public_url)
  const contentType = registration.fields['Content-Type']
  const formData: IAssetSigningResponseFields = registration.fields
  formData.file = {
    options: {filename, contentType},
    value: buffer,
  }
  const requestOptions: requestPromise.Options = {
    formData,
    method: 'post',
    url: registration.post_url,
  }
  return promiseRetry(() => requestPromise(requestOptions), 3)
    .then(() => searchByUrl(credentials, registration.public_url))
    .then(
      (asset: IAsset | undefined): Promise<IAsset | undefined> => {
        if (!asset) {
          throw new Error('error uploading asset to server')
        } else {
          return get(credentials, asset.id)
        }
      }
    )
    .catch((error: any) => Promise.reject(error))
}
