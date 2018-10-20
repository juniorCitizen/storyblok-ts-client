import {IAssetSigningResponseFields} from './IAssetSigningResponseFields'

/**
 * Interface of an object returned from a successful Storyblok asset registration.  It is used to the physical uploading of the asset to AWS S3 bucket.
 *
 * @interface IAssetSigningResponse
 */
export interface IAssetSigningResponse {
  pretty_url: string
  public_url: string
  fields: IAssetSigningResponseFields
  post_url: string
}
