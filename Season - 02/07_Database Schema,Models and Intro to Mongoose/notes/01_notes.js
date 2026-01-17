// Database connection should start first 
// then only server listening should be established

/*
Q. What is Mongoose ?

A. i) Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

ii) Mongoose ODM is a popular Object Data Modeling (ODM) library for MongoDB and Node.js.

iii) Mongoose acts as a layer between your Node.js application and MongoDB, making it easier to work with MongoDB using JavaScript objects instead of raw queries.

iv) Mongoose is an ODM that provides schema-based modeling, validation, middleware, and abstraction for MongoDB in Node.js applications.

👉 ODM = Object Data Modeling

          ----> MongoDB → documents (JSON-like documents called BSON document)
          ----> Mongoose → maps those documents to JavaScript objects


Q. Why Mongoose is used ?
A. MongoDB is schema-less, but in real applications we need structure and validation.Mongoose provides that structure.

----------------Key Features-----------------------------------
a) Schema definition
b) Model-based data access
c) Built-in validation
d) Middleware (hooks)
e) Query helpers
f) Relationships (populate)
g) Type casting


-----------------------Core Concepts----------------------------------
1. Schema Definition :: 
   Defines the structure of documents in a collection. */
  

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  age: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
   });

/*
2. Model ::
   A model is a wrapper around the schema and represents a MongoDB collection.
   ---> User → model (mongoose)
   ---> users → collection (auto pluralized)(it is saved as users in MongoDB)
*/
const User = mongoose.model("User", userSchema);

module.exports = {User};


/*
3. CRUD Operations
*/

// Create
const user = new User({ name: "Nitesh", email: "nitesh@gmail.com", age: 22});
await user.save();

// Read
const users = await User.find();
const user = await User.findOne({ email: "nitesh@gmail.com" });

// Update
await User.updateOne({ email: "nitesh@gmail.com" }, { age: 23});

// Delete
await User.deleteOne({ email: "nitesh@gmail.com" });

/*
4. Middlewares(Hooks)
 runs before or after certain operations.
 Common hooks:
             -------->pre('save')
             -------->post('save')
             -------->pre('find')
*/
userSchema.pre("save", function (next) {
  console.log("Before saving user");
  next();
});

/*
5. Validation 
*/

email: {
  type: String,
  required: true,
  match: /.+\@.+\..+/
}

/*
6.Relationships(Populate)
MongoDB has no joins, Mongoose provides populate.
*/

const postSchema = new mongoose.Schema({
  title: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

Post.find().populate("userId");


/*------------Mongoose vs MongoDB Native Driver--------------------- */

// | Feature        | MongoDB Driver   | Mongoose   |
// | -------------- | --------------   | ---------- |
// | Schema         | ❌ No            | ✅ Yes      |
// | Validation     | ❌ Manual        | ✅ Built-in |
// | Middleware     | ❌ No            | ✅ Yes      |
// | Populate       | ❌ No            | ✅ Yes      |
// | Learning curve | Low               |   Medium    |


/* Q. When to use Mongoose

i) ✅ Structured applications
ii) ✅ Large projects
iii) ✅ Data validation required
iv) ✅ Relationships between collections

*/

/* When NOT to use Mongoose

i) ❌ Very high-performance apps
ii) ❌ Fully dynamic schemas
iii) ❌ Simple scripts */
