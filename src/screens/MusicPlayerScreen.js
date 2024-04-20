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
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MusicPlayerContext} from '../contexts/SongContext';
import {useNavigation} from '@react-navigation/native';
import MusicSlider from '../components/MusicSlider';
import LinearGradient from 'react-native-linear-gradient';
import AlbumCover from '../components/AlbumCover';

const {width} = Dimensions.get('window');

import { AppContext } from '../navigation/AppNavigation';

const MusicPlayerScreen = () => {
  const { colorTheme, setColorTheme } = useContext(AppContext);
  const navigation = useNavigation();
  const rotationAnimation = useState(new Animated.Value(0))[0];
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
      if (isPlaying && currentTrack) {
        setSongProgress(prevProgress => {
          const duration = currentTrack.duration; // Use actual song duration
          const nextProgress = prevProgress + 1000;
          if (nextProgress >= duration) {
            // Implement the logic for what happens when the song ends
            // Implement the logic for what happens when the song ends
          }
          return nextProgress;
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  const rotationValue = rotationAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <ImageBackground
      source={colorTheme === 'Dark' ? require('../assets/images/background.png') : require('../assets/images/backgroundLight.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        {currentTrack ? (
          <View style={styles.albumCoverContainer}>
            <Animated.Image
              source={{uri: currentTrack.cover}}
              style={[
                (colorTheme === 'Dark' ? styles.albumCoverDark : styles.albumCoverLight),
                {
                  transform: [
                    {
                      rotate: rotationAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
        <View style={styles.songInfoContainer}>
              <Text style={colorTheme === 'Dark' ? styles.songTitleDark : styles.songTitleLight}>{currentTrack ? currentTrack.title : 'No songs'}</Text>
              <Text style={colorTheme === 'Dark' ? styles.songInfoDark : styles.songInfoLight}>{currentTrack ? currentTrack.artist : ''}</Text>
        </View>
        <MusicSlider />
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={colorTheme === 'Dark' ? styles.controlButtonDark : styles.controlButtonLight}
            onPress={() => {
              /* Implement previous track logic */
            }}>
            <Ionicons name="play-skip-back-circle" size={50} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={colorTheme === 'Dark' ? styles.controlButtonDark : styles.controlButtonLight}
            onPress={playOrPauseTrack}>
            <Ionicons
              name={isPlaying ? 'pause-circle' : 'play-circle'}
              size={60}
              color="#FFF"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={colorTheme === 'Dark' ? styles.controlButtonDark : styles.controlButtonLight}
            onPress={() => navigation.navigate('Homescreen')}>
            <Ionicons name="play-skip-forward-circle" size={50} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  songInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  songTitleDark: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#A4EC0A',
    color: '#A4EC0A',
  },
  songTitleLight: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    // color: `${process.env.REACT_APP_LIGHTACCENT}`,
    color: 'black',
  },
  songInfoDark: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  songInfoLight: {
    fontSize: 24,
    // color: `${process.env.REACT_APP_LIGHTACCENT}`,
    color: 'black',
    fontWeight: 'bold',
  },
  albumCoverContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  albumCoverDark: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: '#000',
  },
  albumCoverLight: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: `${process.env.REACT_APP_LIGHTACCENT}`,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
  },
  controlButtonDark: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: `${process.env.REACT_APP_DARKACCENT}`,
    marginLeft: 10,
  },
  controlButtonLight: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: `${process.env.REACT_APP_LIGHTACCENT}`,
    backgroundColor: `${process.env.REACT_APP_LIGHTACCENT}`,
    marginLeft: 10,
  },
  controlImage: {
    width: 40,
    height: 40,
  },
});

export default MusicPlayerScreen;

