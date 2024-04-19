// PlaylistDetailsScreen.js comment
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import SongItem from '../../components/SongItem';
// import {access_token2} from '@env';
import * as SpotifyAPI from '../../services/Spotify-web-api';
import Sound from 'react-native-sound';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MusicPlayerContext} from '../../contexts/SongContext';

import {AppContext} from '../../navigation/AppNavigation';
import MusicPlayerBar from '../../components/MusicPlayerBar';
//
const ArtistDetailsScreen = ({route}) => {
  const {access_token, setaccess_token, colorTheme, setColorTheme} =
    useContext(AppContext);
  const {artists} = route.params;
  const [followers, setFollowers] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  //const [playing, setPlaying] = useState(false);
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
  //
  const fetchArtistTopTracks = async () => {
    try {
      const response = await SpotifyAPI.getArtistTopTracks(
        access_token,
        artists.id,
        'SG',
      );
      setTopTracks(
        response.tracks.map(track => ({
          title: track.name,
          artist: track.artists.map(artist => artist.name).join(', '), // Join multiple artists with a comma
          cover: track.album.images.length > 0 ? track.album.images[0].url : '', // Provide a default image URL as fallback
          url: track.preview_url,
        })),
      );
    } catch (error) {
      console.error('Error in getArtistTopTracks => ', error);
    }
  };

  const fetchArtistDetails = async () => {
    try {
      console.log('route params =>', route.params);
      const artistData = await SpotifyAPI.getArtist(access_token, artists.id);
      setFollowers(artistData.followers.total.toLocaleString()); // Assuming the returned value is directly the list of tracks
    } catch (error) {
      console.error('Failed to fetch playlist details:', error);
    }
  };

  useEffect(() => {
    fetchArtistDetails();
    fetchArtistTopTracks();
  }, [artists.id]);
  const renderHeader = () => {
    return (
      <View>
        <Image source={{uri: artists.imageUrl}} style={styles.coverImage} />
        <View style={styles.detailsContainer}>
          <Text style={styles.artistTitle}>
            {artists.title ? artists.title : artists.name}
          </Text>
          <Text
            style={styles.description}>{`${followers} monthly listeners`}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Shuffle</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.popularTitle}>Popular</Text>
        </View>
      </View>
    );
  };
  //refactor code
  return (
    <>
      <FlatList
        data={topTracks}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item, index) => `track-${index}`}
        renderItem={({item, index}) => (
          <SongItem
            id={`track-${index}`}
            title={item.title}
            artist={item.artist}
            cover={item.cover}
            preview_url={item.url}
          />
        )}
      />
      <MusicPlayerBar />
    </>
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
  artistTitleDark: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  artistTitleLight: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  popularTitleDark: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  popularTitleLight: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  descriptionDark: {
    fontSize: 18,
    color: 'grey',
    marginBottom: 20,
  },
  descriptionDark: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
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

export default ArtistDetailsScreen;
