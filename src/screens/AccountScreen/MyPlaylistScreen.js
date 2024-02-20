//Screen for playlists from account screen
import React from 'react';
import { FlatList, Text, StyleSheet, View } from 'react-native';
import PlaylistItem from '../../components/PlaylistItem';
import MusicPlayerBar from '../../components/MusicPlayerBar'; //to demo music player bar


const PlaylistsScreen = ({ navigation }) => {
    const playlists = [
      // dummy playlist items
      {
        id: '1',
        title: 'Chill Hits',
        creator: 'Spotify',
        imageUrl: 'https://i.etsystatic.com/23258249/r/il/51aec6/2414536787/il_fullxfull.2414536787_2g5q.jpg',
      },
      {
        id: '2',
        title: 'Chiller Hits',
        creator: 'Spotify',
        imageUrl: 'https://i.etsystatic.com/23258249/r/il/51aec6/2414536787/il_fullxfull.2414536787_2g5q.jpg',
      },
      {
        id: '3',
        title: 'Chilled Hits',
        creator: 'Spotify',
        imageUrl: 'https://i.etsystatic.com/23258249/r/il/51aec6/2414536787/il_fullxfull.2414536787_2g5q.jpg',
      },
      {
        id: '4',
        title: 'Chilling Hitting',
        creator: 'Spotify',
        imageUrl: 'https://i.etsystatic.com/23258249/r/il/51aec6/2414536787/il_fullxfull.2414536787_2g5q.jpg',
      },
      {
        id: '5',
        title: 'Chilli Hits',
        creator: 'Spotify',
        imageUrl: 'https://i.etsystatic.com/23258249/r/il/51aec6/2414536787/il_fullxfull.2414536787_2g5q.jpg',
      },
      // Add more playlists here...
    ];
  
    // Function to handle item press if needed
    const handleItemPress = (playlist) => {
      // To navigate to a playlist detail screen:
      navigation.navigate('PlaylistDetails', { playlist });
    };
  
    return (
      <View style={styles.screenContainer}>
        <FlatList
          data={playlists}
          renderItem={({ item }) => (
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
        {/* REMEBER TO MOVE the MusicPlayerBar to a more appropriate place later */}
        <MusicPlayerBar
          songTitle="Song Title"
          artistName="Artist Name"
          coverImage="https://upload.wikimedia.org/wikipedia/en/f/fd/Coldplay_-_Parachutes.png"
          onPlayPausePress={() => {}}
        />
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