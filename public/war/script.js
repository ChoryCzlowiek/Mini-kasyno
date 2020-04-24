// Deck
const deck = ['2Z', '2S', '2T', '2W', '3Z', '3S', '3T', '3W', '4Z', '4S', '4T', '4W', '5Z', '5S', '5T', '5W', '6Z', '6S', '6T', '6W', '7Z', '7S', '7T', '7W', '8Z', '8S', '8T', '8W', '9Z', '9S', '9T', '9W', '10Z', '10S', '10T', '10W', 'JZ', 'JS', 'JT', 'JW', 'DZ', 'DS', 'DT', 'DW', 'KZ', 'KS', 'KT', 'KW', 'AZ', 'AS', 'AT', 'AW'];


// DOM references

const saldo = document.querySelector('.play__saldo span');
const playBtn = document.querySelector('.play__play-btn');
const putOutBtn = document.querySelector('.play__put-out');
const statistics = document.querySelectorAll('.stats__number');
const bid = document.querySelector('.form__rate');
const hands = document.querySelectorAll('.play__hand');
const background = document.querySelector('.background');
const tableText = document.querySelector('.play');
const scoreBox = document.querySelector('.score-container');
const pointBox = document.querySelector('.points-container');
const howCards = document.querySelectorAll('.points-container__points');
const playContainer = document.querySelector('.play');
const scoreInfo = document.querySelector('.main__score-info');
const exitUserInfo = document.querySelector('.user-info__exit');

// Variables

let wins = 0,
    losses = 0,
    aiHand = [],
    userHand = [],
    saldoCounter = 100,
    userCards = 0,
    aiCards = 0,
    endGame = false;
const copyDeck = deck.slice();

// Block right navigation

document.querySelector('.navbar__icon--login').style.display = 'none';

// Show if user is logged or no

function ifUserLogged() {
    const userLogInfo = document.querySelector('.user-info__text');
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) userLogInfo.innerHTML = `Witaj ${user.login}!`;
    else userLogInfo.innerHTML = 'Grasz jako gość!';
}

ifUserLogged();

// Close Info about log user or guest

exitUserInfo.addEventListener('click', () => {
    document.querySelector('.user-info').style.display = 'none';
    playContainer.classList.add('play--remove-blur');
    playContainer.style.pointerEvents = 'auto';
})

// Check if user is logged and show balance

function setBalance() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        saldoCounter = user.balance;
    }

    saldo.textContent = saldoCounter;
}

setBalance();

// Block refresh site

bid.addEventListener('keydown', (e) => {
    if (e.keyCode === 13 || e.keyCode === 189 || e.keyCode === 69) {
        event.preventDefault();
    }
})

// Functions for playBtn

// Check if we can play

function checkCanPlay() {
    if (bid.value != '' && Math.floor(bid.value) <= Math.floor(saldo.textContent) && Math.floor(bid.value) > 0) return true;
    else if (bid.value == '' || Math.floor(bid.value) == 0) alert('Nie wprowadzono stawki!');
    else if (bid.value < 0) alert('Wprowadzono błedną stawkę!');
    else alert('Wprowadzona stawka jest większa niż Twoje saldo!');
}

// Draw Cards for Ai and User

function drawHand(cards) {
    const handCards = [];
    for (let i = 0; i < deck.length / 2; i++) {
        let handCardIndex = Math.floor(Math.random() * cards.length);
        handCards.push(cards[handCardIndex]);
        cards.splice(handCardIndex, 1);
    }
    return handCards;
}

// Calculate how cards have user and ai

function updateNumberOfCards() {
    userCards = userHand.length;
    aiCards = aiHand.length;

    howCards[0].textContent = aiCards;
    howCards[1].textContent = userCards;
}

// Main function of click Play Button

function prepareToPlay() {
    const canPlay = checkCanPlay();
    if (canPlay) {
        bid.disabled = 'true';
        this.style.display = 'none';
        hands.forEach((hand) => {
            hand.style.display = 'block';
        });
        putOutBtn.style.display = 'block';
        pointBox.style.display = 'block';
        saldoCounter -= bid.value;
        saldo.textContent = saldoCounter;
    }

    aiHand = drawHand(copyDeck);
    userHand = drawHand(copyDeck);

    updateNumberOfCards();
}

