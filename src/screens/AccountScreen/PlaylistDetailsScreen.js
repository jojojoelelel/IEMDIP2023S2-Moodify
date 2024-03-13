// PlaylistDetailsScreen.js
import React, {useEffect, useState} from 'react';
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

const PlaylistDetailsScreen = ({route}) => {
  const {playlist} = route.params;
  const [songs, setSongs] = useState([]);

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

  // Placeholder for actual song list data
  /* const songs = [
    {
      id: '1',
      title: 'Song 1',
      artist: 'Artist 1',
      cover:
        'https://upload.wikimedia.org/wikipedia/en/9/9b/Le_Sserafim_-_Unforgiven.png',
    },
    {
      id: '2',
      title: 'Song 2',
      artist: 'Artist 2',
      cover:
        'https://upload.wikimedia.org/wikipedia/en/9/9b/Le_Sserafim_-_Unforgiven.png',
    },
    {
      id: '3',
      title: 'Song 3',
      artist: 'Artist 3',
      cover:
        'https://upload.wikimedia.org/wikipedia/en/9/9b/Le_Sserafim_-_Unforgiven.png',
    },
    {
      id: '4',
      title: 'Song 4',
      artist: 'Artist 4',
      cover:
        'https://upload.wikimedia.org/wikipedia/en/9/9b/Le_Sserafim_-_Unforgiven.png',
    },
    // ... more songs
  ]; */

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
              title={item.title}
              artist={item.artist}
              cover={item.cover}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

/* return (
    <ScrollView style={styles.container}>
      <Image source={{uri: playlist.imageUrl}} style={styles.coverImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.playlistTitle}>{playlist.title}</Text>
        <Text style={styles.description}>Playlist description here...</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Shuffle</Text>
          </TouchableOpacity>
        </View>
        <FlatList // IDEALLY FLATLIST SHOULDN'T BE NESTED WITHIN SCROLLVIEW. REMEMBER TO MODIFY LATER (LISTHEADERCOMPONENT)
          data={songs}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            // 'SongItem' component
            <SongItem
              title={item.title}
              artist={item.artist}
              cover={item.cover} // Passing the cover image URL
            />
          )}
        />
      </View>
    </ScrollView>
  );
}; */

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
