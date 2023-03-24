let randNum = 0;
let playerGuess = 0;
let guessesAllowed = 7;
let guessesLeft = 7;
let guessOrGuesses = 'guesses';
let penalty = 0;

let playBtn = document.getElementById('play-btn');
let guessBtn = document.getElementById('guess-btn');
playBtn.addEventListener('click', playGame);
guessBtn.addEventListener('click', evalGuess);

let guessBox = document.querySelector('input');
let feedback = document.getElementById('feedback');
const totGamesSpan = document.getElementById('tot-games-span');
const guessAvgSpan = document.getElementById('guess-avg-span');
let totGames = Number(totGamesSpan.innerHTML);
let guessAvg = Number(guessAvgSpan.innerHTML);

let scoreBox = document.getElementById('score-box');

function playGame() {
    randNum = Math.ceil(Math.random() * 100);
    this.style.display = 'none';
    guessBox.style.display = 'inline-block';
    guessBtn.style.display = 'inline-block';
    feedback.style.display = 'block';
    guessBox.value = 0;
    feedback.innerHTML = `Guess the mystery number from 1-100! <br>You have ${guessesAllowed} guesses. 2 guess penalty if you don't get it in 7 guesses.`;

    scoreBox.style.opacity = 1;
}

function evalGuess() {
    playerGuess = Number(guessBox.value);
    guessesLeft--;
    if(guessesLeft == 1) {
        guessOrGuesses = 'guess';
    }
    
    if (playerGuess < randNum) {
        feedback.innerHTML = `<p>Your guess is too low! <br>You have ${guessesLeft} ${guessOrGuesses} left!</p>`;
    } else if (playerGuess > randNum) {
        feedback.innerHTML = `<p>Your guess is too high! <br>You have ${guessesLeft} ${guessOrGuesses} left!</p>`;
    } else {
        if(guessesLeft == 6) {
            feedback.innerHTML = `<p>Amazing!!!<br>You got it on your first guess!<br>You mystery number is indeed ${randNum}! </p>`;
        } else {
            feedback.innerHTML = `<p>Congrats! The mystery number is ${randNum}! <br>You got it in ${7-guessesLeft} guesses</p>`;
        }
        updateScoreResetGame();
        return;
    }

    if(guessesLeft == 0) {
        feedback.innerHTML = '<p>Nope! You are out of guesses!<br>GAME OVER! 2 guess penalty!</p>';
        penalty = 2;
        resetGame();
        return;
    }
}

function resetGame() {
    playerGuess = 0;
    guessesLeft = 7;
    guessBox.value = 0;
    guessBox.style.display = "none";
    guessBtn.style.display = "none";
    playBtn.style.display = "inline-block";
    playBtn.textContent = "PLAY AGAIN";
    gamesPlayed++;
    guessAvg = totalGuesses / gamesPlayed;
    totGamesSpan.textContent = gamesPlayed;
    guessAvgSpan.textContent = guessAvg.toFixed(2);
}

function updateScoreResetGame() {
    scoreBox.style.opacity = 1;
    let guessesAvg = Number(guessAvgSpan.innerHTML);
    let totGuesses = guessesAvg * totGames + guessesAllowed - guessesLeft + penalty;
    totGames++;
    guessesAvg = totGuesses / totGames;
    totGamesSpan.innerHTML = totGames;
    guessAvgSpan.innerHTML = guessesAvg.toFixed(3);
    guessesLeft = 7;
    guessBtn.style.display = 'none';
    guessBox.style.display = 'none';
    playBtn.style.display = 'inline-block';
    playBtn.textContent = 'PLAY AGAIN';
    guessBox.value = 0;
    guessOrGuesses = 'guesses';
    penalty = 0;
}