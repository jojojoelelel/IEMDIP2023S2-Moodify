// src/screens/HomeScreen/HomeScreen.js
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import AlbumCard from '../../components/AlbumCard';
import TrackList from '../../components/TrackList';
import PlayerControls from '../../components/PlayerControls';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MusicPlayerBar from '../../components/MusicPlayerBar';
import axios from 'axios';
import {useSpotify} from '../../services/SpotifyAuthContext';

const HomeScreen = () => {
  const {accessToken, getRecentlyPlayedTracks} = useSpotify();
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  console.log('Access Token', accessToken);
  useEffect(() => {
    if (accessToken) {
      const fetchRecentlyPlayedTracks = async () => {
        if (accessToken) {
          console.log('Access Token is now avaialble:', accessToken);
          const tracks = await getRecentlyPlayedTracks();
          console.log('Recently Played Tracks:', tracks); // Log to inspect the structure
          setRecentlyPlayed(tracks);
        }
      };
    }
  }, [accessToken, getRecentlyPlayedTracks]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home Screen</Text>
      <ScrollView>
        {/* Render your recently played tracks here */}
        <Text style={styles.sectionHeader}>Recently Played</Text>
        {recentlyPlayed.length > 0 ? (
          <TrackList data={recentlyPlayed} />
        ) : (
          <Text style={styles.text}>No data available</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    fontSize: 24,
    color: '#fff',
    margin: 10,
  },
  sectionHeader: {
    color: '#fff',
    fontSize: 20,
    marginVertical: 10,
  },
  // Add more styles as needed
});

export default HomeScreen;
