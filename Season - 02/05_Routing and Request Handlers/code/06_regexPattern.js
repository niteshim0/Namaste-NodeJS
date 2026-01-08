const express = require('express');

const app = express();

// regex pattern endpoints

app.get(/a/, (req, res) => {
  res.send('matched with anything containing a');
})


app.get(/.*fly$/, (req, res) => {
  res.send('This route path will match butterfly and dragonfly, but not butterflyman, dragonflyman, and so on.')
})
                            
app.listen(3000,()=>{
  console.log("Server is listening on port : 3000");
});