const deck = ['2Z', '2S', '2T', '2W', '3Z', '3S', '3T', '3W', '4Z', '4S', '4T', '4W', '5Z', '5S', '5T', '5W', '6Z', '6S', '6T', '6W', '7Z', '7S', '7T', '7W', '8Z', '8S', '8T', '8W', '9Z', '9S', '9T', '9W', '10Z', '10S', '10T', '10W', 'JZ', 'JS', 'JT', 'JW', 'DZ', 'DS', 'DT', 'DW', 'KZ', 'KS', 'KT', 'KW', 'AZ', 'AS', 'AT', 'AW', '2Z', '2S', '2T', '2W', '3Z', '3S', '3T', '3W', '4Z', '4S', '4T', '4W', '5Z', '5S', '5T', '5W', '6Z', '6S', '6T', '6W', '7Z', '7S', '7T', '7W', '8Z', '8S', '8T', '8W', '9Z', '9S', '9T', '9W', '10Z', '10S', '10T', '10W', 'JZ', 'JS', 'JT', 'JW', 'DZ', 'DS', 'DT', 'DW', 'KZ', 'KS', 'KT', 'KW', 'AZ', 'AS', 'AT', 'AW'];

// DOM References

const saldo = document.querySelector('.play__saldo span');
const bid = document.querySelector('.form__rate');
const playBtn = document.querySelector('.play__play-btn');
const statistics = document.querySelectorAll('.stats span');
const optionBtnsContainer = document.querySelector('.option-btns');
const playContainer = document.querySelector('.play');
const checkBtn = document.querySelector('.option-btns__btn--check');
const raiseBtns = document.querySelectorAll('.option-btns__btn--raise');
const raiseNumber = document.querySelectorAll('.option-btns__btn--raise span');

// Variables

let wins = 0,
    draws = 0,
    losses = 0,
    aiPoints = 0,
    userPoints = 0,
    saldoCounter = 100,
    boardCards = [],
    aiHand = [],
    userHand = [],
    gameOver = false;
endGame = false;

const copyDeck = deck.slice();

// Block refresh site

bid.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        event.preventDefault();
    }
})

// playBtn click functions

// Check if we can play

function checkCanPlay() {
    if (bid.value != '' && Math.floor(bid.value) <= Math.floor(saldo.textContent) && Math.floor(bid.value) > 0) return true;
    else if (bid.value == '' || Math.floor(bid.value) == 0) alert('Nie wprowadzono stawki!');
    else if (bid.value < 0) alert('Wprowadzono błedną stawkę!');
    else alert('Wprowadzona stawka jest większa niż Twoje saldo!');
}

// Draw hand for user and ai

function drawCard(copyDeck) {
    const cardIndex = Math.floor(Math.random() * copyDeck.length)
    const card = copyDeck[cardIndex];
    copyDeck.splice(cardIndex, 1)
    return card;
}

// // If game is end, reset game interface

// async function resetGame() {
//     await new Promise(() => {
//         setTimeout(() => {
//             if (endGame) {
//                 saldo.textContent = saldoCounter;

//                 bid.value = '';
//                 bid.disabled = '';
//                 playBtn.style.display = 'block';
//                 optionBtnsContainer.style.display = 'none';
//                 pointsContainers.forEach(container => container.style.display = 'none');

//                 statistics[0].textContent = wins;
//                 statistics[1].textContent = draws;
//                 statistics[2].textContent = losses;
//             }
//         }, 2000);
//     })
// }

function prepareToPlay() {
    const canPlay = checkCanPlay();
    if (canPlay) {
        bid.disabled = 'true';
        this.style.display = 'none';
        optionBtnsContainer.style.display = 'flex';
        saldoCounter -= bid.value;
        saldo.textContent = saldoCounter;
        let bidValue = Math.floor(bid.value);
        raiseNumber.forEach(number => {
            number.textContent = bidValue;
            bidValue *= 2;
        })

        userCards = [drawCard(copyDeck), drawCard(copyDeck)];
        aiCards = [drawCard(copyDeck), drawCard(copyDeck)];
        boardCards = [drawCard(copyDeck), drawCard(copyDeck), drawCard(copyDeck)];
    }
}

playBtn.addEventListener('click', prepareToPlay);

// Check button functions

// Check when boardcards have 5 cards

function checkIfFiveCardsOnTable() {
    if (boardCards.length >= 5) gameOver = true;
}

// // Describe what configuration give you win

// function bestOfHand(cards) {
// if
// }

// Check who win round

function checkWinner() {
    if (gameOver === true) {
        const aiCards = [boardCards, aiHand];
        const userCards = [boardCards, userHand];
    }
}

checkBtn.addEventListener('click', function check() {
    boardCards.push(drawCard(copyDeck));
    checkIfFiveCardsOnTable();
    checkWinner();
})