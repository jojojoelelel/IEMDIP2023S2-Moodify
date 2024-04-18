import React, {useState, useCallback, useEffect, useContext} from 'react';
import { useNavigation} from '@react-navigation/native';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

import {AppContext} from '../../navigation/AppNavigation';

const MusicPlayer = (spotifyUri ) => {
  if (!spotifyUri) return null; // If no URI, don't render anything
  const spotifyTrackId = spotifyUri.split(':').pop();
  const spotifyEmbedUrl = `https://open.spotify.com/embed/track/${spotifyTrackId}`;
  return (<><WebView source={{ uri: spotifyEmbedUrl }} style={styles.spotifyPlayer} /></>);
};

const RecomScreen = ({ route }) => {
  const {colorTheme, setColorTheme} = useContext(AppContext);
  const { songName, artist, songUri, selectedDate } = route.params;
  console.log(songUri);
  const [showPlayer, setShowPlayer] = useState(true); // Control visibility of the Music Player

  const handlePlay = () => {
    setShowPlayer(true); // Set showPlayer to true when the button is pressed
  };

  return (
    <ImageBackground
      source={colorTheme === 'Dark' ? require('../../assets/images/background.png') : require('../../assets/images/backgroundLight.jpg')}
      style={styles.background}
      resizeMode="cover">
      <View style={colorTheme === 'Dark' ? styles.transparentContainerDark : styles.transparentContainerLight}>
        <View style={styles.container}>
          <Text style={colorTheme === 'Dark' ? styles.dateDark : styles.dateLight}>{selectedDate}</Text>
          <Text style={colorTheme === 'Dark' ? styles.songNameDark : styles.songNameLight}>{songName}</Text>
          <Text style={colorTheme === 'Dark' ? styles.singerDark : styles.singerLight}>{artist}</Text>
          {MusicPlayer(songUri)}
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
  transparentContainerDark: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255, 0.3)', // Transparent background
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  transparentContainerLight: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255, 0.6)', // Transparent background
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    // alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  dateDark: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  songNameDark: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'darkblue',
    top:'5%',
  },
  songNameLight: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: `${process.env.REACT_APP_LIGHTACCENT}`,
    top:'5%',
  },
  singerDark: {
    fontSize: 23,
    marginBottom: 10,
    color: 'darkblue',
    right:'-50%',
    top:'5%',
  },
  singerLight: {
    fontSize: 23,
    marginBottom: 10,
    color: `${process.env.REACT_APP_LIGHTACCENT}`,
    right:'-50%',
    top:'5%',
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
  spotifyPlayer: {
    height: '100%',
    width: '100%',
    // alignSelf: 'center', 
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    top:'10%',
  }
});

export default RecomScreen;