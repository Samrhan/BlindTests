import { Playlist, PlaylistBody } from '../../shared/interfaces/interfaces';
import { Event, EventProps } from '../events';
import Repository from '../repository';
import {v4 as uuidV4} from 'uuid';

interface UpdatePlaylistEventProps extends EventProps {
  playlist: Playlist;
}

export default class UpdatePlaylistEvent extends Event {
  constructor() {
    super('update-playlist');
  }

  async handler({ playlist }: UpdatePlaylistEventProps): Promise<Playlist> {

    await Repository.savePlaylist(playlist);
    return playlist;
  }
}
