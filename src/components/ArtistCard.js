//Component for individual artist card
import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {AppContext} from '../navigation/AppNavigation';

const ArtistCard = ({item, imageUrl, onPress}) => {
  const {colorTheme, setColorTheme} = useContext(AppContext);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{margin: 10}}>
        <Image
          style={{
            width: 200,
            height: 200,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: `${process.env.REACT_APP_DARKTHEME}`,
          }}
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
          {item?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default ArtistCard;
