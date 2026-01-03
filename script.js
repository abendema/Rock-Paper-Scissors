let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  loses: 0,
  ties: 0
};

updateScoreElement();

function pickComputerMove() {
  let computerMove = '';
  const randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }
  return computerMove;
}


let isAutoplaying = true; // Autoplay is ON
let intervalId;
// we want it to auto play every second. 
function autoPlay(){
  if(isAutoplaying){ // true, so we enter this block
    intervalId = setInterval(function(){
    const userChoice = pickComputerMove();
    playGame(userChoice);
    }, 1000);
    isAutoplaying = false;
  }else{
    clearInterval(intervalId);
    isAutoplaying = true;
  }
}

function playGame(userChoice) {
  const computerMove = pickComputerMove();
  let result = '';

  if (computerMove === userChoice) {
    result = 'Tie.';
    score.ties++;
  } else if ((computerMove === 'paper' && userChoice == 'rock') || (computerMove === 'scissors' && userChoice == 'paper') || (computerMove === 'rock' && userChoice == 'scissors')) {
    result = 'You lose.';
    score.loses++;
  } else if ((computerMove === 'scissors' && userChoice == 'rock') || (computerMove === 'rock' && userChoice == 'paper') || (computerMove === 'paper' && userChoice == 'scissors')) {
    result = 'You win.';
    score.wins++;
  }

  localStorage.setItem('score', JSON.stringify(score)); // using localstorage to save the score permenant even if we refresh page.
  // but since localstorage only supports string thats why we convert our score object into string using JSON.stringify().

  updateResultAndMoves(userChoice, computerMove, result);
  updateScoreElement();


}

function updateScoreElement() {
  document.querySelector('.js-score').innerText = `Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties}`;
}

function updateResultAndMoves(userChoice, computerMove, result) {
  document.querySelector('.js-result').innerText = result;
  document.querySelector('.js-moves').innerHTML = `You <img src="./assets/${userChoice}.png" class="move-icon"> Computer <img src="./assets/${computerMove}.png" class="move-icon">`;
}