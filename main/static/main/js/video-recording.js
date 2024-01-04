let mediaRecorder;
let recordedBlobs;

const recordButton = document.querySelector('button#record');
recordButton.addEventListener('click', () => {
  if (recordButton.textContent === 'Начать запись') {
    startRecording();
  } else {
    stopRecording();
    recordButton.textContent = 'Начать запись';
  }
});

async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
  mediaRecorder = new MediaRecorder(stream);
  recordedBlobs = [];
  mediaRecorder.ondataavailable = (event) => {
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data);
    }
  };
  mediaRecorder.start();
  recordButton.textContent = 'Остановить запись';
  setTimeout(() => {
    if (recordButton.textContent === 'Остановить запись') {
      stopRecording();
      recordButton.textContent = 'Начать запись';
    }
  }, 5000); // Остановить запись через 5 секунд
}

function stopRecording() {
  mediaRecorder.stop();
  const blob = new Blob(recordedBlobs, {type: 'video/webm'});
  sendData(blob);
}

function sendData(data) {
    let url = '/recognize_person';
    let formData = new FormData();
    formData.append('file', data, 'myRecording.webm');
    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then(response => console.log('Success:', response))
    .catch(error => console.error('Error:', error));
  }
  