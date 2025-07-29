require('./otherFile.js');
const obj = require('./calculate/sum.js'); // Importing the calculateSum function from sum.js

const data = require('./data.json'); // Importing data from a JSON file

const {calMul}= require('./calculate/multiply.js'); // Importing the calculateMultiply function from multiply.js

var name = "Namaste Node.js";

console.log(data);

var a = 10;
var b = 20;
console.log(obj.x); // Accessing the exported variable x from sum.js
obj.calculateSum(a, b); // This will not work unless calculateSum is exported from sum.js

obj.calculateSum(a,b); // Using the calculateSum function directly
calMul(a,b);
console.log("This is app.js");


// console.log(globalThis === global); // true
// // console.log(globalThis === window); // false in Node.js, true in browsers
// console.log(globalThis.name); // undefined in Node.js, "Namaste Node.js" in browsers
// console.log(globalThis.a); // undefined
// console.log(globalThis.b); // undefinded

// window , this, self , frame, globalThis all references to the global object in web browsers
// In Node.js, globalThis , global refers to the global object, which is different from the window
// In Node.js, globalThis is the global object, while in browsers, it refers to the window object
// In Node.js, globalThis is used to access the global scope, similar to how window is used in browsersn


// cjs vs mjs
// CommonJS (cjs) is the module system used in Node.js, while ES Modules (mjs) is the newer standard.
// CommonJS uses require() to import modules and module.exports to export them, while ES Modules uses import and export syntax.
// In CommonJS, modules are loaded synchronously, while in ES Modules, they can be loaded asynchronously.   
// CommonJS is primarily used in Node.js, while ES Modules are used in both Node.js and browsers.
// In CommonJS, the module.exports object is used to export functions or variables, while in ES Modules, the export keyword is used.



