/*
// Read about res.cookie at express.js framework
// Read about cookie-parser
// Read about req.cookies
// Read about jwt
// How to generate token and validate token
// Try new jwt handbook (its brilliant)
// Read about RFC
// make middleware for userAuthentication
// spread user everywhere(req.user = user)
// expire jwt tokens , cookies
// always expire your cookies
// why need to expire cookies
// what is session ?
// mongoose schema Methods
*/


/**
Q. What is res ?
A. i) The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
ii) In the express.js documentation and by convention, the object is always referred to as res (and the HTTP request is req) but its actual name is determined by the parameters to the callback function in which you’re working.

Example ::
*/
app.get('/user/:id', (req, res) => {
  res.send(`user ${req.params.id}`)
})


/*
Q. What is res.cookie(cookieName, value [, options]) ?
A. i) It is one of the many methods of Response Object.
ii) Sets cookie name to value. The value parameter may be a string or object converted to JSON.

The options parameter is an object that can have the following properties.
/*
| Property      | Type               | Description                                                                 |
|---------------|--------------------|-----------------------------------------------------------------------------|
| domain        | String             | Domain name for the cookie. Defaults to the domain name of the app.          |
| encode        | Function           | Synchronous function used for cookie value encoding.                         |
|               |                    | Defaults to encodeURIComponent.                                              |
| expires       | Date               | Expiry date of the cookie in GMT.                                            |
|               |                    | If not specified or set to 0, creates a session cookie.                      |
| httpOnly      | Boolean            | Cookie is accessible only by the web server (not via JS).                   |
| maxAge        | Number             | Expiry time relative to now, in milliseconds.                               |
| path          | String             | Path for the cookie. Defaults to "/".                                        |
| partitioned   | Boolean            | Stores cookie using partitioned storage (CHIPS).                            |
| priority      | String             | Value of the "Priority" Set-Cookie attribute.                               |
| secure        | Boolean            | Cookie is sent only over HTTPS connections.                                 |
| signed        | Boolean            | Indicates whether the cookie should be signed.                              |
| sameSite      | Boolean | String   | Value of the "SameSite" Set-Cookie attribute.                               |
*/

Example :: 
*/

res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true })
res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })


/*
Q.What is npm cookie-parser pakage ?
A. i) Parse Cookie header and populate req.cookies with an object keyed by the cookie names. 
Example :: 
*/
const cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser())

/*
Q. What is jwt ?
A. 
*/
