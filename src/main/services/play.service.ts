import { Service } from '../dependency-inversion';
import Repository from '../repository';

@Service()
export default class PlayService {
  constructor() {
    console.log('PlayService constructor');
  }

  async startPlaylist(playlistId: string) {
    const playlist = await Repository.getPlaylist(playlistId);
    console.log('Starting playlist', playlist);
  }
}
