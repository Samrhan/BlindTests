import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Playlist, PlaylistBody, Song } from '../../../shared/interfaces/interfaces';
import SongRow from './song-row/SongRow';
import { v4 as uuidV4 } from 'uuid';
import { useParams } from 'react-router-dom';

interface CreateOrEditPlaylistProps {
  playlist?: Playlist;
  addPlaylist?: (playlist: PlaylistBody) => void;
  editPlaylist?: (playlist: Playlist) => void;
  findPlaylist?: (id: string) => Playlist | undefined;
}

export default function CreateOrEditPlaylist({
                                               playlist,
                                               addPlaylist,
                                               findPlaylist,
                                               editPlaylist
                                             }: CreateOrEditPlaylistProps) {
  const { id } = useParams();
  const [title, setTitle] = useState<string>(playlist?.title || '');
  const [folderPath, setFolderPath] = useState<string>(
    playlist?.folderPath || ''
  );

  const [songs, setSongs] = useState<Song[]>(playlist?.songs || []);
  const addDirectoryAttribute = (node: HTMLInputElement) => {
    if (node) {
      node.webkitdirectory = true;
    }
  };
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleFolderPathChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const path = event.target.files[0].path.split(/([\\/])/gim);
      path.pop();
      setFolderPath(path.join(''));
      for (let i = 0; i < event.target.files.length; i++) {
        addSong(event.target.files[i].path);
      }
    }
  };
  const addSong = (path: string) => {
    path = path.replace(/\\/g, '/');

    if (songs.find((song) => song.path === path)) {
      return;
    }

    const song: Song = {
      id: uuidV4(),
      path: path,
      title: '',
      artist: ''
    };
    setSongs((songs) => {
      return [...songs, song];
    });
  };

  const handleSavePlaylist = () => {
    if (title === '' || folderPath === '' || songs.length === 0) {
      return;
    }
    const savedPlaylist: PlaylistBody = {
      title,
      songs,
      folderPath
    };
    if (id) {
      editPlaylist && editPlaylist({ ...savedPlaylist, id });
    } else {
      addPlaylist && addPlaylist(savedPlaylist);
    }

  };

  const disabledButton = useMemo(() => {
    return !title.length || !folderPath.length || !songs.length;
  }, [title, folderPath, songs]);

  const setSongArtist = (id: string, artist: string) => {
    setSongs((songs) => {
      return songs.map((song) => {
        if (song.id === id) {
          song.artist = artist;
        }
        return song;
      });
    });
  };

  const setSongTitle = (id: string, title: string) => {
    setSongs((songs) => {
      return songs.map((song) => {
        if (song.id === id) {
          song.title = title;
        }
        return song;
      });
    });
  };

  const handleDeleteSong = (id: string) => {
    setSongs((songs) => {
      return songs.filter((song) => song.id !== id);
    });
  };

  useEffect(() => {
    if (id && findPlaylist && !title && !folderPath && !songs.length) {
      const playlist = findPlaylist(id);
      if (!playlist) {
        return;
      }
      setTitle(playlist.title);
      setFolderPath(playlist.folderPath);
      setSongs(playlist.songs);
    }
  });

  const songArray = songs.map((song, i) => {
    return (
      <SongRow
        key={i}
        song={song}
        setArtist={(artist) => {
          if (song.id) {
            setSongArtist(song.id, artist);
          }
        }}
        setTitle={(title) => {
          if (song.id) {
            setSongTitle(song.id, title);
          }
        }}
        deleteSong={() => {
          handleDeleteSong(song.id);
        }}
      />
    );
  });

  return (
    <div className='bg-gray-800 h-full w-full flex flex-col overflow-y-auto'>
      <div className='px-10 w-full'>
        <div className='mt-5'>
          <label className='text-gray-200 font-bold text-xl mt-5'>Nom</label>
          <input
            className='bg-gray-900 text-white p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-900 text-white w-full'
            type='text'
            placeholder='Nom de la playlist'
            onChange={handleTitleChange}
            value={title}
          />
        </div>
        <div className='mt-5'>
          <label className='mt-10 text-gray-200 font-bold text-xl mt-5'>
            Importer un dossier
          </label>
          <input
            className='bg-gray-900 text-white p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-900 text-white w-full'
            type='file'
            placeholder='Nom de la playlist'
            onChange={handleFolderPathChange}
            ref={addDirectoryAttribute}
          />
        </div>
      </div>
      <div className='my-4 bg-gray-600 h-[1px] mx-20'></div>
      <div>
        <div className='px-10 w-full flex'>
          <button
            className='bg-red-800 mr-2 text-white p-2.5 mb-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-900 text-white'>
            Ajouter depuis YouTube
          </button>
          <button onClick={handleSavePlaylist}
                  className='bg-blue-800 text-white p-2.5 mb-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-900 text-white disabled:bg-gray-700'
                  disabled={disabledButton}>
            Sauvegarder
          </button>
        </div>
      </div>
      <div className='w-full bg-gray-800'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm text-left text-gray-400'>
            <thead className='text-xs uppercase bg-gray-700 text-gray-400'>
              <tr>
                <th scope='col' className='py-3 px-6'>
                  Titre
                </th>
                <th scope='col' className='py-3 px-6'>
                  Artiste
                </th>
                <th scope='col' className='py-3 px-6'>
                  Nom du fichier
                </th>
                <th scope='col' className='py-3 px-6'>
                  <span className='sr-only'>Supprimer</span>
                </th>
              </tr>
            </thead>
            <tbody className='overflow-y-scroll'>{songArray}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
