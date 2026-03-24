"use client";

export function PauseSongButton(props: {
  userId: number;
  songId: number;
}) {
  return (
    <button
      className="btn btn-xs"
      onClick={(e) => {
        console.log("Pause song");
        console.log(`Pauseing song ${props.songId} for ${props.userId}`);
      }}
    >
      Pause
    </button>
  );
}
