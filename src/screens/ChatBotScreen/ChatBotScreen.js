import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';
import {View, StyleSheet, Text} from 'react-native';
//For reference
//Third-party code available at: https://github.com/FaridSafi/react-native-gifted-chat/blob/master/README.md
const ChatBotScreen = ({navigation}) => {
  const [messages, setMessages] = useState([]);

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
    </View>
  );
};

export default ChatBotScreen;

const styles = StyleSheet.create({
  title: {
    color: 'white', // changed to white for visibility on dark background
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    marginTop: 30,
  },
  viewchat: {
    flex: 1,
    backgroundColor: '#000', // changed to black for dark theme
  },
});
