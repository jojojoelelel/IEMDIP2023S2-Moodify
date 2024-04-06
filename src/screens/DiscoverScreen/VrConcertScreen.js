import React from 'react';
import {WebView} from 'react-native-webview';
import {StyleSheet, View} from 'react-native';

const VrConcertScreen = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: 'http://10.0.2.2:5501/src/screens/DiscoverScreen/a-saturday-night/index.html',
        }}
        javaScriptEnabled={true} //default is true
        style={styles.webView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});

export default VrConcertScreen;