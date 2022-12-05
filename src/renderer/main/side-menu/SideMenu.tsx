import { Link, NavLink } from 'react-router-dom';

export default function SideMenu() {
  return (
    <div className="sidebar lg:left-0 p-2 min-w-[20vw] overflow-y-hidden text-center bg-gray-900">
      <div className="text-gray-100 text-xl">
        <div className="p-2.5 mt-1 flex items-center">
          <i className="bi bi-music-note px-2 py-1 rounded-md bg-blue-600"></i>
          <h1 className="font-bold text-gray-200 text-[15px] ml-3">
            BlindTest&nbsp;Player
          </h1>
        </div>
        <div className="my-2 bg-gray-600 h-[1px]"></div>
      </div>
      <NavLink
        className={({ isActive }) =>
          'p-2.5 mt-3 flex text-left items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ' +
          (isActive ? 'bg-blue-600' : '')
        }
        to="/playlists"
      >
        <i className="bi bi-music-note-list"></i>
        <span className="text-[15px] ml-4 text-gray-200 font-bold">
          Playlists
        </span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          'p-2.5 mt-3 flex text-left items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ' +
          (isActive ? 'bg-blue-600' : '')
        }
        to="/create-playlist"
      >
        <i className="bi bi-music-note-list"></i>
        <span className="text-[15px] ml-4 text-gray-200 font-bold">
          Créer une playlist
        </span>
      </NavLink>
      <div className="my-4 bg-gray-600 h-[1px]"></div>
      <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
        <i className="bi bi-box-arrow-in-right"></i>
        <span className="text-[15px] ml-4 text-gray-200 font-bold">
          Se déconnecter
        </span>
      </div>
    </div>
  );
}
