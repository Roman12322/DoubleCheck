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
              try {
                event.preventDefault();
                mediaRecorder.stop();
                if (recordedBlobs.length >=3) {
                  let blob = new Blob(recordedBlobs, {type: 'video/webm'});
                  let formdata = new FormData();
                  formdata.append("filename", 'test.webm');
                  formdata.append('video', blob);
                  
                  // logging
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
                }
                else {
                  alert("Record haven't found or video is too short! Try again");
                }
 
              } catch (error) {
                alert("Record haven't found, please try again!");
              }
              });
          });
    })
}