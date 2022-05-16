const fs = require("fs");
const munkres = require("munkres-js");
const math = require("mathjs");
const nameFile = "../../test-data/src/names.txt";
const destinationFile = "../../test-data/src/destinations.txt";

// helper file to read data
const getData = (file) => {
  const data = fs.readFileSync(file, "utf8");
  return data.split(/\r?\n/);
};

const main = () => {
  // get list of destinations and names from txt files
  const destinationList = getData(destinationFile);
  const nameList = getData(nameFile);

  // generate the munkres assignment matrix and cost matrix
  const matrices = computeCostMatrix(nameList, destinationList);
  const assignments = matrices[0];
  const costMatrix = matrices[1];

  // calculate suitability score
  const suitabilityScore = totalSuitabilityScore(assignments, costMatrix);

  // map names to destinations
  const mappings = mapNamesToDestinations(
    nameList,
    destinationList,
    assignments
  );
  console.log("Total Suitability Score:", suitabilityScore);
  console.log("Mappings:", mappings);
};

const computeCostMatrix = (names, destinations) => {
  const n = names.length;
  let costMatrix = math.zeros(n, n);
  names.forEach((name, row) => {
    destinations.forEach((destination, column) => {
      let score = calculateSuitabilityScore(name, destination);
      costMatrix.subset(math.index(row, column), score);
    });
  });
  const assignments = munkres(costMatrix.toArray());
  const costMatrix1 = costMatrix.toArray();
  return [assignments, costMatrix1];
};

const calculateSuitabilityScore = (name, destination) => {
  let score;
  let score1;
  if (destination.length % 2 == 0) {
    score = name.match(/[aeiou]/gi);
    score1 = score === null ? 0 : score.length * 1.5;
  } else {
    score = name.match(/[bcdfghjklmnpqrstvwxyz]/gi);
    score1 = score === null ? 0 : score.length;
  }
  if (checkHcf(name.length, destination.length)) {
    score1 = score1 * 1.5;
  }
  return score1;
};

const totalSuitabilityScore = (assignments, costMatrix) => {
  let totalScore = 0;
  let cost = 0;
  assignments.forEach((assignment) => {
    let row = assignment[0];
    let column = assignment[1];
    cost = costMatrix[row][column];
    totalScore += cost;
  });
  return totalScore;
};

const mapNamesToDestinations = (nameList, destinationList, assignments) => {
  let mappings = [];
  assignments.forEach((assignment) => {
    let row = assignment[0];
    let column = assignment[1];
    let name = nameList[row];
    let destination = destinationList[column];
    let mapping = { name: name, destination: destination };
    mappings.push(mapping);
  });
  return mappings;
};

const checkHcf = (number1, number2) => {
  let hcf;
  for (let i = 1; i <= number1 && i <= number2; i++) {
    if (number1 % i == 0 && number2 % i == 0) {
      hcf = i;
    }
  }
  return hcf > 1 ? true : false;
};

main();
