// SongContext.js
import React, {createContext, useContext, useState, useEffect} from 'react';
import TrackPlayer, {Capability, State} from 'react-native-track-player';

const MusicPlayerContext = createContext();

const MusicPlayerProvider = ({children}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playerState, setPlayerState] = useState(TrackPlayer.STATE_NONE); //Initial state

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

    // Event listener
    TrackPlayer.addEventListener('playback-state', async data => {
      console.log('Previous State:', playerState);
      setPlayerState(data.state);
      console.log('New State:', data.state);

      if (data.state === State.Playing) {
        setIsPlaying(true);
      } else if (data.state === State.Paused || data.state === State.Stopped) {
        setIsPlaying(false);
      }
    });

    // Clean up on unmount
    return () => {
      //TrackPlayer.destroy();
      TrackPlayer.removeEventListener('playback-state'); // Remove listener
    };
  }, []);

  const playOrPauseTrack = async () => {
    const currentPlaybackState = await TrackPlayer.getPlaybackState();

    if (currentPlaybackState === TrackPlayer.STATE_PAUSED) {
      await TrackPlayer.play();
      setIsPlaying(true);
    } else if (currentPlaybackState === TrackPlayer.STATE_PLAYING) {
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
    setIsPlaying(true);
    setCurrentTrack(track);
    const q = await TrackPlayer.getQueue();
    console.log(q);
  };

  // ... other player control functions (pause, skip, etc.)
  const pauseTrack = async () => {
    await TrackPlayer.pause();
    setIsPlaying(false);
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
    isPlaying: false,
    setIsPlaying,
    currentTrack,
    setCurrentTrack,
    playTrack,
    pauseTrack,
    skipToNext,
    skipToPrevious,
    playOrPauseTrack,
    // ...other control functions
  };

  return (
    <MusicPlayerContext.Provider value={contextValue}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export {MusicPlayerContext, MusicPlayerProvider};
