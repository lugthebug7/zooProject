
const gateButtons = document.querySelectorAll(".gate-button");


const emergencyFeedButton = document.getElementById("emergency-feed-button");
const closeGate = document.getElementById("close-gate");
const openGate = document.getElementById("open-gate");
const onSprinkler = document.getElementById("on-sprinkler");



gateButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        button.classList.toggle("flash");
        const gateFeedback = this.parentElement.querySelector("#gateFeedback");
        if (gateFeedback.textContent === 'Gate Closed') {
            gateFeedback.textContent = 'Gate Open'
        } else {
            gateFeedback.textContent = 'Gate Closed'
        }
    });
});


var gorillaInstructions = document.getElementById("gorillaInstructions");
var gorillaFeedTimeInput = document.getElementById("gorillaTimer");
var gorillaButton = document.getElementById("gorillaButton")
var gorillaFeedTime = gorillaFeedTimeInput.value;
var intervalIdGorilla;
startTimerGorilla(gorillaFeedTime);

var birdInstructions = document.getElementById("birdInstructions");
var birdFeedTimeInput = document.getElementById("birdTimer");
var birdButton = document.getElementById("birdButton")
var birdFeedTime = birdFeedTimeInput.value;
var intervalIdBird;
startTimerBird(birdFeedTime);

var dogInstructions = document.getElementById("dogInstructions");
var dogFeedTimeInput = document.getElementById("dogTimer");
var dogButton = document.getElementById("dogButton")
var dogFeedTime = dogFeedTimeInput.value;
var intervalIdDog;
startTimerDog(dogFeedTime);



const feedButtons = [
    document.getElementById("activateGorillaFeed"),
    document.getElementById("activateBirdFeed"),
    document.getElementById("activateDogFeed")
];

const animalButtons = [
    gorillaButton,
    birdButton,
    dogButton
];

const intervalIds = [
    intervalIdGorilla,
    intervalIdBird,
    intervalIdDog
];

const animalFeedTimes = [
    gorillaFeedTime,
    birdFeedTime,
    dogFeedTime
];

const animalFeedTimeInputs = [
    gorillaFeedTimeInput,
    birdFeedTimeInput,
    dogFeedTimeInput
];

const circles = [
    document.getElementById("c2"),
    document.getElementById("c4"),
    document.getElementById("c6")
]


function startTimer(duration, animalId) {
    if (animalId === 0) {
        stopAndResetTimerGorilla();
        startTimerGorilla(duration);
    } else if (animalId === 1) {
        stopAndResetTimerBird();
        startTimerBird(duration);
    } else {
        stopAndResetTimerDog();
        startTimerDog(duration);
    }
}

function feedActivation(feedButton, circle, animalButton, intervalId, animalFeedTime, animalFeedTimeInput, animalId) {
    if (feedButton.textContent === 'Activate') {
        clearInterval(intervalId);
        feedButton.textContent = 'Deactivate';
        feedButton.classList.toggle("activated");
        animalFeedTimes[animalId] = animalFeedTimeInput.value;
        if (animalButton.classList.contains("flash")){
            animalButton.classList.remove("flash")
        }
        circle.classList.toggle("selected");
        startTimer(animalFeedTimes[animalId], animalId);
    } else {
        feedButton.textContent = 'Activate';
        feedButton.classList.remove("activated");
        circle.classList.remove("selected");
        clearInterval(intervalId);
    }
}


for (let i = 0; i < feedButtons.length; i++) {
    feedButtons[i].addEventListener("click", function () {
        feedActivation(feedButtons[i], circles[i], animalButtons[i], intervalIds[i], animalFeedTimes[i], animalFeedTimeInputs[i], i);
    });
}



function stopAndResetTimerGorilla() {
    clearInterval(intervalIdGorilla);
    document.getElementById("c2").style.strokeDasharray = [100, 0];
    document.getElementById("c2").style.strokeDashoffset = 0;
}




