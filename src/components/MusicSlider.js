import Slider from '@react-native-community/slider';
import {useContext} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {MusicPlayerContext} from '../contexts/SongContext';

const {width} = Dimensions.get('window'); // Get the width of the device

const MusicSlider = () => {
  const {trackProgress, setTrackProgress, trackDuration, seekTo} =
    useContext(MusicPlayerContext);

  const handleValueChange = async value => {
    seekTo(value);
  };

  //Format time to 'mm:ss'
  const formatTime = secs => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.floor(secs % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  };

  return (
    <View style={styles.sliderContainer}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={trackDuration}
        value={trackProgress}
        onSlidingStart={() => {
          /* Pause the music if you want while scrubbing */
        }}
        onValueChange={handleValueChange}
        onSlidingComplete={() => {
          /* Optionally resume the music after scrubbing */
        }}
        minimumTrackTintColor="#1DB954" // Spotify green color for the completed part
        maximumTrackTintColor="#404040" // A darker color for the remaining part
        thumbTintColor="#1DB954" // Color for the draggable thumb
      />
      <Text style={styles.progressText}>
        {formatTime(trackProgress)} / {formatTime(trackDuration)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flexDirection: 'row', // Align slider and text horizontally
    alignItems: 'center', // Center them vertically
    justifyContent: 'space-between', // Put space between the slider and text
    paddingHorizontal: 16, // Add some padding on the sides
  },
  slider: {
    flex: 1, // Allow the slider to fill the space
  },
  progressText: {
    color: 'white',
    paddingLeft: 10, // Add some space between the slider and the text
    minWidth: 60, // Ensure the text doesn't jump around when changing
  },
  // Add other styles if needed
});

export default MusicSlider;
