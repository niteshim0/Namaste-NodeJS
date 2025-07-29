
const {calMul} = require('./calculate/multiply.js'); // Importing the calculateMultiply function from multiply.js
const {x, calculateSum} = require('./calculate/sum.js'); // Destructuring to get x and calculateSum directly

module.exports = { x, calculateSum, calMul };