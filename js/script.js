const input = document.querySelector('.search-inp');
const keyboard = document.querySelector('.keyboard');
const keyButton = document.querySelector('.key-button');
const keyActive = document.querySelector('.key-active');
const backspace = document.querySelector('.backspace');
const tab = document.querySelector('.tab');
const capsLock = document.querySelector('.capsLock');
const shift = document.querySelectorAll('.shift');
const whitebutton = document.querySelector('.whitebutton');
const enter = document.querySelector('.enter');

let value = input.value;
let caps = false;
let shiftVal = false;

window.addEventListener('click', (event) => {
    const target = event.target;
    
    if (target === input || 
        target == keyButton || 
        target == keyButton.children[0] || 
        target == keyButton.children[0].children[0] || 
        target == keyButton.children[0].children[1] || 
        target == keyboard){

        keyboard.style.display = 'block';
        input.style.width = '800px';
        keyActive.style.bottom = '-100px';
        
        setTimeout(() => {
            keyboard.style.opacity = '1';
        }, 2000);

        keyboard.classList.add('active');
        input.classList.add('active');

    } else if (input.classList.contains('active') && keyboard.classList.contains('active') && target == document.querySelector('body')){

        keyboard.style.display = 'none';
        keyboard.style.opacity = '0';
        input.style.width = '400px';
        keyActive.style.bottom = '160px';
    }
});

backspace.addEventListener('click', () => {
    const subValue = value.substring(0, value.length - 1);
    input.value = subValue;
    value = subValue;
});

whitebutton.addEventListener('click', () => {
    const subValue = value.trim() + " ";
    value = subValue;
    input.value = value
});

capsLock.addEventListener('click', () => {
    if (caps){
        caps = false;
        initLoverCase()
    } else {
        caps = true;
        initUpperCase()
    }
});

shift.forEach(elem => {
    elem.addEventListener('click', () => {
        if (!caps && !shiftVal){
            caps = true;
            shiftVal  = true;
            initUpperCase()
        } else {
            initLoverCase();
            caps = false;
            shiftVal  = false;
        }
    });
});

tab.addEventListener('click', () => {
    const subValue = value.trim() + "   ";
    value = subValue;
    input.value = value
});

enter.addEventListener('click', () => {
    if (value === ''){
        input.style.border = '1px solid red';
        setTimeout(() => {
            input.style.border = '1px solid #2effaf';
        }, 3000)
    } else {
        const url = `https://www.google.ru/search?q=${value}`;
        window.open(url, '_blank')
    }
});

const renderInput = (id) => {
    input.value += id;
    value = input.value;
};

const renderKeyboard = () => {
    const rowOne = document.createElement('div');
    rowOne.className = 'row upperCase';
    rowOne.innerHTML = `
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
    `;

    const rowTwo = document.createElement('div');
    rowTwo.className = 'row upperCase';
    rowTwo.innerHTML = `
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
    `;

    const rowThree = document.createElement('div');
    rowThree.className = 'row upperCase';
    rowThree.innerHTML = `
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
        <button class="standart upp" data-num="??">??</button>
    `;
    const keyboard = [rowOne, rowTwo, rowThree];
    return keyboard
};

const initLoverCase = () => {
    const upperCase = document.querySelectorAll('.upperCase');
    upperCase.forEach(elem => {
        elem.parentNode.removeChild(elem);
    });
    const row = document.querySelectorAll('.loverCase');
    row.forEach((elem) => elem.style.display = 'flex');
};

const initUpperCase = () => {
    const capsKeyboard = renderKeyboard();

    const row = document.querySelectorAll('.loverCase');
    row.forEach((elem) => elem.style.display = 'none');

    const container = document.querySelector('.row-container');
    capsKeyboard.forEach(elem => {
        container.append(elem)
    });

    const button = document.querySelectorAll('.upp');
    button.forEach(elem => {
        elem.addEventListener('click', (event) => {
            if (shiftVal && caps){
                const id = event.target.dataset.num;
                renderInput(id);
                initLoverCase();
                shiftVal = false;
                caps = false;
            } else {
                const id = event.target.dataset.num;
                renderInput(id);
            }
        });
    });
};

const init = () => {
    const button = document.querySelectorAll('.standart');
    button.forEach((elem) => {
        elem.addEventListener('click', (event) => {
            const id = event.target.dataset.num;
            renderInput(id);
        });
    });
};

init()