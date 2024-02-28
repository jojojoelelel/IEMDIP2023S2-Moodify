import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // For Ionicons
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // For FontAwesome icons

// Dummy data for liked songs
const likedSongsData = [
  // Add your song data here
  {
    id: '1',
    title: 'Adventure of a Lifetime',
    artist: 'Coldplay',
    albumCover:
      'https://i.scdn.co/image/ab67616d0000b2738ff7c3580d429c8212b9a3b6', // Replace with your album cover URL
  },
  {
    id: '2',
    title: 'Hymn for a Weekend',
    artist: 'Coldplay',
    albumCover:
      'https://i.scdn.co/image/ab67616d0000b2738ff7c3580d429c8212b9a3b6', // Replace with your album cover URL
  },
  {
    id: '3',
    title: 'Birds',
    artist: 'Coldplay',
    albumCover:
      'https://i.scdn.co/image/ab67616d0000b2738ff7c3580d429c8212b9a3b6', // Replace with your album cover URL
  },
  {
    id: '4',
    title: 'Everglow',
    artist: 'Coldplay',
    albumCover:
      'https://i.scdn.co/image/ab67616d0000b2738ff7c3580d429c8212b9a3b6', // Replace with your album cover URL
  },
  {
    id: '5',
    title: 'Up&Up',
    artist: 'Coldplay',
    albumCover:
      'https://i.scdn.co/image/ab67616d0000b2738ff7c3580d429c8212b9a3b6', // Replace with your album cover URL
  },
  // More dummy songs...
];

const LikedSongsScreen = () => {
  const renderSong = ({item}) => (
    <TouchableOpacity style={styles.songContainer}>
      <Image source={{uri: item.albumCover}} style={styles.albumCover} />
      <View style={styles.songDetails}>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.songArtist}>{item.artist}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="heart" size={20} color="#1DB954" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="play-circle-outline" size={20} color="#fff" />
        </TouchableOpacity>
        {/* Add more icons as needed */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={likedSongsData}
        renderItem={renderSong}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A', // Or any other background color you prefer
  },
  songContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  albumCover: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  songDetails: {
    flex: 1, // This ensures that the song details section takes up the remaining space
    marginLeft: 10, // Add some space between the image and the text
  },
  songTitle: {
    color: '#FFF',
    fontSize: 16,
  },
  songArtist: {
    color: '#BBB',
    fontSize: 14,
  },
  iconButton: {
    padding: 10, // Padding for touchable area
  },
  iconContainer: {
    flexDirection: 'row',
    width: 80,
  },
});

export default LikedSongsScreen;
