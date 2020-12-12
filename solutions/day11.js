const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('inputs/day11.txt');
const initMap = _.compact(_.split(input, '\n')).map((row) => row.split(''));
const height = initMap.length; width = initMap[0].length;

const adjacentIterator = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0],           [1, 0],
  [-1, 1],  [0, 1],  [1, 1]
]

const makeNewMap = () => {
  return new Array(initMap.length).fill(0).map(() => []);
}

const iterateMap = (callback) => {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      callback(x, y);
    }
  }
}

const countTotalOccupied = (map) => {
  let occupiedCount = 0;
  iterateMap((x, y) => map[y][x] == '#' && occupiedCount++)
  return occupiedCount;
}

const countAdjacentOccupied = (x, y, map) => {
  let occupiedCount = 0;
  adjacentIterator.forEach(([xi, yi]) => {
    if (map[y-yi] && map[y-yi][x-xi] == '#'){
      occupiedCount++;
    }
  });
  return occupiedCount;
}

// returns true if tile updated
const updateTileAdjacent = (x, y, oldMap, newMap) => {
  const curTile = oldMap[y][x];
  let newTile = curTile;
  if (curTile == 'L') {
    if (countAdjacentOccupied(x, y, oldMap) == 0) {
      newTile = '#';
    }
  } else if (curTile == '#') {
    if (countAdjacentOccupied(x, y, oldMap) >= 4) {
      newTile = 'L';
    }
  }
  newMap[y][x] = newTile;
  return newTile != curTile;
}

const firstSolution = () => {
  let map = initMap;
  for (;;) {
    let updateCount = 0;
    const newMap = makeNewMap();
    iterateMap((x, y) => updateTileAdjacent(x, y, map, newMap) && updateCount++);
    map = newMap;
    if (updateCount == 0) {
      break;
    }
  }
  return countTotalOccupied(map);
}

//-----------------------------------------------------------------------------
const countLineOfSightOccupied = (x, y, map) => {
  let occupiedCount = 0;
  adjacentIterator.forEach(([xi, yi]) => {
    // find first seat in direction
    let stepX = x, stepY = y;
    for (;;) {
      stepX += xi; stepY += yi
      if (stepX < 0 || stepX >= width || stepY < 0 || stepY >= height) {
        // out of bounds
        break;
      } else if (map[stepY][stepX] != '.') {
        if (map[stepY][stepX] == '#') {
          occupiedCount++;
        }
        break;
      }
    }
  })

  return occupiedCount;
}

// returns true if tile updated
const updateTileLine = (x, y, oldMap, newMap) => {
  const curTile = oldMap[y][x];
  let newTile = curTile;
  if (curTile == 'L') {
    if (countLineOfSightOccupied(x, y, oldMap) == 0) {
      newTile = '#';
    }
  } else if (curTile == '#') {
    if (countLineOfSightOccupied(x, y, oldMap) >= 5) {
      newTile = 'L';
    }
  }
  newMap[y][x] = newTile;
  return newTile != curTile;
}

const secondSolution = () => {
  let map = initMap;
  for (;;) {
    let updateCount = 0;
    const newMap = makeNewMap();
    iterateMap((x, y) => updateTileLine(x, y, map, newMap) && updateCount++);
    map = newMap;
    if (updateCount == 0) {
      break;
    }
  }
  return countTotalOccupied(map);
}

console.log("==[Day 11]========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());