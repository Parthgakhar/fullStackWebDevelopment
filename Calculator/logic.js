let expression = document.querySelector(".expression");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const brackets = document.querySelectorAll(".brackets");
const decimal = document.querySelector(".decimal");
const equalTo = document.querySelector(".equalTo");
const back = document.querySelector(".backspace");
const allClear = document.querySelector(".allclear");
 
init();

function init(){
    handleEventListeners();
}
function concatNewValue(input){
    expression.value += input;
}

function handleNumber(e){
    let input = e.target.innerText;

    //When a number is entered and expression value is 0 or ERROR, it will be replaced by the input
    if(expression.value == '0' || expression.value == "ERROR"){
        expression.value = input;
    }
    //When a number is entered and expression already contains some value, it will be concatinated to it.
    else {
        concatNewValue(input);
    }
}
function handleOperator(e){
    let input = e.target.innerText;
    let operations = ['+','-','×','÷'];
    let lastItem = expression.value.slice(-1);

    //Condition to handle when a user puts simultaneous operators together(will replace the last operator)
    if(operations.includes(lastItem)){
       expression.value = expression.value.substring(0,expression.value.length-1)+input;
    }
    else if(expression.value == "ERROR"){
        expression.value = "0"+input;
    }
    else {
        concatNewValue(input);
    }
}

function handleBracket(){
    //Do be added
}
 function handleDecimal(){
   let input = '.';
   let operations = ['+','-','×','÷'];
   let lastDecimalIndex = expression.value.lastIndexOf('.');

   let haveOperator = operations.some(operation => 
        expression.value.slice(lastDecimalIndex).includes(operation)
    )
    if(expression.value == "ERROR"){
        expression.value = "0"+input;
    }
    //Condition to check that no more than one decimal can be put in one number 
    else if( expression.value.indexOf('.') == -1 || haveOperator){
       concatNewValue(input);
   }


 }
function handleEvaluation(){
  try {
    expression.value = eval(expression.value.replace("×","*").replace("÷","/"));
  }
  catch {
      expression.value = "ERROR";
  }
}
function handleClear() {
    expression.value = "0";
}

function handleBackspace(){
    if(expression.value.length == 1 || expression.value == "ERROR"){
        expression.value = "0";
    }
    else {
        expression.value = expression.value.substring(0,expression.value.length-1);
    }
}



function handleEventListeners(){
    numbers.forEach(number => {
        number.addEventListener('click',handleNumber);
    });
    
    operators.forEach(operator => {
        operator.addEventListener('click',handleOperator);
    });
    
    brackets.forEach(bracket => {
        bracket.addEventListener('click',handleBracket);
    })
    decimal.addEventListener('click',handleDecimal);
    
    equalTo.addEventListener('click',handleEvaluation);
    
    allClear.addEventListener('click',handleClear);
    
    back.addEventListener('click',handleBackspace);
}
