import { useParams } from 'react-router-dom';
import { Message, Playlist } from '../../../../shared/interfaces/interfaces';
import { useCallback, useEffect, useMemo, useState } from 'react';
import SongList from './song-list/SongList';
import Chat from './chat/Chat';
import emit from '../../../utils/event-emiter';
import ProgressBar from './controls/progress-bar/ProgressBar';
import Controls from './controls/Controls';
import on from '../../../utils/event-subscriber';

const useSongPlayer = (playlist: Playlist) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [audio] = useState<HTMLAudioElement>(new Audio());
    const [isPlaying, setIsPlaying] = useState(false);
    const [messageSubscription, setMessageSubscription] = useState<boolean>(false);
    const [songs, setSongs] = useState([...playlist.songs]);
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentSongIndex, setCurrentSongIndex] = useState<number | undefined>(undefined);
    const [playedSongs, setPlayedSongs] = useState<string[]>([]);

    const shuffleSongs = useCallback(() => {
      const alreadyPlayedSongs = currentSongIndex === undefined ? [] : songs.slice(0, currentSongIndex + 1);
      const notPlayedSongs = currentSongIndex === undefined ? [...songs] : songs.slice(currentSongIndex + 1);
      const shuffledSongs = notPlayedSongs.sort(() => Math.random() - 0.5);
      const newSongs = [...alreadyPlayedSongs, ...shuffledSongs];

      setSongs(newSongs);
    }, [songs, currentSongIndex]);

    useEffect(() => {
      (async () => {
        if (currentSongIndex === undefined) {
          return;
        }
        const song = songs[currentSongIndex];
        if (!song) {
          return;
        }
        setMessages([]);
        const buffer = await emit<string>('get-file', { path: song.path });
        audio.src = 'data:audio/mp3;base64,' + buffer;
        await emit('play-song', { song }, { noCallback: true });
        await audio.play();
        audio.onended = () => {
          setPlayedSongs([...playedSongs, song.id]);
          setCurrentSongIndex((prev) => prev ? prev + 1 : 0);
        };
        audio.ontimeupdate = () => {
          setCurrentTime(audio.currentTime);
        };
        song.duration = audio.duration;
        setCurrentSong(song);
      })();
    }, [currentSongIndex]);

    useEffect(() => {
      if (isPlaying) {
        emit('start-playlist', {}, { noCallback: true });
        if (!messageSubscription) {
          setMessageSubscription(true);
        }
      }
      return () => {
        if (messageSubscription) {
          setMessageSubscription(false);
        }
      };
    }, [isPlaying, messageSubscription]);

    useEffect(() => {
      if (messageSubscription) {
        on('message', (message: Message) => {
          if (messages.find((msg) => msg.id === message.id)) {
            return;
          }
          setMessages((messages) => [...messages, message]);
        });
      }
    }, [messageSubscription, messages]);

    const playId = useCallback(async (id: string) => {
      if (currentSongIndex !== undefined) {
        setPlayedSongs((prev) => [...prev, currentSong.id]);
      }
      const index = songs.findIndex((song) => song.id === id);
      setCurrentSongIndex(index);
      if (!isPlaying) {
        setIsPlaying(true);
      }
    }, [songs, currentSongIndex, isPlaying, currentSong]);

    const startPlaylist = useCallback(async () => {
      setCurrentSongIndex(0);
      setIsPlaying(true);
    }, []);

    const playNextSong = useCallback(async () => {
      setPlayedSongs((prev) => [...prev, currentSong.id]);
      setCurrentSongIndex((prev) => {
        if (prev && prev + 1 >= songs.length || prev === undefined) {
          return 0;
        }
        return prev + 1;
      });

    }, [currentSongIndex, songs, isPlaying, currentSong]);

    const playPreviousSong = useCallback(async () => {
      setPlayedSongs((prev) => [...prev, currentSong.id]);
      setCurrentSongIndex((prev) => {
        if (prev && prev - 1 < 0 || prev === undefined) {
          return songs.length - 1;
        }
        return prev - 1;
      });
    }, [currentSongIndex, songs, isPlaying, currentSong]);

    const pausePlaylist = useCallback(async () => {
      await audio.pause();
      setIsPlaying(false);
    }, [audio, setIsPlaying]);

    const resumePlaylist = useCallback(async () => {
      if (currentSongIndex === undefined) {
        setCurrentSongIndex(0);
      } else {
        await audio.play();
      }
      setIsPlaying(true);
    }, [audio, currentSongIndex]);

    const onSeek = useCallback((percentage: number) => {
      audio.currentTime = audio.duration * percentage;
      setCurrentTime(audio.currentTime);
    }, [audio]);

    const confirmArtist = useCallback(async (messageId: string) => {
      await emit('confirm', { id: messageId }, { noCallback: true });
    }, []);
    const confirmTitle = useCallback(async (messageId: string) => {
      await emit('confirm', { id: messageId }, { noCallback: true });
    }, []);

    return {
      messages,
      songs,
      currentSongIndex,
      setCurrentSongIndex,
      shuffleSongs,
      startPlaylist,
      pausePlaylist,
      isPlaying,
      resumePlaylist,
      playNextSong,
      playPreviousSong,
      playId,
      currentSong,
      currentTime,
      playedSongs,
      onSeek,
      confirmArtist,
      confirmTitle,
    };
  }
;

interface PlayProps {
  findPlaylist: (id: string) => Playlist | undefined;
  username: string;
}

export default function Play({ findPlaylist, username }: PlayProps) {
  const { id } = useParams<{ id: string }>();
  const playlist = useMemo(() => findPlaylist(id!)!, [id, findPlaylist]);
  const {
    messages,
    songs,
    startPlaylist,
    pausePlaylist,
    resumePlaylist,
    isPlaying,
    playNextSong,
    playPreviousSong,
    playId,
    currentSong,
    currentTime,
    shuffleSongs,
    playedSongs,
    onSeek,
    confirmArtist,
    confirmTitle,
  } = useSongPlayer(playlist);

  return (
    <>
      <div className='flex flex-col flex-wrap'>
        <div className='bg-gray-900 h-full py-5 pl-5'>
          <div className='bg-gray-800 h-full flex flex-col overflow-y-auto w-[50vw] rounded-l-3xl'>
            <div className='flex'>
              <div className='m-auto'>
                <h1 className='font-bold text-gray-200 text-[15px] text-2xl text-center pt-4'>
                  {playlist?.title}
                </h1>
              </div>
            </div>
            <div className='my-4 bg-gray-600 h-[.1vh] mx-10'></div>
            <div className='h-[75vh] overflow-y-scroll px-5'>
              <SongList songs={songs || []} playId={playId} playedSongs={playedSongs} playingId={currentSong.id}
                        isPlaying={isPlaying} pausePlaylist={pausePlaylist} />
            </div>
            <Controls isPlaying={isPlaying} artist={currentSong.artist} playNextSong={playNextSong}
                      playPreviousSong={playPreviousSong} title={currentSong.title} pausePlaylist={pausePlaylist}
                      resumePlaylist={resumePlaylist} shuffleSongs={shuffleSongs}>
              {currentSong.duration &&
                <ProgressBar onSeek={onSeek} progress={currentTime} duration={currentSong.duration} />}
            </Controls>
          </div>
        </div>
      </div>
      <div className='h-full w-full'>
        <Chat confirmArtist={confirmArtist} confirmTitle={confirmTitle} messages={messages} username={username}></Chat>
      </div>
    </>
  );
}
