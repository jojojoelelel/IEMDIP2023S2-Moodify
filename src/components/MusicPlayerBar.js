import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

const MusicPlayerBar = ({ songTitle, artistName, coverImage, onPlayPausePress }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayPause = () => {
    const newIsPlaying = !isPlaying;
    setIsPlaying(newIsPlaying);
    if (onPlayPausePress) {
      onPlayPausePress(newIsPlaying);
    }
  };

  return (
    <View style={styles.container}>
    <Image source={{ uri: coverImage }} style={styles.coverImage} />
    <View style={styles.songInfo}>
      <Text style={styles.songTitle}>{songTitle}</Text>
      <Text style={styles.artistName}>{artistName}</Text>
    </View>
    <TouchableOpacity onPress={togglePlayPause}>
      <Ionicon name={isPlaying ? 'pause-circle-outline' : 'play-circle-outline'} size={30} color="#FFFFFF" />
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
