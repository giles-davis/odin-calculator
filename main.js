// global variables
const maxInput = 12;
let currentNum = 0;
let operator = null;
let equalsPressed = false;
let startNewNum = true;

// DOM elements
const display = document.querySelector('.input');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelector('.arith');
const equalsButton = document.querySelector('.equals');
const btnRed = document.querySelector('.btn-red');

// handler functions

function handleNumber(event) {
    const number = event.target.getAttribute('data-number');
    appendNumber(number);
}


function appendNumber(number) {
    if (startNewNum) {
        display.textContent = number;
        startNewNum = false;
    } else {
        if (display.textContent.length < maxInput) {
            display.textContent = display.textContent === '0' ? 
                number : display.textContent + number;
        }
    }
};


// math functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// event listeners

numberButtons.forEach(button => {
    button.addEventListener('click', handleNumber)
});
// event lister declares