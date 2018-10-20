/// <reference types="node" />
import * as sharp from 'sharp';
/**
 * Apply compression to a sharp object.
 *
 * @param {Sharp} image - Sharp object.
 * @returns {Promise}
 * @fulfil {Sharp} Compressed sharp object.
 * @reject {Error} Error value.
 */
export declare function compressImage(image: sharp.Sharp): Promise<sharp.Sharp>;
/**
 * Generate buffered image (image compression and resize is applied accordingly).
 *
 * @param {string} filePath - Absolute path to image file.
 * @param {boolean} compress - Flag to compress image.
 * @param {number} [dimensionLimit] - (optional) Resizing dimension limit value.
 * @returns {Promise}
 * @fulfil {Buffer} Buffered image data.
 * @reject {Error} Error value.
 */
export declare function imageToBuffer(filePath: string, compress?: boolean, dimensionLimit?: number): Promise<Buffer>;
/**
 * Resize a sharp object
 *
 * @param {Sharp} image - sharp object.
 * @param {number} dimensionLimit - Size (in pixels) to limit image dimension.
 * @returns {Promise}
 * @fulfil {Sharp} Resized sharp object.
 * @reject {Error} Error value.
 */
export declare function resizeImage(image: sharp.Sharp, dimensionLimit?: number): Promise<sharp.Sharp>;
//# sourceMappingURL=imageProcessing.d.ts.map