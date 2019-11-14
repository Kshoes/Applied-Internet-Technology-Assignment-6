// main.js

function main() {

    document.querySelector('.playBtn').addEventListener('click', function(evt) {

        document.querySelector('form').style.display = "none";
        evt.preventDefault();

        const startValueString = document.getElementById('startValues').value;
        const startValues = [];

        const startValueStrArray = startValueString.split(',');
        startValueStrArray.map(function(i) {
            const card = new Card(i, getRandomSuit());
            startValues.push(card);  // reverse order so that it will be inserted in correct order in deck
        });

        const deck = new Deck(startValues);

        const computerHand = [];
        const playerHand = [];

        computerHand.unshift(deck.deck.shift()); // dealing two first cards to each player
        playerHand.unshift(deck.deck.shift());
        computerHand.unshift(deck.deck.shift());
        playerHand.unshift(deck.deck.shift());

        //

        let computerTotal = computeTotal(computerHand);
        console.log(computerTotal);
        let playerTotal = computeTotal(playerHand);
        console.log(playerTotal);

        const game = document.querySelector('.game');

        const computerSideDisplay = document.createElement('div');
        game.appendChild(computerSideDisplay);
        const playerSideDisplay = document.createElement('div');
        game.appendChild(playerSideDisplay);

        computerSideDisplay.appendChild(document.createTextNode("Computer Hand - Total: ?"));  // computer total count
        playerSideDisplay.appendChild(document.createTextNode("Player Hand - Total : " + playerTotal)); // player total count

        for(let i = 0; i < computerHand.length; i++) {
            const cardDisplay = document.createElement('div');
            cardDisplay.textContent += computerHand[i].value + "\n";
            cardDisplay.textContent += computerHand[i].suit;
            cardDisplay.setAttribute('class', "card");
            if(i === 0) {
                cardDisplay.style.color = "gray";
                cardDisplay.style.backgroundColor = "gray";
            }
            computerSideDisplay.appendChild(cardDisplay);
        }
        for(let i = 0; i < playerHand.length; i++) {
            const cardDisplay = document.createElement('div');
            cardDisplay.textContent += playerHand[i].value + "\n";
            cardDisplay.textContent += playerHand[i].suit;
            cardDisplay.setAttribute('class', "card");
            playerSideDisplay.appendChild(cardDisplay);
        }

        const hitButton = document.createElement('button');
        hitButton.textContent = "Hit";
        game.appendChild(hitButton);
        const standButton = document.createElement('button');
        standButton.textContent = "Stand";
        game.appendChild(standButton);

    });
}
document.addEventListener('DOMContentLoaded', main);


function getCardNumValue(val) {
    let numVal = 0;
    switch(val) {
        case "2": numval = 2; break;
        case "3": numval = 3; break;
        case "4": numval = 4; break;
        case "5": numval = 5; break;
        case "6": numval = 6; break;
        case "7": numval = 7; break;
        case "8": numval = 8; break;
        case "9": numval = 9; break;
        case "10":
        case "J":
        case "Q":
        case "K": numVal = 10; break;
        case "A": numVal = 11; break;
    }
    return numVal;
}

function computeTotal(hand) {

    let total = 0;
    let aceCount = 0;
    for(let i = 0; i < hand.length; i++) {
        if(hand[i].value === 'A') {
            aceCount++;
        }
        total += getCardNumValue(hand[i].value);
        console.log(hand[i].value);
        console.log(total);
        if(total > 21) {
            if(aceCount > 0) {
                total -= 10;
                aceCount--;
            }
            else {
                return total;
            }
        }
    }
    return total;
}

function getRandomSuit() {
    const suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
    const randomSuit = suits[Math.floor(Math.random()*suits.length)];
    console.log(randomSuit);
    return randomSuit;
}

// function add

class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }
}

class Deck {
    constructor(startValues) {
        this.deck = [];

        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];

        for(let i = 0; i < values.length; i++) {    // initialize deck
            for(let j = 0; j < suits.length; j++) {
                const card = new Card(values[i], suits[j]);
                console.log(card.value);
                console.log(card.suit);
                this.deck.push(card);
            }
        }
        console.log(JSON.stringify(startValues))
        this.shuffle();
        startValues.map((i) => {    // start from last value of startValues
            const card = this.deck.find(deckI => (deckI.value === i.value && deckI.suit === i.suit));   // find card in shuffled deck
            console.log(JSON.stringify(card));
            const cardIndex = this.deck.findIndex(deckI => (deckI.value === i.value && deckI.suit === i.suit));
            console.log(cardIndex);
            this.deck.splice(cardIndex, 1)
            this.deck.unshift(card);  // move to top of deck
            console.log(this.deck[0]);
        });

    }

    shuffle() { // Fisher-Yates shuffle algorithm found here: https://www.frankmitchell.org/2015/01/fisher-yates/
        let temp = null;
        let i = 0, j = 0;
        for (let i = this.deck.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1))
            temp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = temp;
        }
    }
}

