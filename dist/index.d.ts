import { IApiClient, ICredentials } from './interfaces';
/**
 * get a object with API accessing methods
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns an object of API accessing methods
 * @example
 * const storyblok = require('storyblok-management-api-wrapper')({
 *   spaceId: 12345,
 *   apiToken: fake_api_token,
 * })
 *
 * return storyblok.space.get()
 *   .then(space => console.log('space id:', space.id)) // => space id: 12345
 */
declare function getApiClient(credentials: ICredentials): IApiClient;
export = getApiClient;
//# sourceMappingURL=index.d.ts.map