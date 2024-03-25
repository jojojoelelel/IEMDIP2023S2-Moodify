import Sound from 'react-native-sound';

// A function to play a song
const playSong = (previewUrl) => {
  // If there's an existing song, stop it
  if (global.currentSong) {
    global.currentSong.stop(() => {
      global.currentSong.release();
      global.currentSong = null;
    });
  }

  // Create a new sound object
  const song = new Sound(previewUrl, null, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
    // Play the sound if the song has loaded correctly
    song.play((success) => {
      if (success) {
        console.log('Successfully finished playing');
      } else {
        console.log('Playback failed due to audio decoding errors');
      }
      // Release the audio player resource
      song.release();
    });
  });

  // Set the current song to this one
  global.currentSong = song;
};

export default playSong;