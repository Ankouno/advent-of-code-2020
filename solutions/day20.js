const fs = require('fs');
const _ = require('lodash');

// functions to collect all rotations for a grid
const transpose = (tile) => tile[0].map((_, colIndex) => tile.map(row => row[colIndex]));
const reverse = (tile) => tile.map((row) => row.reverse());
const rotations = (tile) => {
  let allRotations = [tile], prev = tile;
  for (let i = 0; i < 3; i++) {
    const next = reverse(transpose(prev));
    allRotations.push(next);
    prev = next;
  }
  return allRotations;
}
const getGroup = (tile) => rotations(tile).concat(rotations(transpose(tile)));


// parse the input into tiles
const tileGroups = fs.readFileSync('inputs/day20.txt', 'utf-8').split('\n\n').reduce((a, block) => {
  const lines = block.split('\n');
  const id = parseInt(/\d+/.exec(lines[0])[0]);
  return a.set(id, getGroup(lines.slice(1).map((line) => line.split(''))));
}, new Map());


const layoutSize = Math.sqrt(tileGroups.size);
const layout = new Array(layoutSize).fill(0).map(() => new Array(layoutSize));
const stack = _.range(layoutSize).flatMap(y => _.range(layoutSize).map(x => [x, y])).reverse();

// piece together the pieces
const solve = () => {
  if (stack.length == 0) {
    return true;
  }

  const [row, col] = stack.pop();
  const tileIDs = Array.from(tileGroups.keys());
  for (let i = 0; i < tileIDs.length; i++) {
    const id = tileIDs[i];
    const tileGroup = tileGroups.get(id);
    tileGroups.delete(id); // remove tile from pool

    for (tile of tileGroup) {
      if (row > 0) {
        // does this tile line up vertically?
        const prevTile = layout[row - 1][col][1];
        if (prevTile[prevTile.length - 1].join('') != tile[0].join(''))
          continue;
      }
      if (col > 0) {
        // does this tile line up horizontally?
        const prevTile = layout[row][col - 1][1];
        const thisEnd = tile.map((r) => r[0]).join('');
        const prevEnd = prevTile.map((r) => r[r.length - 1]).join('');
        if (prevEnd != thisEnd)
          continue;
      }

      layout[row][col] = [id, tile];
      if (solve()) {
        return true;
      }
    }
    // failed to find solution with this tile; add tile back to pool
    tileGroups.set(id, tileGroup);
  }
  // failed to find solution for this position; add position back to stack
  stack.push([row, col]);
}

// build the full image for part 2
const removeBorders = (tile) => tile.slice(1, tile.length - 1).map((row) => row.slice(1, row.length - 1));
const buildImage = () => {
  let board = layout.map((row) => row.map((tile) => removeBorders(tile[1])));
  const tileSize = board[0][0].length;
  let image = [];
  for (let r = 0; r < tileSize * layoutSize; r++) {
    let row = ''
    for (let c = 0; c < tileSize * layoutSize; c++) {
      row += board[Math.floor(r / tileSize)][Math.floor(c / tileSize)][r % tileSize][c % tileSize];
    }
    image.push(row);
  }
  return image;
}

// solve the layout and return the ids of the four corners multiplied together
const firstSolution = () => {
  solve();
  return layout[0][0][0]
       * layout[layout.length - 1][0][0]
       * layout[0][layout.length - 1][0]
       * layout[layout.length - 1][layout.length - 1][0];
}

// search for monsters in the image
const secondSolution = () => {
  const image = buildImage();
  const monster = ['                  # ',
                   '#    ##    ##    ###',
                   ' #  #  #  #  #  #   '].map(x => x.split(''));

  for (pattern of getGroup(monster)) {
    let foundCount = 0;
    for (let dr = 0; dr < image.length - pattern.length + 1; dr++) {
      for (let dc = 0; dc < image[0].length - pattern[0].length + 1; dc++) {
        const found =
          _.range(pattern.length).every(
            (r) => _.range(pattern[0].length).every(
              (c) => pattern[r][c] == ' ' || image[r + dr][c + dc] == '#'));
        foundCount += found ? 1 : 0;
      }
    }
    if (foundCount) {
      return image.join('').match(/#/g).length - pattern.join('').match(/#/g).length * foundCount;
    }
  }
}

console.log("==[Day 20]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());