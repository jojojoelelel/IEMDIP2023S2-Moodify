// SongContext.js
import React, {createContext, useContext, useState, useEffect} from 'react';
import TrackPlayer, {Capability} from 'react-native-track-player';

const MusicPlayerContext = createContext();

const MusicPlayerProvider = ({children}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    // Track Player setup
    TrackPlayer.setupPlayer().then(async () => {
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });
    });

    // Clean up on unmount
    return () => TrackPlayer.destroy();
  }, []);

  const playTrack = async track => {
    await TrackPlayer.reset();
    await TrackPlayer.add(track);
    await TrackPlayer.play();
    setIsPlaying(true);
    setCurrentTrack(track);
  };

  // ... other player control functions (pause, skip, etc.)
  const pauseTrack = async () => {
    await TrackPlayer.pause();
    setIsPlaying(false);
  };

  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
    setIsPlaying(true); // Keep playing after skipping
  };

  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
    setIsPlaying(true); // Keep playing after skipping
  };

  const contextValue = {
    isPlaying: false,
    setIsPlaying,
    currentTrack: null,
    setCurrentTrack,
    playTrack,
    pauseTrack,
    skipToNext,
    skipToPrevious,
    // ...other control functions
  };

  return (
    <MusicPlayerContext.Provider value={contextValue}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export {MusicPlayerContext, MusicPlayerProvider};
