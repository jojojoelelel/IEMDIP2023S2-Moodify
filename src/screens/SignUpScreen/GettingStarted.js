import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const GettingStarted = ({navigation}) => {
    return(
        <View style = {styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}>
                {/* add images */}
                <Image source={require('../../assets/images/getting_started.jpg')} style = {styles.image} />
                <Image source={require('../../assets/images/getting_started.jpg')} style = {styles.image} />
            </ScrollView>
            <View style = {styles.textContainer}>
                <Text style={styles.title}>WELCOME TO MOODIFY APP</Text>
                <Text style={styles.subtitle}>All-in-one music sharing platform</Text>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('#GetStartedNext')} // Replace 'NextScreenName' with the name of your next screen
                style={styles.button}>
                <Text style={styles.buttonText}>GET STARTED</Text>
            </TouchableOpacity>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#000',  //change when needed

    },
    sliderContainer: {
      height: '50%', // Adjust as needed
    },
    image: {
      width: '100%', // Adjust as needed
      height: '100%',
      resizeMode: 'cover', // Or 'contain' based on your design
    },
    textContainer: {
      marginVertical: 10, 
      justifyContent:'flex-end',
      flex: 1,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: '#fff', // Adjust as needed
      textAlign: 'center',
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#1DB954', // Spotify green color
      borderRadius: 20,
      marginBottom: 20,
    },
    buttonText: {
      fontSize: 16,
      color: '#fff', // Adjust as needed
      textAlign: 'center',
    },
  });

  export default GettingStarted;
