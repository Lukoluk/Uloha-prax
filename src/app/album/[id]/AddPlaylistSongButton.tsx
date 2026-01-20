"use client";

import { addSongToPlaylist } from "@/actions/playlists";

export function AddPlaylistSongButton(props: {
  playlistId: number;
  songId: number;
  playlistName: string;
}) {
  return (
    <button
      className="btn btn-xs"
      onClick={(e) => {
        console.log("Add song");
        console.log(`Adding song ${props.songId} to playlist ${props.playlistId}`);
        addSongToPlaylist(props.playlistId, props.songId);
      }}
    >
      {props.playlistName}
    </button>
  );
}
