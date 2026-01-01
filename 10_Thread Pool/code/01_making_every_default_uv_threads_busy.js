const crypto = require('crypto');

// Function to perform a CPU-intensive task

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


// by default there are only 4 threads so we are using more than 4 blocking operaiotns here
// everytime output might differ , depending on which callback finds the worker threads first and gets executed early
// it will take some time to execute , the 4 callbacks will be executed earyly and any two will take more time than those 4

// Output :: First Time
/*
PS C:\Users\hp\Desktop\Namaste NodeJS\10_Thread Pool\code> node .\01_making_every_default_uv_threads_busy.js
4-cryptopbkdf2 done
3-cryptopbkdf2 done
2-cryptopbkdf2 done
1-cryptopbkdf2 done
5-cryptopbkdf2 done
6-cryptopbkdf2 done
 */

// Output :: Second Time

/*
PS C:\Users\hp\Desktop\Namaste NodeJS\10_Thread Pool\code> node .\01_making_every_default_uv_threads_busy.js
2-cryptopbkdf2 done
3-cryptopbkdf2 done
4-cryptopbkdf2 done
1-cryptopbkdf2 done
5-cryptopbkdf2 done
6-cryptopbkdf2 done
 */



// Note: To change the default number of threads in the libuv thread pool, you can set the UV_THREADPOOL_SIZE environment variable (absolute maximum is 1024).