const fs = require('fs');
const { result } = require('lodash');
const _ = require('lodash');

const input = fs.readFileSync('inputs/day19.txt', 'utf-8').split('\n\n');
const messages = input[1].split('\n');
let rules = input[0].split('\n').reduce((a, line) => {
  let [key, value] = line.split(": ");
  value = value[0] == '"'
        ? value.substring(1, value.length - 1)
        : value.split(' | ').map((subrule) => subrule.split(' '));
  a[key] = value;
  return a;
}, {})


const testRule = (rule, text) => {
  if (!text) { // ran out of text
    return {isMatch: false};
  }
  if (!_.isArray(rule)) { // reached a single char
    return {isMatch: text[0] == rule, chars: 1};
  }

  for (const sublist of rule) {
    let chars = 0, isMatch = true;

    for (let i = 0; i < sublist.length && isMatch; i++) {
      const results = testRule(rules[sublist[i]], text.substr(chars));
      isMatch &= results.isMatch;
      chars += results.chars;
    }

    if (isMatch) {
      return {isMatch, chars};
    }
  }

  return {isMatch: false}
}


const firstSolution = () => {
  return messages.reduce((count, message) => {
    const results = testRule(rules[0], message);
    if (results.isMatch && results.chars == message.length) {
      count++;
    }
    return count;
  }, 0)
}

const secondSolution = () => {
  // rules[0] = 8 11
  //  rules[8] = (42)+
  //  rules[11] = (42)+ (31)+ with equal number 42/31
  // hence we only need to loop rule 42, then loop rule 31 up to the end.
  // if the number of 42s is greater than the number of 31s, the message is valid.
  return messages.reduce((count, message) => {
    let chars = 0;
    let rule42count = 0,
        rule31count = 0;
    let result;

    do {
      result = testRule(rules[42], message.substr(chars));
      if (result.isMatch) {
        chars += result.chars;
        rule42count++;
      }
    } while (result.isMatch);

    do {
      result = testRule(rules[31], message.substr(chars));
      if (result.isMatch) {
        chars += result.chars;
        rule31count++;
      }
    } while (result.isMatch);
      
    if (chars == message.length && rule31count > 0 && rule42count > rule31count) {
      count++;
    }
    return count;
  }, 0)
}

console.log("==[Day 19]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());