$(document).ready(function() {

    $("#messageSend").click( function() {
        sendMessage();
    });
    $(document).on('keyup',function(e) {
    if(e.which == 13) {
        sendMessage();
    }
    });

  function sendMessage() {
    var message = $.trim($("#userMessage").val());
    if (message != "") {
        $(".chatBox").append( "<div class = \"message\" >"+ message + "</div>" );
    }
    $("#userMessage").val("");
    $("#userMessage").attr("placeholder", "Type your message here.");
    var d = $('.chatBox');
    d.scrollTop(d.prop("scrollHeight"));
    }

    // Grab elements, create settings, etc.
    var video1 = document.getElementById('menteeVideo');

    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            //video.src = window.URL.createObjectURL(stream);
            video1.srcObject = stream;
            video1.play();
        });
    }

    // Grab elements, create settings, etc.
    var video2 = document.getElementById('mentorVideo');

    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            //video.src = window.URL.createObjectURL(stream);
            video2.srcObject = stream;
            video2.play();
        });
    }

});



