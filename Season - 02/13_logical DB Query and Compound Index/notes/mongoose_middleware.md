# 📘 Mongoose Middleware (Hooks)

Middleware (also called **`pre` / `post` hooks**) are functions executed during the lifecycle of Mongoose operations.  
They are defined at the **schema level** and are commonly used for plugins and reusable model logic.

---

## 🔹 What is Middleware?

Middleware allows you to run logic:
- **Before** an operation (`pre` hooks)
- **After** an operation (`post` hooks)

Used for:
- Validation
- Side effects
- Logging
- Soft deletes
- Auditing
- Data consistency

---

## 🔹 Types of Middleware

Mongoose has **4 types** of middleware.

---

### 1️⃣ Document Middleware

Runs on **document instances**  
`this` → document

Supported operations:

- `validate`
- `save`
- `updateOne`
- `deleteOne`
- `init` (synchronous)

Access model:
```js
this.constructor
```


### 2️⃣ Query Middleware

Runs on **Query objects**
`this` → query

Triggered when:
- `.exec()`
- `.then()`
- `await`

Supported operations:
- `find`
- `findOne`
- `findOneAndUpdate`
- `findOneAndDelete`
- `updateOne`
- `updateMany`
- `deleteOne`
- `deleteMany`
- `count`
- `countDocuments`
- `estimatedDocumentCount`
- `replaceOne`
- `validate`

⚠️ Query middleware does not run on subdocuments.


### 3️⃣ Aggregate Middleware

Runs on:
```js
Model.aggregate()
```

- `this` → aggregation object
- Triggered on `.exec()`

### 4️⃣ Model Middleware

Runs on static model methods
`this` → model

Supported operations:

- `bulkWrite`
- `insertMany`
- `createCollection`

🔹 Supported Hook Names
`aggregate`
`bulkWrite`
`count`
`countDocuments`
`createCollection`
`deleteOne`
`deleteMany`
`estimatedDocumentCount`
`find`
`findOne`
`findOneAndDelete`
`findOneAndReplace`
`findOneAndUpdate`
`init`
`insertMany`
`replaceOne`
`save`
`update`
`updateOne`
`updateMany`
`validate`

## 🔹 Pre Middleware

- Runs before the operation
- Executes sequentially
- Can be `synchronous`, `promise-based`, or `async`

```js
schema.pre('save', async function () {
  await doStuff();
});
```

### ❌ Errors in Pre Hooks

If a pre hook throws an error:

- Remaining middleware ❌ won’t run
- Original operation ❌ won’t execute

Ways to throw errors:

- throw new Error('error');
- return Promise.reject(error);

## 🔹 Post Middleware

- Runs after operation and all pre hooks
- Receives document or result

```js
schema.post('save', function (doc) {
  console.log(doc._id);
});
```

### ⏳ Asynchronous Post Hooks

If function has 2+ parameters, you must call next():
```js
schema.post('save', function (doc, next) {
  next();
});


// Async without next():

schema.post('save', async function (doc) {
  await delay();
});
```

## 🔹 Middleware Must Be Defined Before Model Compilation

❌ Incorrect:
```js
const User = mongoose.model('User', schema);
schema.pre('save', fn);
```

✅ Correct:
```js
schema.pre('save', fn);
const User = mongoose.model('User', schema);
```

⚠️ Always define middleware before mongoose.model()

## 🔹 Save & Validate Hook Order

Calling `save()` automatically triggers `validate()`.

Execution order:

1. pre('validate')
2. post('validate')
3. pre('save')
4. post('save')

## 🔹 Accessing Parameters in Middleware
Query Middleware
`this.getFilter()`
`this.getUpdate()`

Document Middleware
```js
schema.pre('save', function (options) {
  options.validateModifiedOnly;
});
```

## 🔹 Naming Conflicts (deleteOne / updateOne)

By default:

- `Model.deleteOne()` → query middleware
- `doc.deleteOne()` ❌ does NOT trigger hooks

Enable document middleware:

```js
schema.pre('deleteOne', { document: true, query: false }, fn);
```

## 🔹 Query vs Document Middleware
Feature	Document	Query
this	Document	Query
Access updated doc	✅	❌
Runs on save()	✅	❌


## 🔹 findOneAndUpdate / update Hooks

`save()` hooks ❌ NOT triggered

Use:
- `pre('updateOne')`
- `pre('findOneAndUpdate')`


Cannot access document directly:

- `this.model.findOne(this.getQuery());`

## 🔹 Error Handling Middleware

Special post middleware with error parameter.

Signature:

(error, doc/res, next)


Example:
```js
schema.post('save', function (error, doc, next) {
  if (error.code === 11000) {
    next(new Error('Duplicate key error'));
  }
});
```

⚠️ Error cannot be removed, only transformed

## 🔹 Aggregation Hooks

Used to modify aggregation pipelines:
```js
schema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { isDeleted: false } });
});
```

## 🔹 Synchronous Hooks

- Only init hooks are synchronous.
- Promises ❌ not supported
- Must throw sync error
```js
schema.pre('init', function () {
  if (error) throw new Error();
});
```
## 🔹 Common Use Cases

Complex validation
Cascade deletes
Soft deletes
Audit logs
Async defaults
Denormalized data updates

## 🧠 Key Takeaways

- Middleware is schema-level logic
- Always define before model compilation
- Query ≠ Document middleware
- save() ≠ update()
- Error handlers are post-only