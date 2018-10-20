/**
 * Interface of an Storyblok asset.
 *
 * @interface IAsset
 */
export interface IAsset {
  id?: number
  filename: string
  space_id?: number
  created_at?: string
  updated_at?: string
  file?: {
    url: string | null
  }
  asset_folder_id?: number | null
  deleted_at?: string | null
  short_filename?: string | null
}
