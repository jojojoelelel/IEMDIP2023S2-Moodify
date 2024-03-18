import React, {useState, useEffect} from 'react';
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

// Import useSpotify hook
import {useSpotify} from '../../SpotifyAuthContext'; // Adjust the import path according to your project structure

/* const SignInScreen = ({navigation}) => {
  const {requestUserAuthorization, requestAccessToken} = useSpotify(); // Use the hook
  const [return_Params, setReturnParams] = useState();

  const redirect_uri = 'http://localhost:8081/callback'; // Make sure this matches the redirect URI in your SpotifyAuthContext

  useEffect(() => {
    const handleRedirect = event => {
      const {url} = event;
      if (url.startsWith(redirect_uri)) {
        const code = new URLSearchParams(url.split('?')[1]).get('code');
        if (code) {
          setReturnParams(code);
        }
      }
    };

    Linking.addEventListener('url', handleRedirect);
    return () => {
      Linking.removeEventListener('url', handleRedirect);
    };
  }, []);

  useEffect(() => {
    if (return_Params) {
      requestAccessToken(return_Params); // Call requestAccessToken with the code
    }
  }, [return_Params, requestAccessToken]);

  // The rest of your SignInScreen code remains unchanged
  const requestAccessToken2 = async () => {
    try {
      const response = await SpotifyAPI.requestAccessToken(return_Params);
      setaccess_token(response.access_token);
      setrefresh_Token(response.refresh_token);
    } catch (error) {
      console.error('Error in requestAccessToken => ', error);
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
      console.error('Error in requestRefreshAccessToken => ', error);
    }
  };

  useEffect(() => {
    const refreshInterval = setInterval(
      requestRefreshAccessToken2,
      3600 * 1000,
    );

    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/images/sign-in-bg.jpg')} // Replace with your actual background image path
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>SIGN IN</Text>
        <CustomForm fields={formFields} />
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
        </TouchableOpacity>
        <CustomButton
          title="SIGN IN"
          onPress={() => {
            navigation.navigate('Main'); //Main is bottom navigator
            loginToSpotify(); //
          }}
          style={styles.button}
        />
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
}); */

const SignInScreen = ({navigation}) => {
  // State for form fields
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [return_Params, setreturn_Params] = useState();
  const [access_token, setaccess_token] = useState();
  const [userData, setuserData] = useState();
  const [playerInfo, setplayerInfo] = useState();
  const [previewUrl, setpreviewUrl] = useState();
  const [refresh_token, setrefresh_Token] = useState();

  const redirect_uri = 'http://localhost:8081/callback';

  const handleRedirect = event => {
    // Extract the URL from the event
    const url = event.url;

    // Check if the URL starts with the custom URI scheme
    if (url.startsWith(redirect_uri)) {
      // Extract the query parameters from the URL
      const params = url.split('?code=')[1];
      // Do something with the query parameters (e.g., parse them and handle the response)
      console.log('Response query parameters:', params);
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
      Linking.openURL(url);
    } catch (error) {
      console.error('Error in requestAccessToken => ', error);
    }
  };

  const requestAccessToken2 = async () => {
    try {
      const response = await SpotifyAPI.requestAccessToken(return_Params);
      setaccess_token(response.access_token);
      setrefresh_Token(response.refresh_token);
    } catch (error) {
      console.error('Error in requestAccessToken => ', error);
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
      console.error('Error in requestRefreshAccessToken => ', error);
    }
  };

  useEffect(() => {
    const refreshInterval = setInterval(
      requestRefreshAccessToken2,
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
      source={require('../../assets/images/sign-in-bg.jpg')} // Replace with your actual background image path
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>SIGN IN</Text>
        <CustomForm fields={formFields} />
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
        </TouchableOpacity>
        <CustomButton
          title="SIGN IN"
          onPress={() => {
            navigation.navigate('Main'); //Main is bottom navigator
            loginToSpotify(); //
          }}
          style={styles.button}
        />
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

export default SignInScreen;
