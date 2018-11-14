import { IPendingStory } from '../../interfaces';
import { ApiClient } from '../ApiClient';
import { Story } from './Story';
export declare class Folder extends Story {
    constructor(apiClient: ApiClient, data: IPendingStory);
    protected sync(): Promise<void>;
}
//# sourceMappingURL=Folder.d.ts.map