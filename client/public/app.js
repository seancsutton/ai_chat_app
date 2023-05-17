let isMuted = false;

// Get the button elements
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const muteButton = document.getElementById("mute");
const outputTextarea = document.getElementById("output");

// Initialize the SpeechRecognition API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';

startButton.addEventListener("click", function() {
    recognition.start();
    startButton.disabled = true;
    stopButton.disabled = false;
});

stopButton.addEventListener("click", function() {
    recognition.stop();
    startButton.disabled = false;
    stopButton.disabled = true;
});

muteButton.addEventListener("click", function() {
    isMuted = !isMuted;
    muteButton.innerText = isMuted ? "Unmute" : "Mute";
});

recognition.onresult = function(event) {
    const speechResult = event.results[0][0].transcript;
    outputTextarea.value += 'You: ' + speechResult + '\n';

    axios.post('/api/chat', {
        message: speechResult
    })
    .then(function(response) {
        outputTextarea.value += 'AI: ' + response.data.response + '\n';

        if (!isMuted) {
            responsiveVoice.speak(response.data.response);
        }
    })
    .catch(function(error) {
        console.log(error);
    });
};




