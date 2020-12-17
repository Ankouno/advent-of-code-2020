const fs = require('fs');
const input = fs.readFileSync('inputs/day17.txt', 'utf-8').split('\n').map((row) => row.split(''));

const posToString = (x, y, z, w) => x + "," + y + "," + z + "," + w;
const getState = (grid, x, y, z, w) => grid.get(posToString(x, y, z, w));
const setActive = (grid, x, y, z, w) => grid.set(posToString(x, y, z, w), true);

const initGrid = new Map();
input.forEach((row, y) => row.forEach((c, x) => (c == '#') && setActive(initGrid, x, y, 0, 0)));

const countActiveNeighbors = (grid, x, y, z, w, use4D) => {
  let count = 0;
  for (let wi = (use4D ? w - 1 : 0); wi <= (use4D ? w + 1 : 0); wi++) {
    for (let zi = z - 1; zi <= z + 1; zi++) {
      for (let yi = y - 1; yi <= y + 1; yi++) {
        for (let xi = x - 1; xi <= x + 1; xi++) {
          if ((xi != x || yi != y || zi != z || wi != w) && getState(grid, xi, yi, zi, wi)) {
            count++;
          }
        }
      }
    }
  }
  return count;
}

const iterateMap = (oldGrid, limits, use4D) => {
  const newGrid = new Map();
  limits[0][0]--; limits[0][1]++;
  limits[1][0]--; limits[1][1]++;
  limits[2][0]--; limits[2][1]++;
  if (use4D) limits[3][0]--, limits[3][1]++;

  for (let w = limits[3][0]; w < limits[3][1]; w++) {
    for (let z = limits[2][0]; z < limits[2][1]; z++) {
      for (let y = limits[1][0]; y < limits[1][1]; y++) {
        for (let x = limits[0][0]; x < limits[0][1]; x++) {
          const isActive = getState(oldGrid, x, y, z, w);
          const activeNeighbors = countActiveNeighbors(oldGrid, x, y, z, w, use4D);
          if (activeNeighbors == 3 || (isActive && activeNeighbors == 2)) {
            setActive(newGrid, x, y, z, w);
          }
        }
      }
    }
  }
  return newGrid;
}

const getSixIterations = (use4D) => {
  const limits = [
    [0, input.length],    // x
    [0, input[0].length], // y
    [0, 1], // z
    [0, 1]  // w
  ];

  let map = initGrid;
  for (let i = 0; i < 6; i++) {
    map = iterateMap(map, limits, use4D);
  }
  
  let finalActive = 0;
  map.forEach((isActive) => isActive && finalActive++);
  return finalActive;
}

const firstSolution = () => getSixIterations(false);
const secondSolution = () => getSixIterations(true);

console.log("==[Day 17]========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());
