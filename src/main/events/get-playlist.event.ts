import { Playlist } from '../../shared/interfaces/interfaces';
import { Event } from '../events';
import Repository from '../repository';


export default class GetPlaylistEvent extends Event {
  constructor() {
    super('get-playlists');
  }

  async handler(): Promise<Playlist[]> {
    return await Repository.getPlaylists();
  }
}
