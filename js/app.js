/*
 * Create a list that holds all of your cards
 */
var icons = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];

const CARD_STATE = { 'TAPPED': 'card', 'UNTAPPED': 'card open show', 'MATCHED': 'card match show' }

const initialState = () => {
    var data = {
        cards: generateShuffledCards(),
        lastCard: undefined,
        matchedAmount: 0
    };
    
    //tap all cards, initializing the game
    tapCardsScheduled(3, ...data.cards);
    return data;
}

var app = new Vue({
    el: '.container',
    data: initialState(),
    methods: {
        switchCard: function (card) {

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
                }

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
        restartGame: function() {
            Object.assign(this.$data, initialState());
        }
    }
});