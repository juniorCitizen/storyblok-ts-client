interface ISpaceLimits {
  plan_level: number
  api_requests: number
  has_custom_ssl: boolean
  max_collaborators: number
}

interface ISpaceBillingAddress {
  name: string
  address_zip: string
  address_city: string
  address_line1: string
  address_country: string
  address_iso_country: string
}

interface ISpaceApiLogsPerMonth {
  id: number
  counting: number
  created_at: string
}

interface ISpaceOwner {
  userid: string
  email: string
  organization: string | null
  username: string | null
  use_username: boolean
  alt_email: string | null
  firstname: string
  lastname: string
  phone: string | null
  id: number
  login_strategy: string
  created_at: string
}

export interface ISpace {
  name: string
  domain: string
  uniq_domain: string | null
  plan: string
  plan_level: number
  limits: ISpaceLimits
  created_at: string
  id: number
  role: string
  owner_id: number
  story_published_hook: string | null
  environments: string[] | null
  stories_count: number
  parent_id: number | null
  assets_count: number
  searchblok_id: string | null
  duplicatable: boolean | null
  request_count_today: number
  api_requests: number
  exceeded_requests: number
  billing_address: ISpaceBillingAddress
  routes: string[] | null
  euid: string
  trial: boolean
  default_root: string
  has_slack_webhook: string
  api_logs_per_month: ISpaceApiLogsPerMonth[]
  first_token: string
  collaborators: number[]
  settings: any[]
  owner: ISpaceOwner
}
