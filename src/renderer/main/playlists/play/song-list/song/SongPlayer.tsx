import { Song } from '../../../../../../shared/interfaces/interfaces';
import { useState } from 'react';
import PlayingAnimation from '../../../../../utils/components/PlayingAnimation';

interface SongProps {
  song: Song;
  order: number;
  playId: () => void;
  played: boolean;
  current: boolean;
  isPlaying: boolean;
  pausePlaylist: () => void;
}

export default function SongPlayer({ song, playId, order, played, current, isPlaying, pausePlaylist }: SongProps) {

  const [showIcon, setShowIcon] = useState<boolean>(false);

  return (
    <tr className='bg-white border-b bg-gray-800 border-gray-700'
        onMouseEnter={() => setShowIcon(true)}
        onMouseLeave={() => setShowIcon(false)}
    >
      <th className='py-4 text-center'>
        <button
          onClick={isPlaying && current ? () => pausePlaylist() : () => playId()}
          className='font-medium'
        >
          {showIcon ? (isPlaying && current ?
              (<span className='bi bi-pause-fill text-2xl' title={`Lire ${song.title}`} />) : (
                <span className='bi bi-play-fill text-2xl' title={`Lire ${song.title}`} />)
          ) : (
            <span className='text-2xl'>{order + 1}</span>
          )}
        </button>
      </th>
      <td className='py-4 px-6'>
        <a
          className='text-white p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-900 text-white w-full'>
          <span className={current ? 'text-blue-500 font-bold' : ''}>{song.title}</span>
        </a>
      </td>
      <td className='py-4 px-6'>
        <a
          className='text-white p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-900 text-white w-full'>
          {song.artist}
        </a>
      </td>
      <td className='py-4 px-6 min-w-[5rem]'>
        {played && !current && (<span className='bi bi-check text-white text-2xl' />)}
        {current && isPlaying && (<PlayingAnimation />)}
      </td>
    </tr>
  );
}
