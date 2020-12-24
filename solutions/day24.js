const fs = require('fs');
const {compact, toSafeInteger} = require('lodash');

const tilePaths = compact(fs.readFileSync('inputs/day24.txt', 'utf-8').split('\n'))
  .map((str) => str.replace(/([we])/g, "$1,").split(',').slice(0, -1));

const adjOffs = [[-1, 0], [0, 1], [1, 1], [1, 0], [0, -1], [-1, -1]];
const getAdjacent = (tile) => {
  const pos = tile.split(',').map(toSafeInteger);
  return adjOffs.map((offset) => {
    return (pos[0] + offset[0]) + ',' + (pos[1] + offset[1])
  });
};
const countAdjacent = (bTiles, tile) => {
  return getAdjacent(tile).reduce((c, t) => {
    return c + (bTiles.has(t) ? 1 : 0);
  }, 0);
}

const getTileFromPath = (path) => {
  let x = 0, y = 0;
  path.forEach((dir) => {
    switch(dir) {
      case 'w': x -= 1; break;
      case 'nw': y += 1; break;
      case 'ne': x += 1; y += 1; break;
      case 'e': x += 1; break;
      case 'sw': x -= 1; y -= 1; break;
      case 'se': y -= 1; break;
    }
  })
  return x + ',' + y;
}

const updateTiles = (oldBlack) => {
  const checkTiles = new Set;
  oldBlack.forEach((tile) => getAdjacent(tile).forEach((t) => checkTiles.add(t)));

  const newBlack = new Set();
  checkTiles.forEach((tile) => {
    const adj = countAdjacent(oldBlack, tile);
    let isBlack = oldBlack.has(tile);
    if ((isBlack && (adj == 0 || adj > 2)) || (!isBlack && adj == 2)) {
      isBlack = !isBlack;
    }
    if (isBlack) {
      newBlack.add(tile);
    }
  })

  return newBlack;
}

//----------------------------------------------------------------
let initState;
const firstSolution = () => {
  const bTiles = tilePaths.reduce((bTiles, path) => {
    const tile = getTileFromPath(path);
    bTiles.has(tile) ? bTiles.delete(tile) : bTiles.add(tile);
    return bTiles;
  }, new Set());

  initState = bTiles;
  return bTiles.size;
}

const secondSolution = () => {
  let bTiles = initState; // use the output from p1 as the initial state
  for (let i = 1; i <= 100; i++) bTiles = updateTiles(bTiles);
  return bTiles.size;
}

console.log("==[Day 24]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());