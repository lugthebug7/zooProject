const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const gainNode = audioContext.createGain();

const volumeSlider = document.getElementById("volumeSlider");

const dialPointers = [
    document.getElementById("pointer1"),
    document.getElementById("pointer2"),
    document.getElementById("pointer3"),
    document.getElementById("pointer4"),
    document.getElementById("pointer5"),
    document.getElementById("pointer6")
];

const dialToggles = [
    document.getElementById("toggle1"),
    document.getElementById("toggle2"),
    document.getElementById("toggle3"),
    document.getElementById("toggle4"),
    document.getElementById("toggle5"),
    document.getElementById("toggle6")
];

const dials = [
    document.getElementById("fulldial1"),
    document.getElementById("fulldial2"),
    document.getElementById("fulldial3"),
    document.getElementById("fulldial4"),
    document.getElementById("fulldial5"),
    document.getElementById("fulldial6")
];
const rotateButtonPlus = document.getElementById("rotateButtonPlus");
const rotateButtonMinus = document.getElementById("rotateButtonMinus");
const minRotation = -180;
const maxRotation = 180;

let rotationDegrees = [0, 0, 0, 0, 0, 0];
let selectedDialToggles = new Set();
let selectedDials = new Set();

const audioFile1 = document.getElementById("audioFile1");
const audioFile2 = document.getElementById("audioFile2");
const audioFile3 = document.getElementById("audioFile3");
const audioFile4 = document.getElementById("audioFile4");
const audioFile5 = document.getElementById("audioFile5");
const audioFile6 = document.getElementById("audioFile6");

 
const audioPlayer1 = document.getElementById("audioPlayer1");
audioPlayer1.volume = 0.5;

const audioPlayer2 = document.getElementById("audioPlayer2");
audioPlayer2.volume = 0.5;

const audioPlayer3 = document.getElementById("audioPlayer3");
audioPlayer3.volume = 0.5;

const audioPlayer4 = document.getElementById("audioPlayer4");
audioPlayer4.volume = 0.5;

const audioPlayer5 = document.getElementById("audioPlayer5");
audioPlayer5.volume = 0.5;

const audioPlayer6 = document.getElementById("audioPlayer6");
audioPlayer6.volume = 0.5;


audioPlayer1.addEventListener("ended", () => {
    audioPlayer1.currentTime = 0;
    audioPlayer1.play();
});

audioPlayer2.addEventListener("ended", () => {
    audioPlayer2.currentTime = 0;
    audioPlayer2.play();
});

audioPlayer3.addEventListener("ended", () => {
    audioPlayer3.currentTime = 0;
    audioPlayer3.play();
});


audioPlayer4.addEventListener("ended", () => {
    audioPlayer4.currentTime = 0;
    audioPlayer4.play();
});

audioPlayer5.addEventListener("ended", () => {
    audioPlayer5.currentTime = 0;
    audioPlayer5.play();
});

audioPlayer6.addEventListener("ended", () => {
    audioPlayer6.currentTime = 0;
    audioPlayer6.play();
});

audioFile1.addEventListener("change", function () {
    loadAudioFile(audioFile1, "audioPlayer1", "audioSource1", dialToggles[0], dials[0]);
    audioPlayer1.currentTime = 0;
    audioPlayer1.pause();
    audioPlayer2.currentTime = 0;
    audioPlayer2.pause();
    audioPlayer3.currentTime = 0;
    audioPlayer3.pause();
    audioPlayer4.currentTime = 0;
    audioPlayer4.pause();
    audioPlayer5.currentTime = 0;
    audioPlayer5.pause();
    audioPlayer6.currentTime = 0;
    audioPlayer6.pause();

});

audioFile2.addEventListener("change", function () {
    loadAudioFile(audioFile2, "audioPlayer2", "audioSource2", dialToggles[1], dials[1]);
    audioPlayer1.currentTime = 0;
    audioPlayer1.pause();
    audioPlayer2.currentTime = 0;
    audioPlayer2.pause();
    audioPlayer3.currentTime = 0;
    audioPlayer3.pause();
    audioPlayer4.currentTime = 0;
    audioPlayer4.pause();
    audioPlayer5.currentTime = 0;
    audioPlayer5.pause();
    audioPlayer6.currentTime = 0;
    audioPlayer6.pause();

});

