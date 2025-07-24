let result = 0;
let currentNumber = '0';


function addDigit(digit) {
    if (currentNumber == '0' && digit == '0') {
    } else if (currentNumber == '0') {
        currentNumber = '' + digit;
    } else {
        currentNumber += digit;
    }
    setDisplay();
}

function setDisplay() {
    document.getElementById('currentNumber').innerHTML = currentNumber;
    document.getElementById('display').innerHTML = result;
}

function add() {
    result = Number(result) + Number(currentNumber);
    currentNumber = '0';

    setDisplay();
}