playBtn.addEventListener('click', prepareToPlay);

// putOut button functions

// Draw card from hand

function drawCard(hand) {
    const randomCardIndex = Math.floor(Math.random() * hand.length);
    const card = hand[randomCardIndex];
    hand.splice(randomCardIndex, 1);
    return card;
}

// Add points to card

function calculatePoints(activeCards) {
    activeCards.reverse();
    card = activeCards[0];
    let points = 0
    if (card.includes('2')) {
        points = 2;
    } else if (card.includes('3')) {
        points = 3;
    } else if (card.includes('4')) {
        points = 4;
    } else if (card.includes('5')) {
        points = 5;
    } else if (card.includes('6')) {
        points = 6;
    } else if (card.includes('7')) {
        points = 7;
    } else if (card.includes('8')) {
        points = 8;
    } else if (card.includes('9')) {
        points = 9;
    } else if (card.includes('10')) {
        points = 10;
    } else if (card.includes('J')) {
        points = 11;
    } else if (card.includes('D')) {
        points = 12;
    } else if (card.includes('K')) {
        points = 13;
    } else if (card.includes('A')) {
        points = 14;
    }
    return points;
}

// Check who win simple game

function checkWhoWinRound(aiPoints, userPoints, aiActiveCard, userActiveCard) {
    if (aiPoints > userPoints) {
        // Lose round
        aiActiveCard.forEach(card => aiHand.push(card));
        userActiveCard.forEach(card => aiHand.push(card));
    } else if (aiPoints < userPoints) {
        // Win round
        aiActiveCard.forEach(card => userHand.push(card));
        userActiveCard.forEach(card => userHand.push(card));
    } else {
        // WAR!!
        aiActiveCard.push(drawCard(aiHand), drawCard(aiHand));
        userActiveCard.push(drawCard(userHand), drawCard(userHand));

        aiPoints = calculatePoints(aiActiveCard);
        userPoints = calculatePoints(userActiveCard);

        checkWhoWinRound(aiPoints, userPoints, aiActiveCard, userActiveCard);
    }

    updateNumberOfCards();
}

// Set localStorage of user stats

function updateUserLocalStorage() {
    fetch('/api/me')
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                console.error(res.error);
            } else {
                localStorage.setItem('user', JSON.stringify(res));
            }
        })
        .catch(err => {
            console.error('ERROR = ', err);
        });
}

// Clear animations

function clearAnimations() {
    scoreInfo.classList.remove('main__score-info--animate');
    playContainer.classList.remove('play--blur');
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
                putOutBtn.style.display = 'none';
                hands.forEach((hand) => {
                    hand.style.display = 'none';
                });
                pointBox.style.display = 'none';

                statistics[0].textContent = wins;
                statistics[1].textContent = losses;

                updateUserLocalStorage();

                setTimeout(() => {
                    clearAnimations();
                }, 1000)
            }
        })
    })
}

// Show score information

function showScoreInfo() {
    if (endGame) {
        console.log('git')
        scoreInfo.classList.add('main__score-info--animate');
        playContainer.classList.add('play--blur');
    }
}

// Check if game is ended

function checkGameOver() {
    if (aiHand.length == 0) {
        // You win war
        wins++;
        saldoCounter += bid.value * 2;

        if (user) {
            body.nOfWins = user.nOfWins + 1;
            body.nOfGames = user.nOfGames + 1;
            body.balance = saldoCounter;
        }

        endGame = true;
    } else if (userHand.length == 0) {
        // You lose war
        losses++;

        if (user) {
            body.nOfLosses = user.nOfLosses + 1;
            body.nOfGames = user.nOfGames + 1;
            body.balance = saldoCounter;
        }

        endGame = true;
    }

    if (user) {
        fetch(`/api/user?id=${user._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.json()).then(res => console.log('res = ', res));
    }

    resetGame();
    showScoreInfo();
}

// Main function of click Play Button

putOutBtn.addEventListener('click', function putOutCard() {
    const aiActiveCard = [drawCard(aiHand)];
    const userActiveCard = [drawCard(userHand)];

    const aiPoints = calculatePoints(aiActiveCard);
    const userPoints = calculatePoints(userActiveCard);

    checkWhoWinRound(aiPoints, userPoints, aiActiveCard, userActiveCard);

    checkGameOver();
})