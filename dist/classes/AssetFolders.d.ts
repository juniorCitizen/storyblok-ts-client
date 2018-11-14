import { ICredentials, IPendingAssetFolder } from '../interfaces';
export declare class AssetFolder {
    private apiClient;
    private apiToken;
    private data;
    private spaceId;
    constructor(credentials: ICredentials, data: IPendingAssetFolder);
    readonly name: string;
    readonly id: number;
    generate(): Promise<void>;
    private sync;
}
//# sourceMappingURL=AssetFolders.d.ts.map