const fs = require('fs');
const _ = require('lodash');
const rgxOpcode = /^(\w+) ([+-]\d+)/;

const input = fs.readFileSync('inputs/day8.txt');
const code = _.compact(_.split(input, '\n')).map((line) => {
  const [, opcode, arg] = rgxOpcode.exec(line);
  return [opcode, parseInt(arg)];
});

// state = {pc, a, stopped}
const continueProgram = (state) => {
  const [opcode, arg] = code[state.pc];
  switch(opcode) {
    case "acc":
      state.a += arg;
      break;
    case "jmp":
      state.pc += arg - 1;
      break;
    case "nop":
      break;
  }

  state.pc += 1;
  if (state.pc >= code.length) {
    state.stopped = true;
  }

  return state;
}

// returns at end of program, or upon detecting a loop
const execProgram = () => {
  let state = {pc: 0, a: 0, stopped: false};
  const visited = [];
  while (!state.stopped && visited.indexOf(state.pc) == -1) {
    visited.push(state.pc);
    state = continueProgram(state);
  }
  return state;
}

const firstSolution = () => {
  return execProgram().a;
}

const secondSolution = () => {
  for (let i = 0; i < code.length; i++) {
    let line = code[i];
    const oldOp = line[0];
    if (oldOp == "jmp" || oldOp == "nop") {
      line[0] = (oldOp == "jmp") ? "nop" : "jmp";
      const state = execProgram();
      line[0] = oldOp;

      if (state.stopped)
        return state.a;
    }
  }
}

console.log("==[Day 8]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());