// Modeules by default protect their functions and variables from leaking into the global scope
// To share functions or variables, we can use module.exports or exports

var x = 10; // This variable is private to this module
console.log("This is sum.js");
function calculateSum(a, b) {
  console.log(a + b);
}

console.log(module.exports); // This will show the current exports object

// Exporting the function to make it available in other files
module.exports ={
   x : x,
   calculateSum: calculateSum
}

console.log(module.exports);
calculateSum; // This allows other files to use calculateSum by requiring this module