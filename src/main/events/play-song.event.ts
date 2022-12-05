import { Song } from '../../shared/interfaces/interfaces';
import { Event, EventProps } from '../events';
import { Controller, Inject } from '../dependency-inversion';
import PlaylistService from '../services/playlist.service';

interface PlaySongProps extends EventProps {
  song: Song;
}

@Controller()
export default class PlaySong extends Event {
  playlistService: PlaylistService;

  constructor(@Inject() playlistService: PlaylistService) {
    super('play-song');
    this.playlistService = playlistService;
  }

  async handler({ song }: PlaySongProps): Promise<void> {
    this.playlistService.setSong(song);
  }
}
