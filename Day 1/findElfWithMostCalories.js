/*
Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?
 */
const { parseFileAsArray} = require("../utilities/parseFile");

const createElves = () => {
  const allElvesAsString = parseFileAsArray("./input", /\n\n/)
  return allElvesAsString.map((elfString) => {
    return elfString.split(/\n/);
  });
};

const elves = createElves();

// console.log(elves)

const addElvesCalories = (elvesArrays) => {
  let elvesAndCals = [];
  elvesArrays.map((elfArray, index) => {
    elvesAndCals.push({
      elfIndex: index,
      totalCalories: elfArray.reduce((acc, curr) => {
        if (curr.length > 0) {
          return parseInt(acc, 10) + parseInt(curr, 10);
        } else {
          return acc;
        }
      }, 0),
    });
  });

  return elvesAndCals;
};
const testArray = [
  [1, 2, 3],
  [2, 3, 4],
  [3, 4, 5],
];
// console.log(addElvesCalories(testArray));

const elvesAndTotalCalories = addElvesCalories(elves);
// console.log(elvesAndTotalCalories);

const findMostCalorieLadenElf = (elfAndCalorieMaps) => {
  return elfAndCalorieMaps.reduce((previousValue, currentValue) => {
    return previousValue.totalCalories > currentValue.totalCalories
      ? previousValue
      : currentValue;
  });
};

console.log(findMostCalorieLadenElf(elvesAndTotalCalories));

/*
Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?
 */

// run three times then pop the highest each time?
const runFindMostThreeTimes = (elfAndCalorieMaps) => {
  let topThree = [];
  let elfCalorieMapClone = elfAndCalorieMaps.slice();
  for (i = 0; i < 3; i++) {
    const currentHighest = findMostCalorieLadenElf(elfCalorieMapClone);
    topThree.push(currentHighest);
    elfCalorieMapClone = elfCalorieMapClone.filter(
      (elfCalObj) =>
        elfCalObj.elfIndex !== currentHighest.elfIndex &&
        elfCalObj.totalCalories !== currentHighest.totalCalories
    );
  }
  return topThree;
};

const sumOfAllCalories = (elfAndCalorieMaps) =>
  elfAndCalorieMaps.reduce((acc, curr) => {
    return (acc.totalCalories || acc) + curr.totalCalories;
  });

const topThree = runFindMostThreeTimes(elvesAndTotalCalories);
console.log(sumOfAllCalories(topThree));
console.log(sumOfAllCalories(elvesAndTotalCalories));
