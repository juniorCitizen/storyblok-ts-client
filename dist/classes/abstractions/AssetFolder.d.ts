import { IPendingAssetFolder } from '../../interfaces';
import { ApiClient } from '../ApiClient';
export declare class AssetFolder {
    private apiClient;
    private data;
    constructor(apiClient: ApiClient, data: IPendingAssetFolder);
    readonly name: string;
    readonly id: number;
    generate(): Promise<void>;
    private sync;
}
//# sourceMappingURL=AssetFolder.d.ts.map