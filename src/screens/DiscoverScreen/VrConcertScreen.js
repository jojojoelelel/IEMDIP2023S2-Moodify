import React from 'react';
import {WebView} from 'react-native-webview';
import {StyleSheet, View} from 'react-native';

const VrConcertScreen = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: 'http://10.0.2.2:5501/src/screens/DiscoverScreen/concert-back-up/index.html',
        }}
        javaScriptEnabled={true}
        mixedContentMode="compatibility" // If you have mixed content (HTTP and HTTPS)
        style={styles.webView}
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        onLoadEnd={() => console.log('WebView loaded')}
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
