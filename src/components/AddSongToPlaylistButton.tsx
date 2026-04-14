"use client";

export function NextSongButton(props: {
  userId: number;
  songId: number;
}) {
  return (
    <button
      className="btn btn-xs"
      onClick={(e) => {
        console.log("Adding song to queue");
        console.log(`Adding song ${props.songId} to queue for ${props.userId}`);
      }}
    >
      Add to queue
    </button>
  );
}
