import * as React from 'react';
import 'react-native-gesture-handler';

import AppNavigator from './navigation/AppNavigation';
import MainContainer from './navigation/MainContainer';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';

function App():React.JSX.Element {
     const isDarkMode = useColorScheme() === 'dark';
     return (
      <SafeAreaView style={{ flex: 1 }}>
         <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
           <AppNavigator/>
      </SafeAreaView>
    );
}

export default App;
