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
import {access_token2} from '@env';
import * as SpotifyAPI from '../../services/Spotify-web-api';
import Sound from 'react-native-sound';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MusicPlayerContext} from '../../contexts/SongContext';

const PlaylistDetailsScreen = ({route}) => {
  const {playlist} = route.params;
  const [songs, setSongs] = useState([]);
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
  //
  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        const tracks = await SpotifyAPI.getPlaylistDetails(
          access_token2,
          playlist.id,
        );
        setSongs(tracks); // Assuming the returned value is directly the list of tracks
      } catch (error) {
        console.error('Failed to fetch playlist details:', error);
      }
    };

    fetchPlaylistDetails();
  }, [playlist.id]);

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: playlist.imageUrl}} style={styles.coverImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.playlistTitle}>{playlist.title}</Text>
        <Text
          style={styles.description}>{`Created by ${playlist.creator}`}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Shuffle</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={songs}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <SongItem
              id={item.id}
              title={item.title}
              artist={item.artist}
              cover={item.cover}
              preview_url={item.preview_url}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  coverImage: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    padding: 20,
  },
  playlistTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
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
  button: {
    backgroundColor: '#1DB954',
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

export default PlaylistDetailsScreen;
