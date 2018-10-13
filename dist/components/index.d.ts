import { IComponent, ICredentials } from '../interfaces';
/**
 * create a component
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param component - info on component to be created
 * @returns details of the component that was created
 */
export declare function create({ spaceId, apiToken }: ICredentials, component: IComponent): Promise<IComponent>;
/**
 * delete a specific component
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @param id - id of component to be deleted
 * @returns details of the deleted component
 */
export declare function deleteComponent({ spaceId, apiToken }: ICredentials, id: number | undefined): Promise<IComponent>;
/**
 * delete all existing components
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns a list of deleted components details
 */
export declare function deleteExisting(credentials: ICredentials): Promise<IComponent[]>;
/**
 * list all existing components (it is assumed that the working space has only 1,000 existing components at most)
 *
 * @param credentials - API access credentials
 * @param credentials.spaceId - Storyblok working space ID
 * @param credentials.apiToken - API access token
 * @returns List of component definitions
 */
export declare function getExisting({ spaceId, apiToken, }: ICredentials): Promise<IComponent[]>;
//# sourceMappingURL=index.d.ts.map