import { ICredentials, IPendingStory, IStory, IStoryContent } from '../interfaces';
import { ApiClient } from './ApiClient';
export declare class Story {
    protected apiClient: ApiClient;
    protected data: IStory;
    private apiToken;
    private spaceId;
    constructor(credentials: ICredentials, data: IPendingStory);
    protected readonly credentials: ICredentials;
    readonly content: IStoryContent;
    readonly fullSlug: string;
    readonly id: number;
    readonly isFolder: boolean;
    readonly name: string;
    readonly slug: string;
    readonly uuid: string;
    generate(): Promise<void>;
    updateContent(content: IStoryContent): Promise<void>;
    protected sync(): Promise<void>;
}
//# sourceMappingURL=Story.d.ts.map