const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('inputs/day10.txt');
const adapters = _.compact(_.split(input, '\n')).map((line) => parseInt(line)).sort((a, b) => a - b);

const firstSolution = () => {
  const diffCounts = [0, 0, 0, 1]; // last one for wall adapter
  let prev = 0;
  for (let i = 0; i < adapters.length; i++) {
    const curr = adapters[i];
    diffCounts[curr - prev]++;
    prev = curr;
  }
  return diffCounts[1] * diffCounts[3];
}

const secondSolution = () => {
  const finalJoultage = adapters[adapters.length - 1];

  const joultages = new Set(adapters); // allows us to look up by joltage
  const routesToJoultage = []; // tracks the number of routes to each joltage

  routesToJoultage[1] = joultages.has(1) ? 1 : 0;
  routesToJoultage[2] = joultages.has(2) ? routesToJoultage[1] + 1 : 0;
  routesToJoultage[3] = joultages.has(3) ? routesToJoultage[2] + routesToJoultage[1] + 1 : 0;
  for (let i = 4; i <= finalJoultage; i++) {
    routesToJoultage[i] = joultages.has(i) ? routesToJoultage[i-3] + routesToJoultage[i-2] + routesToJoultage[i-1] : 0;
  }

  return routesToJoultage[finalJoultage];
}

console.log("==[Day 10]========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());