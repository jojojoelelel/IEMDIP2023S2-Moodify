import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FullMusicPlayerScreen = ({ route }) => {
  const { songTitle, artistName, coverImage } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPausePress = () => {
    // Handle play/pause toggle
    setIsPlaying(!isPlaying);
    console.log('Play/Pause pressed', isPlaying);
  };

  const handleNextPress = () => {
    console.log('Next pressed');
    // Handle next song action
  };

  const handlePreviousPress = () => {
    console.log('Previous pressed');
    // Handle previous song action
  };


  return (
    <View style={styles.container}>
      <Image source={{ uri: coverImage }} style={styles.coverImage} />
      <Text style={styles.songTitle}>{songTitle}</Text>
      <Text style={styles.artistName}>{artistName}</Text>
      {/* Controls (play, pause, next, previous) */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={handlePreviousPress}>
            <Ionicons name="play-skip-back" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPausePress}>
        <Ionicons name={isPlaying ? 'pause-circle' : 'play-circle'} size={70} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextPress}>
            <Ionicons name="play-skip-forward" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      {/* Other components like slider, volume, etc. */}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000', // Spotify's background color
    },
    coverImage: {
      width: 300,
      height: 300,
      marginBottom: 20,
    },
    songTitle: {
      fontSize: 22,
      color: '#FFFFFF',
    },
    artistName: {
      fontSize: 18,
      color: '#FFFFFF',
      marginBottom: 20,
    },
    controls: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '80%', // Adjust the width as needed
    },
    // Add other styles for slider, volume, etc.
  });

  export default FullMusicPlayerScreen;