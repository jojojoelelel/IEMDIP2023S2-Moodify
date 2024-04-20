import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomForm from '../../components/CustomForm';

import * as SpotifyAPI from '../../services/Spotify-web-api';

import {AppContext} from '../../navigation/AppNavigation';

const SignInScreen = ({navigation}) => {
  // State for form fields

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [return_Params, setreturn_Params] = useState();
  // const [access_token, setaccess_token] = useState();
  const [userData, setuserData] = useState();
  const [playerInfo, setplayerInfo] = useState();
  const [previewUrl, setpreviewUrl] = useState();
  const [refresh_token, setrefresh_Token] = useState();

  const {access_token, setaccess_token, colorTheme, setColorTheme} = useContext(AppContext);

  const redirect_uri = 'http://localhost:8081/callback';

  const handleRedirect = event => {
    // Extract the URL from the event
    const url = event.url;

    // Check if the URL starts with the custom URI scheme
    if (url.startsWith(redirect_uri)) {
      // Extract the query parameters from the URL
      const params = url.split('?code=')[1];
      // Do something with the query parameters (e.g., parse them and handle the response)
      // console.log('Response query parameters:', params);
      // console.log('api call getreturnparams')
      setreturn_Params(params);
    }
  };

  // Add a listener to handle deep links
  Linking.addEventListener('url', handleRedirect);

  const loginToSpotify = async () => {
    // // request user authorization
    // // const state = generateRandomString(16);
    try {
      const url = await SpotifyAPI.requestUserAuthorization();
      // console.log('api call requestuserauthorization')
      Linking.openURL(url);
    } catch (error) {
      // console.error('Error in requestAccessToken => ', error);
    }
  };
  const requestAccessToken2 = async () => {
    try {
      const response = await SpotifyAPI.requestAccessToken(return_Params);
      // console.log('api call requestaccesstoken')
      setaccess_token(response.access_token);
      setrefresh_Token(response.refresh_token);
    } catch (error) {
      // console.error('Error in requestAccessToken => ', error);
    }
  };

  const requestRefreshAccessToken2 = async () => {
    try {
      const response = await SpotifyAPI.requestRefreshAccessToken(
        refresh_token,
      );
      setaccess_token(response.access_token);
      setrefresh_Token(response.refresh_token);
    } catch (error) {
      // console.error('Error in requestRefreshAccessToken => ', error);
    }
  };

  useEffect(() => {
    const refreshInterval = setInterval(
      requestRefreshAccessToken2(),
      3600 * 1000,
    );

    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    if (return_Params) {
      requestAccessToken2();
    }
  }, [return_Params]);

  // Define form fields
  const formFields = [
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
      source={colorTheme === 'Dark' ? require('../../assets/images/sign-in-bgDark.jpg') : require('../../assets/images/backgroundLight.jpg')} // Replace with your actual background image path
      style={styles.background}>
      <View style={styles.container}>
        <Text style={colorTheme === 'Dark' ? styles.titleDark : styles.titleLight}>SIGN IN</Text>
        <CustomForm fields={formFields} />
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={colorTheme === 'Dark' ? styles.forgotPasswordTextDark : styles.forgotPasswordTextLight}>Forgot Password ?</Text>
        </TouchableOpacity>
        <CustomButton
          title="SIGN IN WITH SPOTIFY"
          onPress={() => {
            navigation.navigate('Main');
            loginToSpotify();
          }}
          buttonStyle={colorTheme === 'Dark' ? styles.buttonDark : styles.buttonLight}
          buttonTextStyle={colorTheme === 'Dark' ? styles.signInButtonTextDark : styles.signInButtonTextLight}
        />
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={colorTheme === 'Dark' ? styles.signUpTextDark : styles.signUpTextLight}>
            Don't have an account?{' '}
            <Text style={colorTheme === 'Dark' ? styles.signUpButtonTextDark : styles.signUpButtonTextLight}>Sign Up</Text>
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
  forgotPasswordTextDark: {
    marginTop: 30,
    textAlign: 'right',
    color: '#fff',
    // Add other styles for forgot password text
  },
  forgotPasswordTextLight: {
    marginTop: 30,
    textAlign: 'right',
    color: '#54b5cc',
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
    color: '#fff',
    textAlign: 'center',
    // Add other styles for sign up txt
  },
  signUpTextLight: {
    color: `${process.env.REACT_APP_LIGHTACCENT}`,
    textAlign: 'center',
    // Add other styles for sign up txt
  },
  signUpButtonTextDark: {
    color: `${process.env.REACT_APP_DARKACCENT}`,
    textAlign: 'center',
    // Add other styles for sign up txt
  },
  signUpButtonTextLight: {
    color: '#54b5cc',
    textAlign: 'center',
    // Add other styles for sign up txt
  },
  signInButtonTextDark: {
    color: `${process.env.REACT_APP_DARKTHEME}`,
    fontWeight: 'bold',
    // Add other styles for sign up button text
  },
  signInButtonTextLight: {
    color: `${process.env.REACT_APP_LIGHTTHEME}`,
    fontWeight: 'bold',
    // Add other styles for sign up button text
  },
});

export default SignInScreen;
