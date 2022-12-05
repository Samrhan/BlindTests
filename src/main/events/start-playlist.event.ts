import { Event } from '../events';
import { Controller, Inject } from '../dependency-inversion';
import PlaylistService from '../services/playlist.service';

@Controller()
export default class StartPlaylist extends Event {
  private playlistService: PlaylistService;

  constructor(@Inject() playlistService: PlaylistService) {
    super('start-playlist');
    this.playlistService = playlistService;
  }

  async handler(): Promise<void> {
    await this.playlistService.listen();
  }
}
