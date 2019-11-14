// main.js

function main() {

    const play = document.querySelector('.playBtn');
    play.addEventListener('click', function(evt) {
        document.querySelector('form').style.display = "none";
        evt.preventDefault();
    })

    const startValueString = document.getElementById('startValues').value;
    const startValues = [];

    const startValueStrArray = startValueString.split(',');
    startValueStrArray.map(function(i) {
        const card = new Card(i, getRandomSuit());
        startValues.unshift(card);  // reverse order so that it will be inserted in correct order in deck
    });

    const deck = new Deck(startValues);

    const computerHand = [];
    const playerHand = [];

    computerHand.unshift(deck.shift()); // dealing two first cards to each player
    playerHand.unshift(deck.shift());
    computerHand.unshift(deck.shift());
    playerHand.unshift(deck.shift());


}
document.addEventListener('DOMContentLoaded', main);

function getCardNumValue(val) {

    let numVal = val;
    switch(val) {
        case "J": numval = 10;
        case "Q": numVal = 10;
        case "K": numVal = 10;
        case "A": numVal = 11;
    }
    return numVal;
}

function getRandomSuit() {
    const suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
    console.log(suits[Math.floor(Math.random()*suits.length)]);
    return suits[Math.floor(Math.random()*suits.length)];
}

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

        for(let suit in suits) {    // initialize deck
            for(let value in values) {
                const card = new Card(value, suit);
                this.deck.push(card);
            }
        }

        shuffle();
        startValues.map((i) => {    // start from last value of startValues
            const card = this.deck.find(deckI => (deckI.value === i.value && deckI.suit === i.suit));   // find card in shuffled deck
            this.deck.splice(indexOf(card), 1).unshift(card);  // move to top of deck
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

