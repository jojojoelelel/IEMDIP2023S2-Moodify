//Component for individual artist card
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const ArtistCard = ({item, onPress, imageUrl}) => {
  return (
    <View style={{ margin: 10 }}>
      <Image
        style={{ width: 200, height: 200, borderRadius: 5 }}
        source={{ uri: imageUrl }}
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
