// AlbumsDetailsScreen.js
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import SongItem from '../../components/SongItem';
import {access_token2} from '@env';
import * as SpotifyAPI from '../../services/Spotify-web-api';
import Sound from 'react-native-sound';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MusicPlayerContext} from '../../contexts/SongContext';
import {AppContext} from '../../navigation/AppNavigation.js';
import MusicPlayerBar from '../../components/MusicPlayerBar.js';
import PlayerControls from '../../components/PlayerControls.js';

const AlbumsDetailsScreen = ({route}) => {
  const {albums} = route.params;
  const [songs, setSongs] = useState([]);
  const [artistName, setArtistName] = useState(''); // State to store the artist's name
  const [playing, setPlaying] = useState(false);
  const {
    isPlaying,
    setIsPlaying,
    currentTrack,
    setCurrentTrack,
    playTrack,
    pauseTrack,
    skipToNext,
    skipToPrevious,
  } = useContext(MusicPlayerContext);
  const {access_token, setaccess_token, colorTheme, setColorTheme} =
    useContext(AppContext);
  console.log('received albums in details =>', albums);
  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        const tracks = await SpotifyAPI.getAlbumDetails(
          access_token,
          albums.id,
        );
        console.log('Fetched album details:', tracks); // Log fetched tracks for debugging
        console.log('route params => ', route.params); // Lop fetched album for debugging
        setSongs(tracks); // Assuming the returned value is directly the list of tracks
        setArtistName(albums.artist); // Set the artist's name once it's fetched
      } catch (error) {
        console.error('Failed to fetch album details:', error);
        //console.log('Request details:', error.request); // Log request details for debugging
        //console.log('Response data:', error.response && error.response.data); // Log response data for debugging
      }
    };

    fetchAlbumDetails();
  }, [albums.id]);

  return (
    <View style={{backgroundColor: colorTheme === 'Dark' ? '#000' : `${process.env.REACT_APP_LIGHTTHEME}`}}>
      <FlatList
        data={songs}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <SongItem
            id={item.id}
            title={item.name}
            artist={item.artist}
            cover={albums.imageUrl}
            preview_url={item.preview_url}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <Image source={{uri: albums.imageUrl}} style={styles.coverImage} />
            <View style={styles.detailsContainer}>
              <Text
                style={
                  colorTheme === 'Dark'
                    ? styles.playlistTitleDark
                    : styles.playlistTitleLight
                }>
                {albums.title ? albums.title : albums.name}
              </Text>
              <Text style={styles.description}>{`By ${
                albums.creator ? albums.creator : albums.artist
              }`}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={
                    colorTheme === 'Dark'
                      ? styles.buttonDark
                      : styles.buttonLight
                  }>
                  <Text style={styles.buttonText}>Play</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    colorTheme === 'Dark'
                      ? styles.buttonDark
                      : styles.buttonLight
                  }>
                  <Text style={styles.buttonText}>Shuffle</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      />
      <MusicPlayerBar />
    </View>
  );
};

const styles = StyleSheet.create({
  containerDark: {
    flex: 1,
    backgroundColor: '#121212',
  },
  containerLight: {
    flex: 1,
    backgroundColor: `${process.env.REACT_APP_LIGHTTHEME}`,
  },
  coverImage: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    padding: 20,
  },
  playlistTitleDark: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  playlistTitleLight: {
    fontSize: 28,
    fontWeight: 'bold',
    color: `${process.env.REACT_APP_DARKTHEME}`,
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
    color: 'grey',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  buttonDark: {
    backgroundColor: '#1DB954',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  buttonLight: {
    backgroundColor: `${process.env.REACT_APP_LIGHTACCENT}`,
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Add styles for FlatList and SongItem here
});

export default AlbumsDetailsScreen;
