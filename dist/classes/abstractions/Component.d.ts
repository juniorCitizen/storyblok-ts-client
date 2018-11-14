import { IPendingComponent } from '../../interfaces';
import { ApiClient } from '../ApiClient';
export declare class Component {
    private apiClient;
    private data;
    constructor(apiClient: ApiClient, data: IPendingComponent);
    readonly id: number;
    readonly name: string;
    generate(): Promise<void>;
    private sync;
}
//# sourceMappingURL=Component.d.ts.map