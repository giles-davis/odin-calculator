// global variables
const maxInput = 12;
let previousNum = null;
let currentNum = null;
let operator = null;
let startNewNum = true;

// DOM elements
const display = document.querySelector('.input');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('[data-action=operator]');
const equalsButton = document.querySelector('.equals');
const btnRed = document.querySelector('.btn-red');
const clearBtn = document.querySelector('[data-action="clear"]');
const deleteBtn = document.querySelector('[data-action="delete"]');


// handler functions
function handleNumber(event) {
    const number = event.target.getAttribute('data-number');
    appendNumber(number);
}

function clearAll() {
    previousNum = null;
    currentNum = '0';
    operator = null;
    startNewNum = true;  
    display.textContent = '0'; 
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

function handleDeleteBtn() {
    let currentDisplay = display.textContent;
    
    // if only one digit or zero, set to '0'
    if (currentDisplay.length <= 1) {
        display.textContent = '0';
        startNewNum = true;
    } else {
        // remove the last character
        display.textContent = currentDisplay.slice(0, -1);
    }
}


function handleOperator(event) {
    const clickedOperator = event.target.textContent;
    
    // get current number from display
    currentNum = parseFloat(display.textContent);
    
    // if this is the first number
    if (previousNum === null) {
        previousNum = currentNum;
        operator = clickedOperator;
        display.textContent = currentNum + ' ' + clickedOperator;
        console.log('First number stored:', previousNum);
        console.log('Operator stored:', operator);
        startNewNum = true;
        return;
    }
    
    // If we already have a previous number and operator, calculate
    if (previousNum !== null && operator !== null) {
        let result;
        switch(operator) {
            case '+':
                result = previousNum + currentNum;
                break;
            case '-':
                result = previousNum - currentNum;
                break;
            case 'x':
                result = previousNum * currentNum;
                break;
            case '÷':
                result = previousNum / currentNum;
                break;
            case '%':
                result = previousNum * (currentNum / 100);
                break;
        }
        
        console.log('Calculation result:', result);
        display.textContent = result + ' ' + clickedOperator;
        previousNum = result;
        operator = clickedOperator;
        startNewNum = true;
    }
}

// Modify handleEquals function
function handleEquals() {
    if (previousNum === null || operator === null) return;
    
    currentNum = parseFloat(display.textContent);
    
    let result;
    switch(operator) {
        case '+':
            result = previousNum + currentNum;
            break;
        case '-':
            result = previousNum - currentNum;
            break;
        case 'x':
            result = previousNum * currentNum;
            break;
        case '÷':
            result = previousNum / currentNum;
            break;
    }
    
    display.textContent = result;
    previousNum = null;
    operator = null;
    startNewNum = true;
}

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

function operate(a, b, operator) {
    if (operator === '/' && b === 0) {
        return "Error";
    }
    
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return "Error";
    }
}
// event listeners

numberButtons.forEach(button => {
    button.addEventListener('click', handleNumber)
});

operatorButtons.forEach(button => {
    button.addEventListener('click', handleOperator);
});

clearBtn.addEventListener("click", clearAll);

deleteBtn.addEventListener("click", handleDeleteBtn);

equalsButton.addEventListener('click', handleEquals);

