import { Song } from '../../../../shared/interfaces/interfaces';
import { ChangeEvent, useMemo } from 'react';

interface SongRowProps {
  song: Song;
  setArtist: (artist: string) => void;
  setTitle: (title: string) => void;
  deleteSong: () => void;
}

export default function SongRow({
                                  song,
                                  setTitle,
                                  setArtist,
                                  deleteSong
                                }: SongRowProps) {
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleArtistChange = (event: ChangeEvent<HTMLInputElement>) => {
    setArtist(event.target.value);
  };
  const displayPath = useMemo(() => {
    const fileName = song.path.split(/([\\/])/gim).pop();
    if (fileName) {
      return fileName.length > 40 ? fileName.slice(0, 40) + '...' : fileName;
    }
  }, [song]);

  return (
    <tr
      className='bg-white border-b bg-gray-800 border-gray-700'
      key={song.id}
    >
      <th className='py-4 px-6'>
        <input
          onBlur={handleTitleChange}
          className='bg-gray-900 text-white p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-900 text-white w-full'
          defaultValue={song.title}
          placeholder='Saisir le titre attendu'
        />
      </th>
      <td className='py-4 px-6'>
        <input
          onBlur={handleArtistChange}
          className='bg-gray-900 text-white p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-900 text-white w-full'
          defaultValue={song.artist}
          placeholder="Saisir l'artiste"
        />
      </td>
      <td className='py-4 px-6' title={song.path}>{displayPath}</td>
      <td className='py-4 px-6 text-right'>
        <a
          href='#'
          className='font-medium text-red-500 hover:underline'
          onClick={deleteSong}
        >
          Supprimer
        </a>
      </td>
    </tr>
  );
}
