import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Animated, Easing, Slider } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { defaultString } from '../String/defaultStringValue';

function pad(n, width, z = 0) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const minutesAndSeconds = (position) => ([
  pad(Math.floor(position / 60), 2),
  pad(position % 60, 2),
]);

const MusicPlayerScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rotationAnimation] = useState(new Animated.Value(0));
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentRotationValue, setCurrentRotationValue] = useState(0);
  const [songProgress, setSongProgress] = useState(0);
  const [dotPositionX, setDotPositionX] = useState(new Animated.Value(0));
  const [dotPositionY, setDotPositionY] = useState(new Animated.Value(0));
  const [trackLength, setTrackLength] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);

  const songs = [
    { title: 'Song 1', albumCover: require('../assets/images/User1.jpg'), duration: 30000 }, // 30 seconds
    { title: 'Song 2', albumCover: require('../assets/images/User2.jpg'), duration: 45000 }, // 45 seconds
    { title: 'Song 3', albumCover: require('../assets/images/User3.jpg'), duration: 40000 }, // 40 seconds
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
        const progressAngle = (songProgress / songs[currentSongIndex].duration) * 360;
        const radian = progressAngle * (Math.PI / 180);
        const newX = Math.cos(radian) * 125; // Radius of circular progress bar
        const newY = Math.sin(radian) * 125; // Radius of circular progress bar
        setDotPositionX(new Animated.Value(newX));
        setDotPositionY(new Animated.Value(newY));
      }
    }, 1000); // Update progress every second

    return () => clearInterval(interval);
  }, [isPlaying, currentSongIndex, songProgress]);

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

  const onSeek = (value) => {
    setSongProgress(value);
  };

  const onSlidingStart = () => {
    setIsPlaying(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.albumCoverContainer}>
        <Animated.Image
          source={songs[currentSongIndex].albumCover}
          style={[styles.albumCover, { transform: [{ rotate: rotationAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [`${currentRotationValue}deg`, '360deg'],
          }) }] }]}
        />
        <View style={styles.circularProgressBarContainer}>
          <CircularProgress
            size={250}
            fill={(songProgress / songs[currentSongIndex].duration) * 100}
            width={10}
            tintColor="#f00"
            backgroundColor="#ccc"
            rotation={0}
            lineCap="round"
            style={styles.circularProgressBar}
          />
        </View>
      </View>
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={() => changeSong('previous')}>
          <Text style={styles.controlButtonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={togglePlayPause}>
          <Text style={styles.controlButtonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={() => changeSong('next')}>
          <Text style={styles.controlButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
      <SeekBar
        trackLength={songs[currentSongIndex].duration}
        currentPosition={songProgress}
        onSeek={onSeek}
        onSlidingStart={onSlidingStart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  },
  controlButtonText: {
    fontSize: 16,
  },
  circularProgressBarContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    height: 250,
  },
  circularProgressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default MusicPlayerScreen;
