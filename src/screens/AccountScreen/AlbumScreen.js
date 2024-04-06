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
import * as SpotifyAPI from '../../services/Spotify-web-api';
import Sound from 'react-native-sound';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MusicPlayerContext} from '../../contexts/SongContext';
import {AppContext} from '../../navigation/AppNavigation';
import MusicPlayerBar from '../../components/MusicPlayerBar';
import albumItem from '../../components/AlbumItem';

const AlbumsScreen = ({navigation}) => {
  const {access_token, setaccess_token} = useContext(AppContext);
  const [albums, setAlbums] = useState([]);
  const fetchAlbums = async () => {
    const albums = await SpotifyAPI.getUserAlbums(access_token);
    setAlbums(
      albums.items.map(album => ({
        id: album.id,
        title: album.name,
        creator: album.artists,
        imageUrl: album.images[0].url,
      })),
    );
  };

  useEffect(() => {
    if (access_token) {
      fetchAlbums();
      console.log('albumATAS', albums);
    }
  }, [access_token]);

  // Function to handle item press if needed
  const handleItemPress = item => {
    navigation.navigate('albumDetails', {album});
  };

  return (
    <View style={styles.screenContainer}>
      {albums.length > 0 ? (
        <>
          <FlatList
            data={albums}
            renderItem={({item}) => (
              <albumItem
                id={item.id}
                title={item.title}
                creator={item.creator}
                imageUrl={item.imageUrl}
                onPress={() => handleItemPress(item)} // Assuming albumItem accepts an onPress prop
              />
            )}
            keyExtractor={item => item.id}
            style={styles.listContainer}
          />
          <MusicPlayerBar />
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

export default AlbumsScreen;
