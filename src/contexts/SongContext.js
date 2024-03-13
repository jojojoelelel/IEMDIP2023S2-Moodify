// SongContext.js
import React, {createContext, useContext, useState} from 'react';

const SongContext = createContext();

export const useSong = () => useContext(SongContext);

export const SongProvider = ({children}) => {
  const [currentSong, setCurrentSong] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);

  const playSong = song => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const value = {currentSong, isPlaying, playSong};

  return <SongContext.Provider value={value}>{children}</SongContext.Provider>;
};
