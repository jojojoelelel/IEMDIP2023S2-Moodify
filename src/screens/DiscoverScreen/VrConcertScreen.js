import React from 'react';
import {WebView} from 'react-native-webview';
import {StyleSheet, View} from 'react-native';

const VrConcertScreen = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: 'http://10.0.2.2:5500/IM3180/src/screens/DiscoverScreen/vrconcert.html',
        }}
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
