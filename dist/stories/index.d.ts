import { ICredentials, IStory } from '../interfaces';
/**
 * get total number of existing stories (including folders)
 *
 * Storyblok API's space info does not account 'folders' as stories, and must be manually retrieved
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns a count of existing stories
 */
export declare function count({ spaceId, apiToken }: ICredentials): Promise<number>;
/**
 * create a story
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param story - Storyblok story data object
 * @returns details of story that was created
 */
export declare function create({ spaceId, apiToken }: ICredentials, story: IStory): Promise<IStory>;
/**
 * delete a specific story
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param storyId - id of the story to be deleted
 * @returns details of the story that was removed
 */
export declare function deleteStory({ spaceId, apiToken }: ICredentials, storyId: number | undefined): Promise<IStory>;
/**
 * delete all existing stories
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns a list of details of deleted stories
 */
export declare function deleteExisting(credentials: ICredentials): Promise<IStory[]>;
/**
 * get a specific story
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param storyId - id of the content story
 * @returns details of content story
 */
export declare function get({ spaceId, apiToken }: ICredentials, storyId: number | undefined): Promise<IStory>;
/**
 * list all existing stories
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns full list of existing content stories
 */
export declare function getExisting({ spaceId, apiToken, }: ICredentials): Promise<IStory[]>;
/**
 * publish a specific story
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param storyId - story id
 * @returns published story
 */
export declare function publish({ spaceId, apiToken }: ICredentials, storyId: number | undefined): Promise<IStory>;
/**
 * publish all unpublished stories
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns list of published stories
 */
export declare function publishPendings(credentials: ICredentials): Promise<IStory[]>;
/**
 * modify a story's sequential order
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param storyId - id of the story to be moved
 * @param afterId - to be positioned after story of this id
 * @returns details of the moved story
 */
export declare function reorder({ spaceId, apiToken }: ICredentials, storyId: number | undefined, afterId: number | undefined): Promise<IStory>;
/**
 * update a story
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param story - Storyblok story data object with modified info
 * @returns details of story that was updated
 */
export declare function update({ spaceId, apiToken }: ICredentials, story: IStory): Promise<IStory>;
//# sourceMappingURL=index.d.ts.map