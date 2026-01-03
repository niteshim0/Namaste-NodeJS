const fs = require("fs");
const a = 100;

setImmediate(()=>{console.log("This is setImmediate although its name is contrary to its working")}); // its only name is immediate , but it never runs immediate , it always runs in the next tick(iteration) of event loop

fs.readFile("./file.txt","utf-8",()=>{
  console.log("File reading callback");
}) // it takes longer time more often than not it will be executed at last

Promise.resolve("Promise").then(console.log)

setTimeout(()=>console.log("Timer Expired"),0);

process.nextTick(()=> console.log("process.nextTick working contrary to its name")); // its only name is nextTick , but it runs immediately

function printA(){
  console.log("This is a :", a);
}


printA();
console.log("Last Line of the file");