import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, Animated, Easing, TouchableOpacity } from 'react-native';


const MusicPlayerScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rotationAnimation] = useState(new Animated.Value(0));
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentRotationValue, setCurrentRotationValue] = useState(0);
  const [songProgress, setSongProgress] = useState(0);

  // Array to store song information
  const songs = [
    { title: 'Song 1', singer: 'Singer 1', album: 'Album 1', albumCover: require('../assets/images/User1.jpg'), duration: 30000 }, // 30 seconds
    { title: 'Song 2', singer: 'Singer 2', album: 'Album 2', albumCover: require('../assets/images/User2.jpg'), duration: 45000 }, // 45 seconds
    { title: 'Song 3', singer: 'Singer 3', album: 'Album 3', albumCover: require('../assets/images/User3.jpg'), duration: 40000 }, // 40 seconds
  ];

  useEffect(() => {
    if (isPlaying) {
      startRotationAnimation(songs[currentSongIndex].duration);
    } else {
      rotationAnimation.stopAnimation();
    }
  }, [isPlaying, currentSongIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setSongProgress((prevProgress) => {
          const duration = songs[currentSongIndex].duration;
          const nextProgress = prevProgress + 1000; // Update progress every second
          if (nextProgress >= duration) {
            changeSong('next');
          }
          return nextProgress;
        });
      }
    }, 1000); // Update progress every second

    return () => clearInterval(interval);
  }, [isPlaying, currentSongIndex]);

  const startRotationAnimation = (duration) => {
    rotationAnimation.setValue(currentRotationValue); // Set the initial rotation value
    Animated.timing(rotationAnimation, {
      toValue: 1,
      duration: duration - songProgress, // Adjust duration based on song progress
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        startRotationAnimation(duration);
      }
    });
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setCurrentRotationValue(rotationAnimation._value); // Save the current rotation value
    }
  };

  const changeSong = (direction) => {
    if (direction === 'previous') {
      setCurrentSongIndex((prevIndex) => (prevIndex === 0 ? songs.length - 1 : prevIndex - 1));
    } else if (direction === 'next') {
      setCurrentSongIndex((prevIndex) => (prevIndex === songs.length - 1 ? 0 : prevIndex + 1));
    }
    setIsPlaying(true);
    setCurrentRotationValue(0); // Reset the rotation value when changing songs
    setSongProgress(0); // Reset song progress when changing songs
  };

  return (
    <ImageBackground source={require('../assets/images/background.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.songInfoContainer}>
          <Text style={styles.songTitle}>{songs[currentSongIndex].title}</Text>
          <Text style={styles.songInfo}>{songs[currentSongIndex].singer} - {songs[currentSongIndex].album}</Text>
        </View>
        <View style={styles.albumCoverContainer}>
          <Animated.Image
            source={songs[currentSongIndex].albumCover}
            style={[styles.albumCover, { transform: [{ rotate: rotationAnimation.interpolate({
              inputRange: [0, 0.2],
              outputRange: [`${currentRotationValue}deg`, '360deg'],
            }) }] }]}
          />
          
        </View>
        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.controlButton} onPress={() => changeSong('previous')}>
            <Image source={require('../assets/icon/previous.png')} style={styles.controlImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={togglePlayPause}>
            <Image source={isPlaying ? require('../assets/icon/pause.png') : require('../assets/icon/play.png')} style={styles.controlImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={() => changeSong('next')}>
            <Image source={require('../assets/icon/next.png')} style={styles.controlImage} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  songInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  songTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color:'#A4EC0A'
  },
  songInfo: {
    fontSize: 24,
    color:'white',
    fontWeight:'bold'
  },
  albumCoverContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  albumCover: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 2,
    borderColor: '#000',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  controlButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor:'rgba(255,255,255,0.7)',
    marginLeft:10,
  },
  controlImage: {
    width: 40,
    height: 40,
  },

});

export default MusicPlayerScreen;