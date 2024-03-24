import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';

const RecomScreen = ({ songName='Song Name', singer='Artist Name', albumCover, onSaveToDiary, onPlay }) => {
    const navigation = useNavigation();
    const handleSaveToDiary = () => {
        // Navigate to 'DirectDiary' screen
        navigation.navigate('DiaryScreen');
      };
    
      const handlePlay = () => {
        // Navigate to 'MusicPlayerScreen' screen
        navigation.navigate('MusicPlayerScreen');
      };
    return (
    
    <ImageBackground
      source={require('../../assets/images/background.png')} // Adjust the path according to your image
      style={styles.background}
      resizeMode="cover">
      <View style={styles.transparentContainer}>
        <View style={styles.container}>
          <Text style={styles.songName}>{songName}</Text>
          <Text style={styles.singer}>{singer}</Text>
          <Image source={require('../../assets/images/User1.jpg')} style={styles.albumCover} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSaveToDiary}>
              <Text style={styles.buttonText}>Save to Diary</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handlePlay}>
              <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transparentContainer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255, 0.3)', // Transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  songName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  singer: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
  albumCover: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecomScreen;
