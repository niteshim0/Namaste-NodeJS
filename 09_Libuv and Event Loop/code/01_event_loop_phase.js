const fs = require("fs");
const a = 100;

setImmediate(()=>{console.log("This is setImmediate although its name is contrary to its working")});

fs.readFile("./file.txt","utf-8",()=>{
  console.log("File reading callback");
})

setTimeout(()=>console.log("Timer Expired"),0);

function printA(){
  console.log("This is a :", a);
}


printA();
console.log("Last Line of the file");