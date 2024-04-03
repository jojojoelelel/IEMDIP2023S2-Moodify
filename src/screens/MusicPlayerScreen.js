import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import {MusicPlayerContext} from '../contexts/SongContext';
import {useNavigation} from '@react-navigation/native';

const MusicPlayerScreen = () => {
  const navigation = useNavigation();
  const rotationAnimation = useState(new Animated.Value(0))[0];
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentRotationValue, setCurrentRotationValue] = useState(0);
  const [songProgress, setSongProgress] = useState(0);

  const {currentTrack, isPlaying, playOrPauseTrack} =
    useContext(MusicPlayerContext);

  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.timing(rotationAnimation, {
          toValue: 1,
          duration: 30000, // Duration of one full rotation
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      rotationAnimation.stopAnimation();
    }
  }, [isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setSongProgress(prevProgress => {
          const duration = 30000; // Assuming all songs are 30 seconds for simplicity
          const nextProgress = prevProgress + 1000;
          if (nextProgress >= duration) {
            // Implement the logic for what happens when the song ends
          }
          return nextProgress;
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  // Remember to add album
  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        {currentTrack ? (
          <>
            <View style={styles.songInfoContainer}>
              <Text style={styles.songTitle}>{currentTrack.title}</Text>
              <Text style={styles.songInfo}>{currentTrack.artist}</Text>
            </View>
            <View style={styles.albumCoverContainer}>
              <Animated.Image
                source={{uri: currentTrack.cover}}
                style={[
                  styles.albumCover,
                  {
                    transform: [
                      {
                        rotate: rotationAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [`0deg`, '360deg'],
                        }),
                      },
                    ],
                  },
                ]}
              />
            </View>
          </>
        ) : (
          // You could show a placeholder or some alternative UI here
          <Text>Loading...</Text>
        )}
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => {
              /* Implement previous track selection logic */
            }}>
            <Image
              source={require('../assets/icon/previous.png')}
              style={styles.controlImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={playOrPauseTrack}>
            <Image
              source={
                isPlaying
                  ? require('../assets/icon/pause.png')
                  : require('../assets/icon/play.png')
              }
              style={styles.controlImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => navigation.navigate('Homescreen')}>
            <Image
              source={require('../assets/icon/next.png')}
              style={styles.controlImage}
            />
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
    color: '#A4EC0A',
  },
  songInfo: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
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
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginLeft: 10,
  },
  controlImage: {
    width: 40,
    height: 40,
  },
});

export default MusicPlayerScreen;