audioFile3.addEventListener("change", function () {
    loadAudioFile(audioFile3, "audioPlayer3", "audioSource3", dialToggles[2], dials[2]);
    audioPlayer1.currentTime = 0;
    audioPlayer1.pause();
    audioPlayer2.currentTime = 0;
    audioPlayer2.pause();
    audioPlayer3.currentTime = 0;
    audioPlayer3.pause();
    audioPlayer4.currentTime = 0;
    audioPlayer4.pause();
    audioPlayer5.currentTime = 0;
    audioPlayer5.pause();
    audioPlayer6.currentTime = 0;
    audioPlayer6.pause();

});

audioFile4.addEventListener("change", function () {
    loadAudioFile(audioFile4, "audioPlayer4", "audioSource4", dialToggles[3], dials[3]);
    audioPlayer1.currentTime = 0;
    audioPlayer1.pause();
    audioPlayer2.currentTime = 0;
    audioPlayer2.pause();
    audioPlayer3.currentTime = 0;
    audioPlayer3.pause();
    audioPlayer4.currentTime = 0;
    audioPlayer4.pause();
    audioPlayer5.currentTime = 0;
    audioPlayer5.pause();
    audioPlayer6.currentTime = 0;
    audioPlayer6.pause();

});

audioFile5.addEventListener("change", function () {
    loadAudioFile(audioFile5, "audioPlayer5", "audioSource5", dialToggles[4], dials[4]);
    audioPlayer1.currentTime = 0;
    audioPlayer1.pause();
    audioPlayer2.currentTime = 0;
    audioPlayer2.pause();
    audioPlayer3.currentTime = 0;
    audioPlayer3.pause();
    audioPlayer4.currentTime = 0;
    audioPlayer4.pause();
    audioPlayer5.currentTime = 0;
    audioPlayer5.pause();
    audioPlayer6.currentTime = 0;
    audioPlayer6.pause();

});

audioFile6.addEventListener("change", function () {
    loadAudioFile(audioFile6, "audioPlayer6", "audioSource6", dialToggles[5], dials[5]);
    audioPlayer1.currentTime = 0;
    audioPlayer1.pause();
    audioPlayer2.currentTime = 0;
    audioPlayer2.pause();
    audioPlayer3.currentTime = 0;
    audioPlayer3.pause();
    audioPlayer4.currentTime = 0;
    audioPlayer4.pause();
    audioPlayer5.currentTime = 0;
    audioPlayer5.pause();
    audioPlayer6.currentTime = 0;
    audioPlayer6.pause();

});



function loadAudioFile(inputElement, audioPlayerId, audioSourceId, toggle, dial) {
    const audioPlayer = document.getElementById(audioPlayerId);
    const audioSource = document.getElementById(audioSourceId);
    const file = inputElement.files[0];
    if (file) {
        const objectURL = URL.createObjectURL(file);
        audioPlayer.src = objectURL;
        audioPlayer.load();
        toggle.classList.add('file-added');
        dial.classList.add('file-added');

    }
}




dialToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
        const dialNumber = toggle.id.replace("toggle", "");
        if (toggle.classList.contains('file-added')){
            toggleDial(dialNumber);
        }
    });
});





function toggleDial(dialNumber) {
    if (selectedDialToggles.has(dialNumber)) {
        selectedDialToggles.delete(dialNumber);
    } else {
        selectedDialToggles.clear();
        selectedDialToggles.add(dialNumber);
    }

    if (selectedDials.has(dialNumber)) {
        selectedDials.delete(dialNumber);
    } else {
        selectedDials.clear();
        selectedDials.add(dialNumber);
    }
    updateDialToggles();
}


function updateDialToggles() {
    dialToggles.forEach((toggle) => {
        const dialNumber = toggle.id.replace("toggle", "");
        if (selectedDials.has(dialNumber)) {
            toggle.classList.add("selected");
        } else {
            toggle.classList.remove("selected");
        }
    });

    dials.forEach((dial) => {
        const fullDialNumber = dial.id.replace("fulldial", "");
        if (selectedDials.has(fullDialNumber)) {
            dial.classList.add("selected");
        } else {
            dial.classList.remove("selected");
        }
    });
    updateVolumeSlider();
}






