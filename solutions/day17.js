const fs = require('fs');
const _ = require('lodash');
const input = fs.readFileSync('inputs/day17.txt', 'utf-8');

// this is a super unoptimized approach but, oh well!

class Point {
  constructor(x = 0, y = 0, z = 0, w = 0) {
    this.pos = _.isArray(x) ? x : [x, y, z, w];
  }

  x = () => this.pos[0];
  y = () => this.pos[1];
  z = () => this.pos[2];
  w = () => this.pos[3];

  isRegistered = (states) => states.has(this.toString());
  isActive = (states) => states.get(this.toString());
  setState = (states, newState) => states.set(this.toString(), newState);
  
  neighbors = (use4D) => {
    const list = [];
    for (let xi = -1; xi <= 1; xi++) {
      for (let yi = -1; yi <= 1; yi++) {
        for (let zi = -1; zi <= 1; zi++) {
          if (use4D) {
            for (let wi = -1; wi <= 1; wi++) {
              if (xi == 0 && yi == 0 && zi == 0 && wi == 0) continue;
              list.push(this.add(xi, yi, zi, wi));
            }
          } else {
            if (xi == 0 && yi == 0 && zi == 0) continue;
            list.push(this.add(xi, yi, zi, 0));
          }
        }
      }
    }
    return list;
  }

  add = (x, y, z, w) => new Point(this.x()+x, this.y()+y, this.z()+z, this.w()+w);
  toString = () => String(this.pos);
}

const countActive = (list, cubes) => {
  return list.reduce((a, n) => a + (n.isActive(cubes) ? 1 : 0), 0);
}

const initCubes = new Map();
_.compact(input.split("\n"))
  .forEach((row, y) => row.split("")
    .forEach((c, x) => new Point(x, y, 0, 0).setState(initCubes, c == '#')));
    
    
const updatePoint = (oldState, newState, p, use4D) => {
  const neighbors = p.neighbors(use4D);
  const activeNbCount = countActive(neighbors, oldState);
  if (p.isActive(oldState)) {
    !_.inRange(activeNbCount, 2, 4) && p.setState(newState, false);
  } else {
    activeNbCount == 3 && p.setState(newState, true);
  }
  return neighbors;
}

const updateState = (oldState, use4D) => {
  const newState = _.clone(oldState);
  oldState.forEach((v, k) => {
    const p = new Point(k.split(",").map(_.parseInt));
    neighbors = updatePoint(oldState, newState, p, use4D);

    // check for unregistered neighbors
    neighbors.forEach((n) => {
      if (!n.isRegistered(newState)) {
        updatePoint(oldState, newState, n, use4D);
      }
    })
  })
  return newState;
}

const firstSolution = () => {
  let cubes = _.clone(initCubes);
  for (let i = 0; i < 6; i++) {
    cubes = updateState(cubes, false);
  }
  let activeCount = 0;
  cubes.forEach((isActive) => isActive && activeCount++);
  return activeCount;
}

const secondSolution = () => {
  let cubes = _.clone(initCubes);
  for (let i = 0; i < 6; i++) {
    cubes = updateState(cubes, true);
  }
  let activeCount = 0;
  cubes.forEach((isActive) => isActive && activeCount++);
  return activeCount;
}

console.log("==[Day 17]========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());
