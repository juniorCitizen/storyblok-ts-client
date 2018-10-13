/// <reference types="node" />
import { AxiosError } from 'axios';
/**
 * Axios request error handler
 *
 * @param error - error object provided by the request
 * @param fnName - function name where the error occured
 * @returns the error
 */
export declare function axiosErrorHandler(error: AxiosError, fnName: string): AxiosError;
/**
 * calculate how many pagination pages
 *
 * @param totalCount number of total elements to paginate
 */
export declare function calcPageCount(totalCount: number): number;
/**
 * get the final element from a '//' delimited string (used to extract the file name from an file path)
 *
 * @param filePath - string to process
 * @returns file name (final element)
 */
export declare function extractFileNameFromPath(filePath: string): string;
/**
 * get the final element from a '/' delimited string (used to extract the file name from an asset url)
 *
 * @param url - string to process
 * @returns file name (final element)
 */
export declare function extractFileNameFromUrl(url: string): string;
/**
 * generate an array of specific number of elements
 *
 * @param count number of elements to generate
 * @returns an array of {count} elements with index as element value
 */
export declare function generateIndexArray(count: number): number[];
/**
 * Using 'sharp' library to generate data buffer (image compression is applied accordingly)
 *
 * @param filePath - absolute path to image file
 * @param compress - flag to compress image
 * @param dimensionLimit - resizing dimension limit value
 * @returns buffered image data
 */
export declare function imageToBuffer(filePath: string, compress?: boolean, dimensionLimit?: number): Promise<Buffer>;
/**
 * simple promise failure retry function with constant amount of delay between retries, based on: https://tech.mybuilder.com/handling-retries-and-back-off-attempts-with-javascript-promises
 * @param retries - number of retries at failure
 * @param asyncFn - async function to execute
 * @param [delay] - amount of time to delay before firing the retry(ms)
 * @returns resolved promise
 */
export declare function promiseRetry(asyncFn: () => any, retries: number, delay?: number): any;
//# sourceMappingURL=index.d.ts.map