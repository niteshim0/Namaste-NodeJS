console.log("Hello World");

let a = 155;
let b = 70709709;

function multiply(a,b){
  const result = a * b;
  return result;
}

let c = multiply(a, b);

console.log("Multiply result is : " + c);


// These are synchronous operations
// nothing gets offloads to libuv library
// all things happen in a single thread by V8 JS Engine
// code gets executed line by line