const generateShuffledCards = () => {
    var cards = [];
    icons.forEach((icon, index) => {
        var card = { id: index, icon: 'fa ' + icon, state: 'UNTAPPED' };
        cards = cards.concat(card, Object.assign({}, card));
    });

    cards = shuffle(cards);
    cards.map((card, index) => {
        return Object.assign(card, { id: index })
    });

    return cards;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided 'shuffle' method below
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