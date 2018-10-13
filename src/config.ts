import sharp = require('sharp')

export const baseURL: string = 'https://api.storyblok.com/v1/spaces'

export const callsPerInterval: number = 3
export const interval: number = 1000

export const maxPerPage: number = 1000

export const retryDelay: number = 500

export const jpegOptions: sharp.JpegOptions = {quality: 70}
export const pngOptions: sharp.PngOptions = {compressionLevel: 7}
