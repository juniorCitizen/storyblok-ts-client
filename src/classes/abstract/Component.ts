import {
  IComponent,
  IComponentSchema,
  ICredentials,
  IPendingComponent,
} from '../../interfaces'
import {ApiClient} from '../ApiClient'

export class Component {
  private apiClient: ApiClient
  private credentials: ICredentials
  private data: IComponent
  constructor(credentials: ICredentials, data: IPendingComponent) {
    this.credentials = credentials
    this.apiClient = new ApiClient(
      this.credentials.apiToken,
      this.credentials.spaceId
    )
    this.data = data
  }

  public get schema(): IComponentSchema {
    return this.data.schema!
  }

  public get id(): number {
    if (!this.data.id) {
      throw new Error('uninitialized component')
    }
    return this.data.id
  }

  public get name(): string {
    return this.data.name
  }

  public generate(): Promise<void> {
    return this.sync()
      .then(() => console.log(`'${this.name}' component generated`))
      .catch(e => Promise.reject(e))
  }

  public updateSchema(schema: IComponentSchema): Promise<void> {
    const updatedData = JSON.parse(JSON.stringify(this.data))
    updatedData.schema = schema
    return this.apiClient.components
      .update(updatedData)
      .then(updatedComponent => {
        this.data = updatedComponent
        return Promise.resolve()
      })
      .catch(e => Promise.reject(e))
  }

  private sync(): Promise<void> {
    const request = !this.data.id
      ? this.apiClient.components.create(this.data)
      : this.apiClient.components.get(this.data.id)
    return request
      .then(component => {
        this.data = component
        return Promise.resolve()
      })
      .catch(e => Promise.reject(e))
  }
}
