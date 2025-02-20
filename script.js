const operators = ["+", "-", "*", "/", "="];

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

// Returns the index of the first operator found in the string.
const getIndexOfOperator = (string) => {
    for (const operator of operators) {
        const indexOfOperator = string.indexOf(operator);
        if (indexOfOperator !== -1) {
            return indexOfOperator;
        }
    }
};

function addTextToDiv(div, text) {
    div.textContent += text;
}

let leftOperand;
let operator;
let rightOperand;
let result;

window.addEventListener("load", () => {
    const buttonsDiv = document.querySelector(".buttons");
    const displayDiv = document.querySelector(".display");
    buttonsDiv.addEventListener("click", (event) => {
        const displayDivString = displayDiv.textContent;
        if (typeof event.target.textContent === "string" && 
            event.target.textContent.length === 1) {
            const characterClicked = event.target.textContent;
            addTextToDiv(displayDiv, characterClicked);
            if (characterClicked === "=") {
                
                const indexOfOperator = getIndexOfOperator(displayDivString);
                leftOperand = displayDivString.substring(0, indexOfOperator);
                operator = displayDivString.at(indexOfOperator);
                rightOperand = displayDivString.substring(indexOfOperator + 1, displayDivString.length);
                result = operate(leftOperand, operator, rightOperand);
                addTextToDiv(displayDiv, result);
            }
        }
        else if (event.target.textContent === "Clear") {
            displayDiv.textContent = "";
        }
    });
});
