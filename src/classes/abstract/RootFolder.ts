import {ICredentials, IPendingStory} from '../../interfaces'
import {Folder} from './Folder'

export class RootFolder extends Folder {
  constructor(credentials: ICredentials, data: IPendingStory) {
    super(credentials, data)
    this.data.is_folder = true
    this.data.parent_id = 0
  }
}
