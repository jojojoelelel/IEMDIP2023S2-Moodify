// src/screens/HomeScreen/HomeScreen.js
import React, {useState, useEffect} from 'react'; // Add useState and useEffect here
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Add this import
import AlbumCard from '../../components/AlbumCard';
import TrackList from '../../components/TrackList';
import PlayerControls from '../../components/PlayerControls';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
//import BottomNavigation from '../../navigation/BottomNavigation';
//Remove import of BottomNavigation

const HomeScreen = () => {
  const [newReleases, setNewReleases] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    // Fetch New Releases
    const fetchNewReleases = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('token');
        const response = await axios.get(
          'https://api.spotify.com/v1/browse/new-releases',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        setNewReleases(response.data.albums.items);
      } catch (error) {
        console.error('Error fetching new releases:', error);
      }
    };

    // Fetch Recently Played
    const fetchRecentlyPlayed = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('token');
        const response = await axios.get(
          'https://api.spotify.com/v1/me/player/recently-played',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        setRecentlyPlayed(response.data.items);
      } catch (error) {
        console.error('Error fetching recently played:', error);
      }
    };

    fetchNewReleases();
    fetchRecentlyPlayed();
  }, []);

  // Example data - replace with real data
  const albums = [
    {id: 1, title: 'Pray For You', artist: 'The Weekend', cover: 'cover_url_1'},
    {id: 2, title: 'Do It', artist: 'Milian Lau', cover: 'cover_url_2'},
    // Add more albums
  ];

  const tracks = [
    {id: 1, title: 'Nice For What', artist: 'Avinci John'},
    {id: 2, title: 'Where can I get some ?', artist: 'Arian Grande'},
    {id: 3, title: 'Why do we use it ?', artist: 'Alan Walker'},
    // Add more tracks
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Moodify</Text>
        {/* New Albums Section */}
        <View>
          <Text style={styles.sectionHeader}>New Albums</Text>
          <ScrollView horizontal>
            {albums.map(album => (
              <AlbumCard key={album.id} {...album} />
            ))}
          </ScrollView>
        </View>

        {/* Tracks Section */}
        <View>
          <Text style={styles.sectionHeader}>Geez Weekly</Text>
          <TrackList data={tracks} />
        </View>

        {/* Recently Played Section */}
        <View>
          <Text style={styles.sectionHeader}>Recently Music</Text>
          <TrackList data={recentlyPlayed} />
        </View>

        {/* Player Controls (assuming it's a static component at the bottom) */}
        <PlayerControls />
      </ScrollView>
      {/* Bottom navigation will be shown by the BottomNavigation component and does not need to be added here */}
      {/* BottomNavigation removed from here, it will be shown by the navigation container */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    padding: 20,
  },
  sectionHeader: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingLeft: 20,
  },
  // Other styles for AlbumCard, TrackList, PlayerControls, etc.
});

export default HomeScreen;
