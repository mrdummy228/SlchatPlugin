function ICEMAY_SOUND_AUDIO_setNewAudioSource() {
    localStorage.ICEMAY_SOUND_AUDIO = prompt("Enter the URL link for the audio notification you want to hear upon a message:");

    if (localStorage.ICEMAY_SOUND_AUDIO == "") {
        alert("Audio source set to default value.");
        localStorage.ICEMAY_SOUND_AUDIO = "https://www.winhistory.de/more/winstart/mp3/wfw311.mp3";
    } else {
        alert("Audio source successfully set!")
    };
};

if (localStorage.ICEMAY_SOUND_AUDIO == undefined) {
    ICEMAY_SOUND_AUDIO_setNewAudioSource();
};

const ICEMAY_SOUND_OBJECT = new Audio(localStorage.ICEMAY_SOUND_AUDIO);
const OWN_NICKNAME = document.getElementsByClassName("nickname")[0].innerHTML;

console.log(OWN_NICKNAME);

socket.on("prompt", function(msg) {
    if (msg.message.owner.nickname != OWN_NICKNAME && document.hidden) {
        ICEMAY_SOUND_OBJECT.play();
    };
});

function keyPressHandler(e) {
    var evtobj = window.event ? window.event : e;

    if (evtobj.ctrlKey && evtobj.keyCode == 89) {
        ICEMAY_SOUND_AUDIO_setNewAudioSource();
    };
};

window.addEventListener('keydown', keyPressHandler);
