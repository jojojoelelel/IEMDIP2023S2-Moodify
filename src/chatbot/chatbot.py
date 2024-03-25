from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from langchain_openai import ChatOpenAI
from langchain_core.messages import AIMessage, HumanMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.memory import ChatMessageHistory 
from dotenv import load_dotenv
import re

app = Flask(__name__)
CORS(app)

# load api key
load_dotenv()
def load_model():
    # print(os.getenv('OPENAI_API_KEY'))
    os.environ["OPENAI_API_KEY"] = os.getenv('OPENAI_API_KEY')
    model = ChatOpenAI(model="gpt-3.5-turbo-1106")
    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "You are a music recommender that recommends music when the user tells you their emotions.You may converse with the user. Only recommend one song",
            ),
            MessagesPlaceholder(variable_name="messages"),
        ]
    )
    chain = prompt | model
    return chain

chatbotreply = load_model()

chat_history = ChatMessageHistory()

def extract_song_titles(chatbot_response_content):
    pattern = r'"([^"]+)" by ([^\.]+)'
    matches = re.findall(pattern, chatbot_response_content)
    
    # Format matches as a list of "Song Title" by Artist
    song_titles = [f'"{match[0]}" by {match[1]}' for match in matches]
    return song_titles


@app.route('/chat', methods=['POST'])
def chat():
        data = request.json
        user_message = data['message']
        chat_history.add_user_message(user_message)
        chatbot_response = chatbotreply.invoke(
            {
                "messages": chat_history.messages,
            }
        )
        chat_history.add_ai_message(chatbot_response)
        song_titles = extract_song_titles(chatbot_response.content)

        return jsonify({'reply': chatbot_response.content, 'song_titles': song_titles})

if __name__ == "__main__":
    app.run(debug=True)