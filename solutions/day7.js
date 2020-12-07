const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('inputs/day7.txt');
const bagContents = _.compact(_.split(input, '\n')).reduce((a, rule) => {
  const [bagName, contentStr] = rule.split(" bags contain ");
  a[bagName] = [];

  let match;
  const bagRgx = /(\d+) (\w+ \w+)/g;
  while ((match = bagRgx.exec(contentStr))) {
    a[bagName].push({name: match[2], count: parseInt(match[1])});
  }

  return a;
}, {});

const bagContainsGold = (bagName) => bagContents[bagName].some((child) => child.name == "shiny gold" || bagContainsGold(child.name));
const countContents = (bagName) => bagContents[bagName].reduce((a, child) => a + child.count * (1 + countContents(child.name)), 0);

const firstSolution = () => Object.keys(bagContents).reduce((a, bag) => a + (bagContainsGold(bag) ? 1 : 0), 0);
const secondSolution = () => countContents("shiny gold");

console.log("==[Day 7]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());