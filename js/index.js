let playersChoice = []
let computerChoice = []

const computerChoices = ['paper', 'scissors', 'rock'];

const gameContainer = document.querySelector('.game-container');
const resultsContainer = document.querySelector('.results-container');
const resultsContainerBox = document.querySelector('.results-container__box');
const result = document.querySelector('.results-container__box--result')
const gameContainerButtons = document.querySelectorAll('.game-container__button');
const playerBox = document.getElementById('player');
const computerBox = document.getElementById('computer');
const scorecard = document.querySelector('.score-container__score--number')

function getLocalStorage() {
    localStorage.getItem('score')
    scorecard.textContent = localStorage.score || 0
}

function renderResultsScreen(choice) {
    new Promise((resolve,reject) => {
        flipScreen()
        resolve()
    }
    ).then(()=> {
        setTimeout(() => {
            setPlayersChoice(choice)
        }, 500);
    }).then(() => {
        setTimeout(() => {
            setComputersChoice()
        }, 1000);
        
    }).then(() => {
        setTimeout(() => {
            compareAndChooseWinner(playersChoice, computerChoice)
        }, 3500);  
    }).catch((err) => reject(err))  
    
    
}

 function flipScreen() {
        gameContainer.classList.remove('active')
        gameContainer.classList.add('inactive')
        resultsContainer.classList.remove('inactive')
        resultsContainer.classList.add('active')
}

 function setPlayersChoice(choice) {
    setTimeout(() => { 
        const playerChoiceBox = document.createElement('div');
        const playerChoiceImage = document.createElement('img');
        playerChoiceImage.setAttribute('src', `./images/icon-${choice}.svg`);
        playerChoiceImage.setAttribute('alt', choice);
        playerChoiceBox.setAttribute('id', choice);
        playerChoiceBox.classList.add("game-container__button");
        playerChoiceBox.appendChild(playerChoiceImage);
        playerBox.appendChild(playerChoiceBox);
        playersChoice.push(choice)
    }, 1000);
   
}

 function setComputersChoice() {
    setTimeout(() => {
        let computerChoiceNumber = Math.floor(Math.random() * computerChoices.length);
        let computerChosen = computerChoices[computerChoiceNumber]
        const computerChoiceBox = document.createElement('div');
        const computerChoiceImage = document.createElement('img');
        computerChoiceImage.setAttribute('src', `./images/icon-${computerChosen}.svg`)
        computerChoiceImage.setAttribute('alt', computerChosen)
        computerChoiceBox.setAttribute('id', computerChosen)
        computerChoiceBox.classList.add("game-container__button")
       computerChoiceBox.appendChild(computerChoiceImage)
        computerBox.appendChild(computerChoiceBox)
        computerChoice.push(computerChosen)
    }, 2000);
   
}


 function compareAndChooseWinner(player, computer) {
    const draw = player[0] === computer[0];
    
    const winner = player[0] === 'paper' && computer[0] === 'rock' 
    || player[0] === 'scissors' && computer[0] === 'paper' 
    || player[0] === 'rock' && computer[0] === 'scissors';

    const loser =player[0] === 'paper' && computer[0] === 'scissors' 
    || player[0] === 'scissors' && computer[0] === 'rock' 
    || player[0] === 'rock' && computer[0] === 'paper';

    
        let getScore = JSON.parse(localStorage.getItem('score'))
        if(draw) {
            result.textContent = 'DRAW'  
        } 
        else if(winner) {
            result.textContent = 'YOU WIN'
            localStorage.setItem('score', JSON.stringify(getScore + 1)) 
            scorecard.textContent = localStorage.score
        }
         else if (loser) {
            result.textContent = 'YOU LOSE'
                if(scorecard.textContent !== '0') {
                    localStorage.setItem('score', JSON.stringify(getScore - 1))
                scorecard.textContent = localStorage.score
                } 
        }
        resultsContainerBox.classList.remove('inactive')
        resultsContainerBox.classList.add('active')
    ;
   
}
//Button functionality

const rulesButton = document.querySelector('.rules-button-container')
const rulesContainer = document.querySelector('.rules-container')
const xButton = document.querySelector('.rules-container__header--x')
const playAgainButton = document.querySelector('.results-container__box--button')

rulesButton.addEventListener('click', () => {
    
    rulesContainer.classList.toggle('rules-active')
})

xButton.addEventListener('click', () => {
    rulesContainer.classList.toggle('rules-active')
})

playAgainButton.addEventListener('click', () => {
    window.location.href = '/rock-paper-scissors-master'
})

getLocalStorage()