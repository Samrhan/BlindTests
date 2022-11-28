import SideMenu from './side-menu/SideMenu';
import {
  MemoryRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Playlists from './playlists/Playlists';
import { Playlist } from '../interfaces/interfaces';
import { useState } from 'react';
import CreateOrEditPlaylist from './create-playlist/CreateOrEditPlaylist';

export default function MainPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: '1',
      title: 'Playlist 1',
      folderPath: 'C:\\Users\\user\\Music\\Playlist 1',
      songs: [
        {
          id: '1',
          title: 'Song 1',
          artist: 'Artist 1',
          path: 'C:\\Users\\user\\Music\\Song 1.mp3',
        },
      ],
    },
  ]);

  return (
    <>
      <div className="flex flex-row h-full w-full">
        <Router>
          <SideMenu />
          <Routes>
            <Route path="/" element={<Navigate to="/playlists" />} />
            <Route
              path="/playlists"
              element={<Playlists playlists={playlists} />}
            ></Route>
            <Route path="/playlists/:id" element={<div>Playlist</div>}></Route>
            <Route
              path="/create-playlist"
              element={<CreateOrEditPlaylist />}
            ></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}
