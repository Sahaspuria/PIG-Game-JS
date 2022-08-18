'use strict';
//ID elements
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const currentSc0 = document.getElementById('current--0');
const currentSc1 = document.getElementById('current--1');
//Class Elements
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// Dice Face
const diceF = document.querySelector('.dice');
//Players
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let score, currentScore, activePlayer;

const init = () => {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  score0.textContent = 0;
  score1.textContent = 0;

  diceF.classList.remove('hidden');
  btnHold.disabled = false;
  btnRoll.disabled = false;
  document.querySelector(`.player`).classList.remove('player--winner');

  // const player1Name = prompt('Enter Player 1 Name?');
  // const player2Name = prompt('Enter Player 2 Name?');

  // document.getElementById('name--0').textContent = player1Name;
  // document.getElementById('name--1').textContent = player2Name;
};

init();

const playerSwitch = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  const dice = Math.trunc(Math.random() * 6) + 1;

  diceF.classList.remove('hidden');
  diceF.src = `dice-${dice}.png`;
  console.log(dice);
  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    playerSwitch();
  }
});

btnHold.addEventListener('click', function () {
  score[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    score[activePlayer];

  if (score[activePlayer] >= 30) {
    btnHold.disabled = true;
    btnRoll.disabled = true;
    diceF.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    playerSwitch();
  }
});

btnNew.addEventListener('click', init);
