"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defaultRetryDelay = 500;
var defaultRetries = 3;
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
function promiseRetry(asyncFn, args, customRetries, customDelay) {
    var argumentList = !args ? [undefined] : args;
    var retries = customRetries || defaultRetries;
    var delay = customDelay || defaultRetryDelay;
    return asyncFn.apply(void 0, argumentList).then(function (result) { return result; })
        .catch(function (tryError) {
        return retries === 0
            ? Promise.reject(tryError)
            : new Promise(function (res) { return setTimeout(res, delay); })
                .then(function () { return promiseRetry(asyncFn, argumentList, retries - 1, delay); })
                .catch(function (error) { return Promise.reject(error); });
    });
}
exports.promiseRetry = promiseRetry;
//# sourceMappingURL=promiseRetry.js.map