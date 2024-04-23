// SongContext.js
import React, {createContext, useContext, useState, useEffect} from 'react';
import TrackPlayer, {
  Capability,
  State,
  Event,
  useTrackPlayerEvents,
  usePlaybackState,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';

const MusicPlayerContext = createContext();

const MusicPlayerProvider = ({children}) => {

  console.disableYellowBox = true
  
  const [isPlaying, setIsPlaying] = useState();
  const [currentTrack, setCurrentTrack] = useState();
  const [trackProgress, setTrackProgress] = useState(0);
  const [trackDuration, setTrackDuration] = useState(30); 
  
  useEffect(() => {
    // Track Player setup
    TrackPlayer.setupPlayer().then(async () => {
      await TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });
    });
  }, []);

  // Update progress state based on the player state
  useEffect(() => {
    const progressUpdater = setInterval(() => {
      if (isPlaying) {
        TrackPlayer.getProgress().then(progress => {
          setTrackProgress(progress.position);
          setTrackDuration(progress.duration);
        });
      }
    }, 1000); // Poll every second

    // Clean up the interval on unmount
    return () => clearInterval(progressUpdater);
  }, [isPlaying]);

  const playOrPauseTrack = async () => {
    const currentPlaybackState = await TrackPlayer.getPlaybackState();
    console.log('Playback state', currentPlaybackState);
    if (currentPlaybackState.state === 'paused') {
      await TrackPlayer.play();
      setIsPlaying(true);
    } else if (currentPlaybackState.state === 'playing') {
      await TrackPlayer.pause();
      setIsPlaying(false);
    }
  };

  const seekTo = async position => {
    await TrackPlayer.seekTo(position);
    setTrackProgress(position); // Update the progress to the new position
  };

  const updateCurrentTrack = async () => {
    const currentTrackId = await TrackPlayer.getActiveTrack();
    if (currentTrackId) {
      const track = await TrackPlayer.getTrack(currentTrackId);
      setCurrentTrack(track); // Update the current track details in the context
      console.log('Current Track Updated:', track);
    }
  };

  const playTrack = async track => {
    // await TrackPlayer.reset();
    await TrackPlayer.add(track);
    await TrackPlayer.stop();
    await TrackPlayer.skipToNext();
    await TrackPlayer.play();
    setIsPlaying(true);
    setCurrentTrack(track);
    const q = await TrackPlayer.getQueue();
    console.log(q);
  };

  // ... other player control functions (pause, skip, etc.)
  const pauseTrack = async () => {
    await TrackPlayer.pause();
    //setIsPlaying(false);
  };

  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
    updateCurrentTrack();
    setIsPlaying(true); // Keep playing after skipping
  };

  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
    updateCurrentTrack();
    setIsPlaying(true); // Keep playing after skipping
  };

  const contextValue = {
    isPlaying,
    setIsPlaying,
    currentTrack,
    setCurrentTrack,
    playTrack,
    pauseTrack,
    skipToNext,
    skipToPrevious,
    playOrPauseTrack,
    trackProgress,
    setTrackDuration,
    setTrackProgress,
    trackDuration,
    seekTo,
    // ...other control functions
  };

  return (
    <MusicPlayerContext.Provider value={contextValue}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export {MusicPlayerContext, MusicPlayerProvider};
