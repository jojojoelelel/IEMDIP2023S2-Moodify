import React, {useEffect, useRef, useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated, ImageBackground} from 'react-native';
import CustomButton from '../../components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MusicPlayerBar from '../../components/MusicPlayerBar';

import {AppContext} from '../../navigation/AppNavigation';

const DiscoverScreen = ({navigation}) => {
  const {colorTheme, setColorTheme} = useContext(AppContext);
  // Create an animated value for opacity
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Define a shaking sequence
    const shakingSequence = Animated.sequence([
      // Start to the right, move left, then back to center
      Animated.timing(shakeAnimation, {
        toValue: 8,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -8,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 5,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]);

    // Loop the sequence indefinitely
    Animated.loop(shakingSequence).start();
  }, []);

  return (
    <ImageBackground source={colorTheme === 'Dark' ? require('../../assets/images/sign-in-bgDark.jpg') : require('../../assets/images/backgroundLight.jpg')}
    style={styles.background}>
    {/* <View style={colorTheme === 'Dark' ? styles.containerDark : styles.containerLight}> */}
      <Text style={colorTheme === 'Dark' ? styles.titleDark : styles.titleLight}>Discover New Experiences</Text>
      <TouchableOpacity
        style={colorTheme === 'Dark' ? styles.buttonDark : styles.buttonLight}
        onPress={() => navigation.navigate('ChatBotScreen')}
        activeOpacity={0.7}>
        <Text style={colorTheme === 'Dark' ? styles.buttonTextDark : styles.buttonTextLight}>Let's Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={colorTheme === 'Dark' ? styles.buttonDark : styles.buttonLight}
        onPress={() => navigation.navigate('VrConcertScreen')}
        activeOpacity={0.7}>
        <Text style={colorTheme === 'Dark' ? styles.buttonTextDark : styles.buttonTextLight}>VR Concert</Text>
      </TouchableOpacity>
      <Animated.Image
        source={require('../../assets/images/imagediscoverscreen.png')}
        style={[
          styles.gif,
          {
            // Apply a continuous shake animation
            transform: [{translateX: shakeAnimation}],
          },
        ]}
      />
      <MusicPlayerBar />
    {/* </View> */}
    </ImageBackground>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 20,
  },
  containerDark: {
    flex: 1,
    padding: 20,
    backgroundColor: `${process.env.REACT_APP_DARKTHEME}`,
  },
  containerLight: {
    flex: 1,
    padding: 20,
    backgroundColor: `${process.env.REACT_APP_LIGHTTHEME}`,
  },
  titleDark: {
    color: `${process.env.REACT_APP_LIGHTTHEME}`, // A darker shade for better readability
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 20,
    textAlign: 'center', // Center the title
  },
  titleLight: {
    color: `${process.env.REACT_APP_DARKTHEME}`, // A darker shade for better readability
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 20,
    textAlign: 'center', // Center the title
  },
  buttonDark: {
    backgroundColor: `${process.env.REACT_APP_DARKACCENT}`,
    borderRadius: 10, // Rounded corners
    paddingVertical: 15,
    marginVertical: 10, // Space between buttons
    alignItems: 'center', // Center button text horizontally
    shadowColor: '#000', // Simple shadow for depth
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonLight: {
    backgroundColor: `${process.env.REACT_APP_LIGHTACCENT}`,
    borderRadius: 10, // Rounded corners
    paddingVertical: 15,
    marginVertical: 10, // Space between buttons
    alignItems: 'center', // Center button text horizontally
    shadowColor: '#000', // Simple shadow for depth
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonTextDark: {
    color: `${process.env.REACT_APP_DARKTHEME}`,
    fontSize: 16,
    fontWeight: '500',
  },
  buttonTextLight: {
    color: `${process.env.REACT_APP_LIGHTTHEME}`,
    fontSize: 16,
    fontWeight: '500',
  },
});
