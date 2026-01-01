const fs = require("fs");

console.log("1. Script start");

// ────────────────
// MICROTASKS
// ────────────────
process.nextTick(() => {
  console.log("2. process.nextTick");
});

Promise.resolve().then(() => {
  console.log("3. Promise.then (microtask)");
});

// ────────────────
// TIMERS PHASE
// ────────────────
setTimeout(() => {
  console.log("4. setTimeout (0ms)");
}, 0);

// ────────────────
// CHECK PHASE
// ────────────────
setImmediate(() => {
  console.log("5. setImmediate");
});

// ────────────────
// I/O PHASE (poll)
// ────────────────
fs.readFile(__filename, () => {
  console.log("6. fs.readFile callback (poll phase)");

  // microtasks inside I/O
  process.nextTick(() => {
    console.log("6.1 nextTick inside I/O");
  });

  Promise.resolve().then(() => {
    console.log("6.2 promise inside I/O");
  });

  setImmediate(() => {
    console.log("6.3 setImmediate inside I/O");
  });

  setTimeout(() => {
    console.log("6.4 setTimeout inside I/O");
  }, 0);
});

console.log("4. Script end");


// these all event loop and its phase code you can get at ::https://github.com/libuv/libuv/blob/v1.x/src/win/core.c
// these all written in C and C++ (it will be fun , there are somethings I started understanding code in that)
// At EOD , everything is code , there is no any heavy engine(but one can say its heavy becuase of its complexity of code)
