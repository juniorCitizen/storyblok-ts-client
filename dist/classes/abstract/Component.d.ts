import { IComponentSchema, ICredentials, IPendingComponent } from '../../interfaces';
export declare class Component {
    private apiClient;
    private credentials;
    private data;
    constructor(credentials: ICredentials, data: IPendingComponent);
    readonly schema: IComponentSchema;
    readonly id: number;
    readonly name: string;
    generate(): Promise<void>;
    updateSchema(schema: IComponentSchema): Promise<void>;
    private sync;
}
//# sourceMappingURL=Component.d.ts.map