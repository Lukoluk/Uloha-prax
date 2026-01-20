"use client";

import { removePlaylist } from "@/actions/playlists";

export function RemovePlaylistButton(props: {
  playlistId: number;
}) {
  return (
    <button
      className="btn"
      onClick={(e) => {
        console.log("Remove playlist");
        console.log(`Removing playlist ${props.playlistId}`);
        removePlaylist(props.playlistId);
      }}
    >
      Remove playlist
    </button>
  );
}
