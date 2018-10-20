/**
 * /**
 * Interface of an ISpace's 'owner' property.
 *
 * @interface ISpaceOwner
 */
export interface ISpaceOwner {
    userid: string;
    email: string;
    organization: string | null;
    username: string | null;
    use_username: boolean;
    alt_email: string | null;
    firstname: string;
    lastname: string;
    phone: string | null;
    id: number;
    login_strategy: string;
    created_at: string;
}
//# sourceMappingURL=ISpaceOwner.d.ts.map