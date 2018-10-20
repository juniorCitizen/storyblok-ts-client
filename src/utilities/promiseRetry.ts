const defaultRetryDelay = 500
const defaultRetries = 3

/**
 * @type PromiseRetry
 */
export type PromiseRetry = <T>(
  // asyncFn: (...args: any[]) => Promise<T | undefined>,
  args?: any[],
  customRetries?: number,
  customDelay?: number
) => Promise<T | undefined>

/**
 * Simple promise failure retry function with constant amount of delay between retries.
 *
 * Based on: https://tech.mybuilder.com/handling-retries-and-back-off-attempts-with-javascript-promises.
 *
 * @param {Function} asyncFn - Async function to execute.
 * @param {Array<any>} [args] - (optional) Arguments for the async function.
 * @param {number} [retries] - (optional) Number of retries before rejecting the promise.
 * @param {number} [customDelay] - (optional) Amount of delay before firing a retry(ms).
 * @returns {Promise}
 * @fulfil {T | undefined} Generic resolved value.
 * @reject {Error} Error value.
 */
export function promiseRetry<T>(
  asyncFn: (...args: any[]) => Promise<T | undefined>,
  args?: any[],
  customRetries?: number,
  customDelay?: number
): Promise<T | undefined> {
  const argumentList = !args ? [undefined] : args
  const retries = customRetries || defaultRetries
  const delay = customDelay || defaultRetryDelay
  return asyncFn(...argumentList)
    .then((result: T | undefined): T | undefined => result)
    .catch((tryError: any) => {
      return retries === 0
        ? Promise.reject(tryError)
        : new Promise(res => setTimeout(res, delay))
            .then(() => promiseRetry(asyncFn, argumentList, retries - 1, delay))
            .catch(error => Promise.reject(error))
    })
}
