const fs = require("fs");
const https = require("https"); // require is a commonjs module so by property these all require works as synchronous operation


https.get("https://dummyjson.com/products/1", (res) => {
  console.log("Fetched data from server");
});

setTimeout(()=>{
 console.log("Call me ASAP");
},0);

// Even though there is timer of only 0 ms , it doesn't guarantee that it will execute after 0 ms
// it guarantees that it will execute after the current call stack is cleared then it will take 0 ms

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




