import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {useNavigation} from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import Gif from 'react-native-gif';

import {AppContext} from '../../navigation/AppNavigation';

export default function DiaryScreen() {
  const {colorTheme, setColorTheme} = useContext(AppContext);
  const navigation = useNavigation();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [noSongFound, setNoSongFound] = useState(false);

  const onDateChange = async date => {
    setSelectedStartDate(date);
    setNoSongFound(false); // Reset noSongFound state on date change
    if (date) {
      const timestamp = date.valueOf();
      const formattedDate = new Date(timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      try {
        const songRef = firebase.database().ref('diary-songs');
        const snapshot = await songRef
          .orderByChild('timestamp')
          .equalTo(formattedDate)
          .once('value');
        const songData = snapshot.val();
        if (songData) {
          const songKey = Object.keys(songData)[0];
          const {title: songName, artist, uri: songUri} = songData[songKey];
          navigation.navigate('RecomScreen', {songName, artist, songUri});
        } else {
          // Set noSongFound state to true when no song is found
          setNoSongFound(true);
        }
      } catch (error) {
        console.error('Error fetching song data:', error);
      }
    }
  };

  return (
    <ImageBackground
      source={colorTheme === 'Dark' ? require("../../assets/images/background.png") : require('../../assets/images/backgroundLight.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <CalendarPicker
          onDateChange={onDateChange}
          containerStyle={styles.calendarContainer}
          textStyle={{fontSize:20,fontWeight:'bold'}}
          selectedDayColor={colorTheme === 'Dark' ? `${process.env.REACT_APP_DARKACCENT}` : `${process.env.REACT_APP_LIGHTACCENT}`}
        />

        <View style={styles.textContainer}>
          <Text style={styles.selectedDate}>
            SELECTED DATE:{' '}
            {selectedStartDate ? selectedStartDate.toString() : ''}
          </Text>
          {noSongFound && (
            <View>
              <Text style={colorTheme === 'Dark' ? styles.noSongFoundDark : styles.noSongFoundLight}>No song found for selected date</Text>
              <Gif source={require('../../assets/images/diaryImage.gif')} style={styles.image} />
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    flex: 1,
    marginTop: 100,
    padding: 20,
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  calendarContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
  selectedDate: {
    fontSize: 16,
    marginBottom: 10,
  },
  noSongFoundDark: {
    fontSize: 24, // Adjust the font size as needed
    color: '#A4EC0A',
    textAlign: 'center',
  },
  noSongFoundLight: {
    fontSize: 24, // Adjust the font size as needed
    color: `${process.env.REACT_APP_LIGHTACCENT}`,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 5,
    left: '23%',
  },
});
