import { ISpaceApiLogsPerMonth } from './ISpaceApiLogsPerMonth';
import { ISpaceBillingAddress } from './ISpaceBillingAddress';
import { ISpaceLimits } from './ISpaceLimits';
import { ISpaceOwner } from './ISpaceOwner';
/**
 * Interface of an Storyblok space.
 *
 * @interface ISpace
 */
export interface ISpace {
    name: string;
    domain: string;
    uniq_domain: string | null;
    plan: string;
    plan_level: number;
    limits: ISpaceLimits;
    created_at: string;
    id: number;
    role: string;
    owner_id: number;
    story_published_hook: string | null;
    environments: string[] | null;
    stories_count: number;
    parent_id: number | null;
    assets_count: number;
    searchblok_id: string | null;
    duplicatable: boolean | null;
    request_count_today: number;
    api_requests: number;
    exceeded_requests: number;
    billing_address: ISpaceBillingAddress;
    routes: string[] | null;
    euid: string;
    trial: boolean;
    default_root: string;
    has_slack_webhook: string;
    api_logs_per_month: ISpaceApiLogsPerMonth[];
    first_token: string;
    collaborators: number[];
    settings: any[];
    owner: ISpaceOwner;
}
//# sourceMappingURL=ISpace.d.ts.map