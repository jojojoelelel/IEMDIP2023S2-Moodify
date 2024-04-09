// SearchScreen.js
import { ActivityIndicator, StyleSheet, View, ScrollView, Pressable, TextInput, Text, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState, useEffect } from 'react';
import TrackList from '../../components/TrackList.js';
import TrackListWithTimeStamp from '../../services/TrackListWithTimeStamp.js';
import { debounce } from "lodash";

// For API calls
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from '../AccountScreen/AuthContext';
import SpotifyWebApi from 'spotify-web-api-js';
import * as SpotifyAPI from '../../services/Spotify-web-api'
import { updatePassword } from 'firebase/auth';
import {access_token} from '@env';


export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [savedTracks, setSavedTracks] = useState([]);
  const [searchedTracks, setSearchedTracks] = useState([]);
  const [searchedItems, setSearchedItems] = useState({ tracks: [], artists: [], albums: [], playlists: [] });
  const [tracks, setTracks] = useState([]);

  const debouncedSearch = debounce(handleSearch,800)
  function handleSearch (text) {
    const filteredTracks = tracks.filter((item) =>
    item.name.toLowerCase().includes(text.toLowerCase())
    )
    setSearchedTracks(filteredTracks);
  }
  const handleSearchQueryChange = (text) => {
    // delay -> 800ms
     setSearchQuery(text);
     debouncedSearch(text);
  };

  const handleFocus = () => {
    setIsFocused(true);
    };

  const handleBlur = () => {
    setIsFocused(false);
    };

  useEffect(() => {
    searchTrack2();
    }, []);

  useEffect(() => {
    setSearchedTracks([]); // Clear searchedTracks when searchQuery changes
    handleSearch(searchQuery);
    }, [searchQuery, tracks]);

  /*const tracks = [
     { id: 1, title: 'Track 1'},
     { id: 2, title: 'Track 2'},
     { id: 3, title: 'Track 3'},
      // Add more tracks
      ]; */


  const spotifyApi = new SpotifyWebApi();
  const access_token = 'YOUR_ACCESS_TOKEN'; // Replace with your actual access token

/*  const searchTrack2 = async () => {
        try {
            const trackItem = await SpotifyAPI.searchTrack(access_token, 'track%3A%22Bury%20the%20light%22%20artist%3A%22Casey%20Edwards%22', 'track');
            console.log(trackItem);
            setSearchedItems(
                trackItem.data.tracks.items.map(track => ({
                name: track.name,
                imageUrl:
                   track.album.images.length > 0
                   ? track.album.images[0].url
                   : '' // Provide a default image URL as fallback
            })),
                /*response.data.artists.items.map(artist => ({
                name: artist.name,
                imageUrl:
                   artist.images.length > 0
                   ? artist.images[0].url
                   : '' // Provide a default image URL as fallback
            })),

                //artists: item.artists.items.name,
                //albums: item.albums.items.name,
                //playlists: item.playlists.items.name,
            );
        } catch (error) {
            console.error('Error in getdeviceID => ', error)
        }
    } */

    const searchTrack2 = async () => {
        try {
            // Search for tracks
            const trackResponse = await SpotifyAPI.searchTrack(access_token, searchedTracks[0], 'track');
            //console.log(trackResponse);

            // Process track data
            const tracksData = trackResponse.data.tracks.items.map(track => ({
                name: track.name,
                artist: track.album.artists.map(artist => artist.name).join(', '),
                imageUrl: track.album.images.length > 0 ? track.album.images[0].url : ''
            }));
            setTracks(tracksData);

            // Search for artists
            const artistResponse = await SpotifyAPI.searchTrack(access_token, 'q', 'artist');
            console.log(artistResponse);

            // Process artist data
            const artists = artistResponse.data.artists.items.map(artist => ({
                name: artist.name,
                imageUrl: artist.images.length > 0 ? artist.images[0].url : ''
            }));

            // Search for albums
            const albumResponse = await SpotifyAPI.searchTrack(access_token, 'q', 'album');
            console.log(albumResponse);

            // Process album data
            const albums = albumResponse.data.albums.items.map(album => ({
                name: album.name,
                imageUrl: album.images.length > 0 ? album.images[0].url : ''
            }));

            // Search for playlists
            const playlistResponse = await SpotifyAPI.searchTrack(access_token, 'q', 'playlist');
            console.log(playlistResponse);

            // Process playlist data
            const playlists = playlistResponse.data.playlists.items.map(playlist => ({
                name: playlist.name,
                imageUrl: playlist.images.length > 0 ? playlist.images[0].url : ''
            }));

            // Update state
          setSearchedTracks({ tracks/* artists, albums, playlists*/ });
        } catch (error) {
            console.error('Error in searchTrack2:', error);
        }
    };

    const getSavedTracks2 = async () => {
        try {
            const response = await SpotifyAPI.getUserSavedTracks(access_token, 0, 3);
            console.log(response);
            console.log(response.data.items);
                setSavedTracks(
                  response.data.items.map(track => ({
                    title: track.track.name,
                    artist: track.track.artists.map(artist => artist.name).join(', '),
                    dateAdded: track.added_at,
                    imageUrl:
                        track.track.album.images.length > 0
                         ? track.track.album.images[0].url
                         : '' // Provide a default image URL as fallback
                  })),
                );
        } catch (error) {
            console.error('Error in getUserSavedTracks => ', error)
        }
    }

useEffect(() => {
  getSavedTracks2();
}, []);


 return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            marginHorizontal: 15,
            marginTop: 10,
          }}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#fff" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#71737B"
            value={searchQuery}
            onChangeText={(text) => handleSearchQueryChange(text)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {isFocused && (
            <Pressable onPress={() => searchQuery('')} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          )}
        </View>
        <Text style={styles.header}>Search Result</Text>
          {searchedTracks.length === 0 ? (
           <ActivityIndicator size="large" color="gray" /> // Show a loading indicator while data is being fetched
           ) : (
            <FlatList
              data={searchedTracks}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.savedTrackWrapper}>
                  <TrackList
                    title={item.name}
                    artist={item.artist}
                    imageUrl={item.imageUrl}
                  />
                </View>
              )}
            />
      )}

        <Text style={styles.header}>History</Text>
        {/*<View style={styles.trackContainer}>
          {savedTracks.map(track => (
            <View style={styles.trackWrapper} key={track.id}>
              <TrackList data={track} {...track} />
            </View>
          ))}
        </View> */}
        <Text style={styles.header}>Recently Saved</Text>
        <FlatList
          data={savedTracks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.savedTrackWrapper}>
              <TrackListWithTimeStamp
                title={item.title}
                artist={item.artist}
                dateAdded={item.dateAdded}
                imageUrl={item.imageUrl}
              />
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 10,
  },
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#363942',
    height: 40,
    marginHorizontal: 10,
    marginTop: 10, // Adjust this value as needed
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#71737B',
    marginHorizontal: 5,
  },
  cancelButtonText: {
    color: '#CBFB5E',
  },
  trackContainer: {
    padding: 10,
    elevation: 5,
    borderRadius: 10,
    flexDirection: 'row',
  },
  trackWrapper: {
    marginHorizontal: 10, // Adjust this value for spacing between tracks
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: -20, // Adjust the vertical padding
    paddingHorizontal: 5, // Adjust the horizontal padding
    backgroundColor: '#363942',
  },
  savedTrackWrapper: {
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#363942',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBFB5E',
  },
  emptySearch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptySearchText: {
    color: '#fff',
    fontSize: 18,
  },
});
  
  // export default SearchScreen;
