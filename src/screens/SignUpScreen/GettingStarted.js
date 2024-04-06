import React, {useEffect, useRef} from 'react';
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

const GettingStarted = ({navigation}) => {
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
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{overflow: 'visible'}}>
        <Image
          source={require('../../assets/images/getting_started.jpg')}
          style={styles.image}
        />
        <Image
          source={require('../../assets/images/getting_started.jpg')}
          style={styles.image}
        />
      </ScrollView>
      <View style={styles.textContainer}>
        <Text style={styles.title}>WELCOME TO MOODIFY APP</Text>
        <Text style={styles.subtitle}>All-in-one music sharing platform</Text>
        <Animated.Image
          source={require('../../assets/images/musicNote.png')}
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
        style={styles.button}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000', //change when needed
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff', // Adjust as needed
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: '#CBFB5E', // Spotify green color
    borderRadius: 5,
    marginBottom: 100,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff', // Adjust as needed
    textAlign: 'center',
  },
  gif: {
    width: 100,
    height: 100,
    paddingLeft: 300,
  },
});

export default GettingStarted;
