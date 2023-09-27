const path = document.getElementById('circle');

const buttons = [
    document.getElementById("foodButton"),
    document.getElementById("gateButton")
];




function depletePerimeter() {
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength; // Start with a full perimeter

    const duration = 5 * 60; // 300 seconds (5 minutes) for the entire animation
    const frameRate = 60; // Number of animation frames per second

    const decrement = pathLength / (duration * frameRate);

    const animationInterval = setInterval(() => {
        if (path.style.strokeDashoffset > 0) {
            path.style.strokeDashoffset = parseFloat(path.style.strokeDashoffset) - decrement; // Decrease dash offset to deplete the perimeter
        } else {
            clearInterval(animationInterval);
        }
    }, 1000 / frameRate); // Adjust the interval for smoother animation
}

// Start the depletion immediately
depletePerimeter();




























buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (toggle.classList.contains('selected')){
            toggle.classList.remove("selected");
        } else {
            toggle.classList.add("selected");
        }
    })  
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
