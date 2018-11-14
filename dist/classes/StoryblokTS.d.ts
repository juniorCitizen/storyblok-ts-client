import { AxiosProxyConfig } from 'axios';
interface ICache {
    type: string;
    clear?: string;
}
interface IHeaders {
    [prop: string]: any;
}
interface IConstructorConfig {
    accessToken: string;
    cache: ICache;
    headers?: IHeaders;
    https?: boolean;
    oauthToken?: string;
    proxy?: AxiosProxyConfig;
    rateLimit?: number;
    region?: string;
    timeout?: number;
}
/**
 * This is a thin wrapper for the Storyblok API's to use in Node.js and the browser.  It is a typescript conversion of the Universal Javascript SDK library (https://www.npmjs.com/package/storyblok-js-client).
 *
 * @export
 * @class StoryblokTS
 * @param {any} config - Configurations.
 * @param {string} config.accessToken - The preview token you can find in your space dashboard at https://app.storyblok.com.
 * @param {any} [config.cache] - Cache types.
 * @param {string} config.cache.type - 'none' or 'memory'.
 * @param {string} config.cache.clear - 'auto' or 'manual'.
 * @param {any} [config.headers] - Request headers.
 * @param {string} [config.region] - Region.
 * @param {boolean} [config.https] - Switch for https.
 * @param {string} [config.oauthToken] - Management API key.
 * @param {number} [rateLimit] - Throttle value (defaults to 3 for management api and 5 for cdn api).
 * @param {string} [endpoint] - API endpoint.
 * @example
 * // Example for using the content delivery api
 * // 1. Require the Storyblok client
 * const {StoryblokTS} = require('storyblok-ts-client')
 * // 2. Initialize the client with the preview
 * //    token from your space dashboard at
 * //    https://app.storyblok.com
 * let Storyblok = new StoryblokClient({
 *   accessToken: 'your_access_token'
 * })
 *
 * // Example for using the content management api
 * // 1. Require the Storyblok client
 * const {StoryblokTS} = require('storyblok-ts-client')
 * const spaceId = 12345
 * // 2. Initialize the client with the oauth token
 * //    from the my account area at
 * //    https://app.storyblok.com
 * let Storyblok = new StoryblokClient({
 *   oauthToken: 'YOUR_OAUTH_TOKEN'
 * })
 * Storyblok.post(`spaces/${spaceId}/stories`, {story: {name: 'xy', slug: 'xy'}})
 * Storyblok.put(`spaces/${spaceId}/stories/1`, {story: {name: 'xy', slug: 'xy'}})
 * Storyblok.delete(`spaces/${spaceId}/stories/1`, null)
 */
export declare class StoryblokTS {
    private accessToken;
    private cache;
    private cacheVersion;
    private client;
    private throttle;
    constructor(config: IConstructorConfig, endpoint?: string);
    get(slug: string, params: any): Promise<any>;
    post(slug: string, params: any): any;
    put(slug: string, params: any): any;
    delete(slug: string, params: any): any;
    flushCache(): this;
    getStories(params: any): Promise<any>;
    getStory(slug: string, params: any): Promise<any>;
    setToken(token: string): void;
    private getToken;
    private cacheResponse;
    private throttledRequest;
    private newVersion;
    private cacheProvider;
}
export {};
//# sourceMappingURL=StoryblokTS.d.ts.map