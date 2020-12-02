const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('input-files/day1.txt');
const values = _.split(input, '\n').map(_.toSafeInteger);

const firstSolution = () => {
  for (let i = 0; i < values.length - 1; i++) {
    const num1 = values[i];

    for (let j = i + 1; j < values.length; j++) {
      const num2 = values[j];

      if (num1 + num2 == 2020)
        return num1 * num2;
    }
  }
}

const secondSolution = () => {
  for (let i = 0; i < values.length - 2; i++) {
    const num1 = values[i];

    for (let j = i + 1; j < values.length - 1; j++) {
      const num2 = values[j];

      if (num1 + num2 > 2020)
        continue;

      for (let k = j + 1; k < values.length; k++) {
        const num3 = values[k];

        if (num1 + num2 + num3 == 2020)
          return num1 * num2 * num3;
      }
    }
  }
}

console.log("==[Day 1]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());