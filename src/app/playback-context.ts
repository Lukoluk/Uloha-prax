import { createContext } from "react";

export interface Song {
  id: number;
  name: string;
  author: string;
  duration: number;
}

interface PlaybackContextState {
  queue: Song[];
  isPlaying: boolean;
  progress: number;
  isShuffled: boolean;
  currentSong: Song | null;
  currentSongIndex: number;
  shuffleOrder: number[];
  shufflePosition: number;
  togglePlayback: () => void;
  seekTo: (newProgress: number) => void;
  handleNext: () => void;
  handleBack: () => void;
  toggleShuffle: () => void;
  // Dummy
  dummy: number;
  setDummy: (dummy: number) => void;
}

export const PlaybackContext = createContext<PlaybackContextState>({
  queue: [],
  isPlaying: false,
  progress: 0,
  isShuffled: false,
  currentSong: null,
  shuffleOrder: [],
  shufflePosition: 0,
  currentSongIndex: 0,
  togglePlayback: () => {},
  seekTo: () => {},
  handleNext: () => {},
  handleBack: () => {},
  toggleShuffle: () => {},
  // Dummy
  dummy: 1,
  setDummy: () => {},
});
