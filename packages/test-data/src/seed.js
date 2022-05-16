var Chance = require("chance");
var chance = new Chance();
const fs = require("fs");

// run to generate test data

const seedNames = () => {
  for (let step = 0; step < 3; step++) {
    let name = chance.name() + "\r\n";
    fs.appendFile("./names.txt", name, (err) => {
      if (err) {
        console.error(err);
      }
      //file written successfully
    });
  }
};

const seedDestinations = () => {
  for (let step = 0; step < 3; step++) {
    let streetName = chance.street() + "\r\n";
    fs.appendFile("./destinations.txt", streetName, (err) => {
      if (err) {
        console.error(err);
      }
      //file written successfully
    });
  }
};

seedNames();
seedDestinations();
