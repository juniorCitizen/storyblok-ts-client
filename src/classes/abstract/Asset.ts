import * as path from 'path'

import {IAsset, IAssetFolder, ICredentials} from '../../interfaces'
import {imageToBuffer} from '../../utilities/imageProcessing'
import {ApiClient} from '../ApiClient'

export class Asset {
  private apiClient: ApiClient
  private assetFolder: IAssetFolder | undefined
  private credentials: ICredentials
  private data: IAsset
  private filePath: string
  constructor(
    credentials: ICredentials,
    filePath: string,
    assetFolder?: IAssetFolder
  ) {
    this.credentials = credentials
    this.apiClient = new ApiClient(
      this.credentials.apiToken,
      this.credentials.spaceId
    )
    this.assetFolder = assetFolder
    this.filePath = filePath
    this.data = {
      filename: path.parse(this.filePath).base,
    }
  }

  private get isSynced(): boolean {
    const baseUrl = '//a.storyblok.com/f/'
    return this.data.filename.includes(baseUrl)
  }

  public get prettyUrl(): string {
    if (!this.isSynced) {
      throw new Error('uninitialized asset')
    }
    return this.data.filename
  }

  public get publicUrl(): string {
    if (!this.isSynced) {
      throw new Error('uninitialized asset')
    }
    return this.data.filename.replace(
      '//a.storyblok.com/f',
      'https://s3.amazonaws.com/a.storyblok.com/f'
    )
  }

  public get folder(): string | undefined {
    return this.assetFolder ? this.assetFolder.name : undefined
  }

  public generatePhoto(): Promise<void> {
    if (this.assetFolder && this.assetFolder.id) {
      this.data.asset_folder_id = this.assetFolder.id
    }
    return this.apiClient.assets
      .createFromImage(this.data, this.filePath, true, 640)
      .then(prettyUrl => {
        this.data.filename = prettyUrl
        return console.log(`'${this.prettyUrl}' is created`)
      })
      .catch(e => Promise.reject(e))
  }

  public generateImage(): Promise<void> {
    if (this.assetFolder && this.assetFolder.id) {
      this.data.asset_folder_id = this.assetFolder.id
    }
    const methods = this.apiClient.assets
    return methods
      .register(this.data)
      .then(registration => {
        return imageToBuffer(this.filePath, false)
          .then(buffer => methods.upload(buffer, registration))
          .catch(e => Promise.reject(e))
      })
      .then(prettyUrl => {
        this.data.filename = prettyUrl
        return console.log(`'${this.prettyUrl}' is created`)
      })
      .catch(e => Promise.reject(e))
  }
}
