// CustomButton.js in the 'common' folder
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const CustomButton = ({onPress, title, buttonStyle, buttonTextStyle}) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.buttonText, buttonTextStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    // backgroundColor: '#CBFB5E',  
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    // color: '#fff',
    fontSize: 16,
  },
});

export default CustomButton;
