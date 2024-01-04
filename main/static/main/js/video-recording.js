window.onload = function () {
    var video = document.querySelector('video');
    const recordButton = document.querySelector('button#record');
    const stopButton = document.querySelector('button#stop');
    const recordedBlobs = [];
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

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

        $(document).ready(function () {
            $("form").submit(function (event) {
              event.preventDefault();
              console.log('Button clicked')
              
              mediaRecorder.stop();
              const blob = new Blob(recordedBlobs, {type: 'video/webm'});
              let data_files = new FormData();
              data_files.append('video', blob);
              
              console.log(recordedBlobs)

              console.log(blob)
              
              // const url_1 = URL.createObjectURL(blob);
              // const a = document.createElement("a");
              // document.body.appendChild(a);
              // a.style = "display: none";
              // a.href = url_1;
              // a.download = "test.webm";
              // a.click();

              fetch("/recognize_person", {method:"POST", body:data_files})
                .then(response => console.log(response.text()))

              // $.ajax({
              //   method: "POST",
              //   url: "/recognize_person",
              //   data: data_files,
              //   processData: false,
              //   contentType: false
              // }).done(function(response) {
              //   alert(response);
              // });
            });
          });
    }
});}