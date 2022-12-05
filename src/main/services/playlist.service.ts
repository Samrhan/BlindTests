import { Service } from '../dependency-inversion';
import { Message, Song } from '../../shared/interfaces/interfaces';
import { Client } from 'tmi.js';
import Repository from '../repository';
import parseMessage from '../utils/parse-message';

@Service()
export default class PlaylistService {
  private currentSong?: Song;
  private chatClient?: Client;
  private messages: Record<string, Message> = {};
  private leaderboard: Record<string, number> = {};

  listening = false;

  setSong(song: Song) {
    this.currentSong = song;
  }

  async listen() {
    if (this.listening) {
      return;
    }
    this.leaderboard = {};
    this.listening = true;
    const userChannel = await Repository.getConfigKey('user');
    this.chatClient = new Client({
      channels: [userChannel]
    });
    await this.chatClient.connect();
    this.chatClient.on('message', (channel, tags, message, self) => {
      if (self) return;
      if (this.currentSong) {
        const parsedMessage = parseMessage(message, this.currentSong.artist, this.currentSong.title, tags?.['display-name'] ?? tags?.username ?? 'unknown');
        if (parsedMessage) {
          this.messages[parsedMessage.id] = parsedMessage;
          (global as any).webContents.send('message', parsedMessage);
        }
      }
    });
  }

  confirm(id: string) {
    const message = this.messages[id];
    const points = this.currentSong?.artist.length && this.currentSong?.title.length ? 0.5 : 1;
    if (message) {
      this.leaderboard[message.author] = (this.leaderboard[message.author] ?? 0) + points;
      (global as any).webContents.send('leaderboard', this.leaderboard);
      console.log(this.leaderboard);
    }
  }
}
