// SearchScreen.js
// Search for Liked Songs
import { StyleSheet, View, ScrollView, Pressable, TextInput, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import TrackList from '../../components/TrackList.js';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };
  const handleFocus = () => {
    setIsFocused(true);
    };

  const handleBlur = () => {
    setIsFocused(false);
    };

  const tracks = [
     { id: 1, title: 'Track 1'},
     { id: 2, title: 'Track 2'},
     { id: 3, title: 'Track 3'},
      // Add more tracks
      ];

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
            onChangeText={handleSearch}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {isFocused && (
            <Pressable onPress={() => setSearchQuery('')} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          )}
        </View>

        <Text style={styles.header}>History</Text>
        <View style={styles.trackContainer}>
          {tracks.map(track => (
            <View style={styles.trackWrapper} key={track.id}>
              <TrackList data={track} {...track} />
            </View>
        ))}
       </View>
      <Text style={styles.header}>Recently Liked</Text>
        <View style={{
            padding: 12,
            elevation: 5,
            borderRadius: 10,
            flexDirection: 'row',
        }}>
          {tracks.map(track => (
            <View style={{
            marginHorizontal: 10, // Adjust this value for spacing between tracks
            borderColor: '#CBFB5E',
            borderWidth: 1,
            paddingVertical: -20, // Adjust the vertical padding
            paddingHorizontal: 5, // Adjust the horizontal padding
            borderRadius: 10,
            padding: 5,
            backgroundColor: 'rgba(203, 251, 94, 0.3)',
               }}
              key={track.id}>
              <TrackList data={track} {...track} />
            </View>
        ))}
       </View>
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
    fontWeight:'bold',
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
    padding: 12,
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
});

export default SearchScreen;