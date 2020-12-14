const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('inputs/day14.txt');
const lines = _.split(input, '\n');
const rgxMem = /mem\[(\d+)\] = (\d+)/;

const toBin = (val) => val.toString(2).padStart(36, '0');

const applyMask = (value, mask) => {
  const binVal = toBin(value);
  let outVal = '';
  for (let i = 0; i < mask.length; i++) {
    outVal += mask[i] == 'X' ? binVal[i] : mask[i];
  }
  return parseInt(outVal, 2);
}

const applyDecoder = (value, decoder) => {
  const binVal = toBin(value);
  let addrs = [''];
  for (let i = 0; i < decoder.length; i++) {
    if (decoder[i] == 'X') {
      addrs = addrs.reduce((a, v) => a.push(v + '0', v + '1') && a, []);
    } else {
      addrs = addrs.map((v) => v += decoder[i] == '0' ? binVal[i] : decoder[i]);
    }
  }
  return addrs.map((v) => parseInt(v, 2));
}

const firstSolution = () => {
  let mask;
  const mem = {};
  lines.forEach((line) => {
    if (line.startsWith("mask")) {
      mask = line.substr(7);
    } else if (line.startsWith("mem")) {
      let [, addr, value] = rgxMem.exec(line);
      addr = parseInt(addr);
      value = parseInt(value);
      mem[addr] = applyMask(value, mask);
    }
  });
  return Object.values(mem).reduce((a, v) => a + v, 0);
}

const secondSolution = () => {
  let decoder;
  const mem = {};
  lines.forEach((line) => {
    if (line.startsWith("mask")) {
      decoder = line.substr(7);
    } else if (line.startsWith("mem")) {
      let [, addr, value] = rgxMem.exec(line);
      addr = parseInt(addr);
      value = parseInt(value);
      applyDecoder(addr, decoder).forEach((a) => mem[a] = value);
    }
  });
  return Object.values(mem).reduce((a, v) => a + BigInt(v), 0n);
}

console.log("==[Day 14]========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());
