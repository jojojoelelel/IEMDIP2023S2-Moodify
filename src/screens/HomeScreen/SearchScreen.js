// SearchScreen.js
import { ActivityIndicator, StyleSheet, View, ScrollView, Pressable, TextInput, Text, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState, useEffect, useContext } from 'react';
import TrackList from '../../components/TrackList.js';
import TrackListWithTimeStamp from '../../components/TrackListWithTimeStamp.js';
import { debounce } from "lodash";
import PlayerControls from '../../components/PlayerControls.js';
import MusicPlayerBar from '../../components/MusicPlayerBar.js';
import {MusicPlayerContext} from '../../contexts/SongContext.js';

// For API calls
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from '../AccountScreen/AuthContext';
import SpotifyWebApi from 'spotify-web-api-js';
import * as SpotifyAPI from '../../services/Spotify-web-api'
import { updatePassword } from 'firebase/auth';
import {access_token} from '@env';
import {AppContext} from '../../navigation/AppNavigation.js';


export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [savedTracks, setSavedTracks] = useState([]);
  const [searchedTracks, setSearchedTracks] = useState([]);
  //const [searchedItems, setSearchedItems] = useState({ tracks: [], artists: [], albums: [], playlists: [] });
  const [tracks, setTracks] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [history, setHistory] = useState([]);
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


    /**const handleItemPress = item => {
      playTrack(item);
      setSearchHistory(prevHistory => [item, ...prevHistory.slice(0, 2)]);
    }; **/
    const handleItemPress = async item => {
      playTrack(item);
      const dateAdded = new Date().toISOString();

      setSearchHistory(prevHistory => {
        const existingIndex = prevHistory.findIndex(histItem => histItem.id === item.id);
        let newHistory = prevHistory.filter(histItem => histItem.id !== item.id);
        const updatedHistory = [{ ...item, dateAdded }, ...newHistory];

        // Save to AsyncStorage
        AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory)).catch(error => {
          console.error("Failed to save history", error);
        });

        return updatedHistory;
      });
    };

  const debouncedSearch = debounce(handleSearch,800)
  function handleSearch (text) {
    const filteredTracks = tracks.filter((item) =>
    //item.name.toLowerCase().includes(text.toLowerCase())
    item.title.toLowerCase().includes(text.toLowerCase())
    )
    //console.log('filteredTracks', filteredTracks)
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

    //timeout for API calls
    useEffect(() => {
    const delay = setTimeout(() => {
      searchTrack2()
    }, 30000);

    return () => clearTimeout(delay);
    }, [searchQuery]);

  useEffect(() => {
    setSearchedTracks([]); // Clear searchedTracks when searchQuery changes
    handleSearch(searchQuery);
    }, [searchQuery, tracks]);

    useEffect(() => {
      const loadHistory = async () => {
        try {
          const savedHistory = await AsyncStorage.getItem('searchHistory');
          if (savedHistory !== null) {
            setSearchHistory(JSON.parse(savedHistory));
          }
        } catch (error) {
          console.error("Failed to load history", error);
        }
      };

      loadHistory();
    }, []);

  /*const tracks = [
     { id: 1, title: 'Track 1'},
     { id: 2, title: 'Track 2'},
     { id: 3, title: 'Track 3'},
      // Add more tracks
      ]; */


  const spotifyApi = new SpotifyWebApi();
    const {access_token, setaccess_token} = useContext(AppContext);

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
            const trackResponse = await SpotifyAPI.searchTrack(access_token, searchQuery, 'track');
            console.log('trackResponse', trackResponse);

            // Process track data
            const tracksData = trackResponse.data.tracks.items.map(track => ({
                //name: track.name,
                title: track.name,
                artist: track.album.artists.map(artist => artist.name).join(', '),
                cover: track.album.images.length > 0 ? track.album.images[0].url : '',
                url: track.preview_url,
            }));
            setTracks(tracksData);

            // Update state
          setSearchedTracks({ tracks/* artists, albums, playlists*/ });
        } catch (error) {
            console.error('Error in searchTrack2:', error);
        }
    };

  /*const fetchSavedSongs = async () => {
    try {
      const tracks = await SpotifyAPI.getUserSavedTracks(access_token, 5, 0);
      setSavedTracks(tracks); // Assuming the returned value is directly the list of tracks
    } catch (error) {
          if (error.response && error.response.status === 429) {
            setTimeout(fetchSavedSongs, 5000); // Retry after 5 seconds
          } else {
            console.error('Failed to fetch saved song details:', error);
          }
    }
  };
  useEffect(() => {
    fetchSavedSongs();
  }); */


  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <Pressable onPress={() => navigation.goBack()} style={{ marginHorizontal: 15, marginTop: 10 }}>
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
            <Pressable onPress={() => setSearchQuery('')} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          )}
        </View>
        <Text style={styles.header}>Search Result</Text>
        {searchedTracks.length === 0 && searchQuery !== '' ? (
           <ActivityIndicator size="large" color="gray" />
           ) : (
            <FlatList
              data={searchedTracks}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.savedTrackWrapper}>
                  <TrackList
                    id={item.id}
                    title={item.title}
                    artist={item.artist}
                    url={item.preview_url}
                    cover={item.cover}
                    onPress={() => handleItemPress(item)}
                  />
                </View>
              )}
            />
        )}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.header}>History</Text>
           <Ionicons name="timer-outline" size={20} color="#fff" />
        </View>
        <FlatList
          data={searchHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.savedTrackWrapper}>
              <TrackListWithTimeStamp
                title={item.title}
                artist={item.artist}
                dateAdded={item.dateAdded}
                url={item.url}
                cover={item.cover}
                onPress={() => handleItemPress(item)}
              />
            </View>
          )}
        />
      </ScrollView>
      <MusicPlayerBar />
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
    borderColor: '#00FFFF',
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
