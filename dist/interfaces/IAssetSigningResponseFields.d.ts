/// <reference types="node" />
/**
 * Interface of a part of an object returned from a successful Storyblok asset registration.  It is used to the physical uploading of the asset to AWS S3 bucket.
 *
 * @interface IAssetSigningResponseFields
 */
export interface IAssetSigningResponseFields {
    file?: {
        value: Buffer;
        options: {
            filename: string;
            contentType: string;
        };
    };
    key: string;
    acl: string;
    Expires: string;
    'Cache-Control': string;
    'Content-Type': string;
    policy: string;
    'x-amz-credential': string;
    'x-amz-algorithm': string;
    'x-amz-date': string;
    'x-amz-signature': string;
}
//# sourceMappingURL=IAssetSigningResponseFields.d.ts.map