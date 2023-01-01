"use strict";

var playersChoice = [];
var computerChoice = [];
var gameStarted = false;
var computerChoices = ['paper', 'scissors', 'rock'];
var gameContainer = document.querySelector('.game-container');
var resultsContainer = document.querySelector('.results-container');
var resultsContainerBox = document.querySelector('.results-container__box');
var result = document.querySelector('.results-container__box--result');
var gameContainerButtons = document.querySelectorAll('.game-container__button');
var playerBox = document.getElementById('player');
var computerBox = document.getElementById('computer');
var scorecard = document.querySelector('.score-container__score--number');

function getLocalStorage() {
  localStorage.getItem('score');
  scorecard.textContent = localStorage.score || 0;
}

getLocalStorage();

function renderResultsScreen(choice) {
  return regeneratorRuntime.async(function renderResultsScreen$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(flipScreen());

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(setPlayersChoice(choice));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(setComputersChoice());

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(compareAndChooseWinner(playersChoice, computerChoice));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}

function flipScreen() {
  gameStarted = true;
  setTimeout(function () {
    gameContainer.classList.remove('active');
    gameContainer.classList.add('inactive');
    resultsContainer.classList.remove('inactive');
    resultsContainer.classList.add('active');
  }, 500);
}

function setPlayersChoice(choice) {
  setTimeout(function () {
    var playerChoiceBox = document.createElement('div');
    var playerChoiceImage = document.createElement('img');
    playerChoiceImage.setAttribute('src', "../images/icon-".concat(choice, ".svg"));
    playerChoiceImage.setAttribute('alt', choice);
    playerChoiceBox.setAttribute('id', choice);
    playerChoiceBox.classList.add("game-container__button");
    playerChoiceBox.appendChild(playerChoiceImage);
    playerBox.appendChild(playerChoiceBox);
    playersChoice.push(choice);
  }, 1000);
  console.log(playersChoice);
}

function setComputersChoice() {
  setTimeout(function () {
    var computerChoiceNumber = Math.floor(Math.random() * computerChoices.length);
    var computerChosen = computerChoices[computerChoiceNumber];
    var computerChoiceBox = document.createElement('div');
    var computerChoiceImage = document.createElement('img');
    computerChoiceImage.setAttribute('src', "../images/icon-".concat(computerChosen, ".svg"));
    computerChoiceImage.setAttribute('alt', computerChosen);
    computerChoiceBox.setAttribute('id', computerChosen);
    computerChoiceBox.classList.add("game-container__button");
    computerChoiceBox.appendChild(computerChoiceImage);
    computerBox.appendChild(computerChoiceBox);
    computerChoice.push(computerChosen);
  }, 2000);
}

function compareAndChooseWinner(player, computer) {
  setTimeout(function () {
    var getScore = JSON.parse(localStorage.getItem('score'));

    if (player[0] === computer[0]) {
      result.textContent = 'DRAW';
    } else if (player[0] === 'paper' && computer[0] === 'rock' || player[0] === 'scissors' && computer[0] === 'paper' || player[0] === 'rock' && computer[0] === 'scissors') {
      result.textContent = 'YOU WIN';
      localStorage.setItem('score', JSON.stringify(getScore + 1));
      scorecard.textContent = localStorage.score;
    } else if (player[0] === 'paper' && computer[0] === 'scissors' || player[0] === 'scissors' && computer[0] === 'rock' || player[0] === 'rock' && computer[0] === 'paper') {
      result.textContent = 'YOU LOSE';

      if (scorecard.textContent !== '0') {
        localStorage.setItem('score', JSON.stringify(getScore - 1));
        scorecard.textContent = localStorage.score;
      }
    }

    resultsContainerBox.classList.remove('inactive');
    resultsContainerBox.classList.add('active');
    gameStarted = false;
    console.log(scorecard.textContent !== 0);
  }, 3000);
} //Button functionality


var rulesButton = document.querySelector('.rules-button-container');
var rulesContainer = document.querySelector('.rules-container');
var xButton = document.querySelector('.rules-container__header--x');
var playAgainButton = document.querySelector('.results-container__box--button');
rulesButton.addEventListener('click', function () {
  rulesContainer.classList.toggle('rules-active');
});
xButton.addEventListener('click', function () {
  rulesContainer.classList.toggle('rules-active');
});
playAgainButton.addEventListener('click', function () {
  window.location.href = '/rock-paper-scissors-master';
});