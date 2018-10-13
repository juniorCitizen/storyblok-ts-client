/// <reference types="node" />
import { IAsset, IAssetSigningResponse, ICredentials } from '../interfaces';
/**
 * get total number of existing assets
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns a count of existing assets
 */
export declare function count(credentials: ICredentials): Promise<number>;
/**
 * create an asset from image.  This method calls the assets.register(), resize/compress the image then finally upload the physical file with assets.upload() at one go
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param filePath - absolute file path to the image
 * @param compress - flag to compress image
 * @param dimensionLimit - resizing dimension limit value
 * @returns information of the created asset
 */
export declare function createFromImage(credentials: ICredentials, asset: IAsset | undefined, filePath: string, compress?: boolean, dimensionLimit?: number): Promise<IAsset | undefined>;
/**
 * delete a specific asset
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param id - id of the asset to be deleted
 * @return information on the deleted asset
 */
export declare function deleteAsset({ spaceId, apiToken }: ICredentials, id: number | undefined): Promise<IAsset | void>;
/**
 * delete all existing assets
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 */
export declare function deleteExisting(credentials: ICredentials): Promise<(void | IAsset)[]>;
/**
 * get a specific asset
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param id - id of asset to fetch for
 * @returns details of the asset found
 */
export declare function get({ spaceId, apiToken }: ICredentials, id: number | undefined): Promise<IAsset | undefined>;
/**
 * list all existing assets
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns full list of existing assets
 */
export declare function getExisting({ spaceId, apiToken, }: ICredentials): Promise<IAsset[]>;
/**
 * register a file as a Storyblok asset (the physical file still has to be uploaded AWS S3 bucket)
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param asset - information to create asset from
 * @param asset.filename - file name to register for
 * @param [asset.asset_folder_id] - information to create asset from
 * @param [asset.id] - 	if the id of the asset is provided it will be replaced by this
 * @returns asset signing result info
 */
export declare function register({ spaceId, apiToken }: ICredentials, asset: IAsset | undefined): Promise<IAssetSigningResponse>;
/**
 * find a specific asset by access url
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param publicUrl - url to match by
 * @returns matched asset
 */
export declare function searchByUrl(credentials: ICredentials, publicUrl: string): Promise<IAsset | undefined>;
/**
 * upload an asset after it is registered as a Storyblok asset
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param buffer - buffered asset
 * @param registration - asset registration info
 * @returns information of the uploaded asset
 */
export declare function upload(credentials: ICredentials, buffer: Buffer, registration: IAssetSigningResponse): Promise<IAsset | undefined>;
//# sourceMappingURL=index.d.ts.map