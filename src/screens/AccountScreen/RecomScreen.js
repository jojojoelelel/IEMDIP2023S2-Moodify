import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';

const RecomScreen = ({ route }) => {
  const navigation = useNavigation();

  const handlePlay = () => {
    // Navigate to 'MusicPlayerScreen' screen
    navigation.navigate('MusicPlayerScreen');
  };

  const { songName, artist, songUri, selectedDate } = route.params;

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')} // Adjust the path according to your image
      style={styles.background}
      resizeMode="cover">
      <View style={styles.transparentContainer}>
        <View style={styles.container}>
          <Text style={styles.date}>{selectedDate}</Text>
          <Text style={styles.songName}>{songName}</Text>
          <Text style={styles.singer}>{artist}</Text>
          {/* Assuming albumCover is passed as a prop */}
          <Image source={require('../../assets/images/User1.jpg')} style={styles.albumCover} />
          <View style={styles.buttonContainer}>
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
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  songName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'darkblue',
  },
  singer: {
    fontSize: 23,
    marginBottom: 10,
    color: 'darkblue',
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
