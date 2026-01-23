## What is `res` in Express.js?

### Question
**What is `res`?**

### Answer
- The `res` object represents the **HTTP response** that an Express application sends when it receives an HTTP request.
- In Express.js documentation and by convention, the response object is referred to as `res` (and the request object as `req`), but the actual variable name depends on the parameters used in the callback function.

### Example
```js
app.get('/user/:id', (req, res) => {
  res.send(`user ${req.params.id}`);
});

```

## What is res.cookie(cookieName, value [, options]) ?

- It is one of the many methods of Response Object.
- Sets cookie name to value. The value parameter may be a      string or object converted to JSON.



## Cookie Options Reference

| Property      | Type              | Description                                                                 |
|--------------|-------------------|-----------------------------------------------------------------------------|
| domain        | String            | Domain name for the cookie. Defaults to the domain name of the app.          |
| encode        | Function          | Synchronous function used for cookie value encoding. Defaults to `encodeURIComponent`. |
| expires       | Date              | Expiry date of the cookie in GMT. If not specified or set to `0`, creates a session cookie. |
| httpOnly      | Boolean           | Cookie is accessible only by the web server (not via JavaScript).            |
| maxAge        | Number            | Expiry time relative to the current time, in milliseconds.                  |
| path          | String            | Path for the cookie. Defaults to `/`.                                        |
| partitioned   | Boolean           | Stores the cookie using partitioned storage (CHIPS).                        |
| priority      | String            | Value of the `Priority` Set-Cookie attribute.                               |
| secure        | Boolean           | Cookie is sent only over HTTPS connections.                                 |
| signed        | Boolean           | Indicates whether the cookie should be signed.                              |
| sameSite      | Boolean \| String | Value of the `SameSite` Set-Cookie attribute. 


## JSON Web Token (JWT)

JSON Web Token (JWT) is a **compact, self-contained, and secure way to transmit information** between two parties (usually a client and a server) as a JSON object.

Think of it as a **digital ID card** the server gives you after login 🪪

---

## Why JWT exists
Instead of storing session data on the server, JWT lets the server **trust the token itself**.

- Stateless authentication
- Scales well (no server-side session storage)
- Widely used in REST APIs

---

## JWT Structure
A JWT has **three parts**, separated by dots (`.`):

xxxxx.yyyyy.zzzzz


---

### 1. Header
Contains metadata about the token and the signing algorithm.

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### 2. Payload
Contains claims (user-related data).

```json
{
  "id": "123",
  "email": "user@example.com",
  "role": "admin",
  "iat": 1700000000,
  "exp": 1700003600
}
```

⚠️ Payload is Base64 encoded, NOT encrypted
Never store passwords, secrets, or sensitive data

### 3. Signature
Used to verify that the token was not tampered with.

```json
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secretKey
)
```
If payload is modified → signature verification fails ❌

## How JWT Works

1. User logs in with email & password  
2. Server verifies credentials  
3. Server creates and signs a JWT  
4. Token is sent to the client  
5. Client sends JWT with each request  
6. Server verifies the JWT and allows access  

### Token Transmission

JWT is usually sent in the request header:
Authorization: Bearer <token>


---

## Stateless Authentication

- The server does **not store session data**
- Every request carries its own proof of authentication(jwt tokens)
- Enables easier horizontal scaling

---

## JWT vs Session

| Feature | JWT | Session |
|------|-----|--------|
| Stored on server | No | Yes |
| Stateless | Yes | No |
| Scales easily | Yes | No |
| Easy to revoke | No | Yes |

---

## Common JWT Claims

| Claim | Meaning |
|------|--------|
| `sub` | Subject (user ID) |
| `iat` | Issued at time |
| `exp` | Expiration time |
| `iss` | Issuer |
| `aud` | Audience |

---

## Where JWT Is Used

- Authentication & Authorization
- REST APIs
- Mobile applications
- Microservices

---

## JWT in Express.js (Example)

```js
const jwt = require("jsonwebtoken");

// Create token
const user = await User.findOne(email);
const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

// Verify token
jwt.verify(token, process.env.JWT_SECRET);
```
------------------------------------------------------------------

## Security Concerns & Pitfalls

- JWT cannot be revoked easily once issued
- Large payloads increase request size
- Store tokens securely (HTTP-only cookies recommended)
- Always set expiration (`exp`)
- Use HTTPS only


---

## Cookies

Cookies are **small pieces of data** that a server stores in the **user’s browser** and sends back with every request to the same server.

Think of a cookie as a **sticky note** 🍪 the website gives your browser so it can remember you.

---

## Why Cookies Are Used

Cookies help websites to:
- Remember login sessions
- Store JWT tokens
- Save user preferences (theme, language)
- Track sessions and analytics

---

## How Cookies Work

1. Client sends a request to the server
2. Server sends a response with `Set-Cookie`
3. Browser stores the cookie
4. Browser automatically sends the cookie with future requests

### Example HTTP Header
  ```Set-Cookie: token=abc123; HttpOnly; Secure```

## Types of Cookies

