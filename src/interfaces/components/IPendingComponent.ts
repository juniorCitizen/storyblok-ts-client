import {IComponentSchema} from './IComponentSchema'

/**
 * Interface of a pending Storyblok component.
 *
 * @export
 * @interface IComponent
 */
export interface IPendingComponent {
  name: string
  display_name: string
  schema: IComponentSchema | {}
  image?: string | null
  preview_field: string | null
  is_root: boolean
  is_nestable: boolean
  all_presets?: any[]
  preset_id?: number | null
}
