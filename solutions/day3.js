const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('inputs/day3.txt');
const map = _.split(input, '\n');
const height = map.length;
const width = map[0].length;

const countTrees = (slopeX, slopeY) => {
  let count = 0, x = 0, y = 0;
  for(; y < height; x += slopeX, y += slopeY) {
    if (map[y][x % width] == '#')
      count++;
  }
  return count;
}

const firstSolution = () => {
  return countTrees(3, 1);
}

const secondSolution = () => {
  return countTrees(1, 1)
       * countTrees(3, 1)
       * countTrees(5, 1) 
       * countTrees(7, 1)
       * countTrees(1, 2);
}

console.log("==[Day 3]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());