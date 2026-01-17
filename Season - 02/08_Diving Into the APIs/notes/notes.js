// Difference b/w Javascript Objects and Javascript Object Notataion

/*
1️⃣ JavaScript Object
   A JavaScript object is a native data structure used inside JavaScript code.

✅ Features

i) Can store functions, undefined, Date, etc.
ii) Keys don’t need quotes.
iii) Can use single or double quotes.
iv) Used for logic & computation.

📌 Example ::
*/

const user = {
  name: "Nitesh",
  age: 22,
  isAdmin: true,
  greet: function () {
    return "Hello";
  },
  lastLogin: undefined
};

/* * */

/*
2️⃣ JSON (JavaScript Object Notation)
   JSON is a text-based data format used for data exchange between client and server.

✅ Features
i) Only data, no functions
ii) Keys must be in double quotes
iii) Does not support undefined, function, Date
iv) Language-independent (used by Java, Python, Go, etc.)

📌 Example ::
*/

{
  "name": "Nitesh",
  "age": 22,
  "isAdmin": true
}

/* * */

/*
| Feature          | JavaScript Object   | JSON                   |
| ---------------- | -----------------   | ---------------------- |
| Type             | JS data structure   | Text format            |
| Used in          | JavaScript code     | API / data transfer    |
| Keys             | Quotes optional     | Double quotes required |
| Functions        | ✅ Allowed         | ❌ Not allowed          |
| `undefined`      | ✅ Allowed         | ❌ Not allowed          |
| Date             | ✅ Allowed         | ❌ (sent as string)     |
| Comments         | ✅ Allowed         | ❌ Not allowed          |
| Language support | JS only             | Language independent    |
*/

// 🔄 Conversion Between Them
// 1. JS Object → JSON
JSON.stringify(user);

// 2. JSON -> JS Object
JSON.parse(jsonString);

// JavaScript objects are used for in-memory data manipulation, while JSON is a string format used for data exchange between systems.


/* 
Q.) Why API uses JSON ?
A.) APIs use JSON because it is lightweight, language-independent, easy to parse, human-readable, and works seamlessly with frontend and backend technologies.
*/
