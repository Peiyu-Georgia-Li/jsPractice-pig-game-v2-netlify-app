'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const s0El = document.querySelector('#score--0');
const s1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, currentPlayer, playing;

// Repeated function
const init = function(){
    
    scores = [0, 0];
    currentScore = 0;
    currentPlayer = 0;
    playing = true;
    s0El.textContent = 0;
    s1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
}


const switchPlayer = function() {
    //switch to the other player and set the current score back to 0
    document.getElementById(`current--${currentPlayer}`).textContent = 0;
    currentPlayer = currentPlayer === 1 ? 0 : 1;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


// At the beginning of the game
init();




// Rolling dice functionality
btnRoll.addEventListener('click',function() {
    if (playing) {
        // 1. Generate a random new dice
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display the new dice
        diceEl.classList.remove('hidden');
        diceEl.src =`img/dice-${dice}.png`;


        // 3. Check if the new dice is 1, 
        if (dice !== 1){
            // if not, add the dice number to the current score
            currentScore += dice;
            document.getElementById(`current--${currentPlayer}`).textContent = currentScore;
        } else {
            // if so then switch to the other player and set the current score back to 0；
            switchPlayer();
        }
    }
})


// Hold the dice functionality
btnHold.addEventListener('click', function(){
    if (playing){
        
        // 1. Add current score to total score and display the total score
        scores[currentPlayer] += currentScore;
        document.getElementById(`score--${currentPlayer}`).textContent = scores[currentPlayer];


        // 2. Check if the total score is greater than 100
        if (scores[currentPlayer] >= 10) {
            // if so, current player wins
            console.log(`Player: ${currentPlayer} wins 🥳`);
            document.querySelector(`.player--${currentPlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${currentPlayer}`).classList.remove('player--active')
            playing = false;

        } else{
            // if not, switch to the other player and set the current score back to 0
            switchPlayer();

        }
    }

})

// Reset the game functionality
btnNew.addEventListener('click', function(){
    init();
})




