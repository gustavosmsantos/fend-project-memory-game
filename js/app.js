/*
 * Create a list that holds all of your cards
 */
var icons = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

const CARD_STATE = { "UNTAPPED": "card", "TAPPED": "card open show", "MATCHED": "card match show" }

const generateShuffledCards = () => {
    var cards = [];
    icons.forEach((icon, index) => {
        var card = { id: index, icon: "fa " + icon, state: "UNTAPPED" };
        cards = cards.concat(card, Object.assign({}, card));
    });

    cards = shuffle(cards);
    cards.map((card, index) => {
        return Object.assign(card, { id: index })
    });

    return cards;
}

const isSameCard = (c1, c2) => {
    return c1.id == c2.id;
}

const isComplementaryCard = (c1, c2) => {
    return !isSameCard(c1, c2) && c1.icon === c2.icon;
}

const changeCardsState = (newState, ...cards) => {
    cards.forEach((card) => { card.state = newState });
}

const tapCards = (...cards) => {
    this.changeCardsState('TAPPED', cards);
}

const matchCards = (...cards) => {
    this.changeCardsState('MATCHED', cards);
}

var app = new Vue({
    el: '.container',
    data: {
      cards: generateShuffledCards(),
      lastCards: []
    },
    methods: {
        tapCard: (card) => {

            if (this.lastCards.size == 2) {
                tapCards(this.lastCards);
                this.lastCards = [];
            }

            var tappedCard = this.lastCards[0];
            console.log('Actual pressed card: ', card);
            if (tappedCard !== undefined) {
                console.log('Previous pressed card: ' + tappedCard);

                if (isSameCard(card, tappedCard)) {
                    return;
                }

                if (isComplementaryCard(card, tappedCard)) {
                    matchCards(card, tappedCard);
                } else {
                    tapCards(card);
                }

                this.lastCards.push(card);

            } else if (card.state === 'UNTAPPED') {
                tapCards(card);
                this.tappedCard = card;
            }
        },
        cardClass: (card) => {
            return CARD_STATE[card.state];
        }
    }
})

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
