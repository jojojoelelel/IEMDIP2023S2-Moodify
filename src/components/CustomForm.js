import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const CustomForm = ({fields}) => {
  return (
    <View style={styles.formContainer}>
      {fields.map((field, index) => (
        <TextInput
          key={index}
          placeholder={field.placeholder}
          placeholderTextColor={field.placeholderTextColor || '#9f9f9f'}
          style={[styles.input, field.style]}
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
  input: {
    width: '100%',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#9f9f9f',
    padding: 10,
    // Add any additional input styles you need
  },
});

export default CustomForm;
