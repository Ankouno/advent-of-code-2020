const fs = require('fs');
const _ = require('lodash');
const input = fs.readFileSync('inputs/day16.txt', 'utf-8');

class Rule {
  constructor(name, ranges) {
    this.name = name;
    this.ranges = ranges;
  }
  hasInRange = (value) => {
    return this.ranges.some((r) => value >= r[0] && value <= r[1]);
  }
}

// process input
let [rules, myTicket, tickets] = input.split("\n\n");
myTicket = myTicket.split("\n")[1].split(",").map((n) => parseInt(n));
tickets = _.compact(tickets.split("\n")).slice(1).map((line) => {
  return line.split(",").map((n) => parseInt(n))
});
rules = rules.split("\n").map((line) => {
  const [name, value] = line.split(": ");
  const ranges = value.split(" or ").map((r) => r.split("-").map((n) => parseInt(n)));
  return new Rule(name, ranges);
})

// solutions
const firstSolution = () => {
  return tickets.reduce((a, t) => {
    t.forEach((value) => {
      a += rules.every((rule) => !rule.hasInRange(value)) ? value : 0;
    })
    return a;
  }, 0);
}

const secondSolution = () => {
  const validTix = tickets.filter((t) => {
    return t.every((value) => rules.some((rule) => rule.hasInRange(value)));
  });
  validTix.push(myTicket);

  let possibleRules = [];
  for (let i = 0; i < myTicket.length; i++) {
    const applicable = rules.filter((rule) => validTix.every((t) => rule.hasInRange(t[i])));
    possibleRules.push(applicable.map((r) => r.name));
  }

  const ruleOrder = [];
  for (let i = 0; i < rules.length; i++) {
    const position = possibleRules.findIndex((list) => list.length == 1);
    const ruleName = possibleRules[position][0];
    ruleOrder[position] = ruleName;
    possibleRules = possibleRules.map((list) => list.filter((name) => name != ruleName));
  }

  return ruleOrder.reduce((a, ruleName, i) => {
    return a * (ruleName.startsWith("departure") ? myTicket[i] : 1)
  }, 1);
}

console.log("==[Day 16]========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());
