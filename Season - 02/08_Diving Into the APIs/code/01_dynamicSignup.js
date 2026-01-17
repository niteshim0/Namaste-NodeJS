const express = require('express');
const app = express();
const { connectDB } = require('../config/database');

const {User} = require('../models/user');

app.use(express.json()) // middleware to convert JSON(text-format) -> JS Object(native data structure)(operations or function can be performed on data structure not on certain text format)

app.post('/signup', async(req,res)=>{
  
try{
  
  const user = new User(req.body);
  
  await user.save();
  
  console.log(need);

  return res.status(200).send(
    {
      success : true,
      name : req.body.name,
      email : req.body.email
    }
  )
  // In MongoDB, when we save a model instance, a document is added to a collection
} catch(err){
  return res.status(400).send("User is not added , there is a problem of :->", err.message);
}
})

connectDB()
.then(()=>{
  console.log("Database connection established");
  // now server should start
  app.listen(3000,()=>{
  console.log("Server is listening")
});
})
.catch((err)=>{
  console.error('Database connection not established =>' , err.message);
})




