require("./xyz.js");

// const calulateSum = require("./sum.js");
// const { calulateSum, x } = require("./sum.js");
// const { calculateMultiply } = require("./calculate/multiply.js");

// in this file path no need to use index.js because node automatically looks for index.js file in the directory
const { calulateSum, x, calculateMultiply } = require("./calculate/index.js");

const data = require("./data.json");

console.log("Data:", data);

const a = 10;
const b = 20;
calulateSum(a, b);
console.log("a:", a * b);
console.log("x:", x);
console.log("Sum:", calulateSum(a, b));
calculateMultiply(a, b);
console.log("Multiply:", calculateMultiply(a, b));
