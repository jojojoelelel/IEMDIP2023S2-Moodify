import React from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

const AlbumCover = ({source}) => {
  return (
    <View style={styles.albumCoverContainer}>
      <Image source={source} style={styles.albumCover} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.fadeOutEdge}
        start={{x: 0.0, y: 0.5}}
        end={{x: 1.0, y: 0.5}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  albumCoverContainer: {
    width: width * 0.7,
    height: width * 0.7,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 150,
    overflow: 'hidden', 
  },
  albumCover: {
    width: '100%',
    height: '100%',
    borderRadius: 150,
  },
  fadeOutEdge: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 150,
  },
});

export default AlbumCover;
