import {IPendingStory} from './IPendingStory'
import {IStoryBreadcrumb} from './IStoryBreadcrumb'
// import { IStoryContent } from './IStoryContent'
import {IStoryLastAuthor} from './IStoryLastAuthor'
import {IStoryParent} from './IStoryParent'
import {IStoryPreviewToken} from './IStoryPreviewToken'

/**
 * Interface of a Storyblok content story information object.
 *
 * @export
 * @interface IStory
 * @extends {IPendingStory}
 */
export interface IStory extends IPendingStory {
  // name: string
  // parent_id: number
  // group_id?: string
  readonly alternates: any[]
  readonly created_at: string
  // sort_by_date?: boolean | null
  // tag_list: string[]
  readonly updated_at: string
  readonly published_at: string | null
  readonly id: number
  readonly uuid: string
  // is_folder: boolean
  // content: IStoryContent | {}
  readonly published: boolean
  // slug: string
  // path: string | null
  readonly full_slug: string
  // default_root: string | null
  // disble_fe_editor?: boolean
  readonly parent: IStoryParent | null
  // is_startpage: boolean
  readonly unpublished_changes: boolean
  readonly meta_data: any
  readonly imported_at: string | null
  readonly preview_token: IStoryPreviewToken
  // pinned?: boolean
  readonly breadcrumbs: IStoryBreadcrumb[]
  readonly publish_at: string | null
  readonly expire_at: string | null
  readonly last_author: IStoryLastAuthor
}
