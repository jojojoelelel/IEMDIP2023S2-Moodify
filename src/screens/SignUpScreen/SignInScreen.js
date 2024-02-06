import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

const SignInScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../../assets/images/sign-in-bg.jpg')} // Replace with your actual background image path
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>SIGN IN</Text>
        <TextInput
          placeholder="E-Mail"
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
        <Text style={styles.connectText}>Or connect with</Text>
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            {/* Social Icon for Facebook */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            {/* Social Icon for Google+ */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            {/* Social Icon for Twitter */}
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.signUpText}>
            Don't have an account?{' '}
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginVertical: 10,
    // Add other styles for input
  },
  forgotPasswordText: {
    color: '#fff',
    // Add other styles for forgot password text
  },
  button: {
    width: '100%',
    // Add other styles for button
  },
  buttonText: {
    // Add styles for button text
  },
  connectText: {
    // Styles for the connect text
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  socialButton: {
    // Styles for social buttons
  },
  signUpText: {
    color: '#fff',
    // Add other styles for sign up text
  },
  signUpButtonText: {
    fontWeight: 'bold',
    // Add other styles for sign up button text
  },
  // Add any additional styles you need
});

export default SignInScreen;
