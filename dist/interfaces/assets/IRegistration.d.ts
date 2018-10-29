import { IUploadFormFields } from './IUploadFormFields';
/**
 * Interface of an object returned from a successful Storyblok asset registration.  It is used to the physical uploading of the asset to AWS S3 bucket.
 *
 * @interface IAssetRegistration
 */
export interface IRegistration {
    readonly pretty_url: string;
    readonly public_url: string;
    readonly fields: IUploadFormFields;
    readonly post_url: string;
}
//# sourceMappingURL=IRegistration.d.ts.map