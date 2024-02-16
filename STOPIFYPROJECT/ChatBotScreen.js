import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
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
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <View style={styles.viewchat}>
      <Text style={styles.title}>AI Music ChatBot</Text>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};

export default ChatBotScreen;

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    marginTop: 30,
  },
  viewchat: {
    flex: 1,
    backgroundColor: 'white',
  },
});