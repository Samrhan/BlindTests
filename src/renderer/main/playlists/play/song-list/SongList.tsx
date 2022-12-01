import { Song } from '../../../../../shared/interfaces/interfaces';
import SongPlayer from './song/SongPlayer';

interface SongListProps {
  songs: Song[];
}

export default function SongList({ songs }: SongListProps) {
  const displaySongs = songs.map((song) => {
    return <SongPlayer key={song.id} song={song} />;
  });

  return (
    <div className="w-full bg-gray-800">
      <div className="overflow-x-hidden ">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-2">
                <span className="sr-only"></span>
              </th>
              <th scope="col" className="py-3 px-6">
                Titre
              </th>
              <th scope="col" className="py-3 px-6">
                Artiste
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll">{displaySongs}</tbody>
        </table>
      </div>
    </div>
  );
}
