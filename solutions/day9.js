const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('inputs/day9.txt');
const values = _.compact(_.split(input, '\n')).map((line) => parseInt(line));
const preambleSize = 25;

const isInPreamble = (index) => {
  const currValue = values[index];
  const preamble = index - preambleSize;
  for (let i = 0; i < preambleSize - 1; i++) {
    for (let j = i + 1; j < preambleSize; j++) {
      if (values[preamble + i] + values[preamble + j] == currValue) {
        return true;
      }
    }
  }
  return false;
}

const firstSolution = () => {
  for (let i = preambleSize; i < values.length; i++) {
    if (!isInPreamble(i)) {
      return values[i];
    }
  }
}

const secondSolution = () => {
  var searchValue = firstSolution();
  let i, j;
  for (i = 0; i < values.length; i++) {
    let sum = values[i];
    for (j = i + 1; sum < searchValue && j < values.length; j++) {
      sum += values[j];
    }

    if (sum == searchValue) {
      const foundList = values.slice(i, j).sort((a, b) => a - b);
      return foundList[0] + foundList[foundList.length - 1];
    }
  }
}

console.log("==[Day 9]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());