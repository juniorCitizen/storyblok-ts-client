import { ICredentials, IPendingStory, IStory, IStoryContent } from '../../interfaces';
export declare class Story {
    protected data: IStory;
    private apiClient;
    private credentials;
    constructor(credentials: ICredentials, data: IPendingStory);
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