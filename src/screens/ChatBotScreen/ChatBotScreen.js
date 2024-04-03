import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';
import {View, StyleSheet, Text, Button, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {WebView} from 'react-native-webview';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';

const ChatBotScreen = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const [spotifyUri, setSpotifyUri] = useState(null);
  const [chatbotReplied, setChatbotReplied] = useState(false);
  const [currentSong, setCurrentSong] = useState({});
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'How do you feel today',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://loremflickr.com/640/360',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    if (messages.length > 0) {
      const message = messages[0];
      setChatbotReplied(false);
      // Append user message first
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      );

      // Then fetch the bot's response
      fetch('http://10.0.2.2:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({message: message.text}),
      })
        .then(response => response.json())
        .then(data => {
          const reply = data.reply;
          const songUris = data.song_uris;
          const songTitles = data.song_titles;
          const albumCovers = data.image_urls;
          setChatbotReplied(true);
          if (
            songUris &&
            songUris.length > 0 &&
            songTitles &&
            songTitles.length > 0
          ) {
            // Set the current song state
            setCurrentSong({
              uri: songUris[0],
              title: songTitles[0].split(' by ')[0],
              artist: songTitles[0].split(' by ')[1],
              albumCover: albumCovers ? albumCovers[0] : null,
            });

            setSpotifyUri(songUris[0]);
          }
          // Now append the bot's reply
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, [
              {
                _id: Math.random().toString(36).substr(2, 9),
                text: reply,
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: 'AI Music ChatBot',
                  avatar: 'https://loremflickr.com/640/360',
                },
              },
            ]),
          );
        })
        .catch(error => {
          console.error('Error sending message: ', error);
        });
    }
  }, []);
  //////////////////////////////////// Firebase songs saved
  // Function to save song to Firebase
  const saveSongToDiary = (songTitle, songUri, artistName, albumCover) => {
    const songRef = firebase.database().ref('diary-songs');
    const newSongRef = songRef.push();
    newSongRef
      .set({
        uri: songUri,
        title: songTitle,
        artist: artistName,
        albumCover: albumCover,
        timestamp: Date.now(),
      })
      .then(() => {
        console.log('Current song details:', currentSong);
        console.log('Data saved successfully!');
      })
      .catch(error => {
        console.error('Failed to save data: ', error);
      });
  };

  // Add a button to render save song to diary
  const renderSaveButton = () => {
    if (!chatbotReplied) return null;

    return (
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() =>
          saveSongToDiary(
            currentSong.title,
            currentSong.uri,
            currentSong.artist,
            currentSong.albumCover,
          )
        }>
        <Text style={styles.saveButtonText}>+ Save To Your Diary</Text>
      </TouchableOpacity>
    );
  };
  ////////////////////////////////////
  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#CBFB5E',
          },
          left: {
            backgroundColor: '#333',
          },
        }}
        textStyle={{
          right: {
            color: 'black',
          },
          left: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const renderInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#222',
          borderTopColor: '#444',
          color: '#fff',
        }}
      />
    );
  };
  const renderSpotifyPlayer = () => {
    if (!spotifyUri) return null;

    const spotifyTrackId = spotifyUri.split(':').pop();
    const spotifyEmbedUrl = `https://open.spotify.com/embed/track/${spotifyTrackId}`;

    return (
      <WebView source={{uri: spotifyEmbedUrl}} style={styles.spotifyPlayer} />
    );
  };

  return (
    <View style={styles.viewchat}>
      <Text style={styles.title}>AI Music ChatBot</Text>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        textInputStyle={{color: '#fff'}}
      />
      {renderSaveButton()}
      {renderSpotifyPlayer()}
    </View>
  );
};

export default ChatBotScreen;

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    marginTop: 30,
  },
  viewchat: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
  },
  spotifyPlayer: {
    height: 80,
    width: '100%',
    alignSelf: 'center',
  },
  saveButtonContainer: {
    paddingHorizontal: 20, // Add padding if needed
    paddingBottom: 10,
  },
  saveButton: {
    backgroundColor: '#CBFB5E',
    borderRadius: 5,
    padding: 10,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
