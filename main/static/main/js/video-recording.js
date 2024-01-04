window.onload = function () {
    var video = document.querySelector('video');
    const recordButton = document.querySelector('button#record');
    const stopButton = document.querySelector('button#stop');
    const recordedBlobs = [];
    navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
        video.srcObject = stream;
        // record-button
        recordButton.onclick = function () {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start(1000);   
            mediaRecorder.ondataavailable = (event) => {
                if (event.data && event.data.size > 0) {
                recordedBlobs.push(event.data);
                };
        }
        // stop-button 
        stopButton.onclick = function () {
            mediaRecorder.stop();
            const blob = new Blob(recordedBlobs, {type: 'video/webm'});
            let data = new FormData();
            data.append('file', blob, 'myRecording.webm');
            $.ajax({
                method: 'POST',
                url: '/recognize_person',
                data: data,
                success: response => console.log('Success:', response),

            })
            // const url = URL.createObjectURL(blob);
            // const a = document.createElement("a");
            // document.body.appendChild(a);
            // a.style = "display: none";
            // a.href = url;
            // a.download = "test.webm";
            // a.click();
        }
    }
});}