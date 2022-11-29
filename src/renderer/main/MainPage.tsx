import SideMenu from './side-menu/SideMenu';
import { MemoryRouter as Router, Navigate, Route, Routes, useParams, useSearchParams } from 'react-router-dom';
import Playlists from './playlists/Playlists';
import { Playlist, PlaylistBody } from '../../shared/interfaces/interfaces';
import { useEffect, useState } from 'react';
import CreateOrEditPlaylist from './create-playlist/CreateOrEditPlaylist';
import emit from '../utils/event-emiter';


const usePlaylistStorage = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  useEffect(() => {
    emit<Playlist[]>('get-playlists').then((playlists: Playlist[]) => {
      setPlaylists(playlists);
    });
  }, []);
  return { playlists, setPlaylists };
};

export default function MainPage() {
  const { playlists, setPlaylists } = usePlaylistStorage();

  const handleNewPlaylist = (playlist: PlaylistBody) => {
    emit<Playlist>('create-playlist', { playlist }).then((playlist: Playlist) => {
      setPlaylists((playlists) => {
        return [...playlists, playlist];
      });
    });
  };

  const handleEditPlaylist = (playlist: Playlist) => {
    emit<Playlist>('update-playlist', { playlist }).then((playlist: Playlist) => {
      setPlaylists((playlists) => {
        return playlists.map((p) => {
          if (p.id === playlist.id) {
            return playlist;
          }
          return p;
        });
      });
    });
  }

  const handleFindPlaylist = (id: string) => {
    return playlists.find((playlist) => playlist.id === id);
  }

  return (
    <>
      <div className='flex flex-row h-full w-full'>
        <Router>
          <SideMenu />
          <Routes>
            <Route path='/' element={<Navigate to='/playlists' />} />
            <Route
              path='/playlists'
              element={<Playlists playlists={playlists} />}
            ></Route>
            <Route path='/playlists/:id'
                   element={<CreateOrEditPlaylist editPlaylist={handleEditPlaylist} findPlaylist={handleFindPlaylist} />}></Route>
            <Route
              path='/create-playlist'
              element={<CreateOrEditPlaylist addPlaylist={handleNewPlaylist} />}
            ></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}
