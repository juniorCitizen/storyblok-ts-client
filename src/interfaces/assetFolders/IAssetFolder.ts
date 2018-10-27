import {IPendingAssetFolder} from './IPendingAssetFolder'

/**
 * Interface of an Storyblok asset folder.
 *
 * @interface IAssetFolder
 */
export interface IAssetFolder extends IPendingAssetFolder {
  // name: string
  readonly id: number
  // parent_id?: number | null
}
