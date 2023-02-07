const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.Boton, .botonOperador');
const botones = document.querySelectorAll('.Boton, .botonOperador');

let firstValue = null;
let operator = null;
let waitingForSecondValue = false;


botones.forEach(boton => {
    boton.addEventListener('click', function() {
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 200);
    });
});


buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const value = event.target.innerText;

        if (isNaN(parseInt(value))) {
            handleOperator(value);
        } else {
            handleNumber(value);
        }
    });
});

function handleNumber(value) {
    if (waitingForSecondValue) {
        display.innerText = value;
        waitingForSecondValue = false;
    } else {
        display.innerText === '0'
            ? (display.innerText = value)
            : (display.innerText += value);
    }
}

function handleOperator(value) {
    if (!firstValue) {
        firstValue = parseInt(display.innerText);
        operator = value;
        waitingForSecondValue = true;
    } else {
        const secondValue = parseInt(display.innerText);
        display.innerText = calculate(firstValue, operator, secondValue);
        firstValue = parseInt(display.innerText);
        operator = value;
        waitingForSecondValue = true;
    }
}

function calculate(firstValue, operator, secondValue) {
    switch (operator) {
        case '+':
            return firstValue + secondValue;
        case '-':
            return firstValue - secondValue;
        case 'x':
            return firstValue * secondValue;
        case '/':
            return firstValue / secondValue;
    }
}

document.querySelector('#clear').addEventListener('click', () => {
    display.innerText = '0';
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
});
