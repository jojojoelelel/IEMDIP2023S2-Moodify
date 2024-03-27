// SongContext.js
import React, {createContext, useContext, useState, useEffect} from 'react';
import TrackPlayer, {
  Capability,
  State,
  Event,
  useTrackPlayerEvents,
  usePlaybackState,
} from 'react-native-track-player';

const MusicPlayerContext = createContext();

const MusicPlayerProvider = ({children}) => {
  const [isPlaying, setIsPlaying] = useState();
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playerState, setPlayerState] = useState(TrackPlayer.STATE_NONE); //Initial state

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

  const togglePlayback = async playBackState => {
    const currentTrack = await TrackPlayer.getActiveTrack();
    console.log(currentTrack, playBackState, State.Playing);
    if (currentTrack != null) {
      if (playBackState == State.Paused) {
        await TrackPlayer.play();
        setIsPlaying(true);
      } else {
        await TrackPlayer.pause();
        setIsPlaying(false);
      }
    }
  }; 

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
    //setIsPlaying(true);
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
    togglePlayback,
    // ...other control functions
  };

  return (
    <MusicPlayerContext.Provider value={contextValue}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export {MusicPlayerContext, MusicPlayerProvider};
