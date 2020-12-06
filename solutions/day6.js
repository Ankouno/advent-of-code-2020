const fs = require('fs');
const { uniq } = require('lodash');
const _ = require('lodash');

const input = fs.readFileSync('inputs/day6.txt');
const groups = _.compact(_.split(input, '\n\n')).map((group) => group.split("\n"));

const firstSolution = () => {
  return groups.reduce((a, group) => a + _.uniq(group.join("")).length, 0)
}

const secondSolution = () => {
  return groups.reduce((a, group) => a + _.intersection(...group.map(a => a.split(''))).length, 0)
}

console.log("==[Day 6]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());