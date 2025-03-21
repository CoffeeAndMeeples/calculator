let userNumber1 = "";
let userNumber2 = "";
let userOperator = "";
let finalResult = "";
const display = document.querySelector(".display");

function clearGlobals() {
    userNumber1 = "";
    userNumber2 = "";
    userOperator = "";
    finalResult = "";
    return
}
function add(num1, num2) {
    console.log(num1, num2)
    let rounded = (Number(num1) + Number(num2)).toFixed(8)
    while (rounded.at(-1) == "0" || rounded.at(-1) == ".") {
        rounded = rounded.slice(0,-1);
    }
    return rounded
}

function subtract(num1, num2) {
    let rounded = (Number(num1) - Number(num2)).toFixed(8)
    while (rounded.at(-1) == "0" || rounded.at(-1) == ".") {
        rounded = rounded.slice(0,-1);
    }
    return rounded
}

function multiply(num1, num2) {
    let rounded = (Number(num1) * Number(num2)).toFixed(8)
    while (rounded.at(-1) == "0" || rounded.at(-1) == ".") {
        rounded = rounded.slice(0,-1);
    }
    return rounded
}

function divide(num1, num2) {
    let rounded = (Number(num1) / Number(num2)).toFixed(8)
    while (rounded.at(-1) == "0" || rounded.at(-1) == ".") {
        rounded = rounded.slice(0,-1);
    }
    return rounded
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
    
    display.textContent = result;
    //reset global variables
    clearGlobals();

    return result
}
const buttons = document.querySelectorAll("button");

//Operator buttons with decision tree for each non-numeric button
buttons.forEach((button => {
    if (button.id == "=") {
        button.addEventListener("click", () => {
            if (userNumber1 != "" && userOperator != "" && display.textContent != "") {
                userNumber2 = display.textContent;
                finalResult = operate(userNumber1, userOperator, userNumber2);
                userNumber1 = finalResult;
                userNumber2 = "";
                userOperator = "";
            }
            else {
                
                display.textContent = "ERROR";
            }
        })
    }
    else if (button.id == ".") {
        button.addEventListener("click", () => {
            
            //if there's no decimal in the current number
            if (!display.textContent.includes(".")) {
                display.textContent = display.textContent + ".";
                if (userOperator == "") {
                    userNumber1 = display.textContent;
                }
                else {
                    display.textContent = button.id;
                    userNumber2 = display.textContent;
                }
            }
            //there's a decimal, but it's before an operator
            else if (userOperator != "") {
                display.textContent = button.id;
                userNumber2 = display.textContent; 

            }
            //if there is a decimal in the current number
            else {
                return
        }
        })
    }
    else if (button.id == "c") {
        button.addEventListener("click", () => {
            clearGlobals();
            
            display.textContent = "";

        })
    }
    else if (button.id == "+" ||
             button.id == "-" ||
             button.id == "x" ||
             button.id == "/") {
                button.addEventListener("click", () => {
                    
                    //there is a num1 but no num2 and no operator
                    if (userNumber1 != "" && userNumber2 == "" && userOperator == ""){
                        userOperator = button.id;
                        display.textContent = display.textContent + " " + button.id;
                    }
                    //2 numbers and operator are queued up: run the function, set the total to a new num1
                    //and set the operator to the button pushed
                    else if (userNumber1 != "" && userNumber2 != "") {
                        let finalResult = operate(userNumber1, userOperator, userNumber2);
                        userNumber1 = finalResult;
                        userNumber2 = "";
                        userOperator = button.id;
                
                    }
                    //operators are pressed consecutively
                    else if (userNumber1 != "" && userNumber2 == "" && userOperator != "") {
                        userOperator = button.id;
                        display.textContent = userNumber1 + " " + button.id;
                    }
                   
                    //if the user punches an operator as first action after clear
                    else {
                    
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

//scenarios if user enters a number
function populateDisplay(id) {
    //There is an existing error-clear the error and start a new function
    if (display.textContent == "ERROR") {
        clearGlobals();
        display.textContent = "";
    }
    
    //starting the 2nd number
    if (userNumber1 != "" && userOperator != "" && userNumber2 == "") {
        display.textContent = id;
        userNumber2 = display.textContent;
    }
    //continuing the 2nd number
    else if (userNumber1 != "" && userOperator != "" && userNumber2 != "") {
        display.textContent = display.textContent + id;
        userNumber2 = display.textContent;
    }
    
    //starting the 1st number
    else if (userNumber1 == ""){
    display.textContent = id;
    userNumber1 = id;
    }
    //continuing the 1st number
    else {
        display.textContent = display.textContent + id;
        userNumber1 = display.textContent;
    }
}
