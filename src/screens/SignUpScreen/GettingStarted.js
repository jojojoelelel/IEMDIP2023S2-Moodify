import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CustomButton from '../../components/CustomButton';

const GettingStarted = ({navigation}) => {
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#CBFB5E', // Spotify green color
    borderRadius: 5,
    marginBottom: 100,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff', // Adjust as needed
    textAlign: 'center',
  },
});

export default GettingStarted;
