import { IAssetFolder } from '../../interfaces';
import { ApiClient } from '../ApiClient';
export declare class Asset {
    private apiClient;
    private assetFolder;
    private data;
    private filePath;
    constructor(apiClient: ApiClient, filePath: string, assetFolder?: IAssetFolder);
    private readonly isSynced;
    readonly prettyUrl: string;
    readonly publicUrl: string;
    readonly folder: string | undefined;
    generatePhoto(): Promise<void>;
    generateImage(): Promise<void>;
}
//# sourceMappingURL=Asset.d.ts.map