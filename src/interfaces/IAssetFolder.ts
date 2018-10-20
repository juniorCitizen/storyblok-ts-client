/**
 * Interface of an Storyblok asset folder.
 *
 * @interface IAssetFolder
 */
export interface IAssetFolder {
  name: string
  id?: number
  parent_id?: number | null
}
