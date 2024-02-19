import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CustomButton from '../../components/CustomButton';

const DiscoverScreen = ({navigation}) => {
  return (
    <View>
      <Text style={styles.title}>Hello, discover screen here</Text>
      <CustomButton
        title="Let's Chat"
        onPress={() => navigation.navigate('ChatBotScreen')}
        style={styles.button}
      />
      <CustomButton
        title="VR Concert"
        onPress={() => navigation.navigate('ChatBotScreen')}
        style={styles.button}
      />
    </View>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 50,
  },
  button: {
    marginTop: 30,
    marginBottom: 30,
    width: '100%',
    height: 200,
    justifyContent: 'center',
    fontSize: 140,
  },
  button2: {
    // You can add styles for button2 if needed
  },
});
