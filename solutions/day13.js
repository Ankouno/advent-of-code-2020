const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('inputs/day13.txt');
let [startTime, idList] = _.split(input, '\n');
idList = idList.split(",").map((id) => id == 'x' ? id : parseInt(id));

const mod = (n, m) => ((n % m) + m) % m; // mod handling negative numbers
const inverseMod = (n, m) => { // inverse, assuming coprime and inverse exists
  const params = {};
  return gcdExtended(n, m, params)[0];
}

const gcdExtended = (a, b) => {
  if (b == 0) return [1n, 0n, a];
  const [x, y, d] = gcdExtended(b, a % b);
  return [y, x - y * (a / b), d];
}

const firstSolution = () => {
  startTime = parseInt(startTime);
  let minBus, minWait = Number.MAX_VALUE;
  for (let i = 0; i < idList.length; i++) {
    const id = idList[i];
    if (id != 'x') {
      const nextWait = mod(-startTime, id)
      if (nextWait < minWait) {
        minWait = nextWait;
        minBus = id;
      }
    }
  }
  return minBus * minWait;
}

const secondSolution = () => {
  // using chinese remainder theorem
  const aList = [], mList = [], MList = [], yList = [];
  idList.forEach((id, i) => {
    if (id != 'x') aList.push(BigInt(id - i)), mList.push(BigInt(id));
  })

  const m = mList.reduce((m, mi) => m * mi, 1n);
  for (let i = 0; i < mList.length; i++) {
    const M = m / mList[i];
    const y = inverseMod(M, mList[i]);
    MList.push(M);
    yList.push(y);
  }
  
  let x = 0n;
  for (let i = 0; i < aList.length; i++) {
    x += aList[i] * MList[i] * yList[i];
  }
  return mod(x, m);
}

console.log("==[Day 13]========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());
