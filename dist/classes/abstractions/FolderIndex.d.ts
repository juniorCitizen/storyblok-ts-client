import { IPendingStory } from '../../interfaces';
import { ApiClient } from '../ApiClient';
import { Folder } from './Folder';
import { RootFolder } from './RootFolder';
import { Story } from './Story';
import { Subfolder } from './Subfolder';
export declare class FolderIndex extends Story {
    private parent;
    constructor(apiClient: ApiClient, data: IPendingStory, parent: Folder | RootFolder | Subfolder | Story);
    protected sync(): Promise<void>;
}
//# sourceMappingURL=FolderIndex.d.ts.map