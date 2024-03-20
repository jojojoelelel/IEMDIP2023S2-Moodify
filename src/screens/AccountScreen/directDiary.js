import React, { Component } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import CalendarPicker from "react-native-calendar-picker";

export default class DiaryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : "";
    return (
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <CalendarPicker 
            onDateChange={this.onDateChange} 
            containerStyle={styles.calendarContainer}
            textStyle={{fontSize:20,fontWeight:'bold'}}
          />

          <View>
            <Text>SELECTED DATE:{startDate}</Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    flex: 1,
    marginTop: 100,
    padding: 20,
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
  },
});