function stopAndResetTimerBird() {
    clearInterval(intervalIdBird);
    document.getElementById("c4").style.strokeDasharray = [100, 0];
    document.getElementById("c4").style.strokeDashoffset = 25;
}



function stopAndResetTimerDog() {
    clearInterval(intervalIdDog);
    document.getElementById("c6").style.strokeDasharray = [100, 0];
    document.getElementById("c6").style.strokeDashoffset = 25;
}













function startTimerGorilla(duration) {
    var time = duration;
    var i = 1;
    var k = 100 - ((i / duration) * 100);
    var l = 100 - k;
    i++;

    document.getElementById("c2").style.strokeDasharray = [100, 0];

    document.getElementById("c2").style.strokeDashoffset = 0;
    gorillaInstructions.textContent = "Feed in " + (time) + " seconds";
    intervalIdGorilla = setInterval(function () {
        if (i < time / 2){
            gorillaButton.classList.toggle("tooSoon", true);
        }
        if (i > time / 2){
            gorillaButton.classList.toggle("tooSoon", false);
        }
        if (i > time) {
            clearInterval(intervalIdGorilla);
            if (feedButtons[0].classList.contains("activated")) {
                gorillaFeedTime = gorillaFeedTimeInput.value;
                startTimerGorilla(gorillaFeedTime);
            } else {
                gorillaButton.classList.toggle("flash");
                gorillaInstructions.textContent = "FEED NOW!";
                return;
            }
        }
        k = 100 - ((i / duration) * 100);
        l = 100 - k;

        document.getElementById("c2").style.strokeDasharray = [k, l];

        document.getElementById("c2").style.strokeDashoffset = 0;
        console.log(time, i, k, l, document.getElementById("c2").style.strokeDashoffset);
        if (gorillaInstructions.textContent != "Do Not Overfeed!") {
            gorillaInstructions.textContent = "Feed in " + (time  - i + 1) + " seconds";
        }
        i++;
    }, 1000);


    gorillaButton.addEventListener("click", function () {
        if (gorillaButton.classList.contains("tooSoon")) {
            gorillaInstructions.textContent = "Do Not Overfeed!";
        
            setTimeout(() => {
                gorillaInstructions.textContent = gorillaInstructions.textContent = "Feed in " + (time  - i + 1) + " seconds"; // Clear the message after 3 seconds
            }, 2000); 
            return;
        }
        if (gorillaButton.classList.contains("flash")) {
            gorillaButton.classList.remove("flash"); 
        }
        clearInterval(intervalIdGorilla); 
        gorillaFeedTime = gorillaFeedTimeInput.value;
        startTimerGorilla(gorillaFeedTime);
    });
}



















function startTimerBird(duration) {
    var time = duration;
    var i = 1;
    var k = 100 - ((i / duration) * 100);
    var l = 100 - k;
    i++;

    document.getElementById("c4").style.strokeDasharray = [100, 0];

    document.getElementById("c4").style.strokeDashoffset = 0;
    birdInstructions.textContent = "Feed in " + (time) + " seconds";
    intervalIdBird = setInterval(function () {
        if (i < time / 2){
            birdButton.classList.toggle("tooSoon", true);
        }
        if (i > time / 2){
            birdButton.classList.toggle("tooSoon", false);
        }
        if (i > time) {
            clearInterval(intervalIdBird);
            if (feedButtons[1].classList.contains("activated")) {
                birdFeedTime = birdFeedTimeInput.value;
                startTimerBird(birdFeedTime);
            } else {
                birdButton.classList.toggle("flash");
                birdInstructions.textContent = "FEED NOW!";
                return;
            }
        }
        k = 100 - ((i / duration) * 100);
        l = 100 - k;

        document.getElementById("c4").style.strokeDasharray = [k, l];

        document.getElementById("c4").style.strokeDashoffset = 0;
        if (birdInstructions.textContent != "Do Not Overfeed!") {
            birdInstructions.textContent = "Feed in " + (time - i) + " seconds";
        }
        i++;
    }, 1000);

    birdButton.addEventListener("click", function () {
        if (birdButton.classList.contains("tooSoon")) {
            birdInstructions.textContent = "Do Not Overfeed!";

            setTimeout(() => {
                birdInstructions.textContent = birdInstructions.textContent = "Feed in " + (time - i) + " seconds";
            }, 2000);
            return;}
        if (birdButton.classList.contains("flash")) {
            birdButton.classList.remove("flash"); 
        }
        clearInterval(intervalIdBird);
        birdFeedTime = birdFeedTimeInput.value;
        startTimerBird(birdFeedTime);
    });
}












