// ---- Private functions ---- //
const changeCardsState = (newState, ...cards) => {
    cards.forEach((card) => { card.state = newState });
}

// ---- Public functions ---- //

//Cards Comparison
const isSameCard = (c1, c2) => {
    return c1.id == c2.id;
}

const isComplementaryCard = (c1, c2) => {
    return !isSameCard(c1, c2) && c1.icon === c2.icon;
}

//Cards state change
const untapCards = (...cards) => {
    changeCardsState('UNTAPPED', ...cards);
}

const tapCards = (...cards) => {
    changeCardsState('TAPPED', ...cards);
}

const matchCards = (...cards) => {
    changeCardsState('MATCHED', ...cards);
}

//Scheduled
const tapCardsScheduled = (seconds, ...cards) => {
    setTimeout(() => { tapCards(...cards) }, seconds * 1000);
}