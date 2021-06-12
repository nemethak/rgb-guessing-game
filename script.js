const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHigh = document.querySelector('.lowOrHigh');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField0 = document.querySelector('#guessField0');
const guessField1 = document.querySelector('#guessField1');
const guessField2 = document.querySelector('#guessField2');
const form = document.querySelector('form');
const doc = document.querySelector('html');
const colorField = document.querySelector('.color');
let resetButton, randomField, guessField, randomR, randomG, randomB;

startGame();

function checkGuess(e) {
    e.preventDefault();
    let userGuess;
    let numberToGuess;
    switch (randomField) {
        case 0:
            userGuess = Number(guessField0.value);
            numberToGuess = randomR;
            break;
        case 1:
            userGuess = Number(guessField1.value);
            numberToGuess = randomG;
            break;
        case 2:
            userGuess = Number(guessField2.value);
            numberToGuess = randomB;
            break;
    }

    if (guessCount === 1) {
        guesses.textContent = 'previous guesses: ';
    }
    guesses.textContent += userGuess + ' ';
    if (userGuess === numberToGuess) {
        lastResult.textContent = 'congrats! you guessed the number.';
        lastResult.style.color = 'rgba(109, 250, 172, 0.9)';
        lowOrHigh.textContent = '';
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = 'game over! you failed to guess the number.';
        setGameOver();
    } else {
        lastResult.textContent = 'wrong!';
        lastResult.style.color = 'rgba(250, 109, 109, 0.9)';
        lowOrHigh.textContent = (userGuess < numberToGuess) ? 'last guess was too low.' : 'last guess was too high.';
    }
    guessCount++;
    guessField.value = '';
    guessField.focus();
}

form.addEventListener('submit', checkGuess);

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.body.append(resetButton);
    resetButton.addEventListener('click', resetGame);
}

function startGame() {
    randomR = Math.floor(Math.random() * 256);
    randomG = Math.floor(Math.random() * 256);
    randomB = Math.floor(Math.random() * 256);
    doc.style.backgroundColor = 'rgb(' + randomR + ',' + randomG + ',' + randomB + ')';

    randomField = Math.floor(Math.random() * 3);
    switch (randomField) {
        case 0:
            guessField = document.querySelector('#guessField0');
            guessField1.disabled = true;
            guessField1.value = randomG;
            guessField2.disabled = true;
            guessField2.value = randomB;
            break;
        case 1:
            guessField = document.querySelector('#guessField1');
            guessField0.disabled = true;
            guessField0.value = randomR;
            guessField2.disabled = true;
            guessField2.value = randomB;
            break;
        case 2:
            guessField = document.querySelector('#guessField2');
            guessField0.disabled = true;
            guessField0.value = randomR;
            guessField1.disabled = true;
            guessField1.value = randomG;
            break;
    }

    guessCount = 1;
}

function resetGame() {

    startGame();
    const resetParas = document.querySelectorAll('.resultParas p');
    for (let i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    lastResult.style.backgroundColor = 'transparent';
}