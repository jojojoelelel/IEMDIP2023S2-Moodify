import React from 'react';  
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const DiaryDetailScreen = ({ songName = 'Song Name', singer = 'Artist Name',promptText=
'I am not happy today' }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedDate } = route.params;

  const handleSaveToDiary = () => {
    // Navigate to 'DiaryScreen'
    navigation.navigate('DiaryScreen');
  };

  const handlePlay = () => {
    // Navigate to 'MusicPlayerScreen'
    navigation.navigate('MusicPlayerScreen');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')} // Adjust the path according to your image
      style={styles.background}
      resizeMode="cover">
      <View style={styles.transparentContainer}>
        <View style={styles.container}>
          <Text style={styles.selectedDate}>{selectedDate}</Text>
          <View style={styles.diaryContainer}>
          <Text style={styles.diaryText}>{promptText}</Text>
        </View>
          <Text style={styles.songName}>{songName}</Text>
          <Text style={styles.singer}>{singer}</Text>
          <Image source={require('../../assets/images/User1.jpg')} style={styles.albumCover} />
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
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flex: 1,
  },
  selectedDate: {
    color: 'white',
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 10,
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
  diaryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#A4EC0A',
    borderRadius: 5,
    left:30,
    padding:10,
    marginBottom:50,
    marginTop:35


  },
  diaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default DiaryDetailScreen;
