
let score = JSON.parse(localStorage.getItem('score')) || { 
  wins: 0,
  losses: 0,  
  ties: 0
};

updateScore();

document.querySelector('.js-autoplay-button').addEventListener('click', autoPlay)

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'a') {
    autoPlay();
  }
})

const resetElem = document.querySelector('.resetJS')
const restButElem = document.querySelector('.js-reset-button').addEventListener('click', () => { 
  resetElem.innerHTML = `
  Are you sure you want to reset the score?
  <button onclick="reset()" class="resetJS">Yes</button>
  <button onclick="resetElem.innerHTML = ''" class="resetJS">No</button>`
})

function reset() { 
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');    
  updateScore()
  resetElem.innerHTML = ''
}


document.body.addEventListener('keydown', (event) => {
    if(event.key === 'Backspace') {

      resetElem.innerHTML = `
      Are you sure you want to reset the score?
      <button onclick="reset()" class="resetJS">Yes</button>
      <button onclick="resetElem.innerHTML = ''" class="resetJS">No</button>`

    }
  })



let computerMove = '';

let isAutoPlaying = false;
let intervalID;

function autoPlay() {
  if(!(isAutoPlaying)) {
    
    document.querySelector('.js-autoplay-button').innerHTML = 'Stop Playing'
    
    intervalID = setInterval(function() {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;

  } else {
    clearInterval(intervalID);
    isAutoPlaying = false;
    document.querySelector('.js-autoplay-button').innerHTML = 'AutoPlay'
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('Rock');
})

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('Paper');
})

document.querySelector('.js-scissor-button').addEventListener('click', () => {
  playGame('Scissors');
})

document.body.addEventListener('keydown', (event) => {

  if(event.key === 'r') {
    playGame('Rock');
  } else if(event.key === 'p') {
    playGame('Paper');
  } else if(event.key === 's') {
    playGame('Scissors');
  }


});




  

function playGame(playerMove) {
const computerMove = pickComputerMove();
let result = '';
if(playerMove === 'Scissors') {
  if (computerMove === 'Scissors') {
  result = 'Tie';
  }
  else if (computerMove === 'Rock') {
  result = 'You lose!'
  }
  else if (computerMove === 'Paper') {
  result = 'You win!'
  }
 } 

else if (playerMove === 'Paper') {
  if (computerMove === 'Paper') {
  result = 'Tie';
  }
  else if (computerMove === 'Scissors') {
  result = 'You lose!'
  }
  else if (computerMove === 'Rock') {
  result = 'You win!'
  }
 } 


else if (playerMove === 'Rock') {          
  if (computerMove === 'Rock') {
  result = 'Tie';
  }

  else if (computerMove === 'Paper') {
  result = 'You lose!'
  }

  else if (computerMove === 'Scissors') {
  result = 'You win!'
  }
 }

 if (result === 'You win!') {
  score.wins += 1;
 } else if (result == 'You lose!') {
  score.losses += 1;
 } else if (result == 'Tie') {
  score.ties += 1;
 }
 
 updateScore();

 document.querySelector('.js-move').innerHTML = `You: <img src="/Rock Paper Scissor/assets/images/${playerMove}-emoji.png" class="move-icon"> Computer: <img src="/Rock Paper Scissor/assets/images/${computerMove}-emoji.png" class="move-icon">`


 document.querySelector('.js-result').innerHTML = result



 // Save a record/value in local storage in order to keep the values assigned to variables so when the page is refreshed the values are not reset, in this case the score

 localStorage.setItem('score', JSON.stringify(score));
}

function updateScore() {
document.querySelector('.js-score').innerHTML = `~<| Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties} |>~`
}

function pickComputerMove() {
const randomNumber = Math.random();      

if (randomNumber >= 0 &&randomNumber < 1 / 3) {
  computerMove = 'Rock';
}

else if (randomNumber >= 1 / 3 && randomNumber <= 2 / 3){
  computerMove = 'Paper';
}
else if (randomNumber >= 2 /3 && randomNumber <= 1) {
    computerMove = 'Scissors';
}

return computerMove;

} 

