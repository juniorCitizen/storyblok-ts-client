import { ICredentials } from '../../interfaces';
export declare class Space {
    private apiClient;
    private credentials;
    private data;
    constructor(credentials: ICredentials);
    readonly id: number;
    readonly name: string;
    teardown(): Promise<void>;
    publishAll(): Promise<void>;
    sync(): Promise<void>;
}
//# sourceMappingURL=Space.d.ts.map