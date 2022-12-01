import { Song } from '../../../../../../shared/interfaces/interfaces';

interface SongProps {
  song: Song;
}

export default function SongPlayer({ song }: SongProps) {
  return (
    <tr className="bg-white border-b bg-gray-800 border-gray-700  hover:text-white text-transparent">
      <th className="py-4 text-right">
        <a
          href="renderer/main/playlists/play/song-list/song/SongPlayer#"
          className="font-medium"
        >
          <i
            className="bi bi-play-fill text-2xl"
            title={`Lire ${song.title}`}
          />
        </a>
      </th>
      <td className="py-4 px-6">
        <a className="bg-gray-900 text-white p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-900 text-white w-full">
          {song.title}
        </a>
      </td>
      <td className="py-4 px-6">
        <a className="bg-gray-900 text-white p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-900 text-white w-full">
          {song.artist}
        </a>
      </td>
    </tr>
  );
}
