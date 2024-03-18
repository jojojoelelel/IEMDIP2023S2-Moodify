import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import CustomButton from '/Users/sneha.m7/Moodify/components/CustomButton.js';
import CustomForm from '/Users/sneha.m7/Moodify/components/CustomForm.js';

const SignUpScreen = ({navigation}) => {
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Define form fields
  const formFields = [
    {
      placeholder: 'Name',
      value: name,
      onChangeText: setName,
      keyboardType: 'default',
    },
    {
      placeholder: 'E-Mail',
      value: email,
      onChangeText: setEmail,
      keyboardType: 'email-address',
    },
    {
      placeholder: 'Password',
      value: password,
      onChangeText: setPassword,
      secureTextEntry: true,
    },
  ];
  return (
    <ImageBackground
      source={require('/Users/sneha.m7/Moodify/assets/images/sign-up-bg.jpg')} // Replace with your actual background image path
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>SIGN UP</Text>
        <CustomForm fields={formFields} />
        <CustomButton
          title="SIGN UP"
          onPress={() => navigation.navigate('SignInScreen')}
          style={styles.button}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    // alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'left',
  },
  input: {
    width: '100%',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#9f9f9f',
    // Add other styles for input
  },
  forgotPasswordText: {
    marginTop: 30,
    textAlign: 'right',
    color: '#fff',
    // Add other styles for forgot password text
  },
  button: {
    marginTop: 30,
    marginBottom: 30,
    width: '100%',
    // Add other styles for button
  },
  connectText: {
    // Styles for the connect text
  },
  signUpText: {
    color: '#fff',
    textAlign: 'center',
    // Add other styles for sign up txt
  },
  signUpButtonText: {
    color: '#CBFB5E',
    fontWeight: 'bold',
    // Add other styles for sign up button text
  },
});

export default SignUpScreen;
