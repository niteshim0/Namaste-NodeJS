// Explore Tinder App and its API structure
// List down all APIs
// Create them
// Read about Router Object in Express.js
// Understand its working 
// Now , group your routes by their functionality , create different router object
// Create routes folder
// Move APIs to feasible routes
// create logout api , editProfile , forgotPassword APIs
// learn about crypto node.js built-in module
// otpgeneration , otphashing


authRouter.post('/forgotPassword', (req,res) => {
   // client sends email
   // is that person exist in our system
   // if not , tell the client
   // if it is , verifies through otp that it is the same person
   // if otp gets verified
   // then i will let him update the password.
   // password updated successfully , redirect to login or signp page
})