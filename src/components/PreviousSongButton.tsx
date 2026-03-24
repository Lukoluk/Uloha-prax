"use client";

export function PreviousSongButton(props: {
  userId: number;
  songId: number;
}) {
  return (
    <button
      className="btn btn-xs"
      onClick={(e) => {
        console.log("Play previus song");
        console.log(`Playing previus song ${props.songId} for ${props.userId}`);
      }}
    >
      Previus
    </button>
  );
}
