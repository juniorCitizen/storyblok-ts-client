/**
 * Interface of a part of an object returned from a successful Storyblok asset registration.  It is used to the physical uploading of the asset to AWS S3 bucket.
 *
 * @interface IUploadFormFields
 */
export interface IUploadFormFields {
    readonly key: string;
    readonly acl: string;
    readonly Expires: string;
    readonly 'Cache-Control': string;
    readonly 'Content-Type': string;
    readonly policy: string;
    readonly 'x-amz-credential': string;
    readonly 'x-amz-algorithm': string;
    readonly 'x-amz-date': string;
    readonly 'x-amz-signature': string;
    readonly [index: string]: string;
}
//# sourceMappingURL=IUploadFormFields.d.ts.map