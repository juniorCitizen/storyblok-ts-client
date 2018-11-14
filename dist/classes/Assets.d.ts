import { IAssetFolder, ICredentials } from '../interfaces';
export declare class Asset {
    private apiClient;
    private apiToken;
    private assetFolder;
    private data;
    private filePath;
    private spaceId;
    constructor(credentials: ICredentials, filePath: string, assetFolder?: IAssetFolder);
    private readonly isSynced;
    readonly prettyUrl: string;
    readonly publicUrl: string;
    readonly folder: string | undefined;
    generatePhoto(): Promise<void>;
    generateImage(): Promise<void>;
}
//# sourceMappingURL=Assets.d.ts.map