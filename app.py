
import os
from dotenv import load_dotenv
load_dotenv()
api_key = os.getenv("GROQ_API_KEY")
#proxy (for RGUKT network)
os.environ["HTTP_PROXY"] = "http://B221506:EAWWA6@studentnet.rgukt.ac.in:3128"
os.environ["HTTPS_PROXY"] = "http://B221506:EAWWA6@studentnet.rgukt.ac.in:3128"

from flask import Flask, render_template, request, jsonify
from groq import Groq

app = Flask(__name__)

client = Groq(api_key)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/ask", methods=["POST"])
def ask():

    question = request.json["question"]
    language = request.json["language"]

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


if __name__ == "__main__":
    app.run(debug=True)