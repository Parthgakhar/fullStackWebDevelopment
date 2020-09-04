let expression = document.querySelector(".expression");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const brackets = document.querySelectorAll(".brackets");
const decimal = document.querySelector(".decimal");
const equalTo = document.querySelector(".equalTo");
const back = document.querySelector(".backspace");
const allClear = document.querySelector(".allclear");

init();

function init() {
    handleEventListeners();
}
function concatNewValue(input) {
    expression.value += input;
}


function isLastItemClosedBracket() {
    let lastItem = expression.value.slice(-1);
    if (lastItem == ")") {
        return true;
    }
    else {
        return false;
    }
}
function isLastItemNumberOrDec() {
    let lastItem = expression.value.slice(-1);
    let numbersAndDec = ['1','2','3','4','5','6','7','8','9','.'];
    if(numbersAndDec.includes(lastItem)) {
        return true;
    }
    else {
        return false;
    }
}

function handleNumber(e) {
    let input = e.target.innerText;
    //When a number is entered and expression value is 0 or ERROR, it will be replaced by the input
    if (expression.value == '0' || expression.value == "ERROR") {
        expression.value = input;
    }
    //When a number is added directly after a closed bracket
    else if (isLastItemClosedBracket()) {
        expression.value = expression.value + "×" + input;
    }
    //When a number is entered and expression already contains some value, it will be concatinated to it.
    else {
        concatNewValue(input);
    }
}
function handleOperator(e) {
    let input = e.target.innerText;
    let operations = ['+', '-', '×', '÷'];
    let lastItem = expression.value.slice(-1);

    //Condition to handle when a user puts simultaneous operators together(will replace the last operator)
    if (operations.includes(lastItem)) {
        expression.value = expression.value.substring(0, expression.value.length - 1) + input;
    }
    //Helps to not put any operator immediately after the '('
    else if(lastItem == "("){
        expression.value = expression.value;
    }
    else if (expression.value == "ERROR") {
        expression.value = "0" + input;
    }
    else {
        concatNewValue(input);
    }
}

function handleBracket(e) {
    let input = e.target.innerText;
    //Determines no. of open and closed brackets
    let openBrackets = (expression.value.match(/\(/g) || []).length;
    let closedBrackets = (expression.value.match(/\)/g) || []).length
    
    //Condition when there is a open bracket
    if (input == '(') {
        //When expression is in ALl-clear state i.e. 0, then open-bracket will replace it
        if (expression.value == '0') {
            expression.value = '('
        }
        else if (expression.value != '0') {
            //If last item is a closed bracket or number or decimal,then a mulitiplication sign will be added before putting the open bracket
            if (isLastItemClosedBracket() || isLastItemNumberOrDec()) {
                expression.value = expression.value + "×" + input;
            }
            else{
            concatNewValue(input);
        }
    }
    }
    //Condition to put closed bracket(Open bracket>=closed bracket) and last item should not be open-bracket
    else if (input == ')' && openBrackets != closedBrackets && expression.value.slice(-1) != "(") {
        concatNewValue(input);
    }
}
function handleDecimal() {
    let input = '.';
    let operations = ['+', '-', '×', '÷'];
    let lastDecimalIndex = expression.value.lastIndexOf('.');

    //Checking if there is a operator in after the last decimal(then only we can put the new decimal)
    let haveOperator = operations.some(operation =>
        expression.value.slice(lastDecimalIndex).includes(operation)
    )
    if (expression.value == "ERROR") {
        expression.value = "0" + input;
    }
    //When a decimal is added directly after a closed bracket
    else if (isLastItemClosedBracket()) {
        expression.value = expression.value + "×0" + input;
    }
    //Condition to check that no more than one decimal can be put in one number 
    else if (expression.value.indexOf('.') == -1 || haveOperator) {
        concatNewValue(input);
    }


}
function handleEvaluation() {
    try {
        expression.value = eval(expression.value.replace(/×/g, "*").replace(/÷/g, "/"));
    }
    catch {
        expression.value = "ERROR";
    }
}
function handleClear() {
    expression.value = "0";
}

function handleBackspace() {
    if (expression.value.length == 1 || expression.value == "ERROR") {
        expression.value = "0";
    }
    else {
        expression.value = expression.value.substring(0, expression.value.length - 1);
    }
}



function handleEventListeners() {
    numbers.forEach(number => {
        number.addEventListener('click', handleNumber);
    });

    operators.forEach(operator => {
        operator.addEventListener('click', handleOperator);
    });

    brackets.forEach(bracket => {
        bracket.addEventListener('click', handleBracket);
    })
    decimal.addEventListener('click', handleDecimal);

    equalTo.addEventListener('click', handleEvaluation);

    allClear.addEventListener('click', handleClear);

    back.addEventListener('click', handleBackspace);
}
