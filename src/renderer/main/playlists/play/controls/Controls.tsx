import { PropsWithChildren } from 'react';

interface ControlsProps extends PropsWithChildren {
  isPlaying: boolean;
  pausePlaylist: () => void;
  resumePlaylist: () => void;
  playNextSong: () => void;
  playPreviousSong: () => void;
  shuffleSongs: () => void;
  title: string;
  artist: string;
}

export default function Controls({
                                   isPlaying,
                                   playPreviousSong,
                                   resumePlaylist,
                                   playNextSong,
                                   pausePlaylist,
                                   shuffleSongs,
                                   children,
                                   title, artist
                                 }: ControlsProps) {
  return (
    <div className='mt-auto px-5 mx-auto p-3 mb-3 bg-gray-900 rounded-2xl px-[20%]'>
      <h1 className='text-white font-xl text-center'>{title} - {artist}</h1>
      <div className='w-full flex text-3xl'>
        <button onClick={shuffleSongs}
          title='Mélanger la playlist'
          className='text-white p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-900 text-white disabled:bg-gray-700'
        >
          <i className='bi bi-shuffle'></i>
        </button>
        <button onClick={playPreviousSong}
                className='text-whitep-2.5 mr-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-900 text-white disabled:bg-gray-700'>
          <i className='bi bi-skip-start-fill'></i>
        </button>
        {isPlaying ?
          (<button onClick={pausePlaylist}
                   title='Mettre en pause'
                   className='text-white p-2.5 mr-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-900 text-white disabled:bg-gray-700'>
            <i className='bi bi-pause-fill'></i>
          </button>) : (
            <button onClick={resumePlaylist}
                    title='Reprendre'
                    className='text-white p-2.5 mr-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-900 text-white disabled:bg-gray-700'>
              <i className='bi bi-play-fill'></i>
            </button>)
        }

        <button onClick={playNextSong}
                className='text-white p-2.5 mr-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-900 text-white disabled:bg-gray-700'>
          <i className='bi bi-skip-end-fill'></i>
        </button>
        <button
          className='text-white p-2.5 mr-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-900 text-white disabled:bg-gray-700'>
          <i className='bi bi-square-fill'></i>
        </button>
      </div>
      {children}
    </div>
  );
}
