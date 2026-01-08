const express = require('express');

const app = express();

// String Patterns (there has been major change in version 4 express and version 5 express , so you should take little caution , becuase the way of writing pattern has been changed drastically(see migration guide https://expressjs.com/en/guide/migrating-5.html#path-syntax))

app.get('/ab\\?cd', (req, res) => {
  res.send('ab?cd')
})


app.get('/ab*cd', (req, res) => {
  res.send("This route path will match abcd, abxcd, abRANDOMcd, ab123cd, and so on.")
})

app.get(['/abcd', '/abbcd'], (req, res) => {
  res.send('matched')
})
                            
app.listen(3000,()=>{
  console.log("Server is listening on port : 3000");
});
