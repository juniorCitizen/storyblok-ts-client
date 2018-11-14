import { ICredentials, IPendingStory } from '../interfaces';
import { Story } from './Story';
export declare class Folder extends Story {
    constructor(credentials: ICredentials, data: IPendingStory);
    protected sync(): Promise<void>;
}
//# sourceMappingURL=Folder.d.ts.map