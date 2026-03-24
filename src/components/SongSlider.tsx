"use client";


function formatDuration(duration: number): string {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}   

export function SongSlider({

}) {

  return (
    <>
      <p></p>
      <input type="range" min={0} max="100" value="40" className="range" />
    </>
  );
}
  