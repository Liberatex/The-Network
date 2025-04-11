export async function handleSpeech() {
  return new Promise((resolve, reject) => {
    if (!('webkitSpeechRecognition' in window)) {
      reject(new Error('Speech recognition not supported'));
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    updateStatus('Listening...', true);

    recognition.onstart = () => {
      updateStatus('Listening...', true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      updateStatus('Processing...', true);
      resolve(transcript);
    };

    recognition.onerror = (event) => {
      updateStatus('Error: ' + event.error, false);
      reject(new Error(event.error));
    };

    recognition.onend = () => {
      updateStatus('Ready to connect', false);
    };

    try {
      recognition.start();
    } catch (error) {
      updateStatus('Error starting recognition', false);
      reject(error);
    }
  });
}

function updateStatus(text, isActive) {
  const statusText = document.getElementById('statusText');
  const statusDot = document.getElementById('statusDot');
  const buttonText = document.getElementById('buttonText');

  statusText.textContent = text;
  statusDot.classList.toggle('active', isActive);
  buttonText.textContent = isActive ? 'Listening...' : 'Start Voice Command';
}