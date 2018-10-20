/**
 * Interface of an IStory's 'breadcrumbs' array property member.
 *
 * @interface IStoryBreadcrumb
 */
export interface IStoryBreadcrumb {
  id: number
  name: string
  parent_id: number
  disable_fe_editor: boolean
}
