const crypto = require("crypto");

// Set the UV_THREADPOOL_SIZE environment variable to change the number of threads in the thread pool


crypto.pbkdf2("password","salt",5000000,50,"sha512",(err,key)=>{
  console.log("1-cryptopbkdf2 done");
})

crypto.pbkdf2("password","salt",5000000,50,"sha512",(err,key)=>{
  console.log("2-cryptopbkdf2 done");
})

crypto.pbkdf2("password","salt",5000000,50,"sha512",(err,key)=>{
  console.log("3-cryptopbkdf2 done");
})

crypto.pbkdf2("password","salt",5000000,50,"sha512",(err,key)=>{
  console.log("4-cryptopbkdf2 done");
})

crypto.pbkdf2("password","salt",5000000,50,"sha512",(err,key)=>{
  console.log("5-cryptopbkdf2 done");
})

crypto.pbkdf2("password","salt",5000000,50,"sha512",(err,key)=>{
  console.log("6-cryptopbkdf2 done");
})