const express = require('express');
const app = express();
const { connectDB } = require('../config/database');

const {User} = require('../models/user');

app.use(express.json()) // middleware to convert JSON(text-format) -> JS Object(native data structure)(operations or function can be performed on data structure not on certain text format)


/*------------------------singup------------------------------------ */
app.post('/signup', async(req,res)=>{
  
try{
  
  const user = new User(req.body); // creating an instance of User model with req.body data
  
  await user.save();

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
/*------------------------------------------------------------------- */


/*----------------------login--------------------------------------- */
// get api (finding the details of one person (finding one document in a collection))
app.get('/user',async (req,res) =>{
  try {
  
    const user = await User.find({email : req.body.email})
    /*if no user found an empty array = [] gets returned so managing that don't use (!user) for checking that fails in javascript*/
    if(user.length === 0){
      res.status(404).send("User Not Found");
    }else{
      res.send(user); // it could be out of else such that execute this if block not executes then next line will execute
    }
  } catch (error) {
    console.log("Something Went Wrong", error);
  }
})
/*------------------------------------------------------------------ */


/*------------------------------feed---------------------------------*/
// feed api
// it returns all the documents(records)(users) of a collection(users)(table) 
app.get('/feed',async (req,res) =>{

  try {
    const users = await User.find(); // no any filtering condition everyone qualifies so gives all the documents in User collection
    if(!user){
      res.status(404).send("Users Not Found");
    }
    res.send(users);
  } catch (error) {
    console.log("Something Went Wrong", error);
  }
})
/* ------------------------------------------------------------- */

/*--------------------Delete-------------------------------------- */

app.delete('/user', async (req,res) => {

  console.log(req.body.userId);
  try {
    const userId = req.body.userId;
    const user = await User.findByIdAndDelete(userId);
    
    // user will contain deleted document(if found) , otherwise null

    if(!user){
      return res.status(404).json({"User Not Found"});
    }
      

  } catch (error) {
    console.log("Something Went Wrong", error);
  }
})

/*---------------------------------------------------------------- */


/* ------------------Update--------------------------------------- */

app.patch('/user', async (req,res) => {
  console.log(req.body);
  try{
     const data = req?.body;
     const userId = req?.body?.userId;
    //  const user = await User.findByIdAndUpdate(userId,data,
    //   {returnDocument: "before"}); // before update version of user
    //  console.log(user);
     const user = await User.findByIdAndUpdate(userId,data,
      {returnDocument: "after"}); // after update version of user
     res.status(200).send("User updated successfully after version" ,user);
  }catch{
    res.status(400).send("Something went wrong!");
  }
})

/*------------------------------------------------------------------- */
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
