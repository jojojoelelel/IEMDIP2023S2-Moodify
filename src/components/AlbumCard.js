import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {AppContext} from '../navigation/AppNavigation';

const AlbumCard = ({item, imageUrl, onPress}) => {
  const {colorTheme, setColorTheme} = useContext(AppContext);

  const words = item?.name.split(' ');

  const truncatedName = words.slice(0, 6).join(' ');

  const isTruncated = words.length > 6;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{margin: 10}}>
        <Image
          style={{width: 200, height: 200, borderRadius: 5}}
          source={{uri: imageUrl}}
        />
        <Text
          style={{
            fontSize: 13,
            fontWeight: '500',
            color: `${
              colorTheme === 'Dark'
                ? `${process.env.REACT_APP_LIGHTTHEME}`
                : `${process.env.REACT_APP_DARKTHEME}`
            }`,
            marginTop: 10,
          }}>
          {truncatedName}

          {isTruncated && ' ...'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default AlbumCard;
