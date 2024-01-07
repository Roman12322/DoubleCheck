function getRandomInt(max) {
  return Math.floor(Math.random() * max).toString();
}

window.onload = async function () {
    var video = document.querySelector('video');
    const recordButton = document.querySelector('button#record');
    const stopButton = document.querySelector('button#stop');
    let recordedBlobs = [];
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const max_v = 1234567890

    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = mediaStream;
        // record-button
        recordButton.onclick = function () {
            mediaRecorder = new MediaRecorder(mediaStream);
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
                contentType: false,
                success: function(response) {
                  console.log("response executed successfully", response)
                },
                error: function(response) {
                  console.log("response executed with error", response)
                }
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
            alert("Record haven't found, please try again!", error);
          }
          });
}