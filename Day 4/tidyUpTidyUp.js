const { parseFileAsArray} = require("../utilities/parseFile");

const buildSectionAssignmentsFromFile = () => {
  // each line in file is a string of a pair
  const arrayOfSectionPairStrings = parseFileAsArray("./sectionAssignments")
  return arrayOfSectionPairStrings.map((sectionPairString) => {
    // each string is a comma separated pair
    const sectionPairs = sectionPairString.split(",");
    const section1 = sectionPairs[0].split("-");
    const section2 = sectionPairs[1].split("-");
    return {
      section1Low: parseInt(section1[0]),
      section1High: parseInt(section1[1]),
      section2Low: parseInt(section2[0]),
      section2High: parseInt(section2[1]),
    };
  });
};

const assignedSections = buildSectionAssignmentsFromFile();

const findFullyContainedRanges = (sectionMap) => {
  let containedCount = 0;
  sectionMap.forEach((sectionObject) => {
    if (
      // check range 1 is inside range 2
      // 1 low is same as or higher than 2 low
      (sectionObject.section1Low >= sectionObject.section2Low &&
        // 1 low is also same as or lower than 2 high
        sectionObject.section1Low <= sectionObject.section2High &&
        // 1 high is same or higher than 2 low
        sectionObject.section1High >= sectionObject.section2Low &&
        // 1 high is same or lower than 2 high
        sectionObject.section1High <= sectionObject.section2High) ||
      // check range 2 is within range 1
      // 2 low is same as or higher than 1 low
      (sectionObject.section2Low >= sectionObject.section1Low &&
        // 2 low is also same as or lower than 1 high
        sectionObject.section2Low <= sectionObject.section1High &&
        // 2 high is same or higher than 1 low
        sectionObject.section2High >= sectionObject.section1Low &&
        // 2 high is same or lower than 1 high
        sectionObject.section2High <= sectionObject.section1High)
    ) {
      containedCount += 1;
    }
  });
  return containedCount;
};
/*
...789...949596...
..678...939495...
 */
const contained = findFullyContainedRanges(assignedSections);
console.log(contained);

const testArr = [
    {
        "section1Low": 1,
        "section1High": 10,
        "section2Low": 2,
        "section2High": 8
    },
    {
        "section1Low": 1,
        "section1High": 10,
        "section2Low": 11,
        "section2High": 20
    },
    {
        "section1Low": 11,
        "section1High": 20,
        "section2Low": 1,
        "section2High": 10
    },
    {
        "section1Low": 2,
        "section1High": 8,
        "section2Low": 1,
        "section2High": 10
    },
    {
        "section1Low": 1,
        "section1High": 10,
        "section2Low": 10,
        "section2High": 10
    },
]
const findOverlappingRanges = (sectionMap) => {
  let overlapCount = 0;
  sectionMap.forEach((sectionObject) => {
    if (
      // check range 1 overlaps range 2
      // 1 high is same or higher than 2 low where 2 low is lower or same as 1 low
      (sectionObject.section1High >= sectionObject.section2Low &&
        sectionObject.section1Low <= sectionObject.section2Low) ||
      // check range 2 overlaps range 1
      // 2 high is same or higher than 1 low where 1 low is lower or same as 2 low
      (sectionObject.section2High >= sectionObject.section1Low &&
        sectionObject.section2Low <= sectionObject.section1Low)
    ) {
      overlapCount += 1;
        // console.log('yes\n')
    }
    else {
        // console.log('no\n')
    }
  });
  return overlapCount;
};

// const testOverlaps = findOverlappingRanges(testArr);
const overlaps = findOverlappingRanges(assignedSections);

console.log(overlaps);
// console.log(testOverlaps);
