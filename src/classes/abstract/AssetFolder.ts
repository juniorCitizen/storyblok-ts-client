import {IAssetFolder, ICredentials, IPendingAssetFolder} from '../../interfaces'
import {ApiClient} from '../ApiClient'

export class AssetFolder {
  private apiClient: ApiClient
  private credentials: ICredentials
  private data: IAssetFolder
  constructor(credentials: ICredentials, data: IPendingAssetFolder) {
    this.credentials = credentials
    this.apiClient = new ApiClient(
      this.credentials.apiToken,
      this.credentials.spaceId
    )
    this.data = data
  }

  public get name(): string {
    return this.data.name
  }

  public get id(): number {
    if (!this.data.id) {
      throw new Error('uninitialized asset folder')
    }
    return this.data.id
  }

  public generate(): Promise<void> {
    return this.sync()
      .then(() => console.log(`'${this.name}' asset folder generated`))
      .catch(e => Promise.reject(e))
  }

  private sync(): Promise<void> {
    const request = !this.data.id
      ? this.apiClient.assetFolders.create(this.name)
      : this.apiClient.assetFolders.get(this.data.id)
    return request
      .then(assetFolder => {
        this.data = assetFolder
        return Promise.resolve()
      })
      .catch(e => Promise.reject(e))
  }
}
