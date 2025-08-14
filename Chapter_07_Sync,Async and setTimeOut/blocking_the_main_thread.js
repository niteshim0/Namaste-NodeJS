const fs = require("fs");
const https = require("https"); // require is a commonjs module so by property these all require works as synchronous operation

const crypto = require("crypto");


fs.readFileSync("./file.txt", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("File content:", data.toString());
});
// this is a blocking call 
// code execution will pause here until the file is read completely
// after the file is read, the next line of code will be executed


// another blocking call
crypto.pbkdf2Sync("password", "salt", 1000000000, 64, "sha512");

console.log("Key generated synchronously");

crypto.pbkdf2("password", "salt", 100000, 64, "sha512", (err, key) => {
  if (err) {
    console.error("Error generating key:", err);
    return;
  }
  console.log("Generated key:", key.toString("hex"));
});

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




