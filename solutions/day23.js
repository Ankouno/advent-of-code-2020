const _ = require('lodash');

const input = '137826495'.split('').map(_.toSafeInteger);

const mod = (a, b) => ((a % b) + b) % b;
const printOrder = (cups, next) => {
  let out = '';
  let n = cups[0];
  for (let i = 0; i < cups.length; i++) {
    out += n + ' ';
    n = next[n];
  }
  console.log(out);
}

const moveCups = (inputLabels, moveCount, cupCount) => {
  cupCount = cupCount ?? inputLabels.length;
  let cups = new Array(...inputLabels);
  if (cupCount > cups.length) {
    cups = cups.concat(_.range(_.max(inputLabels) + 1, cupCount + 1));
  }

  let next = new Array(cupCount + 1);
  next[0] = next[next.length - 1] = cups[0];
  for (let i = 0; i < cups.length; i++) {
    next[cups[i]] = cups[i + 1];
  }
  next[cups[cupCount - 1]] = cups[0];
  
  let cur = 0;
  for (let i = 0; i < moveCount; i++) {
    cur = next[cur];
    let dest = (cur != 1) ? cur - 1 : cupCount;
    const r1 = next[cur],
          r2 = next[r1],
          r3 = next[r2];

    while (dest == r1 || dest == r2 || dest == r3) {
      dest = mod(dest - 2, cupCount) + 1;
    }

    next[cur] = next[r3];
    next[r3] = next[dest];
    next[dest] = r1;
  }

  return next;
}

const firstSolution = () => {
  const next = moveCups(input, 100);
  let i = next[1], out = '';
  while (i != 1) {
    out += i;
    i = next[i];
  }
  return out;
}

const secondSolution = () => {
  const next = moveCups(input, 10000000, 1000000);
  return next[1] * next[next[1]];
}

console.log("==[Day 22]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());