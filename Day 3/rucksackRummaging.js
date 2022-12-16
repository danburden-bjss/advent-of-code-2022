/*
To help prioritize item rearrangement, every item type can be converted to a priority:

Lowercase item types a through z have priorities 1 through 26.
Uppercase item types A through Z have priorities 27 through 52.
In the above example, the priority of the item type that appears in both compartments of each rucksack is 16 (p), 38 (L), 42 (P), 22 (v), 20 (t), and 19 (s); the sum of these is 157.

Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?
 */

const { parseFileAsArray } = require("../utilities/parseFile");

const buildRucksackFromFile = () => {
  const arrayOfFullRucksacks = parseFileAsArray("./rucksackContents");
  return arrayOfFullRucksacks.map((fullRucksackContents, index) => {
    if (fullRucksackContents.length % 2 === 0) {
      const halfLength = fullRucksackContents.length / 2;
      return {
        fullRucksackContents,
        firstCompartment: fullRucksackContents.slice(0, halfLength),
        secondCompartment: fullRucksackContents.slice(halfLength),
      };
    } else {
      console.log(
        `rucksack contents at ${index} are not divisible by two: ${fullRucksackContents} is ${fullRucksackContents.length}`
      );
    }
  });
};

const rucker = buildRucksackFromFile();

const findSharedItemsInEachCompartment = (rucksackContents) => {
  return rucksackContents.map((contentsObject) => {
    const firstCompartmentSplit = contentsObject.firstCompartment.split("");
    const secondCompartmentSplit = contentsObject.secondCompartment.split("");
    let sharedItem;
    secondCompartmentSplit.forEach((secondCompLetter) => {
      if (firstCompartmentSplit.indexOf(secondCompLetter) !== -1) {
        sharedItem = secondCompLetter;
      }
    });
    return {
      ...contentsObject,
      sharedItem,
    };
  });
};

const shared = findSharedItemsInEachCompartment(rucker);
// console.log(shared);

const updateRucksacksWithPointsValue = (ruckerWithShared) => {
  // Lowercase item types a through z have priorities 1 through 26.
  // Uppercase item types A through Z have priorities 27 through 52.
  return ruckerWithShared.map((rucksackContents) => {
    let utfPoints = mapLetterToValue(rucksackContents.sharedItem);
    return { ...rucksackContents, sharedItemPriority: utfPoints };
  });
};

const pointyRucker = updateRucksacksWithPointsValue(shared);

const mapLetterToValue = (letter) => {
  let utfPoints = letter.charCodeAt(0);
  if (utfPoints > 64 && utfPoints < 91) {
    utfPoints -= 64 - 26;
  } else if (utfPoints > 96 && utfPoints < 123) {
    utfPoints -= 96;
  }
  return utfPoints;
};
const sumAllPriorities = (fullRucksack) =>
  fullRucksack.reduce((prev, curr) => {
    prev.sharedItemPriority += curr.sharedItemPriority;
    return prev;
  });

// Find the item type that corresponds to the badges of each three-Elf group.
// What is the sum of the priorities of those item types?

const findSharedItemsInGroupOfThree = (rucksackContents) => {
  let allBadges = [];
  for (let i = 0; i < rucksackContents.length; i += 3) {
    const firstElfSplit = rucksackContents[i].fullRucksackContents.split("");
    const secondElfSplit =
      rucksackContents[i + 1].fullRucksackContents.split("");
    const thirdElfSplit =
      rucksackContents[i + 2].fullRucksackContents.split("");

    let sharedItem;
    firstElfSplit.forEach((firstElfLetter) => {
      if (
        secondElfSplit.indexOf(firstElfLetter) !== -1 &&
        thirdElfSplit.indexOf(firstElfLetter) !== -1
      ) {
        return (sharedItem = firstElfLetter);
      }
    });
    const sharedValue = mapLetterToValue(sharedItem);
    allBadges.push(sharedValue);
  }
  return allBadges.reduce((prev, curr) => prev + curr);
};

const badgeTotals = findSharedItemsInGroupOfThree(pointyRucker);
console.log(badgeTotals);
