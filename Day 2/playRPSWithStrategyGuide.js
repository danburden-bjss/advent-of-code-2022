/*
The winner of the whole tournament is the rounder with the highest score.
Your total score is the sum of your scores for each round.
The score for a single round is the score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors)
    plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).
 */

/*
What would your total score be if everything goes exactly according to your strategy guide?
 */

const { parseFileAsArray} = require("../utilities/parseFile");

const buildStrategyGuideFromFile = () => {
  const arrayOfRoundsAsString = parseFileAsArray("./strategyGuide")
  return arrayOfRoundsAsString
    .map((roundString, index) => {
      const roundAsArray = roundString.split(" ");
      if (roundAsArray.length === 2) {
        return {
          roundNumber: index + 1,
          theirMove: roundAsArray[0].toLowerCase(),
          requiredResult: roundAsArray[1].toLowerCase(),
        };
      } else {
        console.log(
          `Round number ${index} does not have expected length of 2: ${roundString}`
        );
      }
    })
};

const stratGuide = buildStrategyGuideFromFile();

const gameRules = {
  /*
        * a b c
        a \ b a     X = I Lose
        b b \ c     Y = draw
        c a c \     Z = I Win
    */
  a: { x: "c", z: "b" },
  b: { x: "a", z: "c" },
  c: { x: "b", z: "a" },
};

const dynamicScoring = (theirPlay, myPlay, roundNumber) => {
  const match = `${theirPlay.toLowerCase()}Vs${myPlay.toUpperCase()}`;

  let theirScore = 0;
  let myScore = 0;
  let winner = "";

  switch (match) {
    /*
        * a b c
        a \ b a
        b b \ c
        c a c \
     X = they Win
     Y = draw
     Z = they Lose
     * */
    case "aVsA":
      theirScore = 1 + 3;
      myScore = 1 + 3;
      winner = "draw";
      break;
    case "aVsB":
      theirScore = 1 + 0;
      myScore = 2 + 6;
      winner = "me";
      break;
    case "aVsC":
      theirScore = 1 + 6;
      myScore = 3 + 0;
      winner = "them";
      break;
    case "bVsA":
      theirScore = 2 + 6;
      myScore = 1 + 0;
      winner = "them";
      break;
    case "bVsB":
      theirScore = 2 + 3;
      myScore = 2 + 3;
      winner = "draw";
      break;
    case "bVsC":
      theirScore = 2 + 0;
      myScore = 3 + 6;
      winner = "me";
      break;
    case "cVsA":
      theirScore = 3 + 0;
      myScore = 1 + 6;
      winner = "me";
      break;
    case "cVsB":
      theirScore = 3 + 6;
      myScore = 2 + 0;
      winner = "them";
      break;
    case "cVsC":
      theirScore = 3 + 3;
      myScore = 3 + 3;
      winner = "draw";
      break;
    default:
      // record that the game is void for whatever reason - scores will be zero
      winner = "void";
  }
  return { theirScore, myScore, roundNumber, winner };
};

const workOutShapes = (strategyGuide) => {
  return strategyGuide.map((round) => {
    let myMove = "";
    if (round.requiredResult === "y") {
      myMove = round.theirMove;
    } else {
      myMove = gameRules[round.theirMove][round.requiredResult];
    }
    return { ...round, myMove };
  });
};

const play = workOutShapes(stratGuide);

const playGameByGuide = (strategyGuide) => {
  const results = strategyGuide.map((game) => {
    return dynamicScoring(game.theirMove, game.myMove, game.roundNumber);
  });
  let theyWin = 0;
  let iWin = 0;
  let draw = 0;
  return results.reduce(
    (runningResults, currentResult) => {
      switch (currentResult.winner) {
        case "them":
          theyWin += 1;
          break;
        case "me":
          iWin += 1;
          break;
        case "draw":
          draw += 1;
          break;
      }
      return {
        myScore: runningResults.myScore + currentResult.myScore,
        theirScore: runningResults.theirScore + currentResult.theirScore,
        theyWin,
        iWin,
        draw,
      };
    },
    { myScore: 0, theirScore: 0, theyWin, iWin, draw }
  );
};
const totals = playGameByGuide(play);

console.log(totals);

const totalsWithInitFull = {
  myScore: 11258,
  theirScore: 12887,
  theyWin: 611,
  iWin: 365,
  draw: 1524,
};
