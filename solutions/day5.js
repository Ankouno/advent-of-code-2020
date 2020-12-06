const fs = require('fs');
const _ = require('lodash');

const charMap = {'F': 0, 'B': 1, 'L': 0, 'R': 1};

const input = fs.readFileSync('inputs/day5.txt');
const fullSeatIDs = _.compact(_.split(input, '\n')).map((line) => {
  const binaryLine = [...line].map((c) => charMap[c]).join("");
  return parseInt(binaryLine, 2);
}).sort((a, b) => a - b);

const firstSolution = () => {
  return fullSeatIDs[fullSeatIDs.length - 1];
}

const secondSolution = () => {
  for (let i = 1; i < fullSeatIDs.length; i++) {
    if (fullSeatIDs[i + 1] - fullSeatIDs[i] > 1)
      return fullSeatIDs[i] + 1;
  }
}

console.log("==[Day 5]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());