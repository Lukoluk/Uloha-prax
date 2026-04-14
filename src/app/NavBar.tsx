"use client";
import Link from 'next/link'
import {useContext, useState} from "react";
import { useRouter } from 'next/navigation'
import { PlaybackContext } from './playback-context';
import { LogoutButton } from '@/components/LogoutButton';
export function NavBar(){
  const playbackContext = useContext(PlaybackContext)
  const router = useRouter()
  const [searchInput, setSearchInput] = useState("");
 
  const searchLinkQuery = searchInput !== "" ? { q: searchInput } : {};
  return (
    
    <div className="navbar bg-base-100 shadow-sm h-26">
      <div className="navbar-start">
        <div>Dummy: {playbackContext.dummy}</div>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <Link
                href={{
                  pathname: "/playlists",
                }}
              >
                Playlists
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: "/liked_songs",
                }}
              >
                Liked
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: "/history",
                }}
              >
                History
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: "/following_authors",
                }}
              >
                Following authors
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-5xl tracking-wider" href='./'>Spotify</a>
      </div>
      <div className="navbar-end">
        <Link
          href={{
            pathname: "/auth/login",
          }}
          className="btn btn-ghost text-xl mr-1"
          >Login</Link>

          <Link
          href={{
            pathname: "/auth/Register",
          }}
          className="btn btn-ghost text-xl mr-4"
          >Register</Link>

          <LogoutButton />


        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto" 
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              router.push(`/search?q=${searchInput}`);
            }
          }}
        />
        <Link
          href={{
            pathname: "/search",
            query: searchLinkQuery,
          }}
          className='btn btn-ghost text-xl'
          >Search</Link>
      </div>
    </div>
  );
}