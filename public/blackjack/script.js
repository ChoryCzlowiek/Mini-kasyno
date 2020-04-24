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
const scoreInfo = document.querySelector('.main__score-info');
const exitUserInfo = document.querySelector('.user-info__exit');

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

// playBtn click functions

// Check if we can play

function checkCanPlay() {
    if (bid.value == '' || Math.floor(bid.value) == 0) alert('Nie wprowadzono stawki!');
    else if (bid.value < 0 || Math.floor(bid.value[0]) == 0) alert('Wprowadzono błedną stawkę!');
    else if (Math.floor(bid.value) > saldoCounter) alert('Wprowadzona stawka jest większa niż Twoje saldo!');
    else return true;
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
        points = 1;
    }
    return points;
}

// Calculate how points is on hand

function calculatePoints(cards) {
    let points = 0;
    let hasAce = false;

    cards.forEach(card => {
        points += addPointsToCard(card);
        if (card.includes('A')) {
            hasAce = true;
        }
    });
    if (hasAce === true && points + 10 <= 21) {
        return points += 10;
    }

    return points;
}

// Update user and computer points

function updatePoints() {
    userPoints = calculatePoints(userCards);
    aiPoints = calculatePoints(aiCards);

    userPointsCircle.textContent = userPoints;
    aiPointsCircle.textContent = aiPoints;
}

function prepareToPlay() {
    const canPlay = checkCanPlay();
    if (canPlay) {
        bid.disabled = 'true';
        this.style.display = 'none';
        optionBtnsContainer.style.display = 'flex';
        pointsContainers.forEach(container => container.style.display = 'block');
        pickBtn.disabled = '';
        passBtn.disabled = '';
        saldoCounter -= bid.value;
        saldo.textContent = saldoCounter;

        userCards = [drawCard(copyDeck), drawCard(copyDeck)];
        aiCards = [drawCard(copyDeck), drawCard(copyDeck)];

        updatePoints();
    }
}

playBtn.addEventListener('click', prepareToPlay);

// pickBtn click functions

// Check if user have to many points

function checkUserOverPoints() {
    updatePoints();
    const user = JSON.parse(localStorage.getItem('user'));
    const body = {};

    if (userPoints > 21) {
        // Lose
        console.log('loss');
        losses++;
        if (user) {
            body.nOfLosses = user.nOfLosses + 1;
            body.nOfGames = user.nOfGames + 1;
            body.balance = saldoCounter;

            fetch(`/api/user?id=${user._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then(res => res.json());
        }
        scoreInfo.innerHTML = `Przegrałeś ${bid.value}`;
        pickBtn.disabled = 'true';

        endGame = true;
        showScoreInfo();
        resetGame();
    }
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

updateUserLocalStorage();

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
                optionBtnsContainer.style.display = 'none';
                pointsContainers.forEach(container => container.style.display = 'none');
                pickBtn.disabled = '';

                statistics[0].textContent = wins;
                statistics[1].textContent = draws;
                statistics[2].textContent = losses;

                updateUserLocalStorage();

                setTimeout(() => {
                    clearAnimations();
                }, 1000)
            }
        }, 2000);
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
    const body = {};
    const user = JSON.parse(localStorage.getItem('user'));

    if (userPoints == 21 && userCards.length == 2 && aiPoints != 21) {
        // Blackjack win
        console.log('blackjack win');
        saldoCounter += bid.value * 2;
        wins++;
        if (user) {
            body.nOfWins = user.nOfWins + 1;
            body.nOfGames = user.nOfGames + 1;
            body.balance = saldoCounter;
        }
        scoreInfo.innerHTML = `BLACKJACK    Wygrałeś ${bid.value*2}`;
    } else if (aiPoints == 21 && userCards.length == 2 && userPoints != 21) {
        // Blackjack loss
        console.log('blackjack loss');
        losses++;
        if (user) {
            body.nOfLosses = user.nOfLosses + 1;
            body.nOfGames = user.nOfGames + 1;
            body.balance = saldoCounter;
        }
        scoreInfo.innerHTML = `BLACKJACK    Przegrałeś ${bid.value}`;
    } else if (aiPoints > 21 && userPoints <= 21) {
        // Win
        console.log('win');
        saldoCounter += bid.value * 2;
        wins++;
        if (user) {
            body.nOfWins = user.nOfWins + 1;
            body.nOfGames = user.nOfGames + 1;
            body.balance = saldoCounter;
        }
        scoreInfo.innerHTML = `Wygrałeś ${bid.value*2}`;
    } else if (userPoints == aiPoints) {
        // Draw
        console.log('draw')
        saldoCounter += Math.floor(bid.value);
        draws++;
        if (user) {
            body.nOfDraws = user.nOfDraws + 1;
            body.nOfGames = user.nOfGames + 1;
            body.balance = saldoCounter;
        }
        scoreInfo.innerHTML = `Remis`;
    } else if (userPoints > aiPoints && userPoints <= 21) {
        // Win
        console.log('win');
        saldoCounter += bid.value * 2;
        wins++;
        if (user) {
            body.nOfWins = user.nOfWins + 1;
            body.nOfGames = user.nOfGames + 1;
            body.balance = saldoCounter;
        }
        scoreInfo.innerHTML = `Wygrałeś ${bid.value*2}`;
    } else if (userPoints < aiPoints && aiPoints <= 21) {
        // Lose
        console.log('loss');
        losses++;
        if (user) {
            body.nOfLosses = user.nOfLosses + 1;
            body.nOfGames = user.nOfGames + 1;
            body.balance = saldoCounter;
        }
        scoreInfo.innerHTML = `Przegrałeś ${bid.value}`;
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

    endGame = true;
}

// Show score information

function showScoreInfo() {
    if (endGame) {
        console.log('git')
        scoreInfo.classList.add('main__score-info--animate');
        playContainer.classList.add('play--blur');
    }
}

passBtn.addEventListener('click', function pass() {
    pickBtn.disabled = 'true';
    this.disabled = 'true';

    aiPlay();
    checkGameOver();
    showScoreInfo();
    resetGame();
})