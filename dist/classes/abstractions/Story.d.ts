import { IPendingStory, IStory, IStoryContent } from '../../interfaces';
import { ApiClient } from '../ApiClient';
export declare class Story {
    protected apiClient: ApiClient;
    protected data: IStory;
    constructor(apiClient: ApiClient, data: IPendingStory);
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