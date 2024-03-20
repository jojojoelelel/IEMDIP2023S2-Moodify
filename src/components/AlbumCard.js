import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const AlbumCard = ({item, onPress, imageUrl}) => {
  // Split the name into words
  const words = item?.name.split(' ');

  // Join the first three words together
  const truncatedName = words.slice(0, 6).join(' ');

  // Check if there are more than three words
  const isTruncated = words.length > 6;

  return (
    <View style={{margin: 10}}>
      <Image
        style={{width: 200, height: 200, borderRadius: 5}}
        source={{uri: imageUrl}}
      />
      <Text
        style={{
          fontSize: 13,
          fontWeight: '500',
          color: 'white',
          marginTop: 10,
        }}>
        {/* Display the truncated name */}
        {truncatedName}

        {/* Display ellipsis (...) if the name is truncated */}
        {isTruncated && ' ...'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AlbumCard;
