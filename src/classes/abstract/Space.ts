import {ICredentials, ISpace} from '../../interfaces'
import {ApiClient} from '../ApiClient'

export class Space {
  private apiClient: ApiClient
  private credentials: ICredentials
  private data: ISpace | undefined
  constructor(credentials: ICredentials) {
    this.credentials = credentials
    this.apiClient = new ApiClient(
      this.credentials.apiToken,
      this.credentials.spaceId
    )
    this.data = undefined
  }

  public get id(): number {
    if (!this.data) {
      throw new Error('uninitialized space')
    }
    return this.data.id
  }

  public get name(): string {
    if (!this.data) {
      throw new Error('uninitialized space')
    }
    return this.data.name
  }

  public async teardown(): Promise<void> {
    try {
      const stories = await this.apiClient.stories.deleteExisting()
      console.log(`deleted ${stories.length} stories`)
      const assets = await this.apiClient.assets.deleteExisting()
      console.log(`deleted ${assets.length} assets`)
      const assetFolders = await this.apiClient.assetFolders.deleteExisting()
      console.log(`deleted ${assetFolders.length} asset folders`)
      const components = await this.apiClient.components.deleteExisting()
      console.log(`deleted ${components.length} components`)
      console.log('space teardown completed')
    } catch (error) {
      throw error
    }
  }

  public publishAll(): Promise<void> {
    return this.apiClient.stories
      .publishPendings()
      .then(stories => console.log(`published ${stories.length} stories`))
      .catch(e => Promise.reject(e))
  }

  public sync(): Promise<void> {
    return this.apiClient.spaces
      .get()
      .then(space => {
        this.data = space
        const message = `${this.name}(id: ${this.id}) verified`
        return console.log(message)
      })
      .catch(e => Promise.reject(e))
  }
}
