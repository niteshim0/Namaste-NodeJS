// Case I :: Express handles error by default
app.get('/users',(err,req,res,next)=>{
    // many things inside the server will be xposed to the clients if server will not handle the error gracefully // use try catch
    throw new Error("An Error instance is created");
    next(err); // provided by defualt from express.js
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

//  Case III :: Centralized Error Handling
 
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
 })