function startTimerDog(duration) {
    var time = duration;
    var i = 1;
    var k = 100 - ((i / duration) * 100);
    var l = 100 - k;
    i++;

    document.getElementById("c6").style.strokeDasharray = [100, 0];

    document.getElementById("c6").style.strokeDashoffset = 0;
    dogInstructions.textContent = "Feed in " + (time) + " seconds";
    intervalIdDog = setInterval(function () {
        if (i < time / 2){
            dogButton.classList.toggle("tooSoon", true);
        }

        if (i > time / 2){
            dogButton.classList.toggle("tooSoon", false);
        }
        if (i > time) {
            clearInterval(intervalIdDog);
            if (feedButtons[2].classList.contains("activated")) {
                dogFeedTime = dogFeedTimeInput.value;
                startTimerDog(dogFeedTime);
            } else {
                dogButton.classList.toggle("flash");
                dogInstructions.textContent = "FEED NOW!";
                return;
            }
        }
        k = 100 - ((i / duration) * 100);
        l = 100 - k;

        document.getElementById("c6").style.strokeDasharray = [k, l];

        document.getElementById("c6").style.strokeDashoffset = 0;
        if (dogInstructions.textContent != "Do Not Overfeed!") {
            dogInstructions.textContent = "Feed in " + (time - i) + " seconds";
        }
        i++;
    }, 1000);

    dogButton.addEventListener("click", function () {
        if (dogButton.classList.contains("tooSoon")) {
            dogInstructions.textContent = "Do Not Overfeed!";

            setTimeout(() => {
                dogInstructions.textContent = dogInstructions.textContent = "Feed in " + (time - i) + " seconds";
            }, 2000);
            return;}
        if (dogButton.classList.contains("flash")) {
            dogButton.classList.remove("flash"); 
        }
        clearInterval(intervalIdDog); 
        dogFeedTime = dogFeedTimeInput.value;
        startTimerDog(dogFeedTime);
    });
}



