# Introduction 
This is the coding exercise. It implements a balanced assignment algorithm known as the Munkres/Hungarian algorithm.
It essentially generates a cost matrix using the rules provided and reduces the matrices rows and columns and 
assigns the best cost based off the placement of 0's leftover in the reduced matrix.

# Getting Started
## Prerequisites
In order to contribute to this project, you must have the following software on your machine:

1. [NodeJS version >= 16](https://nodejs.org/en/)
2. MathJS
3. MunkresJS
4. Chance


## Installing Dependencies
Install Node as well as the following dependencies

```
$ npm install mathjs
$ npm install munkres-js
$ npm install chance
```

## Setting Up Test Data
To run the project locally put your txt files in the packages/test-data/src folder as destinations.txt 
and names.txt and please make sure there are no blank newlines at the end of the file. If you don't have your own test data you can 
cd into packages/test-data/src and run 

```
$ node seed.js
```

to generate test data. Just make sure to go into these files and delete the blank newline at the end of them.

## Running the application
cd into the packages/main/src directory and run the following command:
```
$ node mapping-algorithm.js
```