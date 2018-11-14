import { IPendingStory } from '../../interfaces';
import { ApiClient } from '../ApiClient';
import { Folder } from './Folder';
import { RootFolder } from './RootFolder';
import { Story } from './Story';
export declare class Subfolder extends Folder {
    private parent;
    constructor(apiClient: ApiClient, data: IPendingStory, parent: Folder | RootFolder | Subfolder | Story);
    protected sync(): Promise<void>;
}
//# sourceMappingURL=Subfolder.d.ts.map