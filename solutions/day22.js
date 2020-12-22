const fs = require('fs');
const _ = require('lodash');

const startingDecks = fs.readFileSync('inputs/day22.txt', 'utf-8').split('\n\n')
  .map((deck) => _.compact(deck.split('\n')).slice(1).map(_.toSafeInteger));

const playRound1 = (decks) => {
  while (decks[0].length && decks[1].length) {
    const card1 = decks[0].shift();
    const card2 = decks[1].shift();
    card1 > card2 ? decks[0].push(card1, card2) : decks[1].push(card2, card1);
  }
  return decks[0].length ? 0 : 1;
}

const playRound2 = (decks) => {
  const prevP1 = [], prevP2 = [];
  while (decks[0].length && decks[1].length) {
    const deckStr1 = decks[0].join('-');
    const deckStr2 = decks[1].join('-');
    if (prevP1.indexOf(deckStr1) != -1 || prevP2.indexOf(deckStr2) != -1) {
      return 0; // player 1 instantly wins
    }
    prevP1.push(deckStr1);
    prevP2.push(deckStr2);

    const card1 = decks[0].shift();
    const card2 = decks[1].shift();
    let winner;
    if (decks[0].length >= card1 && decks[1].length >= card2) { // recursive game
      const subDecks = [[...decks[0].slice(0, card1)], [...decks[1].slice(0, card2)]];
      winner = playRound2(subDecks);
    } else {
      winner = card1 > card2 ? 0 : 1;
    }

    winner == 0 ? decks[0].push(card1, card2) : decks[1].push(card2, card1);
  }
  return decks[0].length ? 0 : 1;
}

const calculateScore = (winner) => winner.reduce((a, c, i) => a + c * (winner.length - i), 0);

const firstSolution = () => {
  const decks = [[...startingDecks[0]], [...startingDecks[1]]];
  const winner = playRound1(decks);
  return calculateScore(decks[winner]);
}

const secondSolution = () => {
  const decks = [[...startingDecks[0]], [...startingDecks[1]]];
  const winner = playRound2(decks);
  return calculateScore(decks[winner]);
}

console.log("==[Day 22]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());