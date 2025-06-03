const buttonSection = document.querySelector('.numbers');

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiplay(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function initializeButtons(){
    for(let i = 9; i >= 0; i--){
        let button = document.createElement('button');
        button.classList.add(`${i}-key`);
        button.classList.add(`blur`);
        button.textContent = i;
        buttonSection.appendChild(button);
    }
}

initializeButtons();


