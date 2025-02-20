const operators = ["+", "-", "*", "/", "="];
const validCharacters = "0123456789+-/*=.c"
let leftOperand = "";
let operator = "";
let rightOperand = "";
let result = 0;
let leftOperandSet = false;
let clearDisplayOnNextDigit = false;
let lastOperation = "";

function add(numA, numB) {
    return numA + numB;
}

function subtract(numA, numB) {
    return numA - numB;
}

function multiply(numA, numB) {
    return numA * numB;
}

function divide(numA, numB) {
    return numA / numB;
}

function operate(leftOperand, operator, rightOperand) {
    leftOperand = Number(leftOperand);
    rightOperand = Number(rightOperand);
    switch (operator) {
        case '+':
            return Math.round(add(leftOperand, rightOperand) * 100) / 100;
        case '-':
            return Math.round(subtract(leftOperand, rightOperand) * 100) / 100;
        case '*':
            return Math.round(multiply(leftOperand, rightOperand) * 100) / 100;
        case '/':
            if (rightOperand === 0) {
                alert("Cannot divide by zero!!!!!!!!!!!!!!!!!");
                return "";
            }
            else
            {
                return Math.round(divide(leftOperand, rightOperand) * 100) / 100;
            }
    }
}

function addTextToDiv(div, text) {
    div.textContent += text;
}

function clearTextFromDiv(div) {
    div.textContent = "";
}

function resetData() {
    leftOperand = "";
    operator = "";
    rightOperand = "";
    result = 0;
    leftOperandSet = false;
    // rightOperandSet = false;
    clearDisplayOnNextDigit = false;
}

function calculateResult(leftOperand, operator, rightOperand) {
    result = operate(leftOperand, operator, rightOperand);
}

function displayResults(displayDiv) {
    clearTextFromDiv(displayDiv);
    addTextToDiv(displayDiv, result);
}

function calculator(event) {
    const displayDiv = document.querySelector(".display");
    if (typeof event.target.textContent === "string" && 
        event.target.textContent.length === 1) {
        // A button has been clicked, and its not the clear button.
        const displayDivContent = displayDiv.textContent;
        const characterClicked = event.target.textContent;

        if (!operators.includes(characterClicked)) {
            // A digit or decimal has been entered.
            if (!displayDivContent.includes(".") || characterClicked !== ".") {
                if (lastOperation === "=") {
                    clearTextFromDiv(displayDiv);
                    resetData();
                    lastOperation = "";
                    leftOperand += characterClicked;
                }
                else {
                    if (clearDisplayOnNextDigit) {
                        clearTextFromDiv(displayDiv);
                        clearDisplayOnNextDigit = false;
                    }
                    if (!leftOperandSet) {
                        leftOperand += characterClicked;
                    }
                    else {
                        rightOperand += characterClicked;
                    }
                }
                addTextToDiv(displayDiv, characterClicked);
            }
        }
        else if (operators.includes(characterClicked)) {
            // An operator has been clicked.
            lastOperation = characterClicked;
            if (!leftOperandSet) {
                clearDisplayOnNextDigit = true;
                leftOperandSet = true;
                operator = characterClicked;
            }
            else if (rightOperand !== "") {
                // Operator is either = or there is already an expression such as
                // 5 + 3.
                calculateResult(leftOperand, operator, rightOperand);
                if (result === "") {
                    clearTextFromDiv(displayDiv);
                    resetData();
                }
                else {
                    temp = result;
                    displayResults(displayDiv);
                    resetData();
                    if (characterClicked !== "=") {
                        operator = characterClicked;
                    }
                    leftOperand = temp;
                    leftOperandSet = true;
                    clearDisplayOnNextDigit = true;
                }
            }
            else {
                leftOperandSet = true;
                operator = characterClicked;
            }
        }
    }
    else if (event.target.textContent === "Clear") {
        clearTextFromDiv(displayDiv);
        resetData();
    }
    else if (event.target.textContent === "<----") {
        if (leftOperandSet) {
            clearTextFromDiv(displayDiv);
            addTextToDiv("0");
            rightOperand = "";
            clearDisplayOnNextDigit = true;
        }
        else {
            clearTextFromDiv(displayDiv);
            leftOperand = "";
            clearDisplayOnNextDigit = true;
        }
    }
}

window.addEventListener("load", () => {
    const buttonsDiv = document.querySelector(".buttons");
    buttonsDiv.addEventListener("click", calculator);
});
