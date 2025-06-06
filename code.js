const buttonSection = document.querySelector('.numbers');
const operationSection = document.querySelector('.ops');
const result = document.querySelector('.equals');
const equation = document.querySelector('.equation');
let buttonList;

equation.textContent = '\n';

const resultBar = document.querySelector('.result');

const operations = ['⌫','+', '-', '*', '/', '='];
const priority = {
    '+':1,
    '-':1,
    '*':2,
    '/':2,
}

let canFloat = false;

function initializeButtons(){
    for(let i = 9; i >= -1; i--){
        let button = document.createElement('button');
        button.id = `${i}-key`;
        button.classList.add(`blur`);
        button.textContent = i;
        buttonSection.appendChild(button);
        if(i === -1){
            button.id = `.-key`;
            button.textContent = '.';
        }
    }

    for(let i = 0; i < 6; i++){
        let button = document.createElement('button');
        button.id = `${operations[i]}-key`;
        button.classList.add(`blur`);
        if(operations[i] === '='){
            button.style.backgroundColor = 'rgba(59, 102, 194, 0.83)';
        }
        button.textContent = operations[i];
        operationSection.appendChild(button);
    }

    buttonList = document.querySelectorAll('button');
}
initializeButtons();

function clearScreen(){
    equation.textContent = ' ';
    result.textContent = '';
}

function isDigit(a){
    return a >= '0' && a <= '9';
}

function postfix(formula){
    let postfixat = [];
    let operators = [];
    for(const item of formula){
        if(typeof item === 'number'){
            postfixat.push(item);
        } else {
            while (
                operators.length > 0 &&
                priority[item] <= priority[operators[operators.length - 1]]
            ) {
                postfixat.push(operators.pop());
            }
            operators.push(item);
        }
    }

    while(operators.length > 0){
        postfixat.push(operators.pop());
    }

    return postfixat;
}

function toTwoDecimalFloat(str) {
  return parseFloat(parseFloat(str).toFixed(2));
}

function computeFormula(input){
    // build the formula
    let formula = [];
    for(let i = 0; i < input.length; i++){
        let number = new String();

        if((i === 0 || operations.includes(input[i-1])) && input[i] === '-'){
            number += '-'
            i++;
        }
        while((isDigit(input[i]) || input[i] === '.') && i < input.length){
            number += input[i];
            i++;
        }

        formula.push(toTwoDecimalFloat(number));
    
        formula.push(input[i]);
    }

    formula.pop();
    console.log(formula);

    formula = postfix(formula);
    
    // compute the formula
    let result = [];
    for(const item of formula){
        if(typeof item === 'number'){
            result.push(item);
        }
        else{
            let b = result.pop();
            let a = result.pop();

            switch(item){
                case '+':{
                    result.push(a+b);
                    break;
                }
                case '-':{
                    result.push(a-b);
                    break;
                }
                case '*':{
                    result.push(a*b);
                    break;
                }
                case '/':{
                    if(b === 0){
                        alert("Can't divide by 0");
                    }
                    else{
                        result.push(a/b);
                    }
                    break;
                }
            }
        }
    }
    result = result.pop();

    return parseFloat(result.toFixed(2));
}

buttonList.forEach(element => {
    element.addEventListener('click', (event) => {
        const value = element.id[0];
        const text = result.textContent;
        const lastChar = text[text.length - 1];
        const secondLast = text[text.length - 2];

        if(value >= '0' && value <= '9'){
            result.textContent += value;
        }
        else if(value === '.'){
            if(text.length > 0)
                if(lastChar !== '.' && canFloat === false){
                    result.textContent += value;
                    canFloat = true;
                }
        }
        else if(operations.includes(value) && value !== '=' && value !== '⌫'){
            if(text.length === 0 && value !== '-')
                return;

            if(value === '-'){
                if(!(lastChar === '-' && secondLast === '-')){
                    result.textContent += value;
                }
            }
            else{
                if(!operations.includes(lastChar)){
                    result.textContent += value;
                }
            }
        }
        else if(value === '='){
            if(operations.includes(text[text.length-1])){
                return;
            }
            else{
                equation.textContent = text;
                result.textContent = computeFormula(text);
            }
        }

        if(operations.includes(value)){
            canFloat = false;
        }

        resultBar.scrollLeft = resultBar.scrollWidth;

    });
});

let holdInterval;
const deleteKey = document.querySelector('#⌫-key');
deleteKey.addEventListener('mousedown', () => {

    if(result.textContent.length > 0 && equation.textContent.length > 0){
        clearScreen();
    }

    if(result.textContent.length > 0)
        result.textContent = result.textContent.slice(0, -1);

    holdInterval = setTimeout(() => {
        clearScreen();
    }, 750);
});

deleteKey.addEventListener('mouseup', () => {

    clearTimeout(holdInterval);
});
deleteKey.addEventListener('mouseleave', () => {

    clearTimeout(holdInterval);
});

document.addEventListener("keydown", (event) => {
    if(event.repeat){
        return;
    }
    const key = event.key;
    let keyId;
    
    if(key === 'Enter' || key === '='){
        keyId = '=-key';
    }
    else if(key === "Backspace"){
        keyId = '⌫-key';
    }
    else{
        keyId = `${key}-key`
    }

    const button = document.getElementById(keyId);
    if(keyId === '⌫-key'){
        button.classList.add('active');
        
        if(result.textContent.length > 0 && equation.textContent.length > 0){
            clearScreen();
        }

        if(result.textContent.length > 0){
            result.textContent = result.textContent.slice(0, -1);
        }

        holdInterval = setTimeout(() => {
            clearScreen();
        }, 750);
    }
    else
        if (button) {
            button.click();
        }
});


document.addEventListener("keyup", (event) => {
    const key = event.key;
    let keyId;
    
    if(key === 'Enter' || key === '='){
        keyId = '=-key';
    }
    else if(key === "Backspace"){
        keyId = '⌫-key';
        clearTimeout(holdInterval);
    }
    else{
        keyId = `${key}-key`
    }

    const button = document.getElementById(keyId);
    if (button) {
        button.classList.remove('active');
    }
});