from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from langchain_openai import ChatOpenAI
from langchain_core.messages import AIMessage, HumanMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.memory import ChatMessageHistory 
from dotenv import load_dotenv
from spotipy.oauth2 import SpotifyClientCredentials
import re
import spotipy


app = Flask(__name__)
CORS(app)

# load .env key
load_dotenv()
client_id = os.getenv('REACT_APP_CLIENT_ID')  
client_secret = os.getenv('REACT_APP_CLIENT_SECRET')  
# print(f'REACT_APP_CLIENT_ID: {client_id}')
# print(f'REACT_APP_CLIENT_SECRET: {client_secret}')
#  set up spotify
def setup_spotipy():
    
    client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
    return sp

sp = setup_spotipy()

def get_spotify_uri(song_title, artist_name):
    results = sp.search(q=f'track:{song_title} artist:{artist_name}', type='track', limit=1)
    tracks = results['tracks']['items']
    if tracks:
        uri = tracks[0]['uri']
        image_url = tracks[0]['album']['images'][0]['url'] if tracks[0]['album']['images'] else None
        return uri, image_url
    else:
        return None, None

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
    song_uris = [get_spotify_uri(match[0], match[1]) for match in matches]
    return song_titles, song_uris  # Return both titles and URIs

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
    # Unpack both song_titles and song_uris from the function's return
    song_titles, song_uris = extract_song_titles(chatbot_response.content)
    
    # Extract URIs and image URLs separately
    uris = [uri[0] for uri in song_uris if uri[0] is not None]
    image_urls = [uri[1] for uri in song_uris if uri[1] is not None]
    
    # Prepare the response data
    response_data = {
        'reply': chatbot_response.content, 
        'song_titles': song_titles, 
        'song_uris': uris,
        'image_urls': image_urls
    }
    
    # Print the response data
    print(response_data)
    return jsonify(response_data)


if __name__ == "__main__":
    app.run(debug=True)