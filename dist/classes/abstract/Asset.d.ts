import { IAssetFolder, ICredentials } from '../../interfaces';
export declare class Asset {
    private apiClient;
    private assetFolder;
    private credentials;
    private data;
    private filePath;
    constructor(credentials: ICredentials, filePath: string, assetFolder?: IAssetFolder);
    private readonly isSynced;
    readonly prettyUrl: string;
    readonly publicUrl: string;
    readonly folder: string | undefined;
    generatePhoto(): Promise<void>;
    generateImage(): Promise<void>;
}
//# sourceMappingURL=Asset.d.ts.map