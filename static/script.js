let speech = null;
let voices = [];

/* LOAD VOICES PROPERLY */

function loadVoices(){
    voices = speechSynthesis.getVoices();
}

speechSynthesis.onvoiceschanged = loadVoices;


/* ASK QUESTION */

async function ask(){

let question = document.getElementById("question").value
let lang = document.getElementById("language").value

document.getElementById("answer").innerText = "Thinking..."

let response = await fetch("/ask",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
question:question,
language:lang
})

})

let data = await response.json()

let cleanAnswer = data.answer
.replace(/\*\*/g,"")
.replace(/\n/g,"<br>")

document.getElementById("answer").innerHTML = cleanAnswer


/* TEXT TO SPEECH */

let speechText = data.answer
.replace(/\*\*/g,"")
.replace(/\n/g," ")

speech = new SpeechSynthesisUtterance(speechText)

speech.lang = lang

/* choose correct voice */

let voice = voices.find(v => v.lang === lang)

if(!voice){
voice = voices[0]
}

speech.voice = voice


speech.onstart=function(){
startTalking()
}

speech.onend=function(){
stopTalking()
}

speechSynthesis.cancel()
speechSynthesis.speak(speech)

}


/* SPEAK AGAIN */

function speakAnswer(){

if(speech){
speechSynthesis.cancel()
speechSynthesis.speak(speech)
}

}


/* STOP SPEECH */

function stopSpeech(){

speechSynthesis.cancel()
stopTalking()

}


/* SPEECH TO TEXT */

function startVoice(){

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()

let lang = document.getElementById("language").value

recognition.lang = lang
recognition.start()

recognition.onresult=function(event){

let text = event.results[0][0].transcript

document.getElementById("question").value = text

ask()

}

recognition.onerror=function(event){
console.log("Speech recognition error:",event.error)
}

}