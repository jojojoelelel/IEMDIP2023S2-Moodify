import React, {useEffect, useRef, useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import CustomButton from '../../components/CustomButton';

import {AppContext} from '../../navigation/AppNavigation.js';

const GettingStarted = ({navigation}) => {
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

  // Create an animated value
  const spinValue = useRef(new Animated.Value(0)).current;

  // Run the animation
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true, // Add this line
      }),
    ).start();
  }, [spinValue]);

  // Interpolate the animated value to create a spinning effect
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <View style={colorTheme === 'Dark' ? styles.containerDark : styles.containerLight}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{overflow: 'visible'}}>
        <Image
          source={colorTheme === 'Dark' ? require('../../assets/images/getting_startedDark.jpg') : require('../../assets/images/getting_startedLight.jpg')}
          style={styles.image}
        />
        <Image
          source={colorTheme === 'Dark' ? require('../../assets/images/getting_startedDark.jpg') : require('../../assets/images/getting_startedLight.jpg')}
          style={styles.image}
        />
      </ScrollView>
      <View style={styles.textContainer}>
        <Text style={colorTheme === 'Dark' ? styles.titleDark : styles.titleLight}>WELCOME TO MOODIFY APP</Text>
        <Text style={colorTheme === 'Dark' ? styles.subtitleDark : styles.subtitleLight}>All-in-one music sharing platform</Text>
        <Animated.Image
          source={colorTheme === 'Dark' ? require('../../assets/images/musicNoteDark.png') : require('../../assets/images/musicNoteLight.png')}
          style={[
            styles.gif,
            {
              // Apply a continuous shake animation
              transform: [{translateX: shakeAnimation}],
            },
          ]}
        />
      </View>

      <CustomButton
        title="GETTING STARTED"
        onPress={() => navigation.navigate('SignInScreen')}
        buttonStyle={colorTheme === 'Dark' ? styles.buttonDark : styles.buttonLight}
        buttonTextStyle={colorTheme === 'Dark' ? styles.buttonTextDark : styles.buttonTextLight}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  containerDark: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: `${process.env.REACT_APP_DARKTHEME}`,
  },
  containerLight: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: `${process.env.REACT_APP_LIGHTTHEME}`,
  },
  sliderContainer: {
    height: '50%', // Adjust as needed
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Or 'contain' based on your design
  },
  textContainer: {
    marginVertical: 30,
    // justifyContent: 'flex-end',
    flex: 1,
  },
  titleDark: {
    fontSize: 24,
    fontWeight: 'bold',
    color: `${process.env.REACT_APP_LIGHTTHEME}`,
    textAlign: 'center',
  },
  titleLight: {
    fontSize: 24,
    fontWeight: 'bold',
    color: `${process.env.REACT_APP_DARKTHEME}`,
    textAlign: 'center',
  },
  subtitleDark: {
    fontSize: 16,
    color: `${process.env.REACT_APP_LIGHTTHEME}`,
    textAlign: 'center',
  },
  subtitleLight: {
    fontSize: 16,
    color: `${process.env.REACT_APP_DARKTHEME}`,
    textAlign: 'center',
  },
  buttonDark: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: `${process.env.REACT_APP_DARKACCENT}`, // Green color
    borderRadius: 5,
    marginBottom: 100,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  buttonLight: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: `${process.env.REACT_APP_LIGHTACCENT}`, // Pink color
    borderRadius: 5,
    marginBottom: 100,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  buttonTextDark: {
    fontSize: 16,
    fontWeight: '500',
    color: `${process.env.REACT_APP_DARKTHEME}`,
    textAlign: 'center',
  },
  buttonTextLight: {
    fontSize: 16,
    fontWeight: '500',
    color: `${process.env.REACT_APP_LIGHTTHEME}`, 
    textAlign: 'center',
  },
  gif: {
    width: 100,
    height: 100,
    paddingLeft: 300,
  },
});

export default GettingStarted;
