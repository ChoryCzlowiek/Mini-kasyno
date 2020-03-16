const deck = ['2Z', '2S', '2T', '2W', '3Z', '3S', '3T', '3W', '4Z', '4S', '4T', '4W', '5Z', '5S', '5T', '5W', '6Z', '6S', '6T', '6W', '7Z', '7S', '7T', '7W', '8Z', '8S', '8T', '8W', '9Z', '9S', '9T', '9W', '10Z', '10S', '10T', '10W', 'JZ', 'JS', 'JT', 'JW', 'DZ', 'DS', 'DT', 'DW', 'KZ', 'KS', 'KT', 'KW', 'AZ', 'AS', 'AT', 'AW', '2Z', '2S', '2T', '2W', '3Z', '3S', '3T', '3W', '4Z', '4S', '4T', '4W', '5Z', '5S', '5T', '5W', '6Z', '6S', '6T', '6W', '7Z', '7S', '7T', '7W', '8Z', '8S', '8T', '8W', '9Z', '9S', '9T', '9W', '10Z', '10S', '10T', '10W', 'JZ', 'JS', 'JT', 'JW', 'DZ', 'DS', 'DT', 'DW', 'KZ', 'KS', 'KT', 'KW', 'AZ', 'AS', 'AT', 'AW', '2Z', '2S', '2T', '2W', '3Z', '3S', '3T', '3W', '4Z', '4S', '4T', '4W', '5Z', '5S', '5T', '5W', '6Z', '6S', '6T', '6W', '7Z', '7S', '7T', '7W', '8Z', '8S', '8T', '8W', '9Z', '9S', '9T', '9W', '10Z', '10S', '10T', '10W', 'JZ', 'JS', 'JT', 'JW', 'DZ', 'DS', 'DT', 'DW', 'KZ', 'KS', 'KT', 'KW', 'AZ', 'AS', 'AT', 'AW', '2Z', '2S', '2T', '2W', '3Z', '3S', '3T', '3W', '4Z', '4S', '4T', '4W', '5Z', '5S', '5T', '5W', '6Z', '6S', '6T', '6W', '7Z', '7S', '7T', '7W', '8Z', '8S', '8T', '8W', '9Z', '9S', '9T', '9W', '10Z', '10S', '10T', '10W', 'JZ', 'JS', 'JT', 'JW', 'DZ', 'DS', 'DT', 'DW', 'KZ', 'KS', 'KT', 'KW', 'AZ', 'AS', 'AT', 'AW', '2Z', '2S', '2T', '2W', '3Z', '3S', '3T', '3W', '4Z', '4S', '4T', '4W', '5Z', '5S', '5T', '5W', '6Z', '6S', '6T', '6W', '7Z', '7S', '7T', '7W', '8Z', '8S', '8T', '8W', '9Z', '9S', '9T', '9W', '10Z', '10S', '10T', '10W', 'JZ', 'JS', 'JT', 'JW', 'DZ', 'DS', 'DT', 'DW', 'KZ', 'KS', 'KT', 'KW', 'AZ', 'AS', 'AT', 'AW', '2Z', '2S', '2T', '2W', '3Z', '3S', '3T', '3W', '4Z', '4S', '4T', '4W', '5Z', '5S', '5T', '5W', '6Z', '6S', '6T', '6W', '7Z', '7S', '7T', '7W', '8Z', '8S', '8T', '8W', '9Z', '9S', '9T', '9W', '10Z', '10S', '10T', '10W', 'JZ', 'JS', 'JT', 'JW', 'DZ', 'DS', 'DT', 'DW', 'KZ', 'KS', 'KT', 'KW', 'AZ', 'AS', 'AT', 'AW'];

// DOM References

const saldo = document.querySelector('.play__saldo span');
const bid = document.querySelector('.form__rate');
const playBtn = document.querySelector('.play__play-btn');
const pickBtn = document.querySelector('.option-btns__btn--pick');
const passBtn = document.querySelector('.option-btns__btn--pass');
const aiPointsCircle = document.querySelector('.play__points');
const userPointsCircle = document.querySelector('.play__circle-points--user p');
const statistics = document.querySelectorAll('.stats span');
const pointsContainers = document.querySelectorAll('.play__circle-points');
const optionBtnsContainer = document.querySelector('.option-btns');
const playContainer = document.querySelector('.play');

// Variables

let wins = 0,
    draws = 0,
    losses = 0,
    aiPoints = 0,
    userPoints = 0,
    saldoCounter = 100,
    aiCards = [],
    userCards = [],
    endGame = false;

const copyDeck = deck.slice();

// Block refresh site

