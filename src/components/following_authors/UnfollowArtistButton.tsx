"use client";

import { unfollow } from "@/actions/follow_artist";

export function UnFollowArtistButton(props: {
  userId: number;
  artistId: number;
}) {
  return (
    <button
      className="btn btn-xs"
      onClick={(e) => {
        console.log("Remove followed artist");
        console.log(`Removing followd artist ${props.artistId} from user artists ${props.userId}`);
        unfollow(props.userId, props.artistId);
      }}
    >
      Unfollow
    </button>
  );
}
