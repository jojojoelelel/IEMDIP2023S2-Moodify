// src/screens/HomeScreen/HomeScreen.js
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import AlbumCard from '../../components/AlbumCard';
import TrackList from '../../components/TrackList';
import PlayerControls from '../../components/PlayerControls';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET} from '@env';
import {
  getArtistAlbums,
  getUserProfile,
  requestAccessToken,
} from '../../services/Spotify-web-api';
import axios from 'axios';

const HomeScreen = () => {
  // const [access_token, setaccess_token] = useState();
  const redirect_uri = 'http://localhost:8081/callback';
  const [access_token, setaccess_token] = useState();
  const [return_Params, setreturn_Params] = useState();
  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    if (return_Params) requestAccessToken2();
  }, [return_Params]);
  useEffect(() => {
    if (access_token) {
      // Fetch user playlists when access_token is available
      getUserPlaylists();
    }
  }, [access_token]);
  const requestAccessToken2 = async () => {
    try {
      const response = await requestAccessToken(return_Params);
      console.log(response);
      setaccess_token(response);
    } catch (error) {
      console.error('Error in requestAccessToken => ', error);
    }
  };
  const getUserPlaylists = async () => {
    try {
      // Call the getUserPlaylist function with access_token and user_id
      const playlistsResponse = await getUserPlaylist(
        access_token,
        REACT_APP_CLIENT_ID,
      );
      console.log('Playlists Response:', playlistsResponse);
      setUserPlaylists(playlistsResponse.data.items);
    } catch (error) {
      console.error('Error in getUserPlaylists => ', error);
    }
  };

  return (
    <View style={styles.container}>
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
});

export default HomeScreen;
