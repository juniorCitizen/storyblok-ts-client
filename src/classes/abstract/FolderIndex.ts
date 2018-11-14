import {ICredentials, IPendingStory} from '../../interfaces'
import {Folder} from './Folder'
import {RootFolder} from './RootFolder'
import {Story} from './Story'
import {Subfolder} from './Subfolder'

export class FolderIndex extends Story {
  private parent: Folder | RootFolder | Subfolder | Story
  constructor(
    credentials: ICredentials,
    data: IPendingStory,
    parent: Folder | RootFolder | Subfolder | Story
  ) {
    super(credentials, data)
    this.data.is_folder = false
    this.parent = parent
    this.data.is_startpage = true
  }

  protected sync(): Promise<void> {
    if (this.parent.isFolder) {
      this.data.parent_id = this.parent.id
    } else {
      throw new Error('parent must be a folder')
    }
    return super.sync()
  }
}
