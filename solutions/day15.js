const input = "11,18,0,20,1,7,16".split(",")

const solve = (n) => {
  let lastNum = input[input.length - 1];
  const lastSpoken = new Array(n);
  input.forEach((v, i) => lastSpoken[v] = i + 1);

  for (let i = input.length; i < n; i++) {
    const next = lastSpoken[lastNum] ? i - lastSpoken[lastNum] : 0;
    lastSpoken[lastNum] = i;
    lastNum = next;
  }
  return lastNum;
}

const firstSolution = () => solve(2020);
const secondSolution = () => solve(30000000);

console.log("==[Day 15]========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());
