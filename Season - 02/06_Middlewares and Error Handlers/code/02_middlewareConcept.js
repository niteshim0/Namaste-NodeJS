// 

// no mattar what this middleware applied to this app , so any api endpoint you hit I will run
app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()  
})


// Why there is need for middleware ?
// Case I . Code Without Middleware
// Since they all are admin route(special powers)
app.get("/admin/getAllUsers",(req,res,next)=>{
  // authorizing admin
  const token = "abc";
  const isTokenAuthorized = token === "abc";

  if(isTokenAuthorized){
     res.send('All Data Sent');
  }else{
    res.status(401).send('Unauthorized Request'); 
  }
   
})


app.delete("/admin/deleteUsers",(req,res,next)=>{
  // authorizing admin
  const token = "abc";
  const isTokenAuthorized = token === "bc";

  if(isTokenAuthorized){
     res.send('Deleted Data of a User');
  }else{
    res.status(401).send('Unauthorized Request'); 
  }
   
}
);  

// We are authorizing the admin again and again for every admin route which is against the very principle of DRY (so thats middleware comes into the action(it is basically a function,definded once,used multiple times))   
// Case II :: Code with using middlewares

app.use("/admin",(req,res,next)=>{
    const token = "abc";
  const isTokenAuthorized = token === "abc";

  if(!isTokenAuthorized){
      res.status(401).send('Unauthorized Request');
  }else{
    next();      
  }  
})



app.get("/admin/getAllUsers",(req,res,next)=>{
  // admin already authorized by middleware
  res.send('All Data Sent');
})


app.delete("/admin/deleteUsers",(req,res,next)=>{
  // admin already authorized by middleware
  res.send('Delete Data of a User');
}
);  


// Case III ::All the middlewares at the same place


app.use("/admin",adminAuth);



app.get("/admin/getAllUsers",(req,res,next)=>{
  // admin already authorized by middleware
  res.send('All Data Sent');
})


app.delete("/admin/deleteUsers",(req,res,next)=>{
  // admin already authorized by middleware
  res.send('Delete Data of a User');
}
); 

// Other way of using middleware at route level
app.get('/users',userAuth,(req,res,next)=>{
  console.log("First app.get of routeHandler1");
  next();
 })

 app.get('/users',(req,res,next)=>{
  res.send("Now routeHandler ends in route2")
 })

// --------------Error Handling ---------------------



 