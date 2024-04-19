import React, {useContext} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import {AppContext} from '../navigation/AppNavigation';

const CustomForm = ({fields}) => {
  const {colorTheme, setColorTheme} = useContext(AppContext);
  return (
    <View style={styles.formContainer}>
      {fields.map((field, index) => (
        <TextInput
          key={index}
          placeholder={field.placeholder}
          placeholderTextColor={colorTheme === 'Dark' ? '#9f9f9f' : `${process.env.REACT_APP_LIGHTACCENT}`}
          style={colorTheme === 'Dark' ? [styles.inputDark, field.style] : [styles.inputLight, field.style]}
          keyboardType={field.keyboardType || 'default'}
          secureTextEntry={field.secureTextEntry || false}
          onChangeText={field.onChangeText}
          value={field.value}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    // You might want to add more styling here depending on your design
  },
  inputDark: {
    width: '100%',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#9f9f9f',
    padding: 10,
    color: `${process.env.REACT_APP_LIGHTTHEME}`,
    // Add any additional input styles you need
  },
  inputLight: {
    width: '100%',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: `${process.env.REACT_APP_LIGHTACCENT}`,
    padding: 10,
    color: `${process.env.REACT_APP_LIGHTACCENT}`, 
    // backgroundColor: '#42ffea', //teal
    borderRadius: 5,
    // Add any additional input styles you need
  },
});

export default CustomForm;
