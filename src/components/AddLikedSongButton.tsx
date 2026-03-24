"use client";

import { addSongToLiked } from "@/actions/liked_songs";

export function AddLikedSongButton(props: {
  userId: number;
  songId: number;
}) {
  return (
    <button
      className="btn btn-xs"
      onClick={(e) => {
        console.log("Add song");
        console.log(`Adding song ${props.songId} to liked songs ${props.userId}`);
        addSongToLiked(props.userId, props.songId);
      }}
    >
      Like
    </button>
  );
}
