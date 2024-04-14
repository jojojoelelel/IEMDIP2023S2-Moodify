import React, {useState, useCallback, useEffect} from 'react';
import { useNavigation} from '@react-navigation/native';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';


const MusicPlayer = (spotifyUri ) => {
  if (!spotifyUri) return null; // If no URI, don't render anything
  const spotifyTrackId = spotifyUri.split(':').pop();
  const spotifyEmbedUrl = `https://open.spotify.com/embed/track/${spotifyTrackId}`;
  return (<><WebView source={{ uri: spotifyEmbedUrl }} style={styles.spotifyPlayer} /></>);
};

const RecomScreen = ({ route }) => {
  const { songName, artist, songUri, selectedDate } = route.params;
  console.log(songUri);
  const [showPlayer, setShowPlayer] = useState(true); // Control visibility of the Music Player

  const handlePlay = () => {
    setShowPlayer(true); // Set showPlayer to true when the button is pressed
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.transparentContainer}>
        <View style={styles.container}>
          <Text style={styles.date}>{selectedDate}</Text>
          <Text style={styles.songName}>{songName}</Text>
          <Text style={styles.singer}>{artist}</Text>
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
  transparentContainer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255, 0.3)', // Transparent background
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
    top:'5%',
  },
  singer: {
    fontSize: 23,
    marginBottom: 10,
    color: 'darkblue',
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