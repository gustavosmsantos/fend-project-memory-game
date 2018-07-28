/*
 * Create a list that holds all of your cards
 */
const icons = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];

const CARD_STATE = { 'TAPPED': 'card', 'UNTAPPED': 'card open show', 'MATCHED': 'card match show' }

const initialState = () => {
    let data = {
        cards: generateShuffledCards(),
        lastCard: undefined,
        matchedAmount: 0,
        moves: 0,
        startTime: undefined,
        endTime: undefined,
        isSwitching: false
    };
    
    //tap all cards, initializing the game
    tapCardsScheduled(7, ...data.cards);
    return data;
}

const app = new Vue({
    el: '.container',
    data: initialState(),
    methods: {
        /**
         * Behavior when a card is pressed.
         */
        switchCard: function (card) {
            if (this.startTime === undefined) {
                this.startTime = Date.now();
            }
            if (!this.isSwitching) {
                var untappedCard = this.lastCard;
                console.log('Actual pressed card: ', card);
                if (validStateForUntapping(card)) {
                    if (untappedCard !== undefined) {
                        console.log('Previous pressed card: ', untappedCard);
                        if (!isSameCard(card, untappedCard)) {
                            this.isSwitching = true;
                            verifyCardsMatching.bind(this)(card, untappedCard);
                            this.lastCard = undefined;
                            if (this.endedMatch()) {
                                this.endTime = Date.now();
                            }
                        }
                        this.moves++;
                    } else {
                        untapCards.bind(this)(card);
                        this.lastCard = card;
                    }
                }
            }
        },
        /** 
         * Retrieve the class for a specific card
         */
        cardClass: function(card) {
            return CARD_STATE[card.state];
        },
        /**
         * Verify if a match has ended
         */
        endedMatch: function() {
            return this.matchedAmount == icons.length;
        },
        /**
         * Retrieve the match resolution time
         */
        matchTime: function() {
            if (this.endTime != undefined) {
                return Math.abs((this.endTime - this.startTime) / 1000);
            }
            return undefined;
        },
        /**
         * Restore the game to the initial state
         */
        restartGame: function() {
            Object.assign(this.$data, initialState());
        },
        /**
         * Retrieve an array representing the earned stars in a match
         * The array has three positions, with one's representing the stars, in order.
         * The number of stars earned are proportional to the amount of moves made in the game:
         * - Until 8 moves: 3 stars
         * - Between 9 and 11 moves: 2 stars
         * - Between 12 and 14 moves: 1 star
         * - More than 14 moves: 0 stars
         */
        getStars: function() {
            if (this.moves <= 8) {
                return [1, 1, 1];
            } else if (this.moves <= 11) {
                return [1, 1, 0];
            } else if (this.moves <= 14) {
                return [1, 0, 0];
            } else {
                return [0, 0, 0];
            }
        }
    },
    filters: {
        /**
         * Count the one's in the stars array.
         */ 
        countStars: function(stars) {
            return stars.filter((star) => star == 1).length;
        }
    }
});