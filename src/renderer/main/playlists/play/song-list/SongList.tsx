import { Song } from '../../../../../shared/interfaces/interfaces';
import SongPlayer from './song/SongPlayer';

interface SongListProps {
  songs: Song[];
  playId: (id: string) => void;
  playedSongs: string[];
  playingId: string;
  isPlaying: boolean;
  pausePlaylist: () => void;
}

export default function SongList({ songs, playId, playedSongs, playingId, isPlaying, pausePlaylist }: SongListProps) {
  const displaySongs = songs.map((song, i) => {
    return <SongPlayer key={song.id} song={song} playId={() => playId(song.id)} order={i}
                       played={playedSongs.includes(song.id)} current={playingId === song.id} isPlaying={isPlaying}
                       pausePlaylist={pausePlaylist}
    />;
  });

  return (
    <div className='w-full bg-gray-800'>
      <div className='overflow-x-hidden '>
        <table className='w-full text-sm text-left text-gray-400'>
          <thead className='text-xs uppercase bg-gray-700 text-gray-400'>
            <tr>
              <th scope='col' className='py-3 px-2 text-center text-[15px] font-bold'>
                #
              </th>
              <th scope='col' className='py-3 px-6'>
                Titre
              </th>
              <th scope='col' className='py-3 px-6'>
                Artiste
              </th>
              <th scope='col' className='py-3 px-6'>
                <span className='sr-only'>Etat</span>
              </th>
            </tr>
          </thead>
          <tbody className='overflow-y-scroll'>{displaySongs}</tbody>
        </table>
      </div>
    </div>
  );
}
