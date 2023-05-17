from flask import Flask, request, jsonify
from flask_cors import CORS
import sounddevice as sd
import numpy as np
import speech_recognition as sr
import openai
from gtts import gTTS
import pygame

# Set your OpenAI API key
openai.api_key = 'put your key here'

app = Flask(__name__)
CORS(app)

def chat_with_ai(message):
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"User: {message}\nAI:",
        temperature=0.6,
        max_tokens=100,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0
    )

    return response.choices[0].text.strip()

@app.route('/api/chat', methods=['POST'])
def chat():
    message = request.json['message']
    response = chat_with_ai(message)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(port=5000)
