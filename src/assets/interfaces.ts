export interface IAsset {
  id?: number
  filename: string
  space_id?: number
  created_at?: string
  updated_at?: string
  file?: {
    url: string | null
  }
  asset_folder_id?: number | null
  deleted_at?: string | null
  short_filename?: string | null
}

export interface IAssetSigningResponseFields {
  file?: {
    value: Buffer
    options: {
      filename: string
      contentType: string
    }
  }
  key: string
  acl: string
  Expires: string
  'Cache-Control': string
  'Content-Type': string
  policy: string
  'x-amz-credential': string
  'x-amz-algorithm': string
  'x-amz-date': string
  'x-amz-signature': string
}

export interface IAssetSigningResponse {
  pretty_url: string
  public_url: string
  fields: IAssetSigningResponseFields
  post_url: string
}
