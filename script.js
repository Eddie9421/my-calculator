const operators = ["+", "-", "*", "/", "="];

let leftOperand = "";
let operator = "";
let rightOperand = "";
let result = 0;
let leftOperandSet = false;
// let rightOperandSet = false;
let clearDisplayOnNextDigit = false;

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
    leftOperand = parseInt(leftOperand);
    rightOperand = parseInt(rightOperand);
    switch (operator) {
        case '+':
            return add(leftOperand, rightOperand);
        case '-':
            return subtract(leftOperand, rightOperand);
        case '*':
            return multiply(leftOperand, rightOperand);
        case '/':
            return divide(leftOperand, rightOperand);
        
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

window.addEventListener("load", () => {
    const buttonsDiv = document.querySelector(".buttons");
    const displayDiv = document.querySelector(".display");
    buttonsDiv.addEventListener("click", (event) => {
        // const displayDivString = displayDiv.textContent;

        if (typeof event.target.textContent === "string" && 
            event.target.textContent.length === 1) {
            // A button has been clicked, and its not the clear button.
            const characterClicked = event.target.textContent;
            if (!operators.includes(characterClicked)) {
                // A digit has been entered.
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
                addTextToDiv(displayDiv, characterClicked);
            }
            else if (operators.includes(characterClicked)) {
                // An operator has been clicked.
                if (!leftOperandSet) {
                    clearDisplayOnNextDigit = true;
                    leftOperandSet = true;
                    operator = characterClicked;
                }
                else if (rightOperand !== "") {
                    // Operater is either = or there is already an expression such as
                    // 5 + 3.
                    calculateResult(leftOperand, operator, rightOperand);
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
    });
});
