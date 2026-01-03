const fs = require("fs");

setImmediate(() => {
  console.log('This is from setImmediate');
}); // runs always in the next iteration(tick) of the event loop, in the check phase


setTimeout(() => {
  console.log('This is from setTimeout first Timer');
}, 0); // runs after 0 ms in the timers phase

fs.readFile("./file.txt","utf-8",()=>{
  setTimeout(()=>console.log("2nd timer"),0);

  process.nextTick(()=> console.log("This is second nextTick"));

  setImmediate(()=> console.log("2nd setImmediate"));

  console.log("I/O operation completed");
})

process.nextTick(() => {
  console.log('This is from process.nextTick');
}); // runs immediately after the current operation completes, before the event loop continues // it is the most prioritized async taks one it runs before any other microtasks or macrotasks

console.log('This is the last line of the script');
