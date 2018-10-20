import * as sharp from 'sharp'

const jpegOptions: sharp.JpegOptions = {quality: 70}
const pngOptions: sharp.PngOptions = {compressionLevel: 7}

/**
 * Apply compression to a sharp object.
 *
 * @param {Sharp} image - Sharp object.
 * @returns {Promise}
 * @fulfil {Sharp} Compressed sharp object.
 * @reject {Error} Error value.
 */
export async function compressImage(image: sharp.Sharp): Promise<sharp.Sharp> {
  try {
    const metadata: sharp.Metadata = await image.metadata()
    if (metadata.format === 'png') {
      return image.png(pngOptions)
    } else if (metadata.format === 'jpeg') {
      return image.jpeg(jpegOptions)
    } else {
      return image
    }
  } catch (error) {
    throw error
  }
}

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
export async function imageToBuffer(
  filePath: string,
  compress: boolean = false,
  dimensionLimit?: number
): Promise<Buffer> {
  let image: sharp.Sharp = sharp(filePath).rotate()
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
 * Resize a sharp object
 *
 * @param {Sharp} image - sharp object.
 * @param {number} dimensionLimit - Size (in pixels) to limit image dimension.
 * @returns {Promise}
 * @fulfil {Sharp} Resized sharp object.
 * @reject {Error} Error value.
 */
export async function resizeImage(
  image: sharp.Sharp,
  dimensionLimit: number = 640
): Promise<sharp.Sharp> {
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
