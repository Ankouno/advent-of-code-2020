const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('inputs/day4.txt');
const passports =
  _.split(input, '\n\n')
   .map((str) => str.split(/\s+/).reduce((pass, fld) => {
      [k, v] = fld.split(':');
      pass[k] = v;
      return pass;
    }, {}));

const isInRange = (value, min, max) => value >= min && value <= max;

const isFieldValid = (key, value) => {
  if (_.isNil(value))
    return false;

  switch(key) {
    case 'byr':
      return isInRange(value, 1920, 2002);
    case 'iyr':
      return isInRange(value, 2010, 2020);
    case 'eyr':
      return isInRange(value, 2020, 2030);
    case 'hgt':
      const heightInfo = value.match(/^(\d+)(cm|in)$/);
      if (heightInfo) {
        const [, height, format] = heightInfo;
        return format == "cm" ? isInRange(height, 150, 193) : isInRange(height, 59, 76);
      }
      return false;
    case 'hcl':
      return value.match(/^#[0-9a-f]{6}$/);
    case 'ecl':
      return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].indexOf(value) != -1;
    case 'pid':
      return value.match(/^\d{9}$/);
  }
}

const reqFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid" /*, "cid" */];

const firstSolution = () => {
  let validCnt = 0;
  for (let i = 0; i < passports.length; i++) {
    const passport = passports[i];
    if (_.every(reqFields, (fld) => _.has(passport, fld)))
      validCnt++;
  }
  return validCnt;
}

const secondSolution = () => {
  let validCnt = 0;
  for (let i = 0; i < passports.length; i++) {
    const passport = passports[i];
    if (_.every(reqFields, (fld) => isFieldValid(fld, passport[fld])))
      validCnt++;
  }
  return validCnt;
}

console.log("==[Day 4]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());