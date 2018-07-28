// ---- Private functions ---- //
function changeCardsState(newState, afterChangeAction, ...cards) {
    cards.forEach((card) => { card.state = newState });
    debugger;
    afterChangeAction();
}

const doNothing = () => {};
function endSwitching() { this.isSwitching = false };

// ---- Public functions ---- //

//Cards Comparison
const isSameCard = (c1, c2) => {
    return c1.id == c2.id;
}

const isComplementaryCard = (c1, c2) => {
    return !isSameCard(c1, c2) && c1.icon === c2.icon;
}

//Cards state change
function untapCards(...cards) {
    changeCardsState('UNTAPPED', doNothing, ...cards);
}

function tapCards(afterChangeAction = doNothing, ...cards) {
    changeCardsState('TAPPED', afterChangeAction, ...cards);
}

function matchCards(...cards) {
    changeCardsState('MATCHED', endSwitching.bind(this), ...cards);
    this.matchedAmount++;
}

//Scheduled
function tapCardsScheduled(seconds, ...cards) {
    setTimeout(() => { tapCards(endSwitching.bind(this), ...cards) }, seconds * 1000);
}

const validStateForUntapping = (card) => {
    return card.state === 'TAPPED';
}

function verifyCardsMatching (card, untappedCard) {
    if (isComplementaryCard(card, untappedCard)) {
        matchCards.bind(this)(card, untappedCard);
    } else {
        untapCards.bind(this)(card);
        tapCardsScheduled.bind(this)(1, card, untappedCard);
    }
}