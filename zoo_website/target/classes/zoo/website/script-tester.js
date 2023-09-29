// Get all the gate buttons
const gateButtons = document.querySelectorAll(".gate-button");

// Add a click event listener to each gate button
gateButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.classList.toggle("flash");
    });
});


var intervalId;

function startTimer(duration) {
    var time = duration;
    var i = 1;
    var k = 100 - ((i / duration) * 100); // Adjust for the initial stroke-dashoffset
    var l = 100 - k;
    i++;

    document.getElementById("c2").style.strokeDasharray = [k, l];

    document.getElementById("c2").style.strokeDashoffset = 25; // Set the initial stroke-dashoffset

    intervalId = setInterval(function () {
        if (i > time) {
            clearInterval(intervalId);
            return;
        }
        k = 100 - ((i / duration) * 100);
        l = 100 - k;

        document.getElementById("c2").style.strokeDasharray = [k, l];

        document.getElementById("c2").style.strokeDashoffset = 25; // Maintain the same initial offset
        console.log(k, l);
        i++;
    }, 1000);
}

startTimer(300);

// Add an event listener to the button element
document.querySelector(".food-button").addEventListener("click", function () {
    clearInterval(intervalId); // Clear the interval to stop the timer
    // Reset the timer by starting it again
    startTimer(300);
});