function toggleDialClass(dialNumber) {
    const dial = document.getElementById(`fulldial${dialNumber}`);
    if (dial) {
        dial.classList.toggle("dial-selected");
    }
}


function rotateDial(degrees) {
    selectedDialToggles.forEach((dialNumber) => {
        const dialIndex = dialNumber - 1;

        const newRotation = rotationDegrees[dialIndex] + degrees;

        if (newRotation <= maxRotation && newRotation >= minRotation){
            rotationDegrees[dialIndex] = newRotation;

            let audioPlayer;
            if (dialIndex === 0) {
                audioPlayer = audioPlayer1;
            } else if (dialIndex === 1) {
                audioPlayer = audioPlayer2;
            } else if (dialIndex === 2) {
                audioPlayer = audioPlayer3;
            } else if (dialIndex === 3) {
                audioPlayer = audioPlayer4;
            } else if (dialIndex === 4) {
                audioPlayer = audioPlayer5;
            } else if (dialIndex === 5) {
                audioPlayer = audioPlayer6;
            }

            if (degrees === 36) {
                updateVolume(audioPlayer, 0.1);
            } else {
                updateVolume(audioPlayer, -0.1);
            }
        } else if (newRotation > maxRotation){
            rotationDegrees[dialIndex] = maxRotation;
        } else if (newRotation < minRotation){
            rotationDegrees[dialIndex] = minRotation;
        }

        dialPointers[dialIndex].style.transform = `translateX(-50%) rotate(${rotationDegrees[dialIndex]}deg)`;
        const numberBox = document.getElementById(`numberBox${dialIndex + 1}`);
        updateNumberBox(dialIndex, rotationDegrees[dialIndex]);
    });
}

volumeSlider.addEventListener("input", () => {
    const sliderValue = volumeSlider.value;
    const rotationDegrees = (sliderValue - 50) * 3.6;

    selectedDialToggles.forEach((dialNumber) => {
        const dialIndex = dialNumber - 1;

        const newRotation = Math.min(maxRotation, Math.max(minRotation, rotationDegrees));

        rotationDegrees[dialIndex] = newRotation;

        let audioPlayer;
        if (dialIndex === 0) {
            audioPlayer = audioPlayer1;
        } else if (dialIndex === 1) {
            audioPlayer = audioPlayer2;
        } else if (dialIndex === 2) {
            audioPlayer = audioPlayer3;
        } else if (dialIndex === 3) {
            audioPlayer = audioPlayer4;
        } else if (dialIndex === 4) {
            audioPlayer = audioPlayer5;
        } else if (dialIndex === 5) {
            audioPlayer = audioPlayer6;
        }


        const volume = (newRotation - minRotation) / (maxRotation - minRotation);
        audioPlayer.volume = volume;

        dialPointers[dialIndex].style.transform = `translateX(-50%) rotate(${newRotation}deg)`;
        updateNumberBox(dialIndex, newRotation);
    });
});



function updateNumberBox(dialIndex, rotationDegree) {
    const numberBox = document.getElementById(`numberBox${dialIndex + 1}`);
    if (numberBox) {
        const number = Math.floor(rotationDegree / 3.6) + 50;
        numberBox.textContent = number;
    }
}

const playPauseButton = document.getElementById("playPauseButton");
playPauseButton.addEventListener("click", () => {

    if (audioPlayer1.paused || audioPlayer1.paused || audioPlayer2.paused || audioPlayer3.paused || audioPlayer4.paused || audioPlayer5.paused || audioPlayer6.paused) {
        audioPlayer1.play();
        audioPlayer2.play();
        audioPlayer3.play();
        audioPlayer4.play();
        audioPlayer5.play();
        audioPlayer6.play();
    } else {
        audioPlayer1.pause();
        audioPlayer2.pause();
        audioPlayer3.pause();
        audioPlayer4.pause();
        audioPlayer5.pause();
        audioPlayer6.pause();
    }
});

function updateVolumeSlider() {
    selectedDialToggles.forEach((dialNumber) => {
        const dialIndex = dialNumber - 1;
        const numberBox = document.getElementById(`numberBox${dialNumber}`);
        if (numberBox) {
            const sliderValue = parseInt(numberBox.textContent, 10);
            volumeSlider.value = sliderValue;
        }
    });
}