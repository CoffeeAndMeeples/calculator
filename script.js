let userNumber1 = "";
let userNumber2 = "";
let userOperator = "";
let finalResult;
const display = document.querySelector(".display");

function clearGlobals() {
    userNumber1 = "";
    userNumber2 = "";
    userOperator = "";
    return
}
function add(num1, num2) {
    return parseInt(num1) + parseInt(num2)
}

function subtract(num1, num2) {
    return parseInt(num1) - parseInt(num2)
}

function multiply(num1, num2) {
    return parseInt(num1) * parseInt(num2)
}

function divide(num1, num2) {
    return parseInt(num1) / parseInt(num2)
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
        case "x":
            result = multiply(num1, num2);
            break;
        case "/":
            result = divide(num1, num2);
            break;
    }
    //let display = document.querySelector(".display");
    display.textContent = result;
    //reset global variables
    clearGlobals();

    return result
}
const buttons = document.querySelectorAll("button");
buttons.forEach((button => {
    if (button.id == "=") {
        button.addEventListener("click", () => {
            if (userNumber1 != "" && userOperator != "" && display.textContent != "") {
                userNumber2 = display.textContent;
                operate(userNumber1, userOperator, userNumber2);
            }
            else {
                //let display = document.querySelector(".display");
                display.textContent = "ERROR";
            }
        })
    }
    else if (button.id == ".") {
        return
    }
    else if (button.id == "c") {
        button.addEventListener("click", () => {
            clearGlobals();
            //let display = document.querySelector(".display");
            display.textContent = "";

        })
    }
    else if (button.id == "+" ||
             button.id == "-" ||
             button.id == "x" ||
             button.id == "/") {
                button.addEventListener("click", () => {
                    if (userNumber1 != "" && userNumber2 == ""){
                        userOperator = button.id;
                        //let display = document.querySelector(".display");
                        userNumber1 = display.textContent;
                        display.textContent = display.textContent + " " + button.id;
                    }
                    else if (userNumber1 != "" && userNumber2 == "") {
                        let newUserNumber1 = operate(userNumber1, userOperator, userNumber2);
                        userNumber1 = newUserNumber1;
                        userNumber2 = "";
                        userOperator = button.id;
                    }
                    else {
                        //let display = document.querySelector(".display");
                        display.textContent = "ERROR"
                        clearGlobals();
                    }
                })
             }
    else {
    button.addEventListener("click", () => {
        populateDisplay(button.id)
    })
}    
}))

function populateDisplay(id) {
    //let display = document.querySelector(".display");
    if (userNumber1 != "" && userOperator != "" && userNumber2 == "") {
        display.textContent = id;
        userNumber2 = display.textContent;
    }
    else if (userOperator == ""){
    display.textContent = display.textContent + id;
    userNumber1 = display.textContent;
    }
    else {
        display.textContent = display.textContent + id;
    }
}
