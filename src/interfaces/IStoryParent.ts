/**
 * Interface of an IStory's 'parent' property.
 *
 * @interface IStoryParent
 */
export interface IStoryParent {
  id: number
  slug: string
  name: string
  disable_fe_editor: boolean
}
