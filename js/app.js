/*
 * Create a list that holds all of your cards
 */
var icons = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];

const CARD_STATE = { 'TAPPED': 'card', 'UNTAPPED': 'card open show', 'MATCHED': 'card match show' }

const initialState = () => {
    var data = {
        cards: generateShuffledCards(),
        lastCard: undefined,
        matchedAmount: 0,
        moves: 0,
        startTime: undefined,
        endTime: undefined
    };
    
    //tap all cards, initializing the game
    tapCardsScheduled(7, ...data.cards);
    return data;
}

var app = new Vue({
    el: '.container',
    data: initialState(),
    methods: {
        switchCard: function (card) {
            if (this.startTime === undefined) {
                this.startTime = Date.now();
            }

            var untappedCard = this.lastCard;
            console.log('Actual pressed card: ', card);
            if (untappedCard !== undefined) {
                console.log('Previous pressed card: ', untappedCard);
                if (!isSameCard(card, untappedCard)) {
                    if (isComplementaryCard(card, untappedCard)) {
                        matchCards(card, untappedCard);
                        this.matchedAmount++;
                    } else {
                        untapCards(card);
                        tapCardsScheduled(1, card, untappedCard);
                    }
                    this.lastCard = undefined;

                    if (this.endedMatch()) {
                        this.endTime = Date.now();
                    }
                }
                this.moves++;
            } else if (card.state === 'TAPPED') {
                untapCards(card);
                this.lastCard = card;
            }
        },
        cardClass: function(card) {
            return CARD_STATE[card.state];
        },
        endedMatch: function() {
            return this.matchedAmount == icons.length;
        },
        matchTime: function() {
            if (this.endTime != undefined) {
                return Math.abs((this.endTime - this.startTime) / 1000);
            }
            return undefined;
        },
        restartGame: function() {
            Object.assign(this.$data, initialState());
        },
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
        countStars: function(stars) {
            return stars.filter((star) => star == 1).length;
        }
    }
});