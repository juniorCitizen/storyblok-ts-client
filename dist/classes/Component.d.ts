import { ICredentials, IPendingComponent } from '../interfaces';
export declare class Component {
    private apiClient;
    private apiToken;
    private data;
    private spaceId;
    constructor(credentials: ICredentials, data: IPendingComponent);
    readonly id: number;
    readonly name: string;
    generate(): Promise<void>;
    private sync;
}
//# sourceMappingURL=Component.d.ts.map