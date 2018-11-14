export * from './assets' // assets
export * from './assetFolders' // asset folders
export * from './components' // component folder
export * from './spaces' // spaces
export * from './stories' // stories

export interface ICredentials {
  apiToken: string
  spaceId: number
  accessToken?: string
}
