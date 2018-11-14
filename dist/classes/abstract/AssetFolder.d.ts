import { ICredentials, IPendingAssetFolder } from '../../interfaces';
export declare class AssetFolder {
    private apiClient;
    private credentials;
    private data;
    constructor(credentials: ICredentials, data: IPendingAssetFolder);
    readonly name: string;
    readonly id: number;
    generate(): Promise<void>;
    private sync;
}
//# sourceMappingURL=AssetFolder.d.ts.map