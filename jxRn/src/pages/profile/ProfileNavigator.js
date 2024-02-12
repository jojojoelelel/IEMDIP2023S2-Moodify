import { createStackNavigator } from '@react-navigation/stack';
import PLScreen from './directPlaylist';
import ABScreen from './directAlbum';

const ProfileNavigator = createStackNavigator({
    playlistScreen: PLScreen,
    albumScreen: ABScreen
});

export default createAppContainer(ProfileNavigator);