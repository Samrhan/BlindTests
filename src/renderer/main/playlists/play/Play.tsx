import { useMatch, useParams } from 'react-router-dom';
import { Playlist } from '../../../../shared/interfaces/interfaces';
import { useMemo, useState } from 'react';
import SongPlayer from './song-list/song/SongPlayer';
import SongList from './song-list/SongList';
import Chat from './chat/Chat';
import { Message } from '../../../../shared/interfaces/interfaces';

const useSongPlayer = (playlist: Playlist) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      author: 'Sam',
      content: 'De Céline Dion !',
      timestamp: new Date().getTime(),
      artist: {
        accuracy: 1,
        match: {
          start: 3,
          end: 14,
        },
      },
    },
    {
      id: '2',
      author: 'Sam',
      content: 'My Heart Will Go On',
      timestamp: new Date().getTime(),
      title: {
        accuracy: 1,
        match: {
          start: 0,
          end: 19,
        },
      },
    },
    {
      id: '3',
      author: 'Sam',
      content: 'My Heart Will Go On de Celine Dion !',
      timestamp: new Date().getTime(),
      title: {
        accuracy: 1,
        match: {
          start: 0,
          end: 19,
        },
      },
      artist: {
        accuracy: 1,
        match: {
          start: 23,
          end: 34,
        },
      },
    },
    {
      id: '4',
      author: 'Sam',
      content: 'Celine Dion : My Heart Will Go On',
      timestamp: new Date().getTime(),
      title: {
        accuracy: 1,
        match: {
          start: 14,
          end: 45,
        },
      },
      artist: {
        accuracy: 1,
        match: {
          start: 0,
          end: 11,
        },
      },
    },
    {
      id: '5',
      author: 'Sam',
      content: "C'est My Heart Will Go On !",
      timestamp: new Date().getTime(),
      title: {
        accuracy: 1,
        match: {
          start: 6,
          end: 25,
        },
      },
    },
    {
      id: '6',
      author: 'Sam',
      content: "C'est My Heart Will Go On !",
      timestamp: new Date().getTime(),
      title: {
        accuracy: 1,
        match: {
          start: 6,
          end: 25,
        },
      },
    },
    {
      id: '7',
      author: 'Sam',
      content: "C'est My Heart Will Go On !",
      timestamp: new Date().getTime(),
      title: {
        accuracy: 1,
        match: {
          start: 6,
          end: 25,
        },
      },
    },
    {
      id: '8',
      author: 'Sam',
      content: "C'est My Heart Will Go On !",
      timestamp: new Date().getTime(),
      title: {
        accuracy: 1,
        match: {
          start: 6,
          end: 25,
        },
      },
    },
    {
      id: '9',
      author: 'Sam',
      content: "C'est My Heart Will Go On !",
      timestamp: new Date().getTime(),
      title: {
        accuracy: 1,
        match: {
          start: 6,
          end: 25,
        },
      },
    },
    {
      id: '10',
      author: 'Sam',
      content: "C'est My Heart Will Go On !",
      timestamp: new Date().getTime(),
      title: {
        accuracy: 1,
        match: {
          start: 6,
          end: 25,
        },
      },
    },
    {
      id: '11',
      author: 'Sam',
      content: "C'est My Heart Will Go On !",
      timestamp: new Date().getTime(),
      title: {
        accuracy: 1,
        match: {
          start: 6,
          end: 25,
        },
      },
    },
    {
      id: '12',
      author: 'Sam',
      content: "C'est My Heart Will Go On !",
      timestamp: new Date().getTime(),
      title: {
        accuracy: 1,
        match: {
          start: 6,
          end: 25,
        },
      },
    },
    {
      id: '13',
      author: 'Sam',
      content: "C'est My Heart Will Go On !",
      timestamp: new Date().getTime(),
      title: {
        accuracy: 1,
        match: {
          start: 6,
          end: 25,
        },
      },
    },
  ]);
  const [songs, setSongs] = useState([...playlist.songs]);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const shuffleSongs = () => {
    const shuffledSongs = songs.sort(() => Math.random() - 0.5);
    setSongs(shuffledSongs);
  };

  return {
    messages,
    songs,
    currentSongIndex,
    setCurrentSongIndex,
    shuffleSongs,
  };
};

interface PlayProps {
  findPlaylist: (id: string) => Playlist | undefined;
}

export default function Play({ findPlaylist }: PlayProps) {
  const { id } = useParams<{ id: string }>();
  const playlist = useMemo(() => findPlaylist(id!)!, [id, findPlaylist]);
  const {
    messages,
    songs,
    currentSongIndex,
    setCurrentSongIndex,
    shuffleSongs,
  } = useSongPlayer(playlist);

  return (
    <>
      <div className="flex flex-col flex-wrap">
        <div className="bg-gray-900 h-full py-5 pl-5">
          <div className="bg-gray-800 h-full flex flex-col overflow-y-auto w-[50vw] rounded-l-3xl">
            <div className="flex">
              <div className="grid grid-cols-3 gap-3 px-5 w-full">
                <div className="pt-4">
                  <i className="bi bi-play-circle-fill text-5xl text-white hover:text-gray-500"></i>
                </div>
                <div className="m-auto">
                  <h1 className="font-bold text-gray-200 text-[15px] text-2xl text-center pt-4">
                    {playlist?.title}
                  </h1>
                </div>
                <div className="m-auto">
                  <h1 className="font-bold underline text-gray-200 text-[15px] text-2xl text-right pt-4">
                    Scores
                  </h1>
                </div>
              </div>
            </div>
            <div className="my-4 bg-gray-600 h-[.1vh] mx-10"></div>
            <div className="h-[75vh] overflow-y-scroll">
              <SongList songs={playlist?.songs || []} />
            </div>
            <div className="mt-auto px-5 mx-auto p-3 mb-3 bg-gray-900 rounded-2xl px-[20%]">
              <div className="w-full flex text-3xl">
                <button
                  title="Mélanger la playlist"
                  className="text-white p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-900 text-white disabled:bg-gray-700"
                >
                  <i className="bi bi-shuffle"></i>
                </button>
                <button className="text-whitep-2.5 mr-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-900 text-white disabled:bg-gray-700">
                  <i className="bi bi-skip-start-fill"></i>
                </button>
                <button
                  title="Mettre en pause"
                  className="text-white p-2.5 mr-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-900 text-white disabled:bg-gray-700"
                >
                  <i className="bi bi-pause-fill"></i>
                </button>
                <button className="text-white p-2.5 mr-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-900 text-white disabled:bg-gray-700">
                  <i className="bi bi-skip-end-fill"></i>
                </button>
                <button className="text-white p-2.5 mr-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-900 text-white disabled:bg-gray-700">
                  <i className="bi bi-square-fill"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full w-full">
        <Chat messages={messages}></Chat>
      </div>
    </>
  );
}
