const fs = require('fs');
const _ = require('lodash');

let ingrCounts = {};
let algsToRecipes = {};

_.compact(fs.readFileSync('inputs/day21.txt', 'utf-8').split('\n')).forEach((line) => {
  let [, ingrs, algs] = /([\w\s]+) \(contains ([\w\s,]+)\)/.exec(line);
  ingrs = ingrs.split(' ');
  ingrs.forEach((ingr) => {
    ingrCounts[ingr] = (ingrCounts[ingr] || 0) + 1;
  });
  algs.split(', ').forEach((alg) => {
    const algList = algsToRecipes[alg] || [];
    algList.push(ingrs)
    algsToRecipes[alg] = algList;
  });
});

const ingrsToAlgs = {};
const numberOfAllergens = Object.keys(algsToRecipes).length;
while (Object.keys(ingrsToAlgs).length < numberOfAllergens) {
  for (alg of Object.keys(algsToRecipes)) {
    const recipes = algsToRecipes[alg];
    const possibleSources = recipes.reduce((a, r) => _.intersection(r, a), recipes[0]);
    if (possibleSources.length == 1) {
      const ingr = possibleSources[0];
      ingrsToAlgs[ingr] = alg;
      Object.keys(algsToRecipes).forEach(alg => {
        algsToRecipes[alg] = algsToRecipes[alg].map((recipe) => {
          return recipe.filter((i) => i != ingr);
        })
      })
      break;
    }
  }
}

const firstSolution = () => {
  const allergyIngrs = Object.keys(ingrsToAlgs);
  return Object.keys(ingrCounts).reduce((count, ingr) => {
    return count + (allergyIngrs.indexOf(ingr) == -1 ? ingrCounts[ingr] : 0);
  }, 0);
}

const secondSolution = () => {
  return Object.keys(ingrsToAlgs).sort((a, b) => ingrsToAlgs[a].localeCompare(ingrsToAlgs[b])).join(',');
}

console.log("==[Day 21]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());