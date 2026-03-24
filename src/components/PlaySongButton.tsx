"use client";

export function PlaySongButton(props: {
  userId: number;
  songId: number;
}) {
  return (
    <button
      className="btn btn-xs"
      onClick={(e) => {
        console.log("Play song");
        console.log(`Playing song ${props.songId} for ${props.userId}`);
      }}
    >
      Play
    </button>
  );
}
