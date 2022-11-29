import { Playlist, PlaylistBody } from '../../shared/interfaces/interfaces';
import { Event, EventProps } from '../events';
import Repository from '../repository';
import {v4 as uuidV4} from 'uuid';

interface CreatePlaylistEventProps extends EventProps {
  playlist: PlaylistBody;
}

export default class CreatePlaylistEvent extends Event {
  constructor() {
    super('create-playlist');
  }

  async handler({ playlist }: CreatePlaylistEventProps): Promise<Playlist> {
    const playlistEntity: Playlist = {...playlist, id: uuidV4()};
    playlistEntity.folderPath = playlistEntity.folderPath.replace(/\\/g, '/');
    playlistEntity.songs.map((song) => (song.path = song.path.replace(/\\/g, '/')));

    await Repository.createPlaylist(playlistEntity);
    return playlistEntity;
  }
}
