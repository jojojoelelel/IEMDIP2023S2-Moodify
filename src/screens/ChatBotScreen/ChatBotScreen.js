import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const ChatBot = () => {
  const [data, setData] = useState([]);
  const apiKey = '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';
  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  const [textInput, setTextInput] = useState('');

  //   const handleSend = async () => {
  //     const prompt = textInput;
  //     const reponse = await axios.post(
  //       apiUrl,
  //       {
  //         prompt: prompt,
  //         max_tokens: 1024,
  //         temperature: 0.5,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${apiKey}`,
  //         },
  //       },
  //     );
  //     const text = reponse.data.choices[0].text;
  //     setData([
  //       ...data,
  //       {type: 'user', text: textInput},
  //       {type: 'bot', text: text},
  //     ]);
  //     setTextInput('');
  //   };
  const handleSend = async () => {
    try {
      const prompt = textInput;
      const response = await axios.post(
        apiUrl,
        {
          prompt: prompt,
          max_tokens: 1024,
          temperature: 0.5,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        },
      );
      const text = response.data.choices[0].text;
      setData([
        ...data,
        {type: 'user', text: textInput},
        {type: 'bot', text: text},
      ]);
      setTextInput('');
    } catch (error) {
      console.error(error);
      // Handle the error appropriately in your UI
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Music ChatBot</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        style={styles.body}
        renderItem={({item}) => (
          <View styles={styles.viewchat}>
            <Text
              style={{
                fontWeight: 'bold',
                color: item.type === 'user' ? 'green' : 'red',
              }}>
              {item.type === 'user' ? 'Ninza ' : 'Bot '}
            </Text>
            <Text style={styles.bot}>{item.text}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        value={textInput}
        onChangeText={text => setTextInput(text)}
        placeholder="How do you feel today"
      />
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Let's go</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatBot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 70,
  },
  viewchat: {
    flexDirection: 'row',
    padding: 10,
  },
  body: {
    backgroundColor: 'white',
    width: '102%',
    margin: 10,
  },
  bot: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: '90%',
    height: 60,
    marginBottom: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'green',
    width: '90%',
    height: 60,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 25,
    color: 'blue',
  },
});
