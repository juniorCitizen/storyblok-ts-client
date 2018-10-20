import {IStoryBreadcrumb} from './IStoryBreadcrumb'
import {IStoryContent} from './IStoryContent'
import {IStoryLastAuthor} from './IStoryLastAuthor'
import {IStoryParent} from './IStoryParent'
import {IStoryPreviewToken} from './IStoryPreviewToken'

/**
 * Interface of an Storyblok content story.
 *
 * @interface IStory
 */
export interface IStory {
  name: string
  parent_id: number
  group_id?: string
  alternates?: any[]
  created_at?: string
  sort_by_date?: boolean | null
  tag_list: string[]
  updated_at?: string
  published_at?: string | null
  id?: number
  uuid?: string
  is_folder: boolean
  content: IStoryContent | {}
  published?: boolean
  slug: string
  path: string | null
  full_slug?: string
  default_root: string | null
  disble_fe_editor?: boolean
  parent?: IStoryParent | null
  is_startpage: boolean
  unpublished_changes?: boolean
  meta_data?: any
  imported_at?: string | null
  preview_token?: IStoryPreviewToken
  pinned: boolean
  breadcrumbs?: IStoryBreadcrumb[]
  publish_at?: string | null
  expire_at?: string | null
  last_author?: IStoryLastAuthor
}
