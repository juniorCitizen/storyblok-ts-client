/// <reference types="node" />
import { IAssetFolder } from './assetFolders/interfaces';
import { IAsset, IAssetSigningResponse } from './assets/interfaces';
import { IComponent } from './components/interfaces';
import { ISpace } from './spaces/interfaces';
import { IStory } from './stories/interfaces';
export * from './assetFolders/interfaces';
export * from './assets/interfaces';
export * from './components/interfaces';
export * from './spaces/interfaces';
export * from './stories/interfaces';
export interface ICredentials {
    spaceId: number | undefined;
    apiToken: string | undefined;
}
export interface IApiClient {
    assetFolders: {
        create: (name: string) => Promise<IAssetFolder>;
        delete: (id: number | undefined) => void;
        deleteExisting: () => void;
        get: (id: number | undefined) => Promise<IAssetFolder>;
        getExisting: () => Promise<IAssetFolder[]>;
        searchByName: (name: string) => Promise<IAssetFolder[]>;
    };
    assets: {
        count: () => Promise<number>;
        createFromImage: (asset: IAsset | undefined, filePath: string, compress?: boolean, dimensionLimit?: number) => Promise<IAsset | undefined>;
        delete: (id: number | undefined) => Promise<IAsset | void>;
        deleteExisting: () => Promise<Array<IAsset | void>>;
        get: (id: number | undefined) => Promise<IAsset | undefined>;
        getExisting: () => Promise<IAsset[]>;
        register: (asset: IAsset) => Promise<IAssetSigningResponse>;
        searchByUrl: (publicUrl: string) => Promise<IAsset | undefined>;
        upload: (buffer: Buffer, signedResponse: IAssetSigningResponse) => Promise<IAsset | undefined>;
    };
    components: {
        create: (component: IComponent) => Promise<IComponent>;
        delete: (id: number | undefined) => Promise<IComponent>;
        deleteExisting: () => Promise<IComponent[]>;
        getExisting: () => Promise<IComponent[]>;
    };
    spaces: {
        get: () => Promise<ISpace>;
    };
    stories: {
        count: () => Promise<number>;
        create: (story: IStory) => Promise<IStory>;
        delete: (storyId: number | undefined) => Promise<IStory>;
        deleteExisting: () => Promise<IStory[]>;
        get: (storyId: number | undefined) => Promise<IStory>;
        getExisting: () => Promise<IStory[]>;
        publish: (storyId: number | undefined) => Promise<IStory>;
        publishPendings: () => Promise<IStory[]>;
        reorder: (storyId: number | undefined, afterId: number | undefined) => Promise<IStory>;
    };
}
//# sourceMappingURL=interfaces.d.ts.map