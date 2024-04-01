const socket = io("/");

var peer = new Peer(undefined, {
    path: "/peerjs",
    host: "/",
    port: "443",
});

const myAudio = document.createElement("audio");
myAudio.muted = true;

let myStream;
navigator.mediaDevices  
.getUserMedia({
    audio:true
})

function addVideoStream(audio, stream) {
    audio.srcObject = stream;
    audio.addEventListener("loadedmetadata", () => {
        audio.play();
        let html = `
            <div class="user-container">
                ${audio.outerHTML}
            </div>
        `
        $("#users").append(html)
    });
};

$(function () {
    $("#mute_button").click(function () {
        const enabled = myStream.getAudioTracks()[0].enabled;
        if (enabled) {
            myStream.getAudioTracks()[0].enabled = false;
            html = `<i class="fas fa-microphone-slash"></i>`;
            $("#mute_button").toggleClass("background_red");
            $("#mute_button").html(html)
        } else {
            myStream.getAudioTracks()[0].enabled = true;
            html = `<i class="fas fa-microphone"></i>`;
            $("#mute_button").toggleClass("background_red");
            $("#mute_button").html(html)
        }
    })
})

peer.on("open", (id) => {
    socket.emit("join-room", ROOM_ID, id);
});