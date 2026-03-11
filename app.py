import os
from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify
from groq import Groq

# Load environment variables
load_dotenv()

# Get API key from environment
api_key = os.getenv("GROQ_API_KEY")

# Initialize Groq client
client = Groq(api_key=api_key)

# Create Flask app
app = Flask(__name__)

# Home route
@app.route("/")
def home():
    return render_template("index.html")


# Chatbot route
@app.route("/ask", methods=["POST"])
def ask():
    try:
        data = request.get_json()

        question = data.get("question")
        language = data.get("language")

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": "Answer the question clearly and in the same language as the user."
                },
                {
                    "role": "user",
                    "content": question
                }
            ]
        )

        answer = response.choices[0].message.content

        return jsonify({"answer": answer})

    except Exception as e:
        return jsonify({"error": str(e)})


# Run server
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)