import {AxiosError} from 'axios'
import sharp = require('sharp')

import * as config from '../config'

/**
 * Axios request error handler
 *
 * @param error - error object provided by the request
 * @param fnName - function name where the error occured
 * @returns the error
 */
export function axiosErrorHandler(
  error: AxiosError,
  fnName: string
): AxiosError {
  console.error(`request to API resulted in error at '${fnName}'`)
  if (error.response) {
    console.log('code:', error.response.status)
    console.log('message:', error.response.data.error)
  } else {
    console.log('message:', error.message)
  }
  return error
}

/**
 * calculate how many pagination pages
 *
 * @param totalCount number of total elements to paginate
 */
export function calcPageCount(totalCount: number): number {
  return Math.ceil(totalCount / config.maxPerPage)
}

/**
 * takes a sharp.js image object and compress as specified
 *
 * @param image - sharp.js image object
 * @returns compressed sharp.js image object
 */
async function compressImage(
  image: sharp.SharpInstance
): Promise<sharp.SharpInstance> {
  try {
    const metadata: sharp.Metadata = await image.metadata()
    if (metadata.format === 'png') {
      return image.png(config.pngOptions)
    } else if (metadata.format === 'jpeg') {
      return image.jpeg(config.jpegOptions)
    } else {
      return image
    }
  } catch (error) {
    throw error
  }
}

/**
 * get the final element from a '//' delimited string (used to extract the file name from an file path)
 *
 * @param filePath - string to process
 * @returns file name (final element)
 */
export function extractFileNameFromPath(filePath: string): string {
  const fileName: string | undefined = filePath.split('//').pop()
  if (!fileName) {
    throw new Error('valid file name is not found from string')
  }
  return fileName
}

/**
 * get the final element from a '/' delimited string (used to extract the file name from an asset url)
 *
 * @param url - string to process
 * @returns file name (final element)
 */
export function extractFileNameFromUrl(url: string): string {
  const fileName: string | undefined = url.split('/').pop()
  if (!fileName) {
    throw new Error('valid file name is not found from string')
  }
  return fileName
}

/**
 * generate an array of specific number of elements
 *
 * @param count number of elements to generate
 * @returns an array of {count} elements with index as element value
 */
export function generateIndexArray(count: number): number[] {
  return Array.from(Array(count).keys())
}

/**
 * Using 'sharp' library to generate data buffer (image compression is applied accordingly)
 *
 * @param filePath - absolute path to image file
 * @param compress - flag to compress image
 * @param dimensionLimit - resizing dimension limit value
 * @returns buffered image data
 */
export async function imageToBuffer(
  filePath: string,
  compress: boolean = false,
  dimensionLimit?: number
): Promise<Buffer> {
  let image: sharp.SharpInstance = sharp(filePath).rotate()
  try {
    if (compress) {
      image = await compressImage(image)
    }
    if (dimensionLimit) {
      image = await resizeImage(image, dimensionLimit)
    }
    return await image.toBuffer()
  } catch (error) {
    throw error
  }
}

/**
 * simple promise failure retry function with constant amount of delay between retries, based on: https://tech.mybuilder.com/handling-retries-and-back-off-attempts-with-javascript-promises
 * @param retries - number of retries at failure
 * @param asyncFn - async function to execute
 * @param [delay] - amount of time to delay before firing the retry(ms)
 * @returns resolved promise
 */
export function promiseRetry(
  asyncFn: () => any,
  retries: number,
  delay?: number
) {
  return asyncFn().catch((trialError: any) => {
    if (retries > 1) {
      return new Promise(res => setTimeout(res, delay || config.retryDelay))
        .then(() =>
          promiseRetry(asyncFn, retries - 1, delay || config.retryDelay)
        )
        .catch(error => Promise.reject(error))
    } else {
      return Promise.reject(trialError)
    }
  })
}

/**
 * takes a sharp.js image object and resize as specified
 *
 * @param image - sharp.js image object
 * @param dimensionLimit - size (pixels) to limit image dimension
 * @returns resized sharp.js image object
 */
async function resizeImage(
  image: sharp.SharpInstance,
  dimensionLimit: number = 640
): Promise<sharp.SharpInstance> {
  try {
    const metadata: sharp.Metadata = await image.metadata()
    if (!metadata.height || !metadata.width) {
      throw new Error('image dimension cannot be determined')
    }
    return metadata.height === metadata.width
      ? image.resize(dimensionLimit, dimensionLimit) // square image
      : metadata.height < metadata.width
        ? image.resize(dimensionLimit, undefined) // wider image
        : image.resize(undefined, dimensionLimit) // taller image
  } catch (error) {
    throw error
  }
}
