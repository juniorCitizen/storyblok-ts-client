/**
 * Generic interface of IStory's 'content' property.
 *
 * @interface IStoryContent
 */
export interface IStoryContent {
    readonly _uid?: string;
    readonly component: string;
    [fields: string]: any | IStoryContent[];
}
//# sourceMappingURL=IStoryContent.d.ts.map