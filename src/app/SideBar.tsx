"use client";

import { useContext } from "react";
import { PlaybackContext } from "./playback-context";

export function SideBar() {
  const {
    queue,
    currentSongIndex,
    currentSong,
    isShuffled,
    shuffleOrder,
    shufflePosition,
  } = useContext(PlaybackContext);

  let upcoming = [] as typeof queue;

  if (isShuffled) {
    const upcomingIndices = shuffleOrder.slice(shufflePosition + 1);
    upcoming = upcomingIndices.map((i: number) => queue[i]);
  } else {
    upcoming = queue.slice(currentSongIndex + 1);
  }

  return (
    <div className="p-2 text-sm">
      <div className="mb-4">
        <div className="font-bold">Current song</div>
        <div>
          {currentSong
            ? `${currentSong.name} – ${currentSong.author}`
            : "Nothing playing"}
        </div>
      </div>

      <div>
        <div className="font-bold mb-1">
          Next in queue {isShuffled ? "(shuffled)" : ""}
        </div>
        {upcoming.length === 0 ? (
          <div>Queue is empty</div>
        ) : (
          <ul className="list-disc ml-4 space-y-1">
            {upcoming.map((song) => (
              <li key={song.id}>
                {song.name} – {song.author}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}