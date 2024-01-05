window.onload = function () {
    var video = document.querySelector('video');
    const recordButton = document.querySelector('button#record');
    const stopButton = document.querySelector('button#stop');
    let recordedBlobs = [];
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
        video.srcObject = stream;
        // record-button
        recordButton.onclick = function () {
          mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start(100);   
            mediaRecorder.ondataavailable = (event) => {
                if (event.data && event.data.size > 0) {
                recordedBlobs.push(event.data);
                };}
        }

        
        $(document).ready(function () {
            $("form").submit(function (event) {
              event.preventDefault();
              console.log('Button clicked')
              
              mediaRecorder.stop();
              let blob = new Blob(recordedBlobs, {type: 'video/webm'});
              let formdata = new FormData();
              formdata.append("filename", 'test.webm')
              formdata.append('video', blob);
              
              console.log(recordedBlobs)
              console.log(blob)

              $.ajax({
                method: "POST",
                url: "/recognize_person",
                data: formdata,
                processData: false,
                contentType: false,
              }).done(function(response) {
                alert(response);
              });
              formdata = null;
              recordedBlobs = [];
              });
          });
    })
}