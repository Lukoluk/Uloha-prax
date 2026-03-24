"use client";

export function NextSongButton(props: {
  userId: number;
  songId: number;
}) {
  return (
    <button
      className="btn btn-xs"
      onClick={(e) => {
        console.log("Play next song");
        console.log(`Playing next song ${props.songId} for ${props.userId}`);
      }}
    >
      Next
    </button>
  );
}
