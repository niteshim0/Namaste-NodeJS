userRouter
.get("/user/display/feed",
 userAuth,
 async(req,res) => {
  try {
    const loggedInUser = req.user;
    
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let documentSkipped = (page-1)*limit;
    
  // read about comparison and logical operators in mongodb
  // set data structure in JS
  const connectionRequest = await ConnectionRequest.find({
        $or : [
          {senderId : loggedInUser._id },
          {receiverId : loggedInUser._id}
        ]
  }).select("senderId receiverId");


  const hideUsersFromFeed = new Set();

  connectionRequest.forEach((req)=>{
    hideUsersFromFeed.add(req.senderId.toString());
    hideUsersFromFeed.add(req.receiverId.toString());
  });
  
  // read about nesting of comparison and logical operators from Operators
  // in MongoDB Docs --> logic similar to SQL but its easy than SQL
  // mongodb query lang :: https://www.mongodb.com/docs/manual/reference/mql/
  // displays only those people , who are not interested , ignored , accepted , rejected 
  // either by me or them
  const displayUsers = await User.find({
    $and : [
      {_id : {$nin : Array.from(hideUsersFromFeed)}},
      {_id : {$ne : loggedInUser._id}}
    ]
  })
  .skip(documentSkipped)
  .limit(limit);
  
  return res.status(200).send({
    success : true,
    message : "Feed of loggedInUser",
    displayUsers
  })


  } catch (error) {
    return res.status(500).json({
      success : false,
      message : "Internal Server Error"
    })
  }
  
 }
)

module.exports = userRouter;
