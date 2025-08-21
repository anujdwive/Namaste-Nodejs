// Module by default protects its variables and functions
// This means that variables and functions defined in a module are not accessible outside of it unless explicitly exported.
// To export variables or functions, we use `module.exports` or `exports` object.

const x = 10;

y = 20; // This is not giving an beacuse i am using cjs module system but if I use es6 module system then it will give an error

function calulateSum(a, b) {
  return a + b;
}
// We have multiple ways to export
// 1. Using `module.exports` to export a single function or object
// module.exports = calulateSum; // Exporting the function to make it available in other files
// module.exports = { x: x, calulateSum: calulateSum };

console.log(module.exports); // This will show an empty object {} if nothing is exported yet

module.exports = { x, calulateSum };
