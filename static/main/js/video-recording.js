function getRandomInt(max) {
  return Math.floor(Math.random() * max).toString();
}


window.onload = function () {
    var video = document.querySelector('video');
    const recordButton = document.querySelector('button#record');
    const stopButton = document.querySelector('button#stop');
    let recordedBlobs = [];
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const max_v = 1234567890

    navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
        video.srcObject = stream;
        // record-button
        recordButton.onclick = function () {
            var options = {mimeType: "video/webm;codecs=vp9"}
            mediaRecorder = new MediaRecorder(stream, options);
            mediaRecorder.start(100);   
            mediaRecorder.ondataavailable = (event) => {
                if (event.data && event.data.size > 0) {
                recordedBlobs.push(event.data);
                };}
        }

            $("form").submit(function (event) {
                event.preventDefault();
              try {
                if (recordedBlobs.length >2) {
                  mediaRecorder.stop();
                  val = getRandomInt(max_v);
                  filename = 'video'.concat(val);

                  let blob = new Blob(recordedBlobs, {type: 'video/webm'});
                  let formdata = new FormData();
                  formdata.append("filename", filename.concat('.webm'));
                  formdata.append(filename, blob);
                  
                  // logging
                  console.log(recordedBlobs)
                  console.log(blob)
                  console.log(filename)
    
                  // ajax request
                  $.ajax({
                    method: "POST",
                    url: "/recognize_person",
                    data: formdata,
                    processData: false,
                    cache: false,
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
    })
}