const express = require('express');
const app = express();
const { connectDB } = require('../config/database');

const {User} = require('../models/user');

app.post('/signup', async(req,res)=>{
  
  // actually this user in real production app we will take from the form the user submittted , there will not be any hardcoded data
  // password will be hashed using bcrypt and during login jwt session token and id will do
  // Media files are not stored directly in MongoDB because large files
 // can degrade query performance and increase database load.
 // Instead, we store only the URL of the media file.
 // Services like Cloudinary are used to host and manage media assets.

  
  const dummyUser = {
  name: "Madhav Verma",
  email: "Madhav.dev@example.com",
  password: "hashed_password_here",

  profilePhoto: "https://res.cloudinary.com/demo/image/upload/v1690000000/devtinder/user1.jpg",

  bio: "Backend-focused developer who enjoys designing APIs and working with databases.",

  skills: [
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "REST APIs"
  ],

  experienceLevel: "Junior",

  location: "Bengaluru, India",

  githubUrl: "https://github.com/aarav-dev",
  linkedinUrl: "https://linkedin.com/in/aarav-dev",

  isProfileComplete: true,
  isActive: true,
  role: "user",

  likes: [
    "665fa123abc4567890de1111",
    "665fa123abc4567890de2222"
  ],

  dislikes: [
    "665fa123abc4567890de3333"
  ],

  matches: [
    "665fa123abc4567890de4444"
  ],

  createdAt: new Date("2025-01-05T09:15:00Z"),
  updatedAt: new Date("2025-01-14T18:20:00Z")
};

// Always do error handling while dealing with Database
try{
  const user = new User(dummyUser);
  await user.save();
  return res.send("User added successfully");
  // In MongoDB, when we save a model instance, a document is added to a collection
} catch(err){
  return res.status(400).send("User is not added , there is a problem of :->", err.message);
}
}
)

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





