// SongItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const SongItem = ({ title, artist, cover }) => {
    return (
      <TouchableOpacity style={styles.songContainer}>
        <Image source={{ uri: cover }} style={styles.coverImage} />
        <View style={styles.textContainer}>
          <Text style={styles.songTitle}>{title}</Text>
          <Text style={styles.artistName}>{artist}</Text>
        </View>
        <Ionicons name="ellipsis-horizontal" size={20} color="#ffffff" />
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    songContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#303030',
    },
    coverImage: {
      width: 60,
      height: 60,
      borderRadius: 30, // You can adjust the borderRadius to your preference
      marginRight: 15,
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    songTitle: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    artistName: {
      color: '#FFFFFF',
      fontSize: 14,
    },
    // Add any additional styles you need
  });
  
  export default SongItem;
