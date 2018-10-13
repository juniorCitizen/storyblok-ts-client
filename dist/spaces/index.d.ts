import { ICredentials } from '../interfaces';
import { ISpace } from './interfaces';
/**
 * get working space information
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns space information
 */
export declare function get({ spaceId, apiToken }: ICredentials): Promise<ISpace>;
//# sourceMappingURL=index.d.ts.map