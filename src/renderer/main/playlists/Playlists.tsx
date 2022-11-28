import { Playlist } from '../../interfaces/interfaces';

interface PlaylistsProps {
  playlists: Playlist[];
}

export default function Playlists({ playlists }: PlaylistsProps) {
  const playlistDisplay = playlists.map((playlist) => {
    return (
      <tr
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        key={playlist.id}
      >
        <th
          scope="row"
          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {playlist.title}
        </th>
        <td className="py-4 px-6">{playlist.songs.length}</td>
        <td className="py-4 px-6">{playlist.folderPath}</td>
        <td className="py-4 px-6 text-right">
          <a
            href="#"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Lancer
          </a>
        </td>
        <td className="py-4 px-6 text-right">
          <a
            href="#"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Modifier
          </a>
        </td>
      </tr>
    );
  });
  return (
    <div className="w-full h-full bg-gray-800">
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Nom
              </th>
              <th scope="col" className="py-3 px-6">
                Nombre de chansons
              </th>
              <th scope="col" className="py-3 px-6">
                Répertoire
              </th>
              <th scope="col" className="py-3 px-6">
                <span className="sr-only">Lancer</span>
              </th>
              <th scope="col" className="py-3 px-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>{playlistDisplay}</tbody>
        </table>
      </div>
    </div>
  );
}
