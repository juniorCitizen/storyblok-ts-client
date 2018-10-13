export interface IStoryBreadcrumb {
  id: number
  name: string
  parent_id: number
  disable_fe_editor: boolean
}

export interface IStoryParent {
  id: number
  slug: string
  name: string
  disable_fe_editor: boolean
}

export interface IStoryContent {
  _uid: string
  component: string
  [fields: string]: any | IStoryContent[]
}

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
  parent?: IStoryParent
  is_startpage: boolean
  unpublished_changes?: boolean
  meta_data?: any
  imported_at?: string | null
  preview_token?: {
    token: string
    timestamp: number
  }
  pinned: boolean
  breadcrumbs?: IStoryBreadcrumb[]
  publish_at?: string | null
  expire_at?: string | null
  last_author?: {
    id: number
    userid: string
  }
}
