const express = require('express');

const app = express();

// Different case of route handling

// Case I : No response from the server
app.use('/users',()=>{
  console.log("This is going to be timed out because I am listening the client request but not sending any response(connection gets timed out)");
})     
   
// Case II : multiple routeHandlers but request-response cycle ends at Ist only
// Q. Why it ends at the very first routeHandler?
// A. Because Javascript works in synchronous manner, so as soon as we send the response the call stack gets empty(just like how in function when we return,it means end no further execution)
// Read about Javascript RunTime Stack + Synchronous Execution of JS + How Function Works
app.use('/users',
  (req,res)=>{
  console.log("Route Handler 1");
  res.send('Response from Route Handler 1');
  }, 
  (req,res)=>{
    console.log('Route Handler 2');
    res.send('Response from Route Handler 2')
  }
)

// Case III : Two Route Handler , and second one is giving response not the first one this time , moving to next routeHandler using next() middleware
// Ans resides how the recursion works(fuction calling function works) + runtime stack
// both gets executed but response will be sent from the second one     

app.use('/users',
  (req,res,next)=>{
  console.log("Route Handler 1");
  next();
  },
  (req,res,next)=>{
    console.log('Route Handler 2');
    res.send('Response from Route Handler 2')
  }
)
  
// Case IV : Two Route Handler , and second one is giving response not the first one this time despite first also having response, moving to next routeHandler using next() middleware , it will look like perfect code(because behaves how we have thought on client side) but on server side it gives error

/*Error :: Cannot set headers after they are sent to the client
You already sent a response to the client,
and now your code is trying to send another response for the same request.
HTTP allows only ONE response per request.
*/         

// It happens because js is synchronous,js executes  according to callStack 
/* how call stack looks like ::
routeHandler2     
routeHandler1()
*/  
/* Execution started happening from routeHandler1 logs whatever in console
sees next() -> control gets transferred to routeHandler2
routeHandler2 started executing
response gets sent back to client and request-response cycle ends
TCP connection is broken b/w client and server(now server and client both doesn't know each other)     
routeHandler2 gets finished executing(popped off from call stack , next() have done its work) control gets transferred back to routeHandler1
next() have done its work , js engine goes to next line of next() in routeHandler1 and sending the response back (but at this point of time) , the server doesn't know which is client so results in error

// Internal Working of Express
/*
When you call:

res.send()

Express:
1.Sends HTTP headers
2.Writes response body
3.Ends the response stream

After that:
res.setHeader()
res.status()
res.send()
❌ is illegal → headers are already sent
*/

app.use('/users',
  (req,res,next)=>{
  console.log("Route Handler 1");
  next();
  res.send('Response from Route Handler 1')
  },
  (req,res,next)=>{
    console.log('Route Handler 2');
    res.send('Response from Route Handler 2')
  }
)


/* Case V : Multiple level of routeHandler , but response is sent back from only last level
Ans :: Working of next() + Javascript is synchronous + request-response cycle working
*/  

app.use('/users',
  (req,res,next)=>{
  console.log("Route Handler 1");
  next();
  },
  (req,res,next)=>{
    console.log('Route Handler 2');
    next();
  },
  (req,res,next)=>{
  console.log("Route Handler 3");
  next();
  },
  (req,res,next)=>{
    console.log('Route Handler 4');
    next();
  },
  (req,res,next)=>{
  console.log("Route Handler 5");
  next();
  },
  (req,res,next)=>{
    console.log('Route Handler 6');
    res.send('Response from Route Handler 6')
  }
)

// Case VI :: route Handler gets stored inside arrays(works as normal case)
// there is also some array + normal possible
app.use('/users',
  [(req,res,next)=>{
  console.log("Route Handler 1");
  next();
  },
  (req,res,next)=>{
    console.log('Route Handler 2');
    next();
  },
  (req,res,next)=>{
  console.log("Route Handler 3");
  next();
  },
  (req,res,next)=>{
    console.log('Route Handler 4');
    next();
  },
  (req,res,next)=>{
  console.log("Route Handler 5");
  next();
  },
  (req,res,next)=>{
    console.log('Route Handler 6');
    res.send('Response from Route Handler 6')
  }]
)

// Case VII : Even at nth Level, no any response sent back but control gets transferred
// It thinks next() is supposed to get,post(respective http Methods) , if get -> cannot GET /users error , if post Cannot POST /users
app.use('/users',
  (req,res,next)=>{
  console.log("Route Handler 1");
  next();
  },
  (req,res,next)=>{
    console.log('Route Handler 2');
    next();
  },
  (req,res,next)=>{
  console.log("Route Handler 3");
  next();
  },
  (req,res,next)=>{
    console.log('Route Handler 4');
    next();
  },
  [
  (req,res,next)=>{
  console.log("Route Handler 5");
  next();
  },
  (req,res,next)=>{
    console.log('Route Handler 6');
    // No response even from last level but control gets transferred
    next();
  }]
)

// Case VIII :: Different app.get for same api endpoint
// behaves in same way as VI , means every callback with same route Hanlder will execute one after the other as it was supposed to be , if you do next() , it will move to next
 app.get('/user',(req,res,next)=>{
  console.log("First app.get of routeHandler1");
  next();
 })

 app.get('/user',(req,res,next)=>{
  res.send("Now routeHandler ends in route2")
 })

app.listen(3000,()=>{
  console.log('Server is listening at port 3000');
})