function openGorillaModal() {
    document.getElementById('gorillaModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
  }

function closeGorillaModal() {
    document.getElementById('gorillaModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  }


function openBirdModal() {
    document.getElementById('birdModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
  }

  function closeBirdModal() {
    document.getElementById('birdModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  }

function openDogModal() {
    document.getElementById('dogModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
  }

  function closeDogModal() {
    document.getElementById('dogModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  }






function toggleLayout() {
    const layout1 = document.querySelector('.layout1');
    const layout2 = document.querySelector('.layout2');
    const layout3 = document.querySelector('.layout3');
    const layout4 = document.querySelector('.layout4');

    layout1.style.display = layout1.style.display === 'none' ? 'block' : 'none';
    layout2.style.display = layout2.style.display === 'none' ? 'block' : 'none';
    layout3.style.display = layout3.style.display === 'none' ? 'block' : 'none';
    layout4.style.display = layout4.style.display === 'none' ? 'block' : 'none';
}


var zone1Instructions = document.getElementById("zone1Instructions");
var zone1TimeInput = document.getElementById("zone1Timer");
var zone1Button = document.getElementById("zone1Button")
var zone1Time = zone1TimeInput.value;
var intervalIdZone1;
startTimerZone1(zone1Time);

var zone2Instructions = document.getElementById("zone2Instructions");
var zone2TimeInput = document.getElementById("zone2Timer");
var zone2Button = document.getElementById("zone2Button")
var zone2Time = zone2TimeInput.value;
var intervalIdZone2;
startTimerZone2(zone2Time);

var zone3Instructions = document.getElementById("zone3Instructions");
var zone3TimeInput = document.getElementById("zone3Timer");
var zone3Button = document.getElementById("zone3Button")
var zone3Time = zone3TimeInput.value;
var intervalIdZone3;
startTimerZone3(zone1Time);



const autoSprinklerButtons = [
    document.getElementById("activateZone1Sprinkler"),
    document.getElementById("activateZone2Sprinkler"),
    document.getElementById("activateZone3Sprinkler")
];

const sprinklerButtons = [
    zone1Button,
    zone2Button,
    zone3Button
];

const sprinklerIntervalIds = [
    intervalIdZone1,
    intervalIdZone2,
    intervalIdZone3
];

const sprinklerTimes = [
    zone1Time,
    zone2Time,
    zone3Time
];

const sprinklerTimeInputs = [
    zone1TimeInput,
    zone2TimeInput,
    zone3TimeInput
];

const circlesSprinklers = [
    document.getElementById("c12"),
    document.getElementById("c14"),
    document.getElementById("c16")
]


function startSprinklerTimer(duration, sprinklerId) {
    if (sprinklerId === 0) {
        stopAndResetTimerZone1();
        startTimerZone1(duration);
    } else if (sprinklerId === 1) {
        stopAndResetTimerZone2();
        startTimerZone2(duration);
    } else {
        stopAndResetTimerZone3();
        startTimerZone3(duration);
    }
}

function sprinklerActivation(sprinklerAutoButton, circleSprinkler, animalButton, intervalIdSprinkler, sprinklerTime, sprinklerTimeInput, sprinklerId) {
    if (sprinklerAutoButton.textContent === 'Activate') {
        clearInterval(intervalIdSprinkler);
        sprinklerAutoButton.textContent = 'Deactivate';
        sprinklerAutoButton.classList.toggle("activated");
        sprinklerTimes[sprinklerId] = sprinklerTimeInput.value;
        circleSprinkler.classList.toggle("selected");
        startSprinklerTimer(sprinklerTimes[sprinklerId], sprinklerId);
    } else {
        sprinklerAutoButton.textContent = 'Activate';
        sprinklerAutoButton.classList.remove("activated");
        circleSprinkler.classList.remove("selected");
        clearInterval(intervalIdSprinkler);
    }
}


for (let i = 0; i < autoSprinklerButtons.length; i++) {
    autoSprinklerButtons[i].addEventListener("click", function () {
        sprinklerActivation(autoSprinklerButtons[i], circlesSprinklers[i], sprinklerButtons[i], sprinklerIntervalIds[i], sprinklerTimes[i], sprinklerTimeInputs[i], i);
    });
}



function stopAndResetTimerZone1() {
    clearInterval(intervalIdZone1);
    document.getElementById("c12").style.strokeDasharray = [100, 0];
    document.getElementById("c12").style.strokeDashoffset = 25;
}




function stopAndResetTimerZone2() {
    clearInterval(intervalIdZone2); 

    document.getElementById("c14").style.strokeDasharray = [100, 0];
    document.getElementById("c14").style.strokeDashoffset = 25;
}



function stopAndResetTimerZone3() {
    clearInterval(intervalIdZone3); 
    document.getElementById("c16").style.strokeDasharray = [100, 0];
    document.getElementById("c16").style.strokeDashoffset = 25;
}


emergencyFeedButton.addEventListener("click", function () {
    animalButtons.forEach((button) => {
        if (button.classList.contains("flash")) {
            button.classList.remove("flash");
        }
    });
    stopAndResetTimerGorilla();
    startTimerGorilla(gorillaFeedTime);

    stopAndResetTimerBird();
    startTimerBird(birdFeedTime);

    stopAndResetTimerDog();
    startTimerDog(dogFeedTime);
});


closeGate.addEventListener("click", function () {
    gateButtons.forEach((button) => {
        button.classList.toggle("flash", false);

        const gateFeedback = button.parentElement.querySelector("#gateFeedback");
        
        if (gateFeedback.textContent !== 'Gate Closed') {
            gateFeedback.textContent = 'Gate Closed';
        }
    });
});



openGate.addEventListener("click", function () {
    gateButtons.forEach((button) => {
        button.classList.toggle("flash", true);

        const gateFeedback = button.parentElement.querySelector("#gateFeedback");
        
        if (gateFeedback.textContent !== 'Gate Open') {
            gateFeedback.textContent = 'Gate Open';
        }
    });
});




onSprinkler.addEventListener("click", function () {
    sprinklerButtons.forEach((button) => {
        if (button.classList.contains("flash")) {
            button.classList.remove("flash");
        }
    });
    stopAndResetTimerZone1();
    startTimerZone1(zone1Time);

    stopAndResetTimerZone2();
    startTimerZone2(zone2Time);

    stopAndResetTimerZone3();
    startTimerZone3(zone3Time);
});



































function startTimerZone1(duration) {
    var time = duration;
    var i = 1;
    var k = 100 - ((i / duration) * 100); 
    var l = 100 - k;
    i++;

    document.getElementById("c12").style.strokeDasharray = [100, 0];

    document.getElementById("c12").style.strokeDashoffset = 0; 
    zone1Instructions.textContent = "Water Zone 1 in " + (time) + " seconds";
    intervalIdZone1 = setInterval(function () {
        if (i < time / 2){  
            zone1Button.classList.toggle("tooSoon", true);
        }
        if (i > time / 2){
            zone1Button.classList.toggle("tooSoon", false);
        }

        if (i > time) {
            clearInterval(intervalIdZone1);
            if (autoSprinklerButtons[0].classList.contains("activated")) {
                zone1Time = zone1TimeInput.value;
                startTimerZone1(zone1Time);
            } else {
                zone1Button.classList.toggle("flash");
                zone1Instructions.textContent = "WATER NOW!";
                return;
            }
        }
        k = 100 - ((i / duration) * 100);
        l = 100 - k;

        document.getElementById("c12").style.strokeDasharray = [k, l];

        document.getElementById("c12").style.strokeDashoffset = 0; 
        if (zone1Instructions.textContent != "Do Not Overwater!") {
            zone1Instructions.textContent = "Water Zone 1 in " + (time - i + 1) + " seconds";
        }
        i++;
    }, 1000);

    zone1Button.addEventListener("click", function () {
        if (zone1Button.classList.contains("tooSoon")) {
            zone1Instructions.textContent = "Do Not Overwater!";

            setTimeout(() => {
                zone1Instructions.textContent = zone1Instructions.textContent = "Water Zone 1 in " + (time - i + 1) + " seconds";
            }
            , 2000);
            return;}
        if (zone1Button.classList.contains("flash")) {
            zone1Button.classList.remove("flash"); 
        }
        clearInterval(intervalIdZone1); 
        zone1Time = zone1TimeInput.value;
        startTimerZone1(zone1Time);
    });
}



















function startTimerZone2(duration) {
    var time = duration;
    var i = 1;
    var k = 100 - ((i / duration) * 100);
    var l = 100 - k;
    i++;

    document.getElementById("c14").style.strokeDasharray = [100, 0];

    document.getElementById("c14").style.strokeDashoffset = 0; 
    zone2Instructions.textContent = "Water Zone 2 in " + (time) + " seconds";
    intervalIdZone2 = setInterval(function () {
        if(i < time / 2){
            zone2Button.classList.toggle("tooSoon", true);      
        }
        if(i > time / 2){
            zone2Button.classList.toggle("tooSoon", false);      
        }
        if (i > time) {
            clearInterval(intervalIdZone2);
            if (autoSprinklerButtons[1].classList.contains("activated")) {
                zone2Time = zone2TimeInput.value;
                startTimerZone2(zone2Time);
            } else {
                zone2Button.classList.toggle("flash");
                zone2Instructions.textContent = "WATER NOW!";
                return;
            }
        }
        k = 100 - ((i / duration) * 100);
        l = 100 - k;

        document.getElementById("c14").style.strokeDasharray = [k, l];

        document.getElementById("c14").style.strokeDashoffset = 0; 
        if (zone2Instructions.textContent != "Do Not Overwater!") {
            zone2Instructions.textContent = "Water Zone 2 in " + (time - i + 1) + " seconds";
        }
        i++;
    }, 1000);

    zone2Button.addEventListener("click", function () {
        if (zone2Button.classList.contains("tooSoon")) {
            zone2Instructions.textContent = "Do Not Overwater!";

            setTimeout(() => {
                zone2Instructions.textContent = zone2Instructions.textContent = "Water Zone 2 in " + (time - i + 1) + " seconds";
            }
            , 2000);
            return;}
        if (zone2Button.classList.contains("flash")) {
            zone2Button.classList.remove("flash"); 
        }
        clearInterval(intervalIdZone2); 
        zone2Time = zone2TimeInput.value;
        startTimerZone2(zone2Time);
    });
}













function startTimerZone3(duration) {
    var time = duration;
    var i = 1;
    var k = 100 - ((i / duration) * 100); 
    var l = 100 - k;
    i++;

    document.getElementById("c16").style.strokeDasharray = [100, 0];

    document.getElementById("c16").style.strokeDashoffset = 0; 
    zone3Instructions.textContent = "Water Zone 3 in " + (time) + " seconds";
    intervalIdZone3 = setInterval(function () {
        if (i < time / 2){
            zone3Button.classList.toggle("tooSoon", true);
        }
        if (i > time / 2){
            zone3Button.classList.toggle("tooSoon", false);
        }
        if (i > time) {
            clearInterval(intervalIdZone3);
            if (autoSprinklerButtons[2].classList.contains("activated")) {
                zone3Time = zone3TimeInput.value;
                startTimerZone3(zone3Time);
            } else {
                zone3Button.classList.toggle("flash");
                zone3Instructions.textContent = "WATER NOW!";
                return;
            }
        }
        k = 100 - ((i / duration) * 100);
        l = 100 - k;

        document.getElementById("c16").style.strokeDasharray = [k, l];

        document.getElementById("c16").style.strokeDashoffset = 0; 
        if (zone3Instructions.textContent != "Do Not Overwater!") {
            zone3Instructions.textContent = "Water Zone 3 in " + (time - i + 1) + " seconds";
        }
        i++;
    }, 1000);

    zone3Button.addEventListener("click", function () {
        if (zone3Button.classList.contains("tooSoon")) {
            zone3Instructions.textContent = "Do Not Overwater!";

            setTimeout(() => {
                zone3Instructions.textContent = zone3Instructions.textContent = "Water Zone 3 in " + (time - i + 1) + " seconds";
            }
            , 2000);
            return;}
        if (zone3Button.classList.contains("flash")) {
            zone3Button.classList.remove("flash"); 
        }
        clearInterval(intervalIdZone3); 
        zone3Time = zone3TimeInput.value;
        startTimerZone3(zone3Time);
    });
}








function openZone1Modal() {
    document.getElementById('zone1Modal').style.display = 'block';
    document.getElementById('zone1Overlay').style.display = 'block';
  }

function closeZone1Modal() {
    document.getElementById('zone1Modal').style.display = 'none';
    document.getElementById('zone1Overlay').style.display = 'none';
  }


function openZone2Modal() {
    document.getElementById('zone2Modal').style.display = 'block';
    document.getElementById('zone2Overlay').style.display = 'block';
  }

function closeZone2Modal() {
    document.getElementById('zone2Modal').style.display = 'none';
    document.getElementById('zone2Overlay').style.display = 'none';
  }



function openZone3Modal() {
    document.getElementById('zone3Modal').style.display = 'block';
    document.getElementById('zone3Overlay').style.display = 'block';
  }

function closeZone3Modal() {
    document.getElementById('zone3Modal').style.display = 'none';
    document.getElementById('zone3Overlay').style.display = 'none';
  }

