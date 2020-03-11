const deck = ['2Z', '2S', '2T', '2W', '3Z', '3S', '3T', '3W', '4Z', '4S', '4T', '4W', '5Z', '5S', '5T', '5W', '6Z', '6S', '6T', '6W', '7Z', '7S', '7T', '7W', '8Z', '8S', '8T', '8W', '9Z', '9S', '9T', '9W', '10Z', '10S', '10T', '10W', 'JZ', 'JS', 'JT', 'JW', 'DZ', 'DS', 'DT', 'DW', 'KZ', 'KS', 'KT', 'KW', 'AZ', 'AS', 'AT', 'AW', '2Z', '2S', '2T', '2W', '3Z', '3S', '3T', '3W', '4Z', '4S', '4T', '4W', '5Z', '5S', '5T', '5W', '6Z', '6S', '6T', '6W', '7Z', '7S', '7T', '7W', '8Z', '8S', '8T', '8W', '9Z', '9S', '9T', '9W', '10Z', '10S', '10T', '10W', 'JZ', 'JS', 'JT', 'JW', 'DZ', 'DS', 'DT', 'DW', 'KZ', 'KS', 'KT', 'KW', 'AZ', 'AS', 'AT', 'AW'];

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
    UserCards = [],
    endGame = false;

const copyDeck = deck.slice();


// Block refresh site

bid.addEventListener('keydown', (e) => {
    if (e.keyCode === 13 || e.keyCode === 189 || e.keyCode === 69) {
        event.preventDefault();
    }
})

// Block write minus

// bid.addEventListener('keydown', )

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
        points = 10;
    } else if (activeCard.includes('A')) {
        points = 11;
    }
    return points;
}

// Calculate how points is on hand

function calculatePoints(cards) {
    let points = 0;
    cards.forEach(card => {
        points += addPointsToCard(card);
    })

    return points;
}

// Update user and computer points

function updatePoints() {
    userPoints = calculatePoints(userCards);
    aiPoints = calculatePoints(aiCards);

    userPointsCircle.textContent = userPoints;
    aiPointsCircle.textContent = aiPoints;
}

// Move active cards on table

// function showHandsCards(userCards, aiCards) {
//     let top = 30;
//     let left = 37;
//     let delay = 0;
//     userCards.forEach(card => {
//         const userCard = document.createElement('img');
//         userCard.setAttribute('class', 'play__active-card play__active-card--user');
//         userCard.src = `../images/cards/${card}.jpg`;
//         playContainer.appendChild(userCard);

//         anime({
//             targets: userCard,
//             top: `${top}%`,
//             left: `${left}%`,
//             duration: 1000,
//             delay: delay,
//             easing: 'easeInOutQuad'
//         });
//         left += 6;
//         delay += 1000;
//     })

//     aiCards.forEach(card => {
//         const aiCard = document.createElement('img');
//         aiCard.setAttribute('class', 'play__active-card play__active-card--computer');
//         aiCard.src = `../images/cards/${card}.jpg`;
//         playContainer.appendChild(aiCard);
//     })
// }

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

        // showHandsCards(userCards, aiCards);
        // console.log(userCards, aiCards);

        updatePoints();
    }
}

playBtn.addEventListener('click', prepareToPlay);

// pickBtn click functions

// Check if user have to many points

function checkUserOverPoints() {
    updatePoints();

    if (userPoints > 21) {
        // Lose
        console.log('loss');
        losses++;
        endGame = true;
        resetGame();
    }
}

// If game is end, reset game interface

async function resetGame() {
    await new Promise(() => {
        setTimeout(() => {
            if (endGame) {
                saldo.textContent = saldoCounter;

                bid.value = '';
                bid.disabled = '';
                playBtn.style.display = 'block';
                optionBtnsContainer.style.display = 'none';
                pointsContainers.forEach(container => container.style.display = 'none');

                statistics[0].textContent = wins;
                statistics[1].textContent = draws;
                statistics[2].textContent = losses;
            }
        }, 1000);
    })
}

pickBtn.addEventListener('click', function pickCard() {
    userCards.push(drawCard(copyDeck));
    checkUserOverPoints();
});

// passBtn click functions

// Symulate ai play

function aiPlay() {
    updatePoints();

    if (aiPoints < 17) {
        aiCards.push(drawCard(copyDeck));
        aiPlay();
    }
}

// Check if somebody win

function checkGameOver() {
    updatePoints();

    if (aiPoints > 21) {
        // Win
        console.log('win');
        saldoCounter += bid.value * 2;
        wins++;
    } else if (userPoints == aiPoints) {
        // Draw
        console.log('draw')
        saldoCounter += Math.floor(bid.value);
        draws++;
    } else if (userPoints > aiPoints) {
        // Win
        console.log('win');
        saldoCounter += bid.value * 2;
        wins++;
    } else if (userPoints < aiPoints) {
        // Lose
        console.log('loss');
        losses++;
    }

    endGame = true;
}

passBtn.addEventListener('click', function pass() {
    aiPlay();
    checkGameOver();
    resetGame();
})