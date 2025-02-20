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

let leftOperand;
let operator;
let rightOperand;


window.addEventListener("load", () => {
    const buttonsDiv = document.querySelector(".buttons");
    const displayDiv = document.querySelector(".display");
    buttonsDiv.addEventListener("click", (event) => {
        if (typeof event.target.textContent === "string" && 
            event.target.textContent.length === 1) {
            const characterClicked = event.target.textContent;
            displayDiv.textContent += characterClicked;
        }
    });
});
