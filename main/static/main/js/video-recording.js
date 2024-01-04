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
        $('.submit').click(function (){
            console.log('Button clicked')
            
            mediaRecorder.stop();
            const blob = new Blob(recordedBlobs, {type: 'video/webm'});
            let data = new FormData();
            data.append('file', blob, 'myRecording.webm');
            data.append("csrfmiddlewaretoken", "{{ csrf_token }}");

            console.log(data);
            
            $.ajax({
                url: "{% url 'recognize_person' %}",
                method: 'POST',
                processData: false,
                contentType: false,
                mimeType: "multipart/form-data",
                data: data,
                success: function(data) {
                    console.log("data sent to the backend");
                }
            })
        })
            // download video-file
            // const url_1 = URL.createObjectURL(blob);
            // const a = document.createElement("a");
            // document.body.appendChild(a);
            // a.style = "display: none";
            // a.href = url_1;
            // a.download = "test.webm";
            // a.click();
            
            // assign data-to-transfer
            
    }
});}