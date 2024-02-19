//Component for individual album card
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const AlbumCard = ({title, artist, cover, onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{uri: cover}} style={styles.cover} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.artist}>{artist}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    marginRight: 16,
  },
  cover: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 8,
  },
  artist: {
    color: '#aaa',
  },
});

export default AlbumCard;
