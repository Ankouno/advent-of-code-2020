const fs = require('fs');
const {compact, toSafeInteger, range} = require('lodash');

const [cardKey, doorKey] =
  compact(fs.readFileSync('inputs/day25.txt', 'utf-8').split('\n')).map(toSafeInteger)

const powerMod = (base, exponent, modulus) => {
  if (modulus === 1) return 0;
  var result = 1;
  base = base % modulus;
  while (exponent > 0) {
    if (exponent % 2 === 1)
      result = (result * base) % modulus;
    exponent = exponent >> 1;
    base = (base * base) % modulus;
  }
  return result;
}

const firstSolution = () => {
  // implementation of baby-step, giant-step
  const a = 7;
  const b = 20201227;
  
  const m = Math.floor(Math.sqrt(cardKey));
  let d = {}, e = 1;
  for (let j = 0; j < m; j++) {
    d[e] = j;
    e = (e * a) % b;
  }
  const f = powerMod(a, b - m - 1, b);
  let i = 0, t = cardKey;
  for (; !d[t]; i++, t = (t * f) % b) { }

  return powerMod(doorKey, i * m + d[t], b);
}

console.log("==[Day 25]=========")
console.log("1) " + firstSolution());