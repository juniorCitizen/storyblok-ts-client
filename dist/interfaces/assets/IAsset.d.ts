import { IPendingAsset } from './IPendingAsset';
/**
 * Interface of a Storyblok asset.
 *
 * @export
 * @interface IAsset
 */
export interface IAsset extends IPendingAsset {
    readonly space_id?: number;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly file?: {
        readonly url: string | null;
    };
    readonly deleted_at?: string | null;
    readonly short_filename?: string | null;
}
//# sourceMappingURL=IAsset.d.ts.map