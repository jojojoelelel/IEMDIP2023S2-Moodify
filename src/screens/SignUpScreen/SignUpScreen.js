import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomForm from '../../components/CustomForm';

import {AppContext} from '../../navigation/AppNavigation';

const SignUpScreen = ({navigation}) => {
  const {colorTheme, setColorTheme} = useContext(AppContext);
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
      source={colorTheme === 'Dark' ? require('../../assets/images/sign-up-bgDark.jpg') : require('../../assets/images/backgroundLight.jpg')} // Replace with your actual background image path
      style={styles.background}>
      <View style={styles.container}>
        <Text style={colorTheme === 'Dark' ? styles.titleDark : styles.titleLight}>SIGN UP</Text>
        <CustomForm fields={formFields} />
        <CustomButton
          title="SIGN UP"
          onPress={() => navigation.navigate('SignInScreen')}
          buttonStyle={colorTheme === 'Dark' ? styles.buttonDark : styles.buttonLight}
          buttonTextStyle={colorTheme === 'Dark' ? styles.signUpTextDark : styles.signUpTextLight}
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
  titleDark: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'left',
  },
  titleLight: {
    fontSize: 32,
    fontWeight: 'bold',
    color: `${process.env.REACT_APP_LIGHTACCENT}`,
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
  buttonDark: {
    marginTop: 30,
    marginBottom: 30,
    width: '100%',
    backgroundColor: `${process.env.REACT_APP_DARKACCENT}`,
    // Add other styles for button
  },
  buttonLight: {
    marginTop: 30,
    marginBottom: 30,
    width: '100%',
    backgroundColor: `${process.env.REACT_APP_LIGHTACCENT}`,
    // Add other styles for button
  },
  connectText: {
    // Styles for the connect text
  },
  signUpTextDark: {
    color: `${process.env.REACT_APP_DARKTHEME}`,
    textAlign: 'center',
    // Add other styles for sign up txt
  },
  signUpTextLight: {
    color: `${process.env.REACT_APP_LIGHTTHEME}`,
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
