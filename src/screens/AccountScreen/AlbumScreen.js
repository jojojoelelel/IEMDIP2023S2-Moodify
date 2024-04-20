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
import AlbumItem from '../../components/AlbumItem';

const AlbumsScreen = ({navigation}) => {
  const {access_token, setaccess_token, colorTheme, setColorTheme} = useContext(AppContext);
  const [albums, setAlbums] = useState([]);
  const fetchAlbums = async () => {
    const albumsData = await SpotifyAPI.getCurrentUserSavedAlbums(access_token);
    setAlbums(
      albumsData.items.map(item => ({
        id: item.album.id,
        title: item.album.name,
        creator: item.album.artists.map(artist => artist.name).join(', '),
        imageUrl: 
        item.album.images.length > 0 
          ? item.album.images[0].url
          : 'default_playlist_image_url',
      })),
    );
  };

  useEffect(() => {
    if (access_token) {
      fetchAlbums();
      console.log('albumATAS', albums);
    }
  }, [access_token]);

  useEffect(() => {
    console.log('albums=>', albums)
  }, [albums])

  // Function to handle item press if needed
  const handleItemPress = (albums) => {
    navigation.navigate('AlbumDetails', {albums});
  };

  return (
    <View style={colorTheme === 'Dark' ? styles.screenContainerDark : styles.screenContainerLight}>
      {albums.length > 0 ? (
        <>
          <FlatList
            data={albums}
            renderItem={({item}) => (
              <AlbumItem
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
  screenContainerDark: {
    flex: 1,
    backgroundColor: '#121212',
  },
  screenContainerLight: {
    flex: 1,
    backgroundColor: `${process.env.REACT_APP_LIGHTTHEME}`,
  },
  listContainer: {
    // styles for your FlatList if needed
  },
});

export default AlbumsScreen;
