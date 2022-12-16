const fs = require("fs");

const parseFileAsArray = (fileNameLocatorString, splitterChar = /\n/) => {
  const raw = fs.readFileSync(fileNameLocatorString, "utf8").trimEnd();
  return raw.split(splitterChar);
};

const parseFileAsString = (fileNameLocatorString) => {
  return fs.readFileSync(fileNameLocatorString, "utf8").trimEnd();
};

module.exports = { parseFileAsArray, parseFileAsString };
