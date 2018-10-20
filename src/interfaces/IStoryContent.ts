/**
 * Generic interface of IStory's 'content' property.
 *
 * @interface IStoryContent
 */
export interface IStoryContent {
  _uid: string
  component: string
  [fields: string]: any | IStoryContent[]
}
