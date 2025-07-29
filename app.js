var name = "Namaste Node.js";

var a = 10;
var b = 20;

// console.log(a + b);

// function greet() {
//     console.log(name);
// }

// greet();

// console.log(global);

console.log(globalThis === global); // true
// console.log(globalThis === window); // false in Node.js, true in browsers
console.log(globalThis.name); // undefined in Node.js, "Namaste Node.js" in browsers
console.log(globalThis.a); // undefined
console.log(globalThis.b); // undefinded

// window , this, self , frame, globalThis all references to the global object in web browsers
// In Node.js, globalThis , global refers to the global object, which is different from the window
// In Node.js, globalThis is the global object, while in browsers, it refers to the window object
// In Node.js, globalThis is used to access the global scope, similar to how window is used in browsers


