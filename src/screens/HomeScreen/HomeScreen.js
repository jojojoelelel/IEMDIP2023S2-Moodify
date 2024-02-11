import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import AlbumCard from '../../components/AlbumCard';
import TrackItem from '../../components/TrackList';
import PlayerControls from '../../components/PlayerControls';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Inside your component's render method
<Ionicons name="ios-person" size={30} color="#4F8EF7" />;

const HomeScreen = () => {
  // Example data - replace with real data
  const albums = [
    {id: 1, title: 'Album 1', artist: 'Artist 1', cover: 'cover_url_1'},
    // Add more albums
  ];

  const tracks = [
    {id: 1, title: 'Track 1', artist: 'Artist 1', duration: '2:30'},
    // Add more tracks
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>New Albums</Text>
      <View style={styles.albumContainer}>
        {albums.map(album => (
          <AlbumCard key={album.id} {...album} />
        ))}
      </View>

      <Text style={styles.header}>Recently Played</Text>
      <TrackList data={tracks} />

      <PlayerControls
        onPrevious={() => {
          /* Handle previous */
        }}
        onPlayPause={() => {
          /* Handle play/pause */
        }}
        onNext={() => {
          /* Handle next */
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
  },
  albumContainer: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  // Add more styles as needed
});

export default HomeScreen;
