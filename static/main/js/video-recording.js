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
            var options = {mimeType : 'video/mp4'}
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start(100);   
            mediaRecorder.ondataavailable = (event) => {
                if (event.data && event.data.size > 0) {
                recordedBlobs.push(event.data);
                };}
        }

            $("form").submit(function (event) {
              try {
                event.preventDefault();
                mediaRecorder.stop();
                if (recordedBlobs.length >2) {
                  val = getRandomInt(max_v);
                  filename = 'video'.concat(val);

                  let blob = new Blob(recordedBlobs, {type: 'video/mp4'});
                  let formdata = new FormData();
                  formdata.append("filename", filename.concat('.mp4'));
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