const express = require('express');

const app = express();

// . You can also use app.all() to handle all HTTP methods and app.use() to specify middleware as the callback function 

//The GET method requests a representation of the specified resource. Requests using GET should only retrieve data and should not contain a request content.
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//The POST method submits an entity to the specified resource, often causing a change in state or side effects on the server.
app.post('/', (req, res) => {
  res.send('Got a POST request')
})

// The PUT method replaces all current representations of the target resource with the request content.
app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
})

// The DELETE method deletes the specified resource.
app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user')
})

app.all('/secret',(req,res,next)=>{
  console.log("Mai hu sabka baap : middleware koi bhi httpReqquest Method if its prefix Match with /secret , then I get applied to everyone");
  next(); // I did get applied , if any other one middleware waiting in line to be executed
})


/*
In HTTP messages, the content describes the 'information' conveyed in the message body (which follows the header section), after any message framing from HTTP/1.1 chunked transfer encoding has been removed. This was referred to as a "payload" in HTTP/1.1, but message "content" distinguishes from frame payloads in HTTP/2 and HTTP/3 where the data in a single frame could be header data, body data, or other control information.
*/ 
                        
app.listen(3000,()=>{
  console.log("Server is listening on port : 3000");
});