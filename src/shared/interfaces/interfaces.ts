export interface Playlist {
  id: string;
  title: string;
  folderPath: string;
  songs: Song[];
}

export interface Song {
  id: string;
  path: string;
  title: string;
  artist: string;
  duration?: number;
}

export interface Match {
  start: number;
  end: number;
}

export interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: number;
  artist?: {
    accuracy: number;
    match: Match;
  };
  title?: {
    accuracy: number;
    match: Match;
  };
}

export type PlaylistBody = Pick<Playlist, 'title' | 'folderPath' | 'songs'>;

export type PartialSong = Pick<Song, 'title' | 'artist'>
