const buttonSection = document.querySelector('.numbers');
const operationSection = document.querySelector('.ops');
let buttonList;

const resultBar = document.querySelector('.result');

const operations = ['AC','+', '-', '*', '/', '='];



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
            console.log('ok');
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

function computeFormula(input){
    let formula = input.split('+');
    console.log(formula);
}

buttonList.forEach(element => {
    element.addEventListener('click', (event) => {
        if((element.id[0] >= '0' && element.id[0] <='9') || (operations.includes(element.id[0]) && element.id[0] !== '=') ||
            element.id[0] === '.'){
            resultBar.textContent += element.id[0];
            resultBar.scrollLeft = resultBar.scrollWidth;
        }
        else if(element.id[0] === '='){
            computeFormula(resultBar.textContent);
        }
        else if(element.id[0] === 'A'){
            clearScreen();
        }
    })
});




