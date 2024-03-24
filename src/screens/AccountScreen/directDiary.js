import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { useNavigation } from '@react-navigation/native';

export default function DiaryScreen() {
  const navigation = useNavigation();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const calendarRef = useRef(null); // Create a ref for the CalendarPicker component

  const onDateChange = (date) => {
    setSelectedStartDate(date);
    if (date) {
      const formattedDate = date.toISOString().split('T')[0];
      navigation.navigate('DiaryDetailScreen', { selectedDate: formattedDate });
    }
  };

  const renderCustomHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => calendarRef.current.handleOnPressPrevious()}>
          <Image source={require("../../assets/icon/prevBtn.png")} style={styles.imageIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => calendarRef.current.handleOnPressNext()}>
          <Image source={require("../../assets/icon/nextBtn.png")} style={styles.imageIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <CalendarPicker 
          onDateChange={onDateChange} 
          containerStyle={styles.calendarContainer}
          textStyle={{fontSize:20,fontWeight:'bold'}}
          renderHeader={renderCustomHeader}
          ref={calendarRef} // Set the ref for the CalendarPicker component
        />

        <View>
          <Text>SELECTED DATE: {selectedStartDate ? selectedStartDate.toString() : ''}</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    flex: 1,
    marginTop: 100,
    padding: 20,
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  calendarContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageIcon: {
    width: 30,
    height: 30,
  },
});
