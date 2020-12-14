const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('inputs/day13.txt');
let [startTime, idList] = _.split(input, '\n');
startTime = parseInt(startTime);
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
  const rows = idList.reduce((a, id, i) => {
    if (id != 'x') a.push({a: BigInt(id - i), m: BigInt(id)})
    return a;
  }, []);

  const m = rows.reduce((m, row) => m * row.m, 1n);
  return rows.reduce((time, row) => {
    const M = m / row.m;
    return mod(time + row.a * inverseMod(M, row.m) * M, m);
  }, 0n)
}

console.log("==[Day 13]========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());
