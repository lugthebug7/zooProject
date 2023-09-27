// script.js
const circle = document.querySelector('.circle');

function depletePerimeter() {
    const initialDashArray = 600; // Set to the circumference of the circle (2 * π * r)
    let dashOffset = initialDashArray;

    const timer = setInterval(() => {
        if (dashOffset > 0) {
            dashOffset -= 1; // Decrease dash offset to reveal the perimeter
            circle.style.strokeDashoffset = dashOffset;
        } else {
            clearInterval(timer);
        }
    }, 1000); // Adjust the interval for smoother animation
}

// Start the depletion on page load or as needed
window.addEventListener('load', depletePerimeter);