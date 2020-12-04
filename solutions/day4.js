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

const firstSolution = () => {
  const reqFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid" /*, "cid" */];
  let validCnt = 0;
  for (let i = 0; i < passports.length; i++) {
    const pass = passports[i];
    if (_.intersection(Object.keys(pass), reqFields).length == reqFields.length)
      validCnt++;
  }
  return validCnt;
}

const secondSolution = () => {
  const validEcl = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
  let validCnt = 0;
  for (let i = 0; i < passports.length; i++) {
    const pass = passports[i];
    const heightInfo = pass.hgt?.match(/^(\d+)(cm|in)$/);
    if (heightInfo) {
      const [, hgt, hgtFormat] = heightInfo;

      const isValid =
        (pass.byr >= 1920 && pass.byr <= 2002) &&
        (pass.iyr >= 2010 && pass.iyr <= 2020) &&
        (pass.eyr >= 2020 && pass.eyr <= 2030) &&
        (hgtFormat == "cm" ? (hgt >= 150 && hgt <= 193)
                           : (hgt >= 59 && hgt <= 76)) &&
        (pass.hcl?.match(/^#[0-9a-f]{6}$/)) &&
        (validEcl.indexOf(pass.ecl) != -1) &&
        (pass.pid?.match(/^\d{9}$/));
        
      if (isValid)
        validCnt++;
    }
  }
  return validCnt;
}

console.log("==[Day 4]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());