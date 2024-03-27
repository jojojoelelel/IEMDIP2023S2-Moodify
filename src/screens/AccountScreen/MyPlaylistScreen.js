//Screen for playlists from account screen
import React, {useEffect, useState, useContext} from 'react';
import {FlatList, Text, StyleSheet, View} from 'react-native';
import PlaylistItem from '../../components/PlaylistItem';
import MusicPlayerBar from '../../components/MusicPlayerBar'; //to demo music player bar
import {access_token2} from '@env';
import * as SpotifyAPI from '../../services/Spotify-web-api';
//commentcommenthujh

import { AppContext } from '../../navigation/AppNavigation';

const PlaylistsScreen = ({navigation}) => {
  const { access_token, setaccess_token } = useContext(AppContext);
  const [playlist, setPlaylists] = useState([]);

  const fetchPlaylists = async () => {
    // const accessToken = access_token2; // Replace with your actual access token
    const playlistsData = await SpotifyAPI.getUserPlaylist(access_token);
    setPlaylists(
      playlistsData.map(playlist => ({
        id: playlist.id,
        title: playlist.name,
        creator: playlist.owner.display_name,
        imageUrl:
          playlist.images.length > 0
            ? playlist.images[0].url
            : 'default_playlist_image_url', // Provide a default image URL as fallback
      })),
    );
  };

  useEffect(() => {
    // const fetchPlaylists = async () => {
    //   const accessToken = access_token2; // Replace with your actual access token
    //   const playlistsData = await SpotifyAPI.getUserPlaylist(accessToken);
    //   setPlaylists(
    //     playlistsData.map(playlist => ({
    //       id: playlist.id,
    //       title: playlist.name,
    //       creator: playlist.owner.display_name,
    //       imageUrl:
    //         playlist.images.length > 0
    //           ? playlist.images[0].url
    //           : 'default_playlist_image_url', // Provide a default image URL as fallback
    //     })),
    //   );
    // };

    fetchPlaylists();
  }, []);

  // Function to handle item press if needed
  const handleItemPress = playlist => {
    // To navigate to a playlist detail screen:
    navigation.navigate('PlaylistDetails', {playlist});
  };

  return (
    <View style={styles.screenContainer}>
      {playlist.length > 0 ? (
        <>
          <FlatList
            data={playlist}
            renderItem={({item}) => (
              <PlaylistItem
                title={item.title}
                creator={item.creator}
                imageUrl={item.imageUrl}
                onPress={() => handleItemPress(item)} // Assuming PlaylistItem accepts an onPress prop
              />
            )}
            keyExtractor={item => item.id}
            style={styles.listContainer}
          />
          <MusicPlayerBar
            songTitle="Song Title"
            artistName="Artist Name"
            coverImage="https://upload.wikimedia.org/wikipedia/en/f/fd/Coldplay_-_Parachutes.png"
            onPlayPausePress={() => {}}
          />
        </>
      ) : (
        <Text>NOT WORKING</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // ... your existing styles ...
  screenContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  listContainer: {
    // styles for your FlatList if needed
  },
});

export default PlaylistsScreen;

/* const playlists = [
  // dummy playlist items
  {
    id: '1',
    title: 'Chill Hits',
    creator: 'Spotify',
    imageUrl:
      'https://i.etsystatic.com/23258249/r/il/51aec6/2414536787/il_fullxfull.2414536787_2g5q.jpg',
  },
  {
    id: '2',
    title: 'Chiller Hits',
    creator: 'Spotify',
    imageUrl:
      'https://i.etsystatic.com/23258249/r/il/51aec6/2414536787/il_fullxfull.2414536787_2g5q.jpg',
  },
  {
    id: '3',
    title: 'Chilled Hits',
    creator: 'Spotify',
    imageUrl:
      'https://i.etsystatic.com/23258249/r/il/51aec6/2414536787/il_fullxfull.2414536787_2g5q.jpg',
  },
  {
    id: '4',
    title: 'Chilling Hitting',
    creator: 'Spotify',
    imageUrl:
      'https://i.etsystatic.com/23258249/r/il/51aec6/2414536787/il_fullxfull.2414536787_2g5q.jpg',
  },
  {
    id: '5',
    title: 'Chilli Hits',
    creator: 'Spotify',
    imageUrl:
      'https://i.etsystatic.com/23258249/r/il/51aec6/2414536787/il_fullxfull.2414536787_2g5q.jpg',
  },
  // Add more playlists here...
]; */
////
