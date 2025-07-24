let resultsElement = document.querySelector('.js-result');
let scoreElement = document.querySelector('.js-score');
let lastFightElement = document.querySelector('.js-last-fight');

const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    loses: 0,
    draws: 0
};

updateScoreElement();

function resetScore() {
    score.wins = 0;
    score.loses = 0;
    score.draws = 0;

    localStorage.removeItem('score');
    updateScoreElement();
}

function updateResultElement(result, playerMove, computerMove) {
    resultsElement.innerHTML = `${result}`;

    lastFightElement.innerHTML = `You played <img src="10-rock-paper-scissors/${playerMove}-emoji.png" alt="${playerMove}" class="move-icon">, computer played <img src="10-rock-paper-scissors/${computerMove}-emoji.png" alt="${computerMove}"
            class="move-icon">`;
}

function updateScoreElement() {
    scoreElement.innerHTML = `wins: ${score.wins}, draws: ${score.draws}, loses: ${score.loses}`;
}


function randomComputerMove() {
    let value = Math.random();

    if (value < 1 / 3) {
        return 'Rock';
    } else if (value < 2 / 3) {
        return 'Paper';
    } else {
        return 'Scissors';
    }
}

function fight(playerMove) {
    let computerMove = randomComputerMove();
    let result = '';
    if (playerMove === computerMove) {
        result = 'Draw'
    } else if (playerMove === 'Rock') {
        if (computerMove === 'Paper') {
            result = 'You lost'
        } else {
            result = 'You win'
        }
    } else if (playerMove === 'Paper') {
        if (computerMove === 'Scissors') {
            result = 'You lost'
        } else {
            result = 'You win'
        }
    } else if (playerMove === 'Scissors') {
        if (computerMove === 'Rock') {
            result = 'You lost'
        } else {
            result = 'You win'
        }
    }

    if (result === 'You win') {
        score.wins++;
    } else if (result === 'You lost') {
        score.loses++;
    } else {
        score.draws++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();
    updateResultElement(result, playerMove, computerMove);

    // alert(`${result} - you played ${playerMove}, computer played ${computerMove}; wins: ${score.wins}, draws: ${score.draws}, loses: ${score.loses}`);
}
