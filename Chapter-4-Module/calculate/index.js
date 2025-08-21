// If we have multiple files in a module, we can export them all together.
// This is useful for organizing related functionalities in a single module.

const { calulateSum, x } = require("../sum.js");
const { calculateMultiply } = require("./multiply.js");

module.exports = {
  calulateSum,
  calculateMultiply,
  x,
};
