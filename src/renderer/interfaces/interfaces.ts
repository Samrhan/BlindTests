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
}
