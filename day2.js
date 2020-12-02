const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('day2.txt');
const lines = _.split(input, '\n');

const rgx = /(\d+)-(\d+) (\w): (\w+)/;

const firstSolution = () => {
	let validCount = 0;
	for (let i = 0; i < lines.length; i++) {
		const match = rgx.exec(lines[i]);
		if (match) {
			const [, min, max, letter, password] = rgx.exec(lines[i]);
			const passCount = _.sumBy(password, (c) => c == letter);
			if ((min <= passCount) && (passCount <= max))
				validCount++;
		}
	}
	return validCount;
}

const secondSolution = () => {
	let validCount = 0;
	for (let i = 0; i < lines.length; i++) {
		const match = rgx.exec(lines[i]);
		if (match) {
			const [, pos1, pos2, letter, password] = match;
			if ((password[pos1 - 1] == letter) ^ (password[pos2 - 1] == letter))
				validCount++;
		}
	}
	return validCount;
}

console.log("==[Day 2]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());