# Express Router – Complete Guide

## What is a Router?

A **router** object is an instance of middleware and routes. You can think of it as a **mini-application**, capable only of performing middleware and routing functions.

Every Express application has a built-in **app router**.

A router behaves like middleware itself, so you can use it as an argument to `app.use()` or as the argument to another router’s `use()` method.

The top-level `express` object has a `Router()` method that creates a new router object.

```js
const express = require('express')
const router = express.Router()
```

Once created, you can add middleware and HTTP method routes (`get`, `post`, `put`, etc.) just like an application.

---

## Basic Router Usage

```js
// invoked for any requests passed to this router
router.use((req, res, next) => {
  // some logic here
  next()
})

// will handle any request that ends in /events
router.get('/events', (req, res) => {
  res.send('Events')
})
```

Mount the router:

```js
app.use('/calendar', router)
```

➡️ Only requests to `/calendar/*` will reach this router.

> ⚠️ Middleware applied to a router runs for **all requests** on that router’s path.

---

## Router Methods

### `router.all(path, [...callbacks])`

Works like `router.METHOD()` but matches **all HTTP methods**.

Useful for:

* Authentication
* Global logic for a path prefix

```js
router.all('{*splat}', requireAuthentication, loadUser)
```

Equivalent:

```js
router.all('{*splat}', requireAuthentication)
router.all('{*splat}', loadUser)
```

Restrict only API routes:

```js
router.all('/api/{*splat}', requireAuthentication)
```

---

### `router.METHOD(path, [...callbacks])`

Handles specific HTTP methods:

* `router.get()`
* `router.post()`
* `router.put()`
* `router.delete()`

```js
router.get('/', (req, res) => {
  res.send('hello world')
})
```

✔ Query strings are ignored during route matching.

`router.get()` also handles `HEAD` requests if `router.head()` is not defined.

---

## Using Regular Expressions in Routes

```js
router.get(/^\/commits\/(\w+)(?:\.\.(\w+))?$/, (req, res) => {
  const from = req.params[0]
  const to = req.params[1] || 'HEAD'
  res.send(`commit range ${from}..${to}`)
})
```

Matches:

* `/commits/71dbb9c`
* `/commits/71dbb9c..4c084f9`

---

## Flow Control with `next()`

### `next('route')`

Skips remaining handlers of the **current route**.

### `next('router')`

Skips remaining routes in the **current router**.

```js
function fn(req, res, next) {
  console.log('I come here')
  next('router')
}

router.get('/foo', fn, (req, res) => {
  console.log('I don’t come here')
})

app.get('/foo', (req, res) => {
  console.log('I come here too')
  res.end('good')
})
```

---

## `router.param(name, callback)`

Used to preload or validate route parameters.

```js
router.param('user', (req, res, next, id) => {
  User.find(id, (err, user) => {
    if (err) return next(err)
    if (!user) return next(new Error('User not found'))
    req.user = user
    next()
  })
})
```

✔ Runs **only once per request**, even if parameter appears in multiple routes.

```js
router.param('id', (req, res, next, id) => {
  console.log('CALLED ONLY ONCE')
  next()
})

router.get('/user/:id', (req, res, next) => {
  console.log('matches')
  next()
})

router.get('/user/:id', (req, res) => {
  console.log('matches too')
  res.end()
})
```

---

## `router.route(path)`

Creates a **single route** with handlers for multiple HTTP methods.

```js
router.route('/users/:user_id')
  .all((req, res, next) => {
    next()
  })
  .get((req, res) => {
    res.json(req.user)
  })
  .put((req, res) => {
    req.user.name = req.params.name
    res.json(req.user)
  })
  .post(() => {
    throw new Error('Not implemented')
  })
  .delete(() => {
    throw new Error('Not implemented')
  })
```

✔ Prevents duplicate route paths
✔ Middleware order is based on **route creation**, not method chaining

---

## `router.use([path], middleware)`

Works like `app.use()`.

```js
router.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})
```

With path:

```js
router.use('/bar', (req, res, next) => {
  next()
})
```

Mounting:

```js
app.use('/foo', router)
```

> Mount path is **not visible** inside middleware.

---

## Middleware Order Matters

```js
router.use(logger())
router.use(express.static('public'))
router.use((req, res) => res.send('Hello'))
```

To skip logging static files:

```js
router.use(express.static('public'))
router.use(logger())
router.use((req, res) => res.send('Hello'))
```

---

## Serving Static Files from Multiple Directories

```js
app.use(express.static('public'))
app.use(express.static('files'))
app.use(express.static('uploads'))
```

Earlier paths have higher priority.

---

## Multiple Routers on Same Path (⚠️ Warning)

```js
app.use('/users', authRouter)
app.use('/users', openRouter)
```

❗ Middleware from **authRouter** will also affect **openRouter** routes.

✅ Best Practice: use **different mount paths** to avoid unexpected behavior.

---

## 🧠 Interview Cheat Sheet (Quick Revision)

### What is Express Router?

* Mini Express app
* Groups routes + middleware
* Improves code modularity

### Why use Router?

* Cleaner folder structure
* Separation of concerns
* Reusable route logic

### Key Differences: `app` vs `router`

| app               | router                  |
| ----------------- | ----------------------- |
| Full Express app  | Mini app                |
| Entry point       | Mounted via `app.use()` |
| Global middleware | Scoped middleware       |

### Common Patterns

```js
const router = express.Router()
router.get('/', handler)
app.use('/api/users', router)
```

### router.use()

* Runs for **all HTTP methods**
* Order matters
* Used for logging, auth, parsing

### router.all()

* Matches **all verbs** (GET, POST, etc.)
* Useful for auth guards

### router.param()

* Preloads route params
* Runs once per request

### router.route()

* Same path, multiple methods
* Avoids duplication

---

## 🔄 Request Flow (Diagram & Explanation)

### 1️⃣ Basic Flow

```
Client Request
      ↓
app.use('/users', router)
      ↓
router.use(middleware)
      ↓
router.get('/profile')
      ↓
Response
```

✔ Mount path (`/users`) is stripped inside router

---

### 2️⃣ Middleware Order Flow

```
Request
 ↓
router.use(static)
 ↓
router.use(logger)
 ↓
router.get('/home')
```

➡️ If static file found → response sent → logger skipped

---

### 3️⃣ router.param() Flow

```
GET /users/42
 ↓
router.param('id')  ← runs ONCE
 ↓
router.get('/users/:id')
 ↓
router.get('/users/:id')
```

✔ Param middleware executes once per request

---

### 4️⃣ next('route') vs next('router')

#### next('route')

```
Skip remaining handlers
of the SAME route
```

#### next('router')

```
Exit current router
Jump to app / next router
```

---

### 5️⃣ Multiple Routers on Same Path (Danger Zone ⚠️)

```
app.use('/users', authRouter)
app.use('/users', openRouter)
```

🚨 Auth middleware affects BOTH routers

✅ Fix:

```
app.use('/users', openRouter)
app.use('/admin/users', authRouter)
```

---

## 🎯 Interview One-Liners (Gold)

* “Router is a mini Express app used to modularize routes.”
* “Middleware execution depends on definition order.”
* “router.param runs once per request-response cycle.”
* “router.route helps avoid duplicate paths.”
* “Mount path is invisible inside router.”

---

## Summary

* Router = scoped routing + middleware
* `router.use` → middleware
* `router.all` → all HTTP verbs
* `router.route` → clean multi-method handling
* Order matters, paths matter
