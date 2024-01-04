window.onload = function () {
    var video = document.querySelector('video');
    const recordButton = document.querySelector('button#record');
    const stopButton = document.querySelector('button#stop');
    const recordedBlobs = [];
    navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
        video.srcObject = stream;
        recordButton.onclick = function () {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start(1000);   
            mediaRecorder.ondataavailable = (event) => {
                if (event.data && event.data.size > 0) {
                recordedBlobs.push(event.data);
                };
        }
        stopButton.onclick = function () {
            mediaRecorder.stop();
            const blob = new Blob(recordedBlobs, {type: 'video/webm'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = "test.webm";
            a.click();
        }
    }
});


}
function stopRecording() {
  //   sendData(blob);
}
// function sendData(data) {
//     let url = '/recognize_person';
//     let formData = new FormData();
//     formData.append('file', data, 'myRecording.webm');
//     $.ajax(){

//     };
//     fetch(url, {
//       method: 'POST',
//       body: formData
//     })
//     .then(response => console.log('Success:', response))
//     .catch(error => console.error('Error:', error));
//   }
  