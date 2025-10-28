"use client";
import Link from 'next/link'
import {useState} from "react";
export function NavBar(){
  const [searchInput, setSearchInput] = useState("");
 
  const searchLinkQuery = searchInput !== "" ? { q: searchInput } : {};
  return (
    
    <div className="navbar bg-base-100 shadow-sm h-26">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
          </div>
          <ul
            tabIndex="-1" 
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <Link
                href={{
                  pathname: "/playlists",
                }}
              >
                Search
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-5xl tracking-wider">Spotify</a>
      </div>
      <div className="navbar-end">

        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto" 
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
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