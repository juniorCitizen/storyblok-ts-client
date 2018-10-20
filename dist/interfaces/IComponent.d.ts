import { IComponentSchema } from './IComponentSchema';
/**
 * Interface of a Storyblok component.
 *
 * @interface
 */
export interface IComponent {
    name: string;
    display_name: string;
    created_at?: string;
    id?: number;
    schema: IComponentSchema;
    image?: string | null;
    preview_field: string | null;
    is_root: boolean;
    is_nestable: boolean;
    all_presets?: any[];
    preset_id?: number | null;
}
//# sourceMappingURL=IComponent.d.ts.map