import { Event, EventProps } from '../events';
import PlaylistService from '../services/playlist.service';
import { Controller, Inject } from '../dependency-inversion';

interface ConfirmProps extends EventProps {
  id: string;
}

@Controller()
export default class Confirm extends Event {
  playlistService: PlaylistService;

  constructor(@Inject() playlistService: PlaylistService) {
    super('confirm');
    this.playlistService = playlistService;
  }

  async handler({ id }: ConfirmProps): Promise<void> {
    this.playlistService.confirm(id);
  }
}