bid.addEventListener('keydown', (e) => {
    if (e.keyCode === 13 || e.keyCode === 189 || e.keyCode === 69) {
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

// Add how points have cards

function addPointsToCard(activeCard) {
    let points = 0
    if (activeCard.includes('2')) {
        points = 2;
    } else if (activeCard.includes('3')) {
        points = 3;
    } else if (activeCard.includes('4')) {
        points = 4;
    } else if (activeCard.includes('5')) {
        points = 5;
    } else if (activeCard.includes('6')) {
        points = 6;
    } else if (activeCard.includes('7')) {
        points = 7;
    } else if (activeCard.includes('8')) {
        points = 8;
    } else if (activeCard.includes('9')) {
        points = 9;
    } else if (activeCard.includes('10') || activeCard.includes('J') || activeCard.includes('D') || activeCard.includes('K')) {
        points = 0;
    } else if (activeCard.includes('A')) {
        points = 1;
    }
    return points;
}

// Calculate how points is on hand

function calculatePoints(cards) {
    let points = 0;
    cards.forEach(card => {
        points += addPointsToCard(card);
    })

    if (points > 9) {
        points %= 10;
    }

    return points;
}

// Update user and computer points

function updatePoints() {
    userPoints = calculatePoints(userCards);
    aiPoints = calculatePoints(aiCards);

    userPointsCircle.textContent = userPoints;
    aiPointsCircle.textContent = aiPoints;

    console.log(aiPoints, userPoints)
}

// If game is end, reset game interface

async function resetGame(win, draw, loss) {
    await new Promise(() => {
        setTimeout(() => {
            console.log('setTimeout')
            if (endGame) {
                console.log('endgame')

                saldo.textContent = saldoCounter;

                bid.value = '';
                bid.disabled = '';
                playBtn.style.display = 'block';
                optionBtnsContainer.style.display = 'none';
                pointsContainers.forEach(container => container.style.display = 'none');

                statistics[0].textContent = wins;
                statistics[1].textContent = draws;
                statistics[2].textContent = losses;

                const user = JSON.parse(localStorage.getItem('user'));
                const body = {};

                body.nOfGames = user.nOfGames + 1;
                body.nOfWonGames = win ? user.nOfWins + 1 : user.nOfWins;
                body.nOfLosses = loss ? user.nOfLosses + 1 : user.nOfLosses;
                body.nOfDraws = draw ? user.nOfDraws + 1 : user.nOfDraws;

                console.log(win, loss, draw, '\nbody = ', body, '\nuser = ', user);
                fetch(`/api/user?id=${user._id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }).then(res => res.json()).then(res => console.log('res = ', res));
            }
        }, 2000);
    })
}

// Check if somebody have 8 or 9

function checkIfEightOrNine() {
    let win, draw, loss;
    updatePoints();

    if (8 <= aiPoints || 8 <= userPoints) {
        if (userPoints > aiPoints) {
            win = true;
            // Win
            wins++;
            saldoCounter += bid.value * 2;
        } else if (userPoints == aiPoints) {
            draw = true;
            // Draw
            draws++;
            saldoCounter += Math.floor(bid.value);
        } else {
            loss = true;
            // Lose
            losses++;
        }
        endGame = true;
        resetGame(win, draw, loss);
    }
}

function prepareToPlay() {
    const canPlay = checkCanPlay();
    if (canPlay) {
        bid.disabled = 'true';
        this.style.display = 'none';
        optionBtnsContainer.style.display = 'flex';
        pointsContainers.forEach(container => container.style.display = 'block');
        saldoCounter -= bid.value;
        saldo.textContent = saldoCounter;

        userCards = [drawCard(copyDeck), drawCard(copyDeck)];
        aiCards = [drawCard(copyDeck), drawCard(copyDeck)];

        checkIfEightOrNine();
    }
}

playBtn.addEventListener('click', prepareToPlay);

// pickBtn click functions

// Symulate ai moves

function aiPlay() {
    updatePoints();

    if (aiPoints < userPoints && aiPoints < 7) aiCards.push(drawCard(copyDeck))
}

// Check who win

function checkWinner() {
    let win, draw, loss;
    updatePoints();

    if (userPoints > aiPoints) {
        // Win
        win = true;
        wins++;
        saldoCounter += bid.value * 2;
    } else if (userPoints == aiPoints) {
        // Draw
        draw = true;
        draws++;
        saldoCounter += Math.floor(bid.value);
    } else {
        loss = true;
        losses++;
    }

    endGame = true;
    resetGame(win, draw, loss);
}

pickBtn.addEventListener('click', function pickCard() {
    userCards.push(drawCard(copyDeck));
    aiPlay();
    checkWinner();
});