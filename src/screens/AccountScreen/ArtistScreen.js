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
import ArtistItem from '../../components/ArtistItem';

const ArtistScreen = ({navigation}) => {
  const {access_token, setaccess_token, colorTheme, setColorTheme} = useContext(AppContext);
  const [artists, setArtists] = useState([]);
  const fetchArtists = async () => {
    const artistsData = await SpotifyAPI.getFollowedArtists(access_token);
    setArtists(
        artistsData.artists.items.map(item => ({
        id: item.id,
        title: item.name,
        imageUrl: 
        item.images.length > 0 
          ? item.images[0].url
          : 'default_playlist_image_url',
      })),
    );
  };

  useEffect(() => {
    if (access_token) {
        fetchArtists();
      console.log('artists data', artists);
    }
  }, [access_token]);

  useEffect(() => {
    console.log('artists=>', artists)
  }, [artists])

  // Function to handle item press if needed
  const handleItemPress = (artists) => {
    navigation.navigate('ArtistDetails', {artists});
  };

  return (
    <View style={colorTheme === 'Dark' ? styles.screenContainerDark : styles.screenContainerLight}>
      {artists.length > 0 ? (
        <>
          <FlatList
            data={artists}
            renderItem={({item}) => (
              <ArtistItem
                id={item.id}
                title={item.title}
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

export default ArtistScreen;
