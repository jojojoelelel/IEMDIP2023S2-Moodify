import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '/Users/sneha.m7/Moodify/components/CustomButton.js';
import CustomForm from '/Users/sneha.m7/Moodify/components/CustomForm.js';

const ForgotPasswordScreen = ({navigation}) => {
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
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Text style={styles.backButtonText}>{`<`}</Text>
      </TouchableOpacity>
      <View style={styles.forgotTitle}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.description}>
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
        style={styles.sendButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // The background color of the screen
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
    color: '#fff',
    fontSize: 18,
  },
  forgotTitle: {
    marginBottom: 100,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  description: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'left',
  },
  input: {
    width: '100%',
    color: '#fff',
    borderBottomColor: '#9f9f9f',
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 40,
  },
  sendButton: {
    marginTop: 30,
    marginBottom: 30,
    width: '100%',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