### 1. Session Cookies
- Temporary cookies
- Deleted when the browser is closed
- Do not have `expires` or `maxAge`

### 2. Persistent Cookies
- Stored for a fixed duration
- Use `expires` or `maxAge`

---

## Important Cookie Attributes

| Attribute | Meaning |
|--------|--------|
| `httpOnly` | JavaScript cannot access the cookie (prevents XSS) |
| `secure` | Cookie is sent only over HTTPS |
| `sameSite` | Controls cross-site request behavior |
| `expires` | Exact expiration date |
| `maxAge` | Expiration time in milliseconds |
| `path` | URL path for which the cookie is valid |

---

## Cookies vs localStorage

| Feature | Cookies | localStorage |
|------|--------|-------------|
| Automatically sent with requests | Yes | No |
| Accessible by JavaScript | No (if `httpOnly`) | Yes |
| Safer for JWT storage | Yes | No |
| Size limit | ~4KB | ~5MB |

---

## Cookies in Express.js

```js
res.cookie("token", jwtToken, {
  httpOnly: true,
  secure: true,
  sameSite: "strict"
});
```
The browser stores the cookie automatically.

## Cookies with JWT (Best Practices)

- Store JWT in HTTP-only cookies
- Browser sends the token automatically
- Server reads the token from cookies

```js
const token = req.cookies.token;
```

## Real-World Analogy

Cookie = movie ticket or University ID card
Browser = your pocket
Server = theatre or University 

You show the ticket or ID card each time you enter — no need to explain who you are again. (Remember College Days!Fucking Nightmare.)

# Session

A **session** is a way for a server to **store user-specific data** between multiple HTTP requests.

Unlike cookies or JWTs, **session data is stored on the server**, and the client only keeps a **session ID**.

---

## Why Sessions Are Used

Sessions help servers:
- Keep users logged in
- Store authentication state
- Maintain user-specific data (cart, preferences)
- Avoid sending sensitive data to the client

---

## How Sessions Work

1. User sends a request to the server
2. Server creates a session and stores user data on the server
3. Server sends a **session ID** to the client (usually via a cookie)
4. Browser stores the session ID
5. Browser sends the session ID with each request
6. Server uses the session ID to retrieve session data

### Example HTTP Header
```Set-Cookie: connect.sid=s%3Aabc123; HttpOnly```

---

## What Is Stored Where?

- **Server** stores:
  - userId
  - authentication state
  - user data

- **Client** stores:
  - session ID only

---

## Session vs Cookie

- Cookie stores **data**
- Session stores **data on server**, cookie stores **session ID**

---

## Session vs JWT

| Feature | Session | JWT |
|------|--------|-----|
| Stored on server | Yes | No |
| Stateless | No | Yes |
| Scales easily | No | Yes |
| Easy to revoke | Yes | No |
| Payload visible to client | No | Yes (Base64) |

---

## Session in Express.js (Example)

```js
const session = require("express-session");

app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true
    }
  })
);

app.post("/login", (req, res) => {
  req.session.userId = user._id;
  res.send("Logged in");
});
```

## Pros of Sessions

- More secure for sensitive data
- Easy logout (session can be destroyed)
- Simple to implement

---

## Cons of Sessions

- Requires server-side storage
- Harder to scale (needs a shared store like Redis)
- Higher memory usage

---

## Real-World Analogy

- **Session** = hotel room  
- **Session ID** = room key card  

The hotel keeps your details securely, and the key card only points to your room.

---

# Mongoose Schema Methods

**Schema methods** in Mongoose are **custom functions defined on a schema** that are available on **individual document instances**.

They are mainly used to define **behavior related to a single document**.

---

## Why Use Schema Methods?

- Encapsulate business logic inside the model
- Keep controllers clean
- Reuse logic across the app
- Work directly with document data (`this`)

---

## How Schema Methods Work

- Defined using `schema.methods`
- Accessible on a **document**, not on the Model itself
- Use `this` to refer to the current document

---

## Syntax

```js
schema.methods.methodName = function () {
  // logic here
  // here it should be always a proper function(a function which have context) (not an arrow function())
  // here we will use 'this' variable(i.e.why proper fxn) which points to document
};
```
## Example User Schema Method

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

userSchema.methods.getPublicProfile = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email
  };
};

const User = mongoose.model("User", userSchema);
```

## Using a Schema Method

```js
const user = await User.findById(id);
const profile = user.getPublicProfile();
```

## Real-World Use Cases

- Password comparison
- Token generation
- Formatting user data
- Checking permissions

### Example : Password Compare

```js
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
```
## Schema Methods vs Static Methods

| Feature       | Schema Methods      | Static Methods           |
|---------------|------------------|------------------------|
| Called on     | Document           | Model                  |
| Access `this` | Yes (document)     | No (model)             |
| Use case      | Document behavior  | Collection-level logic |

---

## When to Use Schema Methods

Use schema methods when:

- Logic depends on **one document**(e.g. password comparison)
- You need access to **document fields**(e.g. getting profile picture)
- You want **clean, reusable model logic**(offloading whole logic of some functions to models rather than controllers)




