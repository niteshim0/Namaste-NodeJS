// write the apis so that loggedin_user can review pending requests and either accept or rejecet them
// do cover all the checks -> do proper validation checks on this API


// Thought process of writing APIs
// what should care about when writing GET , POST , PATCH or UPDATE restful APIs

// read bout ref
// read about populate // mongoose docs
// https://mongoosejs.com/docs/populate.html
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/

// work on userRouter API
// get api of all the pending requests for logged_in user
// get api of all the accepted requests (now it becomes connection) for logged_in user
// do proper validation checks on each of these APIs , see where they can break 
// cover all corner and edge cases