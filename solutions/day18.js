const fs = require('fs');
const _ = require('lodash');

const input = _.compact(fs.readFileSync('inputs/day18.txt', 'utf-8').split('\n'))
const parser_p1 = require('../parsers/day18_1.js');
const parser_p2 = require('../parsers/day18_2.js');

const firstSolution = () => input.reduce((a, line) => a + parser_p1.parse(line), 0)
const secondSolution = () => input.reduce((a, line) => a + parser_p2.parse(line), 0)

console.log("==[Day 18]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());