import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DiscoverScreen = ({navigation}) => {
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
        onPress={() => navigation.navigate('ChatBotScreen')}
        activeOpacity={0.7}>
        <Text style={styles.buttonText}>VR Concert</Text>
      </TouchableOpacity>
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
    backgroundColor: '#e0e0e0', // A subtle grey for buttons
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
    color: '#333',
    fontSize: 18,
    fontWeight: '500',
  },
});
