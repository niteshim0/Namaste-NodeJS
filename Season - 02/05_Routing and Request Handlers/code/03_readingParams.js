const express = require('express');

const app = express();

app.get("/user/:userId/:name/:password",(req,res)=>{
  console.log(req.params);
  res.send({name : "Nitesh" , lastName : "Kushwaha"});
})
                            
app.listen(3000,()=>{
  console.log("Server is listening on port : 3000");
});
