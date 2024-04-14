import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomForm from '../../components/CustomForm';

import {AppContext} from '../../navigation/AppNavigation';

const ForgotPasswordScreen = ({navigation}) => {
  const {colorTheme, setColorTheme} = useContext(AppContext);
  const [email, setEmail] = useState('');

  const fields = [
    {
      placeholder: 'E-Mail',
      placeholderTextColor: '#9f9f9f',
      keyboardType: 'email-address',
      secureTextEntry: false,
      value: email,
      onChangeText: setEmail,
      inputStyle: {
        // styles specific to this TextInput
      },
    },
    // Add more objects to this array to render more TextInputs
  ];

  const handleSendLink = () => {
    // Here you would handle the password reset logic
  };

  return (
    <View style={colorTheme === 'Dark' ? styles.containerDark : styles.containerLight}>
      <View style={styles.forgotTitle}>
        <Text style={colorTheme === 'Dark' ? styles.titleDark : styles.titleLight}>Forgot Password?</Text>
        <Text style={colorTheme === 'Dark' ? styles.descriptionDark : styles.descriptionLight}>
          If you need help resetting your password, we can help by sending you a
          link to reset it.
        </Text>
      </View>
      <CustomForm fields={fields} />
      <CustomButton
        title="SEND"
        onPress={() => {
          handleSendLink;
        }}
        buttonStyle={colorTheme === 'Dark' ? styles.sendButtonDark : styles.sendButtonLight}
        buttonTextStyle={colorTheme === 'Dark' ? styles.sendButtonTextDark : styles.sendButtonTextLight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerDark: {
    flex: 1,
    backgroundColor: `${process.env.REACT_APP_DARKTHEME}`, // The background color of the screen
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: `${process.env.REACT_APP_LIGHTTHEME}`, // The background color of the screen
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    // paddingBottom: 500,
    color: `${process.env.REACT_APP_LIGHTTHEME}`,
    fontSize: 18,
  },
  forgotTitle: {
    marginBottom: 100,
  },
  titleDark: {
    color: `${process.env.REACT_APP_LIGHTTHEME}`,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  titleLight: {
    color: `${process.env.REACT_APP_DARKTHEME}`,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  descriptionDark: {
    color: `${process.env.REACT_APP_LIGHTTHEME}`,
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'left',
  },
  descriptionLight: {
    color: `${process.env.REACT_APP_DARKTHEME}`,
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'left',
  },
  inputDark: {
    width: '100%',
    color: `${process.env.REACT_APP_LIGHTTHEME}`,
    borderBottomColor: '#9f9f9f',
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 40,
  },
  inputLight: {
    width: '100%',
    color: `${process.env.REACT_APP_DARKTHEME}`,
    borderBottomColor: '#9f9f9f',
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 40,
  },
  sendButtonDark: {
    marginTop: 30,
    marginBottom: 30,
    width: '100%',
    backgroundColor: `${process.env.REACT_APP_DARKACCENT}`,
  },
  sendButtonLight: {
    marginTop: 30,
    marginBottom: 30,
    width: '100%',
    backgroundColor: `${process.env.REACT_APP_LIGHTACCENT}`,
  },
  sendButtonTextDark: {
    color: `${process.env.REACT_APP_DARKTHEME}`,
    // fontSize: 18,
    fontWeight: 'bold',
  },
  sendButtonTextLight: {
    color: `${process.env.REACT_APP_LIGHTTHEME}`,
    // fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
