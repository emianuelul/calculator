const buttonSection = document.querySelector('.numbers');
const operationSection = document.querySelector('.ops');
let buttonList;

const resultBar = document.querySelector('.result');

const operations = ['AC','+', '-', '*', '/', '='];
const priority = {
    '+':1,
    '-':1,
    '*':2,
    '/':2,
}

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
    resultBar.textContent = '';
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

function computeFormula(input){
    // build the formula
    let formula = [];
    for(let i = 0; i < input.length; i++){
        let number = new String();

        if((i === 0 || operations.includes(input[i-1])) && input[i] === '-'){
            number += '-'
            i++;
        }
        while(isDigit(input[i]) && i < input.length){
            number += input[i];
            i++;
        }
        formula.push(parseInt(number));
        
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
                    result.push(a/b);
                    break;
                }
            }
        }
    }
    return result.pop();
}

buttonList.forEach(element => {
    element.addEventListener('click', (event) => {
        const value = element.id[0];
        const text = resultBar.textContent;
        const lastChar = text[text.length - 1];
        const secondLast = text[text.length - 2];

        if(value >= '0' && value <= '9'){
            resultBar.textContent += value;
        }
        else if(operations.includes(value) && value !== '='){
            if(text.length === 0 && value !== '-')
                return;

            if(value === '-'){
                if(!(lastChar === '-' && secondLast === '-')){
                    resultBar.textContent += value;
                }
            }
            else{
                if(!operations.includes(lastChar)){
                    resultBar.textContent += value;
                }
            }
        }
        else if(value === '='){
            resultBar.textContent = computeFormula(text);
        }
        else if(value === 'A'){
            clearScreen();
        }

        resultBar.scrollLeft = resultBar.scrollWidth;

    });
});





