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
const scoreInfo = document.querySelector('.score-container__text');
const pointBox = document.querySelector('.points-container');
let howCards = document.querySelectorAll('.points-container__points');

let wins = 0,
    loses = 0,
    aiHand = [],
    userHand = [];

// Block refresh site

bid.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        event.preventDefault();
    }
})

// Functions for playBtn

function prepareToPlay() {
    let liveSaldo = Math.floor(saldo.textContent);
    liveSaldo -= Math.floor(bid.value);
    saldo.textContent = liveSaldo;
    hands.forEach((hand) => {
        hand.style.display = 'block';
    });
    playBtn.style.display = 'none';
    putOutBtn.style.display = 'block';
    pointBox.style.display = 'block';
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

// Main function of click Play Button

function startGame() {
    if (bid.value != '' && Math.floor(bid.value) <= Math.floor(saldo.textContent) && Math.floor(bid.value) > 0) {
        bid.disabled = 'true';
        prepareToPlay();
        const copyDeck = deck.slice();
        aiHand = drawHand(copyDeck);
        userHand = drawHand(copyDeck);
        howCards[0].textContent = aiHand.length;
        howCards[1].textContent = userHand.length;
    } else if (bid.value == '' || Math.floor(bid.value) == 0) alert('Nie wprowadzono stawki!');
    else if (bid.value < 0) alert('Wprowadzono błedną stawkę!');
    else alert('Wprowadzona stawka jest większa niż Twoje saldo!');
}

playBtn.addEventListener('click', startGame);

// Functions for putOutBtn

function drawCard(handCards) {
    const randomCardIndex = Math.floor(Math.random() * handCards.length);
    const card = handCards[randomCardIndex];
    return card;
}

// Add how points have cards

function addPointsToCards(activeCard) {
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
    } else if (activeCard.includes('10')) {
        points = 10;
    } else if (activeCard.includes('J')) {
        points = 11;
    } else if (activeCard.includes('D')) {
        points = 12;
    } else if (activeCard.includes('K')) {
        points = 13;
    } else if (activeCard.includes('A')) {
        points = 14;
    }
    return points;
}

// Show active cards from ai and user

function showCards(aiActiveCard, userActiveCard, indexOfActiveAiCard, indexOfActiveUserCard) {
    const imagesActiveAiCard = document.querySelectorAll('.play__active-card--computer');
    const imagesActiveUserCard = document.querySelectorAll('.play__active-card--user');

    imagesActiveAiCard[indexOfActiveAiCard].style.display = 'block';
    imagesActiveAiCard[indexOfActiveAiCard].src = `../images/cards/${aiActiveCard[indexOfActiveAiCard]}.jpg`;
    imagesActiveAiCard[indexOfActiveAiCard].style.animation = 'showComputerActiveCard .5s linear .5s both';

    imagesActiveUserCard[indexOfActiveUserCard].style.display = 'block';
    imagesActiveUserCard[indexOfActiveUserCard].src = `../images/cards/${userActiveCard[indexOfActiveUserCard]}.jpg`;
    imagesActiveUserCard[indexOfActiveUserCard].style.animation = 'showUserActiveCard .5s linear .5s both';
}

function drawInBattle(aiActiveCard, userActiveCard, indexOfActiveAiCard, indexOfActiveUserCard, aiPoints, userPoints) {
    let counter = 0;
    const warCards = [document.createElement('img'), document.createElement('img'), document.createElement('img'), document.createElement('img')];
    warCards.forEach(card => {
        card.classList.add('play__active-card');
        if (counter < 2) {
            card.classList.add('play__active-card--computer');
        } else {
            card.classList.add('play__active-card--user');
        }
        counter++;
        tableText.appendChild(card);
    })


    setTimeout(() => {
        aiActiveCard.push(drawCard(aiHand));
        userActiveCard.push(drawCard(userHand));

        indexOfActiveAiCard = aiActiveCard.length - 1;
        indexOfActiveUserCard = userActiveCard.length - 1;

        showCards(aiActiveCard, userActiveCard, indexOfActiveAiCard, indexOfActiveUserCard);
    }, 1500);

    setTimeout(() => {
        aiActiveCard.push(drawCard(aiHand));
        userActiveCard.push(drawCard(userHand));

        indexOfActiveAiCard = aiActiveCard.length - 1;
        indexOfActiveUserCard = userActiveCard.length - 1;

        showCards(aiActiveCard, userActiveCard, indexOfActiveAiCard, indexOfActiveUserCard);
    }, 3000);

    console.log(aiActiveCard);
    console.log(userActiveCard);
    console.log(indexOfActiveAiCard);
    console.log(indexOfActiveUserCard);

    // checkWinPointAndHideCards(aiPoints, userPoints, aiActiveCard, userActiveCard, indexOfActiveAiCard, indexOfActiveUserCard);

    // warCards.forEach(card => {
    //     tableText.removeChild(card);
    // })
}

