const fs = require("fs");
const https = require("https"); // require is a commonjs module so by property these all require works as synchronous operation


https.get("https://dummyjson.com/products/1", (res) => {
  console.log("Fetched data from server");
});

setTimeout(()=>{
 console.log("This is setTimeout callback runs after 5 sec of clearing of call stack");
}, 5000);

fs.readFile("./file.txt", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("File content:", data.toString());
});

console.log("Hello World");

let a = 155;
let b = 70709709;


function multiply(a,b){
  const result = a * b;
  return result;
}

let c = multiply(a, b);

console.log("Multiply result is : " + c);


// These operations contains syncronous as well as non-synchronous operations
// The synchronous operations gets executed immediately
// the non synchronous operations offloads to libuv in event loop and wait till their turn comes(or call stack is empty)
// if call stack gets empty then the event loop will pick the next task from the queue and execute it
// this is how asynchronous programming works in Node.js
// in this way we can achieve non-blocking I/O operations and JS works only on single thread

