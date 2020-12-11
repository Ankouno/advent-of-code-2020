const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('inputs/day11.txt');
const initMap = _.compact(_.split(input, '\n')).map((row) => row.split(''));
const height = initMap.length; width = initMap[0].length;

const iterateMap = (map, callback) => {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      callback(x, y);
    }
  }
}

const updateMap = (updater) => {
  const newMap = new Array(initMap.length).fill(0).map(() => []);
  iterateMap(newMap, (x, y) => updater(x, y, newMap));
  return newMap;
}

const countTotalOccupied = (map) => {
  let occupiedCount = 0;
  iterateMap(map, (x, y) => map[y][x] == '#' && occupiedCount++)
  return occupiedCount;
}

const countAdjacentOccupied = (x, y, map) => {
  let occupiedCount = 0;
  for (let xi = x - 1; xi <= x + 1; xi++) {
    for (let yi = y - 1; yi <= y + 1; yi++) {
      if ((xi != x || yi != y) && map[yi] && map[yi][xi] == '#') {
        occupiedCount++;
      }
    }
  }
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
    map = updateMap((x, y, newMap) => updateTileAdjacent(x, y, map, newMap) && updateCount++);
    if (updateCount == 0) {
      break;
    }
  }
  return countTotalOccupied(map);
}

//-----------------------------------------------------------------------------
const countLineOfSightOccupied = (x, y, map) => {
  let occupiedCount = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i == 0 && j == 0) {
        continue;
      }

      // find first seat in direction
      let xi = x, yj = y;
      for (;;) {
        xi += i; yj += j;
        if (xi < 0 || xi >= width || yj < 0 || yj >= height) {
          break;
        } else if (map[yj][xi] != '.') {
          if (map[yj][xi] == '#') {
            occupiedCount++;
          }
          break;
        }
      }
    }
  }
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
    map = updateMap((x, y, newMap) => updateTileLine(x, y, map, newMap) && updateCount++);
    if (updateCount == 0) {
      break;
    }
  }
  return countTotalOccupied(map);
}

console.log("==[Day 11]========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());