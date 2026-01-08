// Server creation using express web framework
// starting routing :: https://expressjs.com/en/guide/routing.html
const express = require("express");

const app = express();



app.use("/hello",(req,res)=>{
  res.send("Hello Client!, hum server bol rahe hai");
});

// handling the incoming request
// that is handling all the request coming from clients
// this callback function is known as request handler
// use works for every type of HTTP Methods , it simply a middleware
// it can change the app working if its position gets changed in script
app.use("/test",(req,res)=>{
  res.send("Hello re clientwa : kaisa hai! this is a test route")
});

app.use("/",(req,res)=>{
  res.send("Expected Result at Root as well as other headers also works because now the prefix Match happens at this position");
})

// Server is listening
app.listen(3000,()=>{
  console.log("Server is listening on port : 3000");
});