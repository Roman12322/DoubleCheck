let mediaRecorder;
let recordedBlobs;

const recordButton = document.querySelector('button#record');
var video = document.querySelector('video');

recordButton.addEventListener('click', () => {
  if (recordButton.textContent === 'Try out') {
    startRecording();
  } else {
    stopRecording();
    recordButton.textContent = 'Try out';
  }
});

async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({video: true});
  mediaRecorder = new MediaRecorder(stream);
  recordedBlobs = [];
  mediaRecorder.ondataavailable = (event) => {
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data);
    }
  };
  mediaRecorder.start();
  video.srcObject = stream;
  recordButton.textContent = 'Остановить запись';
  setTimeout(() => {
    if (recordButton.textContent === 'Остановить запись') {
      stopRecording();
      recordButton.textContent = 'Try out';
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
  