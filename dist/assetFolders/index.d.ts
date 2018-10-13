import { IAssetFolder, ICredentials } from '../interfaces';
/**
 * create an asset folder
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param name - name of asset folder to create
 * @returns details of the asset folder created
 */
export declare function create({ spaceId, apiToken }: ICredentials, name: string): Promise<IAssetFolder>;
/**
 * delete a specific asset folder
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param id - id of asset folder to be deleted
 */
export declare function deleteAssetFolder({ spaceId, apiToken }: ICredentials, id: number | undefined): Promise<void>;
/**
 * delete all existing asset folders
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 */
export declare function deleteExisting(credentials: ICredentials): Promise<void[]>;
/**
 * get a specific asset folder
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param id - asset folder id to get
 * @returns asset folder information
 */
export declare function get({ spaceId, apiToken }: ICredentials, id: number | undefined): Promise<IAssetFolder>;
/**
 * get existing asset folders
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns list of existing asset folders
 */
export declare function getExisting({ spaceId, apiToken, }: ICredentials): Promise<IAssetFolder[]>;
/**
 * search asset folders by matching asset folder names to the supplied string
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param name - string to search asset folders by
 * @returns list of asset folders that matches the name string
 */
export declare function searchByName({ spaceId, apiToken }: ICredentials, name: string): Promise<IAssetFolder[]>;
//# sourceMappingURL=index.d.ts.map