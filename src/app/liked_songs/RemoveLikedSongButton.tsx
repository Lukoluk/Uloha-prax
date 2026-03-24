"use client";

import { removeSongFromLiked } from "@/actions/liked_songs";

export function RemoveLikedSongButton(props: {
  userId: number;
  songId: number;
}) {
  return (
    <button
      className="btn btn-xs"
      onClick={(e) => {
        console.log("Remove song");
        console.log(`Removing song ${props.songId} from Liked songs`);
        removeSongFromLiked(props.userId, props.songId);
      }}
    >
      Unlike
    </button>
  );
}
