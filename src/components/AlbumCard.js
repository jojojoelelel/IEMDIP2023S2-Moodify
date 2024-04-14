import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {AppContext} from '../navigation/AppNavigation';

const AlbumCard = ({item, onPress, imageUrl}) => {
  const {colorTheme, setColorTheme} = useContext(AppContext);
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
          color: `${colorTheme === 'Dark' ? `${process.env.REACT_APP_LIGHTTHEME}` : `${process.env.REACT_APP_DARKTHEME}`}`,
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
