const fs = require('fs');
const _ = require('lodash');

const mod = (n, m) => ((n % m) + m) % m; // mod handling negative numbers

const input = fs.readFileSync('inputs/day12.txt');
const actions = _.compact(_.split(input, '\n')).map((line) => {
  const [, dir, dist] = /(\w)(\d+)/.exec(line);
  return {cmd: dir, amount: parseInt(dist)}
});

const rotToDir = {0: 'N', 90: 'E', 180: 'S', 270: 'W'};
const dirToRot = {'N': 0, 'E': 90, 'S': 180, 'W': 270}

class Transform {
  constructor(position, rotation) {
    this.position = position;
    this.rotation = dirToRot[rotation];
  }

  rotate = (angle) => {
    this.rotation = mod(this.rotation + angle, 360);
  }

  rotateAroundOrigin = (angle) => {
    const rotation = mod(angle, 360);
    switch (rotation) {
      case 90:  this.position = {x: -this.position.y, y:  this.position.x}; break;
      case 180: this.position = {x: -this.position.x, y: -this.position.y}; break;
      case 270: this.position = {x:  this.position.y, y: -this.position.x}; break;
    }
  }

  moveTowards = (transform, distance) => {
    this.position.x += transform.position.x * distance;
    this.position.y += transform.position.y * distance;
  }

  manhattanDistance = () => Math.abs(this.position.x) + Math.abs(this.position.y);
}

const firstSolution = () => {
  const ship = new Transform({x: 0, y: 0}, 'E');
  actions.forEach((action) => {
    let command = action.cmd == 'F' ? rotToDir[ship.rotation] : action.cmd;
    switch (command) {
      case 'W': ship.position.x -= action.amount; break;
      case 'E': ship.position.x += action.amount; break;
      case 'N': ship.position.y -= action.amount; break;
      case 'S': ship.position.y += action.amount; break;
      case 'R': ship.rotate(action.amount); break;
      case 'L': ship.rotate(-action.amount); break;
    }
  });
  return ship.manhattanDistance();
}

const secondSolution = () => {
  const ship = new Transform({x: 0, y: 0});
  const waypoint = new Transform({x: 10, y: -1});
  actions.forEach((action) => {
    switch (action.cmd) {
      case 'W': waypoint.position.x -= action.amount; break;
      case 'E': waypoint.position.x += action.amount; break;
      case 'N': waypoint.position.y -= action.amount; break;
      case 'S': waypoint.position.y += action.amount; break;
      case 'R': waypoint.rotateAroundOrigin(action.amount); break;
      case 'L': waypoint.rotateAroundOrigin(-action.amount); break;
      case 'F': ship.moveTowards(waypoint, action.amount); break;
    }
  });
  return ship.manhattanDistance();
}

console.log("==[Day 12]========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());