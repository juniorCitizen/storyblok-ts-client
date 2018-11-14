import { ApiClient } from '../ApiClient';
export declare class Space {
    private apiClient;
    private data;
    constructor(apiClient: ApiClient);
    readonly id: number;
    readonly name: string;
    teardown(): Promise<void>;
    publishAll(): Promise<void>;
    sync(): Promise<void>;
}
//# sourceMappingURL=Space.d.ts.map