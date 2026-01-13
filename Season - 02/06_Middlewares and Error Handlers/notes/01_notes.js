// Q. If no route handler exists on the server for a client’s request, what happens depends on the protocol, framework, and server configuration ?

/* A. 2️⃣ No Response Sent at All (Buggy Code)
📌 Case: Route exists, but handler forgets to respond

'js
app.get('/test', (req, res) => {
  // forgot res.send()
})
'js

⚠️ What happens:

1.Client request is received
2.Server never sends a response
3.Connection stays open
4.Client waits until timeout

Client-side result:
1.Browser → “This site can’t be reached”
2.API client → Request timed out

💥 This causes:

1.Memory leaks
2.Hanging connections
3.Server overload under high traffic


// Best Practices (VERY IMPORTANT)
✅ Always define:

app.use((req, res) => {
  res.status(404).send('Not Found')
})

✅ Always end responses:

return res.json(...)

✅ Add timeouts:

--Server timeouts
--Client timeouts


// Mental Model
If no route handler exists, the server cannot map the request to any logic, so it either:
---> Responds with 404
---> Or never responds → client timeout   
*/



// ----------------------Middlewares------------------------

/* Q. What is an Express ?
   A. Express is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls.   
   
   Q. What is Middleware ?
   A. Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

   Q. What are the tasks performed by the middleware ?
   A. i) Middleware functions can perform the following tasks:
        --> Execute any code.
        --> Make changes to the request and the response objects.
        --> End the request-response cycle.
        --> Call the next middleware function in the stack.

      ii) If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

   Q. How many and what are the types of middlewares ?
   A. i) Application-level middleware
      ii) Router-level middleware
      iii) Error-handling middleware
      iv) Built-in middleware
T     v) Third-party middleware

   // at this point I have only read about Applicatoin - Level Middleware so I will learn only about that
   
   Q. How Express handles the requests behind the scenes ?
   Node.js builds upon the NodeJS http module.
   A. Client Request
           ↓
      Node.js HTTP Server
           ↓
      Express wraps req & res
           ↓
      Middleware stack
           ↓
      Route matching
           ↓
      Controller logic
           ↓
      Response sent

   
// --------------Error Handling in Express ------------------------

Error Handling refers to how Express catches and processes errors that occur both synchronously and asynchronously. Express comes with a default error handler so you don’t need to write your own to get started.

You define error-handling middleware last, after other app.use() and routes calls(always)


// Case I :: Express handles error by default
app.get('/users',(err,req,res,next)=>{
    // many things inside the server will be xposed to the clients if server will not handle the error gracefully // use try catch
    throw new Error("An Error instance is created");
    next(err); // provided by defualt from express.js
    //  res.send("Now routeHandler ends in route1")
 });

// Case II : Custom Error Handling
// Be careful , while giving arguments to -> callback for routeHandler
// Two arguments it assumes -> req,res
// Three arguments it assumes -> req,res,next
// Four arguments it assumes -> err,req,res,next
// Even their order can't be changed , if you do then err might become next , next-> req , res->err and so on and so forth.

app.get('/users',(req,res)=>{
    try{
        throw new Error("An Error instance is created");
        return res.send("users endpoint hits");
    }catch(err){
        return res.status(500).send("Error is catched using try-catch blocks");
    } 
 });

 Case III :: Centralized Error Handling
 
 app.get('/users',(req,res)=>{
    try{
        throw new Error("Something Went Wrong");
    }catch(err){
        next(err);
    } 
 });


 app.use((err,req,res,next)=>{
  console.error(err.message);
  res.status(500).json({
    success : false,
    message : err.message,
  })
 }) */