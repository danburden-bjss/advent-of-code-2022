/*
[P]     [C]         [M]
[D]     [P] [B]     [V] [S]
[Q] [V] [R] [V]     [G] [B]
[R] [W] [G] [J]     [T] [M]     [V]
[V] [Q] [Q] [F] [C] [N] [V]     [W]
[B] [Z] [Z] [H] [L] [P] [L] [J] [N]
[H] [D] [L] [D] [W] [R] [R] [P] [C]
[F] [L] [H] [R] [Z] [J] [J] [D] [D]
 1   2   3   4   5   6   7   8   9
 */

const { parseFileAsArray } = require("../utilities/parseFile");

const moveProcedureArr = parseFileAsArray("./cratesAndProcedure");
const buildInstruction = (procedureStrings) => {
  // crateCount 1, startPos 3, destination 5
  return procedureStrings.map((string, index) => {
    const [, crateCount, , startPos, , destination] = string.split(/(\d+)/);
    return { crateCount, startPos, destination, order: index + 1 };
  });
};

const mappedInstructions = buildInstruction(moveProcedureArr);

const startingLayout = {
  1: ["P", "D", "Q", "R", "V", "B", "H", "F"].reverse(),
  2: ["V", "W", "Q", "Z", "D", "L"].reverse(),
  3: ["C", "P", "R", "G", "Q", "Z", "L", "H"].reverse(),
  4: ["B", "V", "J", "F", "H", "D", "R"].reverse(),
  5: ["C", "L", "W", "Z"].reverse(),
  6: ["M", "V", "G", "T", "N", "P", "R", "J"].reverse(),
  7: ["S", "B", "M", "V", "L", "R", "J"].reverse(),
  8: ["J", "P", "D"].reverse(),
  9: ["V", "W", "N", "C", "D"].reverse(),
};

const moveTheCrates = (startingLayout, mappedInstructions) => {
  let crates = { ...startingLayout };
  mappedInstructions.forEach((instruction) => {
    let cratesToMove;
    cratesToMove = crates[instruction.startPos].splice(
      crates[instruction.startPos].length - instruction.crateCount,
      instruction.crateCount
    );
    crates[instruction.destination].splice(
      crates[instruction.destination].length,
      0,
      ...cratesToMove
    );
  });
  // end result is Object.values() array.pop()
  return Object.values(crates).map((crateColumn) => {
    console.log(crateColumn[crateColumn.length - 1]);
    return crateColumn.pop();
  });
};

const moved = moveTheCrates(startingLayout, mappedInstructions);

console.log(moved);

// const testLayout = {
//   1: ["Z", "N"],
//   2: ["M", "C", "D"],
//   3: ["P"],
// };
// const testInput = parseFileAsArray("./testInput");
// const testInstructions = buildInstruction(testInput);
//
// const aaa = moveTheCrates(testLayout, testInstructions);
// console.log(aaa)
