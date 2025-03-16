let num1;
let num2;
let operator;

function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2
}

function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
    return num1 / num2
}

function operate(num1, operator, num2) {
    let result;
    switch (operator) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "*":
            result = multiply(num1, num2);
            break;
        case "/":
            result = divide(num1, num2);
            break;
    }
    return result
}
const buttons = document.querySelectorAll("button");
buttons.forEach((button => {
    button.addEventListener("click", () => {
        populateDisplay(button.id)
    }) 
}))

function populateDisplay(id) {
    let display = document.querySelector(".display");
    display.textContent = display.textContent + id;
}
console.log(operate(8, "+", 4));
console.log(operate(8, "-", 4));
console.log(operate(8, "*", 4));
console.log(operate(8, "/", 4));