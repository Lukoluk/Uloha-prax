"use client";

import { follow } from "@/actions/follow_artist";

export function FollowArtistButton(props: {
  userId: number;
  artistId: number;
}) {
  return (
    <button
      className="btn btn-xs"
      onClick={(e) => {
        console.log("Add followed artist");
        console.log(`Adding followed artist ${props.artistId} to user artists ${props.userId}`);
        follow(props.userId, props.artistId);
      }}
    >
      Follow
    </button>
  );
}
