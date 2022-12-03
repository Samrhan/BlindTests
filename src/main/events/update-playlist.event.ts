import { Playlist } from '../../shared/interfaces/interfaces';
import { Event, EventProps } from '../events';
import Repository from '../repository';

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
