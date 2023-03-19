const btnAgainEL = document.querySelector('.btn-again');
const btnCheckEL = document.querySelector('.btn-check');
const randomNumberEL = document.querySelector('.random-number');
const inputEL = document.querySelector('.input-number');
const resultEL = document.querySelector('.result');
const currentScoreEL = document.querySelector('.current-score');
const highScoreEL = document.querySelector('.high-score');

let randomNumber;
let score;
let highScore = 0;
let isPlaying;

const generateRandomNumber = () => Math.ceil(Math.random() * 20);

const init = () => {
  randomNumber = generateRandomNumber();
  score = 20;
  inputEL.value = '';
  resultEL.textContent = 'Start guessing...';
  randomNumberEL.textContent = '?';
  currentScoreEL.textContent = score;

  inputEL.readOnly = false;

  // change background
  document.body.style.backgroundColor = getComputedStyle(
    document.querySelector(':root')
  ).getPropertyValue('--clr-bg');

  isPlaying = true;
};

init();

const displayResult = function (text) {
  resultEL.textContent = text;
};

const checkHighScore = () => {
  if (score > highScore) {
    highScore = score;
    highScoreEL.textContent = highScore;
  }
};

const checkNumber = function (number) {
  if (number === randomNumber) {
    displayResult('🎉 Correct answer');

    // change background
    document.body.style.backgroundColor = getComputedStyle(
      document.querySelector(':root')
    ).getPropertyValue('--clr-bg-win');

    randomNumberEL.textContent = `${randomNumber}`;
    inputEL.value = '';
    isPlaying = false;
    inputEL.readOnly = true;
    checkHighScore();
  } else if (number < randomNumber) {
    currentScoreEL.textContent = `${--score}`;
    displayResult('📉 Too low');
  } else {
    currentScoreEL.textContent = `${--score}`;
    displayResult('📈 Too high');
  }
};

btnCheckEL.addEventListener('click', () => {
  if (score >= 1 && isPlaying) {
    const inputNumber = inputEL.value;
    if (!inputNumber) {
      // Display no number text in result
      displayResult('⛔ No number');
    } else {
      checkNumber(+inputNumber);
    }
  }
});

// Reset game
btnAgainEL.addEventListener('click', init);
