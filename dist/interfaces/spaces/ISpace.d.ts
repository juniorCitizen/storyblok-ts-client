import { ISpaceApiLogsPerMonth } from './ISpaceApiLogsPerMonth';
import { ISpaceBillingAddress } from './ISpaceBillingAddress';
import { ISpaceLimits } from './ISpaceLimits';
import { ISpaceOwner } from './ISpaceOwner';
/**
 * Interface of a Storyblok space information object.
 *
 * @interface ISpace
 */
export interface ISpace {
    name: string;
    domain: string;
    uniq_domain: string | null;
    readonly plan: string;
    readonly plan_level: number;
    readonly limits: ISpaceLimits;
    readonly created_at: string;
    readonly id: number;
    readonly role: string;
    owner_id: number;
    readonly story_published_hook: string | null;
    readonly environments: string[] | null;
    readonly stories_count: number;
    parent_id: number | null;
    readonly assets_count: number;
    readonly searchblok_id: string | null;
    readonly duplicatable: boolean | null;
    readonly request_count_today: number;
    readonly api_requests: number;
    readonly exceeded_requests: number;
    readonly billing_address: ISpaceBillingAddress;
    readonly routes: string[] | null;
    readonly euid: string;
    readonly trial: boolean;
    default_root: string;
    readonly has_slack_webhook: string;
    readonly api_logs_per_month: ISpaceApiLogsPerMonth[];
    readonly first_token: string;
    readonly collaborators: number[];
    readonly settings: any[];
    readonly owner: ISpaceOwner;
}
//# sourceMappingURL=ISpace.d.ts.map