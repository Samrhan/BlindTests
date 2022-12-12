import { Event, EventProps } from '../events';
import Repository from '../repository';
import { Controller, Inject } from '../dependency-inversion';
import PlaylistService from '../services/playlist.service';

export interface RegisterEventProps extends EventProps {
  key: string;
}

@Controller()
export default class CheckConfigEvent extends Event {
  playlistService: PlaylistService;
  constructor(@Inject() playlistService: PlaylistService) {
    super('check-register');
    this.playlistService = playlistService;
  }

  async handler(options: RegisterEventProps): Promise<string | undefined> {
    await this.playlistService.openServer();
    return await Repository.getConfigKey('user');
  }
}
