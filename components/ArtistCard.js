//Component for individual album card
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const ArtistCard = ({item, onPress}) => {
  return (
    <View style={{ margin: 10 }}>
      <Image
        style={{ width: 130, height: 130, borderRadius: 5 }}
        source={{ uri: artists.items.images[0].url }}
      />
      <Text
        style={{
          fontSize: 13,
          fontWeight: "500",
          color: "white",
          marginTop: 10,
        }}
      >
        {item?.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ArtistCard;