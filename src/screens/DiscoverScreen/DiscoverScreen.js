import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
import CustomButton from '../../components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MusicPlayerBar from '../../components/MusicPlayerBar';

const DiscoverScreen = ({navigation}) => {
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
    <View style={styles.container}>
      <Text style={styles.title}>Discover New Experiences</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ChatBotScreen')}
        activeOpacity={0.7}>
        <Text style={styles.buttonText}>Let's Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('VrConcertScreen')}
        activeOpacity={0.7}>
        <Text style={styles.buttonText}>VR Concert</Text>
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
    </View>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000', // A light grey background color for contrast
  },
  title: {
    color: 'white', // A darker shade for better readability
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 20,
    textAlign: 'center', // Center the title
  },
  button: {
    backgroundColor: '#CBFB5E',
    borderRadius: 10, // Rounded corners
    paddingVertical: 15,
    marginVertical: 10, // Space between buttons
    alignItems: 'center', // Center button text horizontally
    shadowColor: '#000', // Simple shadow for depth
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
});
