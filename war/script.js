// Deck
const deck = ['2Z', '2S', '2T', '2W', '3Z', '3S', '3T', '3W', '4Z', '4S', '4T', '4W', '5Z', '5S', '5T', '5W', '6Z', '6S', '6T', '6W', '7Z', '7S', '7T', '7W', '8Z', '8S', '8T', '8W', '9Z', '9S', '9T', '9W', '10Z', '10S', '10T', '10W', 'JZ', 'JS', 'JT', 'JW', 'DZ', 'DS', 'DT', 'DW', 'KZ', 'KS', 'KT', 'KW', 'AZ', 'AS', 'AT', 'AW'];


// DOM references

const saldo = document.querySelector('.play__saldo span');
const playBtn = document.querySelector('.play__play-btn');
const putOutBtn = document.querySelector('.play__put-out');
const statistics = document.querySelectorAll('.stats__number');
const bid = document.querySelector('.form__rate');
const hands = document.querySelectorAll('.play__hand');
const imageActiveAiCard = document.querySelector('.play__active-card--computer');
const imageActiveUserCard = document.querySelector('.play__active-card--user');
const background = document.querySelector('.background');
const tableText = document.querySelector('.play');
const scoreBox = document.querySelector('.score-container');
const scoreInfo = document.querySelector('.score-container__text');
const pointBox = document.querySelector('.points-container');
let howCards = document.querySelectorAll('.points-container__points');

let wins = 0;
let loses = 0;

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

function drawHand(cards) {
    const handCards = [];
    for (let i = 0; i < deck.length / 2; i++) {
        let handCardIndex = Math.floor(Math.random() * cards.length);
        handCards.push(cards[handCardIndex]);
        cards.splice(handCardIndex, 1);
    }
    return handCards;
}

const copyDeck = deck.slice();
let aiHand = drawHand(copyDeck);
let userHand = drawHand(copyDeck);

function startGame() {
    if (bid.value != '' && Math.floor(bid.value) <= Math.floor(saldo.textContent) && Math.floor(bid.value) > 0) {
        bid.disabled = 'true';
        prepareToPlay();
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

function showCards(aiActiveCard, userActiveCard) {
    imageActiveAiCard.style.display = 'block';
    imageActiveAiCard.src = `../images/cards/${aiActiveCard}.jpg`;
    imageActiveAiCard.style.animation = 'showComputerActiveCard .5s linear .5s both';

    imageActiveUserCard.style.display = 'block';
    imageActiveUserCard.src = `../images/cards/${userActiveCard}.jpg`;
    imageActiveUserCard.style.animation = 'showUserActiveCard .5s linear .5s both';
}

function checkWinPointAndHideCards(aiPoints, userPoints, aiActiveCard, userActiveCard) {
    if (aiPoints > userPoints) {
        const indexOfSpliceCard = userHand.indexOf(aiActiveCard);
        userHand.splice(indexOfSpliceCard, 1);
        aiHand.push(userActiveCard);
        setTimeout(() => {
            imageActiveAiCard.style.animation = 'hideComputerActiveCard .5s linear both';
            imageActiveUserCard.style.animation = 'hideUserActiveCardToComputer .5s linear both';
            imageActiveAiCard.src = '../images/cards/card.jpg';
            imageActiveUserCard.src = '../images/cards/card.jpg';
            setTimeout(() => {
                imageActiveAiCard.style.display = 'none';
                imageActiveUserCard.style.display = 'none';
            }, 1000);
        }, 2000)
    } else if (aiPoints < userPoints) {
        const indexOfSpliceCard = aiHand.indexOf(userActiveCard);
        aiHand.splice(indexOfSpliceCard, 1);
        userHand.push(userActiveCard);
        setTimeout(() => {
            imageActiveAiCard.style.animation = 'hideComputerActiveCardToUser .5s linear both';
            imageActiveUserCard.style.animation = 'hideUserActiveCard .5s linear both';
            imageActiveAiCard.src = '../images/cards/card.jpg';
            imageActiveUserCard.src = '../images/cards/card.jpg';
            setTimeout(() => {
                imageActiveAiCard.style.display = 'none';
                imageActiveUserCard.style.display = 'none';
            }, 1000);
        }, 2000)
    }
}

function checkWinnerAndUpdateStats(aiHand, userHand) {
    if (aiHand == []) {
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
    } else if (userHand == []) {
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

function goCards() {
    this.disabled = true;

    const aiActiveCard = drawCard(aiHand);
    const userActiveCard = drawCard(userHand);
    showCards(aiActiveCard, userActiveCard)

    const aiPoints = addPointsToCards(aiActiveCard);
    const userPoints = addPointsToCards(userActiveCard);

    checkWinPointAndHideCards(aiPoints, userPoints, aiActiveCard, userActiveCard);

    checkWinnerAndUpdateStats(aiHand, userHand);

    howCards[0].textContent = aiHand.length;
    howCards[1].textContent = userHand.length;

    setTimeout(() => {
        putOutBtn.disabled = false;
        console.log(this);
    }, 3000);
}

putOutBtn.addEventListener('click', goCards);