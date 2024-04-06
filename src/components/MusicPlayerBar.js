import React, {useState, useContext} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MusicPlayerContext} from '../contexts/SongContext';

const MusicPlayerBar = () => {
  const {
    currentTrack,
    isPlaying,
    playOrPauseTrack,
    skipToNext,
    skipToPrevious,
  } = useContext(MusicPlayerContext);

  /*   const togglePlayPause = () => {
    const newIsPlaying = !isPlaying;
    setIsPlaying(newIsPlaying);
    if (onPlayPausePress) {
      onPlayPausePress(newIsPlaying);
    }
  }; */

  // Render guard
  if (!currentTrack) {
    // If there is no current track, render nothing or a placeholder
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: currentTrack.cover}} style={styles.coverImage} />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{currentTrack.title}</Text>
        <Text style={styles.artistName}>{currentTrack.artist}</Text>
      </View>
      <TouchableOpacity onPress={playOrPauseTrack}>
        <Ionicons
          name={isPlaying ? 'pause' : 'play'}
          size={30}
          color="#FFFFFF"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#282828',
    borderTopWidth: 1,
    borderTopColor: '#000000',
    position: 'absolute',
    bottom: '0%',
  },
  coverImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  songInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  songTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  artistName: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default MusicPlayerBar;
