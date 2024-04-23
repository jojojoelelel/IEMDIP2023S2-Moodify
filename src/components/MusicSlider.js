import Slider from '@react-native-community/slider';
import {useContext} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {MusicPlayerContext} from '../contexts/SongContext';

const {width} = Dimensions.get('window'); // Get the width of the device
import { AppContext } from '../navigation/AppNavigation';

const MusicSlider = () => {
  const { colorTheme, setColorTheme } = useContext(AppContext);
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
         
        }}
        onValueChange={handleValueChange}
        onSlidingComplete={() => {
          
        }}
        minimumTrackTintColor={colorTheme === 'Dark' ? "#1DB954" : '#42ffea'} 
        maximumTrackTintColor="#404040" 
        thumbTintColor={colorTheme === 'Dark' ? "#1DB954" : '#42ffea'} 
      />
      <Text style={colorTheme === 'Dark' ? styles.progressTextDark : styles.progressTextLight}>
        {formatTime(trackProgress)} / {formatTime(trackDuration)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
  },
  slider: {
    flex: 1, 
  },
  progressTextDark: {
    color: 'white',
    paddingLeft: 10, 
    minWidth: 60,
  },
  progressTextLight: {
    color: 'black',
    paddingLeft: 10,
    minWidth: 60, 
  },
});

export default MusicSlider;
