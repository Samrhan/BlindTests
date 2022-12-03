import { Event, EventProps } from '../events';
import { Playlist } from '../../shared/interfaces/interfaces';
import Repository from '../repository';
import { Controller, Inject } from '../dependency-inversion';
import PlayService from '../services/play.service';

interface StartPlaylistProps extends EventProps {
  playlistId: string;
}

@Controller()
export default class StartPlaylist extends Event {
  private playService: PlayService;

  constructor(@Inject() playService: PlayService) {
    super('start-playlist');
    this.playService = playService;
  }

  async handler({ playlistId }: StartPlaylistProps): Promise<void> {
    this.playService.startPlaylist(playlistId)
  }
}
