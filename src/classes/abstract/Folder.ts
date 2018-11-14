import {ICredentials, IPendingStory} from '../../interfaces'
import {Story} from './Story'

export class Folder extends Story {
  constructor(credentials: ICredentials, data: IPendingStory) {
    super(credentials, data)
    this.data.is_folder = true
  }
}
