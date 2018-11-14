import { ICredentials, IPendingStory } from '../interfaces';
import { Folder } from './Folder';
import { RootFolder } from './RootFolder';
import { Story } from './Story';
export declare class Subfolder extends Folder {
    private parent;
    constructor(credentials: ICredentials, data: IPendingStory, parent: Folder | RootFolder | Subfolder | Story);
    protected sync(): Promise<void>;
}
//# sourceMappingURL=Subfolder.d.ts.map