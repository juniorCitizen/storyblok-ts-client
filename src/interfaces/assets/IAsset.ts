import {IPendingAsset} from './IPendingAsset'

/**
 * Interface of a Storyblok asset.
 *
 * @export
 * @interface IAsset
 */
export interface IAsset extends IPendingAsset {
  // id?: number
  // filename: string
  readonly space_id?: number
  readonly created_at?: string
  readonly updated_at?: string
  readonly file?: {
    readonly url: string | null
  }
  // asset_folder_id?: number | null
  readonly deleted_at?: string | null
  readonly short_filename?: string | null
}