// Check who have more points and hide active cards

function checkWinPointAndHideCards(aiPoints, userPoints, aiActiveCard, userActiveCard, indexOfActiveAiCard, indexOfActiveUserCard) {
    const imagesActiveAiCard = document.querySelectorAll('.play__active-card--computer');
    const imagesActiveUserCard = document.querySelectorAll('.play__active-card--user');

    if (aiPoints > userPoints) {
        userActiveCard.forEach((card) => {
            const indexOfSpliceCard = userHand.indexOf(card);
            userHand.splice(indexOfSpliceCard, 1);
        })
        aiHand.push(...userActiveCard);
        setTimeout(() => {
            imagesActiveAiCard[indexOfActiveAiCard].style.animation = 'hideComputerActiveCard .5s linear both';
            imagesActiveUserCard[indexOfActiveUserCard].style.animation = 'hideUserActiveCardToComputer .5s linear both';
            imagesActiveAiCard[indexOfActiveAiCard].src = '../images/cards/card.jpg';
            imagesActiveUserCard[indexOfActiveUserCard].src = '../images/cards/card.jpg';
            setTimeout(() => {
                imagesActiveAiCard[indexOfActiveAiCard].style.display = 'none';
                imagesActiveUserCard[indexOfActiveUserCard].style.display = 'none';
            }, 1000);
        }, 2000)
    } else if (aiPoints < userPoints) {
        aiActiveCard.forEach((card) => {
            const indexOfSpliceCard = aiHand.indexOf(card);
            aiHand.splice(indexOfSpliceCard, 1);
        })
        userHand.push(...aiActiveCard);
        setTimeout(() => {
            imagesActiveAiCard[indexOfActiveAiCard].style.animation = 'hideComputerActiveCardToUser .5s linear both';
            imagesActiveUserCard[indexOfActiveUserCard].style.animation = 'hideUserActiveCard .5s linear both';
            imagesActiveAiCard[indexOfActiveAiCard].src = '../images/cards/card.jpg';
            imagesActiveUserCard[indexOfActiveUserCard].src = '../images/cards/card.jpg';
            setTimeout(() => {
                imagesActiveAiCard[indexOfActiveAiCard].style.display = 'none';
                imagesActiveUserCard[indexOfActiveUserCard].style.display = 'none';
            }, 1000);
        }, 2000)
    } else {
        drawInBattle(aiActiveCard, userActiveCard, indexOfActiveAiCard, indexOfActiveUserCard);
    }
}

// Check does somebody win battle and update statistics

function checkWinnerAndUpdateStats(aiHand, userHand) {
    if (aiHand.length == 0) {
        scoreBox.style.display = 'block';
        background.style.animation = 'blurTable 5s linear 2s';
        tableText.style.animation = 'blurTable 5s linear 2s';
        scoreInfo.style.animation = 'growUpFont 5s linear 2s';
        scoreInfo.textContent = `Przegrałeś ${bid.value}!`;
        setTimeout(() => {
            scoreBox.style.display = 'none';
        }, 7000);

        wins++;
        statistics[0].textContent = wins;
    } else if (userHand.length == 0) {
        scoreBox.style.display = 'block';
        background.style.animation = 'blurTable 5s linear 2s';
        tableText.style.animation = 'blurTable 5s linear 2s';
        scoreInfo.style.animation = 'growUpFont 5s linear 2s both';
        scoreInfo.textContent = `Przegrałeś ${bid.value}!`;
        setTimeout(() => {
            scoreBox.style.display = 'none';
        }, 7000);

        loses++;
        statistics[1].textContent = loses;
    }
}

// Main function of Put out Button

function goCards() {
    this.disabled = true;

    const aiActiveCard = [drawCard(aiHand)];
    const userActiveCard = [drawCard(userHand)];
    let indexOfActiveAiCard = aiActiveCard.length - 1;
    let indexOfActiveUserCard = userActiveCard.length - 1;
    showCards(aiActiveCard, userActiveCard, indexOfActiveAiCard, indexOfActiveUserCard);

    const aiPoints = addPointsToCards(aiActiveCard[indexOfActiveAiCard]);
    const userPoints = addPointsToCards(userActiveCard[indexOfActiveUserCard]);

    checkWinPointAndHideCards(aiPoints, userPoints, aiActiveCard, userActiveCard, indexOfActiveAiCard, indexOfActiveUserCard);

    checkWinnerAndUpdateStats(aiHand, userHand);

    setTimeout(() => {
        howCards[0].textContent = aiHand.length;
        howCards[1].textContent = userHand.length;
    }, 1500);

    setTimeout(() => {
        putOutBtn.disabled = false;
    }, 3000);
}

putOutBtn.addEventListener('click', goCards);