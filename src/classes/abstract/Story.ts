import {
  ICredentials,
  IPendingStory,
  IStory,
  IStoryContent,
} from '../../interfaces'
import {ApiClient} from '../ApiClient'

export class Story {
  protected data: IStory
  private apiClient: ApiClient
  private credentials: ICredentials
  constructor(credentials: ICredentials, data: IPendingStory) {
    this.credentials = credentials
    this.apiClient = new ApiClient(
      this.credentials.apiToken,
      this.credentials.spaceId
    )
    this.data = data
  }

  public get content(): IStoryContent {
    return this.data.content!
  }

  public get fullSlug(): string {
    if (!this.data.full_slug) {
      throw new Error('uninitialized story')
    }
    return this.data.full_slug
  }

  public get id(): number {
    if (!this.data.id) {
      throw new Error('uninitialized story')
    }
    return this.data.id
  }

  public get isFolder(): boolean {
    if (!this.data.is_folder) {
      throw new Error('uninitialized story')
    }
    return this.data.is_folder
  }

  public get name(): string {
    return this.data.name
  }

  public get slug(): string {
    return this.data.slug
  }

  public get uuid(): string {
    if (!this.data.uuid) {
      throw new Error('uninitialized story')
    }
    return this.data.uuid
  }

  public generate(): Promise<void> {
    return this.sync()
      .then(() => console.log(`'${this.name}' story generated`))
      .catch(e => Promise.reject(e))
  }

  public async updateContent(content: IStoryContent): Promise<void> {
    const updatedData = JSON.parse(JSON.stringify(this.data))
    updatedData.content = content
    try {
      this.data = await this.apiClient.stories.update(updatedData)
    } catch (error) {
      throw error
    }
  }

  public async updatePath(path: string): Promise<void> {
    const updatedData = JSON.parse(JSON.stringify(this.data))
    updatedData.path = path
    try {
      this.data = await this.apiClient.stories.update(updatedData)
    } catch (error) {
      throw error
    }
  }

  protected async sync(): Promise<void> {
    const request = !this.data.id
      ? this.apiClient.stories.create(this.data)
      : this.apiClient.stories.get(this.data.id)
    try {
      this.data = await request
    } catch (error) {
      throw error
    }
  }
}
