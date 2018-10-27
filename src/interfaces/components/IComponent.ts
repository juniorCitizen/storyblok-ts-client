import {IPendingComponent} from './IPendingComponent'

/**
 * Interface of a Storyblok component.
 *
 * @export
 * @interface IComponent
 */
export interface IComponent extends IPendingComponent {
  // name: string
  // display_name: string
  readonly created_at?: string
  readonly id?: number
  // schema: IComponentSchema | {}
  // image?: string | null
  // preview_field: string | null
  // is_root: boolean
  // is_nestable: boolean
  // all_presets?: any[]
  // preset_id?: number | null
}
