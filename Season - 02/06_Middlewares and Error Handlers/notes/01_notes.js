// Q. If no route handler exists on the server for a client’s request, what happens depends on the protocol, framework, and server configuration ?

/* A. 2️⃣ No Response Sent at All (Buggy Code)
📌 Case: Route exists, but handler forgets to respond

'js
app.get('/test', (req, res) => {
  // forgot res.send()
})
'js

⚠️ What happens:

1.Client request is received
2.Server never sends a response
3.Connection stays open
4.Client waits until timeout

Client-side result:
1.Browser → “This site can’t be reached”
2.API client → Request timed out

💥 This causes:

1.Memory leaks
2.Hanging connections
3.Server overload under high traffic


// Best Practices (VERY IMPORTANT)
✅ Always define:

app.use((req, res) => {
  res.status(404).send('Not Found')
})

✅ Always end responses:

return res.json(...)

✅ Add timeouts:

--Server timeouts
--Client timeouts


// Mental Model
If no route handler exists, the server cannot map the request to any logic, so it either:
---> Responds with 404
---> Or never responds → client timeout
*/