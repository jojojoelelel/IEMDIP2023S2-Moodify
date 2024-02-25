import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const MusicPlayerBar = ({ songTitle, artistName, coverImage, onPlayPausePress, onPreviousPress, onNextPress }) => {
  const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayPause = () => {
    const newIsPlaying = !isPlaying;
    setIsPlaying(newIsPlaying);
    if (onPlayPausePress) {
      onPlayPausePress(newIsPlaying);
    }
  };

  return (
    <TouchableOpacity style={styles.touchableArea} onPress={() => navigation.navigate('FullMusicPlayerScreen', { songTitle, artistName, coverImage })}>
      <View style={styles.container}>
    <Image source={{ uri: coverImage }} style={styles.coverImage} />
    <View style={styles.songInfo}>
      <Text style={styles.songTitle}>{songTitle}</Text>
      <Text style={styles.artistName}>{artistName}</Text>
    </View>
    <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={onPreviousPress}>
          <Ionicon name='play-skip-back-outline' size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={togglePlayPause}>
          <Ionicon name={isPlaying ? 'pause-circle-outline' : 'play-circle-outline'} size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={onNextPress}>
          <Ionicon name='play-skip-forward-outline' size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
  </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
    paddingHorizontal: 15,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
  },
  controlButton: {
    marginHorizontal: 7,
    padding: 4,
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
