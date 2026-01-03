const crypto = require('crypto');

process.env.UV_THREADPOOL_SIZE = 10; // Set thread pool size to 10


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

crypto.pbkdf2("password","salt",5000000,50,"sha512",(err,key)=>{
  console.log("7-cryptopbkdf2 done");
})

crypto.pbkdf2("password","salt",5000000,50,"sha512",(err,key)=>{
  console.log("8-cryptopbkdf2 done");
})

crypto.pbkdf2("password","salt",5000000,50,"sha512",(err,key)=>{
  console.log("9-cryptopbkdf2 done");
})

crypto.pbkdf2("password","salt",5000000,50,"sha512",(err,key)=>{
  console.log("10-cryptopbkdf2 done");
})

