# Validation in Mongoose

- Validation ensures data correctness before saving documents to MongoDB. 
- It prevents invalid data from being persisted.
- Mongoose validation is schema-level middleware that runs automatically before saving a document, executes before any pre-save hooks, and ensures data integrity including subdocuments.

## Key Rules and Concepts

- Validation is defined at the `SchemaType` level.
- Validation is `middleware` and runs as a `pre('save')` hook.
- Validation `always runs before` any other `pre('save')` hooks.
- Changes made inside` pre('save')` hooks are not validated.
- Automatic validation can be disabled using `validateBeforeSave: false.`
- You can manually run validation using `doc.validate()` or `doc.validateSync()`.
- Fields can be manually marked invalid using `doc.invalidate()`.
- Validators do not run on undefined values (except required).
- Calling `Model.save() `also validates all subdocuments.
- If validation fails, `save()` throws a ValidationError.

## Validation Flow (Mental Model)

`doc.save() → Validation → pre('save') hooks → MongoDB write`

## Built-in Validators

Built-in validators are provided by Mongoose at the SchemaType level and run automatically during document validation before saving to MongoDB.

### Validators by SchemaType

| SchemaType | Built-in Validators |
|-----------|--------------------|
| All Types | `required` |
| Number    | `min`, `max` |
| String    | `enum`, `match`, `minLength`, `maxLength` |

> Note: Validators do not run on `undefined` values, except for `required`.

### Required Validator – Key Points
- Runs even when the value is `undefined` or `null`.
- Internally uses` SchemaType.checkRequired()`.
- Supports custom error messages.
- Can be `conditional` using a function with` this` bound to the document.

### Validation Flow

`doc.validate() --> required --> type-specific validators-->ValidationError`

### Common Interview Traps
- required passes for `0` and `empty strings`, but fails for` null` or `undefined`.
- `Enum` validators only run when a value is present.
- Conditional required validators do not work on update queries unless `runValidators: true` is set.
- Validation errors are grouped under `ValidationError`.

## Mongoose Custom Error Message

Custom error messages allow developers to override Mongoose’s default validation messages and provide clearer, domain-specific feedback when validation fails.

### Ways to Define Custom Error Messages
 -  Array Syntax: min: [6, 'Must be at least 6, got {VALUE}']
 -  Object Syntax: enum: { values: ['Coffee', 'Tea'], message: '{VALUE} is not supported' }

### Error Message Templating

- Mongoose supports basic templating inside `validator messages`.
- `{VALUE}` is automatically replaced with the `invalid` value.
- Templating works only when the `validator` runs.

### Validation Flow with Custom Messages
doc.validate() --> validator fails --> message template resolved --> ValidationError


### Common Interview Notes
- Only failing fields appear inside `error.errors`.
- Custom messages apply to `built-in` and `custom validators`.
- Messages do not change `middleware` behavior.
- `{VALUE} `reflects the raw value being validated.

## The `unique` Option is NOT a Validator

### What `unique` Actually Does
- `unique: true` is **not a Mongoose validator**
- It is a **schema helper for creating a MongoDB unique index**
- Uniqueness is enforced by **MongoDB**, not by Mongoose validation

```js
email: {
  type: String,
  unique: true
}
```

## Custom Validators


- Custom validators in Mongoose allow defining custom validation logic using functions that return true or false during schema validation.

- Use custom validators when built-in validators (`min`, `enum`, `match`, etc.) are not sufficient to enforce complex or domain-specific rules.

- A custom validator is a function that returns:
  - true → validation passes
  - false → validation fails

- Declared using SchemaType.validate.

```js
// Example :: Phone Number Validation
const userSchema = new Schema({
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  }
});

// Validation Outcomes
user.phone = '555.0123';
error = user.validateSync();
// ❌ Fails custom validator
555.0123 is not a valid phone number!


user.phone = '';
error = user.validateSync();
// ❌ Fails required validator
User phone number required


user.phone = '201-555-0123';
error = user.validateSync();
// ✅ Validation passes
```

⚠️ **Important Rule: Required Runs First**

- If a value is **undefined**, **custom validators are skipped**.
- **`required`** is the **only validator** that runs on **undefined** values.

### Order of Execution

`required` --> Custom validator --> Save

## Async Custom Validators

### Use Cases ::

- Checking uniqueness manually.
- API calls.
- Database lookups.
- Complex async logic.

### How Async Validation Works

If a validator returns a **Promise**, the outcome depends on how the Promise resolves or rejects.

| Promise Result      | Outcome | Description |
|---------------------|----------|--------------|
| `reject(err)`        | ❌ Validation fails | Error message from `err` is used |
| `resolve(false)`     | ❌ Validation fails | Custom validation message is used |
| `resolve(true)`      | ✅ Validation passes | Value is considered valid |


```js
// Example :: Async Custom Validator
const userSchema = new Schema({
  name: {
    type: String,
    validate: () => Promise.reject(new Error('Oops!'))
  },
  email: {
    type: String,
    validate: {
      validator: () => Promise.resolve(false),
      message: 'Email validation failed'
    }
  }
});

// Execution
await user.validate();

// ❌ Validation fails with:

// name: Oops!
// email: Email validation failed.
```

## Async Validation Flow (Mental Diagram)

```pqsql
doc.validate()
   ↓
Required validator
   ↓
Sync validators
   ↓
Async validator (await promise)
   ↓
Promise rejects / resolves false
   ↓
ValidationError

```

## Validation Error Object (Custom Validators)

ValidationError
 └── errors
      ├── phone → ValidatorError
      ├── name  → ValidatorError
      └── email → ValidatorError

- Only failing fields appear in error.errors.

### Interview traps

- `required` runs before `custom validators`.
- `Async validators` do not run with `validateSync()`.

- `Async validators` run only with:
  - `doc.validate()`
  - `doc.save()`.

- Custom validators do not replace `unique indexes`.
- Returning false ≠ throwing error (both fail validation).

### 🧠 When to Use What (Validators)

| Use Case              | Validator Type |
|-----------------------|----------------|
| Field must exist      | `required`     |
| Range / pattern       | Built-in       |
| Business logic        | Custom         |
| DB / API checks       | Async custom   |

## Validation Errors

When validation fails in Mongoose, it throws a ValidationError.

### Structure of Validation Error

```js
error.name === 'ValidationError'
error.errors // object
```

- error.errors is an object.
- Each key = path name.
- Each value = a ValidatorError object.

### 🧩 ValidatorError Properties

Each `ValidatorError` contains the following important properties:

| Property | Meaning |
|--------|---------|
| `message` | Human-readable error message |
| `kind` | Validator type or custom identifier |
| `path` | Field name that failed validation |
| `value` | Invalid value |
| `reason` | Original error (only if validator throws) |

### Schema with Custom Validators

```js
// Custom Validator (returns false)
const toySchema = new Schema({
  color: String,
  name: String
});

toySchema.path('color').validate(
  value => /red|white|gold/i.test(value),
  'Color `{VALUE}` not valid',
  'Invalid color'
);
```

- Validator returns false.
- Mongoose uses:
  - message → 'Color {VALUE} not valid'.
  - kind → 'Invalid color'.

```js
// Custom Validator (throws an error)
toySchema.path('name').validate(function(v) {
  if (v !== 'Turbo Man') {
    throw new Error('Need to get a Turbo Man for Christmas');
  }
  return true;
}, 'Name `{VALUE}` is not valid');
```

- Validator throws.
- Mongoose:
  - Uses thrown error message.
  - Stores original error in reason.

```js
// 🔍 Validation Failure Result
const toy = new Toy({ color: 'Green', name: 'Power Ranger' });
await toy.save();

// Color Error (returns false)
error.errors.color.message // Color `Green` not valid
error.errors.color.kind    // Invalid color
error.errors.color.path    // color
error.errors.color.value   // Green

// Name Error (throws error)
error.errors.name.message  // Need to get a Turbo Man for Christmas
error.errors.name.value    // Power Ranger
error.errors.name.reason.message
// Need to get a Turbo Man for Christmas
```
### ⚠️ Important Behavior Difference

| Validator Behavior | Error Message Used      | `reason` |
|-------------------|------------------------|----------|
| Returns `false`   | Custom message         | ❌ No    |
| Throws `Error`    | Thrown error message   | ✅ Yes   |


### 🧠 Interview Cheat Sheet

- Validation failures throw ValidationError.
- Each field error is a ValidatorError.
- reason exists only if validator throws.
- {VALUE} is replaced with invalid value.
- kind helps identify which validator failed.

<hr>

## Global SchemaType Validation (Mongoose)

### Overview
Global SchemaType validation allows you to define a validator that runs on **every instance of a specific SchemaType** (e.g., `String`, `Number`) across all schemas in a Mongoose application.

---

### Purpose
- Enforce **consistent validation rules** globally
- Avoid repeating validators on individual fields
- Prevent common data issues (e.g., empty strings)

---

### Syntax
```js
mongoose.Schema.Types.<Type>.set('validate', validatorFn);
```

### Example :: Disallow Empty Strings Globally

```js
mongoose.Schema.Types.String.set('validate', {
  validator: v => v == null || v.length > 0,
  message: 'String cannot be empty'
});
// Validation Behavior
// null / undefined → ✅ allowed
// '' (empty string) → ❌ invalid
// 'text' → ✅ valid
```

### Schema Example

```js
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model('User', userSchema);
```

### Validation Result

```js
const user = new User({ name: '', email: '' });
await user.validate();

// Errors:
// err.errors.name → ValidatorError
// err.errors.email → ValidatorError
```

### Key Points

- Applies to all schemas using that SchemaType.
- Runs during .save() and .validate()
- Works with required, minlength, etc.
- Must be set before model creation.

### Advantages

| Benefit | Description |
|------|------------|
| Centralized validation logic | Validation rules are defined once and applied everywhere |
| Cleaner schema definitions | Reduces repetitive validators in individual schemas |
| Consistent data integrity | Ensures uniform validation across the entire application |

---

### Limitations

| Limitation | Description |
|--------|------------|
| Cannot selectively disable per field | Global validators apply to all fields of that type |
| Affects the entire application | Any change impacts all schemas |
| Overuse may reduce flexibility | Too many global rules can limit schema customization |

---

### Best Practices

- Use only for **core, universal rules**
- Always provide **meaningful error messages**
- Document global validators clearly for the team

---

### Common Use Cases

- Prevent empty strings
- Enforce trimmed strings
- Apply global numeric constraints
- Define default validation rules

<hr>

## Update Validators and this

### 1. What are Update Validators?

Mongoose supports validation on:
- update()
- updateOne()
- updateMany()
- findOneAndUpdate()

❌ Validators are OFF by default for update queries.

`Reason`: performance + partial document updates

### 2. Enabling Update Validators

To enable validation during updates:
```js
{ runValidators: true }
```

#### Example:

```js
await Toy.updateOne(
  {},
  { color: 'not-a-color' },
  { runValidators: true }
);
// ➡️ Throws validation error if schema rules fail.
```



### 3. Important Behavior

- Validators run only on `updated fields`.
- Entire document is NOT validated.
- Different from `.save()`, which validates the full document.

### 4. Required Validator Caveat

`required: true`
- ❌ Not triggered unless the field is included in the update.
- Can lead to invalid documents.

#### Example:
```js
await User.updateOne(
  { _id },
  { age: 16 },
  { runValidators: true }
);
// Works even if required fields are missing
```

### 5. $set vs Replacement Update

- ❌ Replacement update (dangerous):
```js
await User.updateOne({ _id }, { age: 25 });
```

- ✔ Recommended:
```js
await User.updateOne(
  { _id },
  { $set: { age: 25 } },
  { runValidators: true }
);
```

### 6. findOneAndUpdate() Best Practices

- Always use:
```js
{
  runValidators: true,
  new: true
}

// runValidators → enables validation
// new: true → returns updated document
```

### 7. Enum vs Custom Validator

- ✔ Preferred:
```js
color: {
  type: String,
  enum: ['red', 'green', 'blue']
}
```

- ❌ Regex/custom validator:
   - More error-prone
   - Harder to maintain

### 8. Custom Validator `this` Trap

- In update validators:
`this === query object ❌`
- Cross-field validation will fail.
- No access to full document.
- ✔ Use .save() for cross-field checks.

### 9. Middleware Behavior

- save middleware ❌ does NOT run on updates.
- updateOne, findOneAndUpdate → query middleware runs.

### 10. .save() vs .updateOne()

- Use `.save()` when:
   - Single document
   - Data integrity is critical
   - Cross-field validation required
   - Hooks must run

- Use `.updateOne()` when:
      - Partial update
      - Bulk operations
      - Performance matters

### 11. Real-World Production Bug

- Required fields not validated
- Partial updates create invalid data
- Common cause of silent DB corruption

✔ Fix:
```js
const doc = await Model.findById(id);
doc.set(data);
await doc.save();
```

### 12. When `NOT` to Use Update Validators

- Avoid when:
    - Business rules span multiple fields.
    - Required fields must always exist.
    - Strong consistency is needed.

### 13. Recommended Safe Update Pattern

```js
async function safeUpdate(id, data) {
  const doc = await Model.findById(id);
  if (!doc) throw new Error('Not found');

  Object.assign(doc, data);
  await doc.save();
}
```

### 14. Key Takeaways (Must Remember)

- Update validators are OFF by default.
- Use { runValidators: true }.
- Only updated fields are validated.
- `$set` is safer than replacement.
- `.save()` gives full validation.
- Critical data → avoid update queries.


### 15. Update Validators Only Run for Certain Operators

Update validators in Mongoose **do NOT run for all update operators**.  
They are applied **only** for the following operators:

- `$set`
- `$unset`
- `$push`
- `$addToSet`
- `$pull`
- `$pullAll`

⚠️ Any operator **not in this list** is ignored by update validators.

---

## 16. Validators Do NOT Run for `$inc`

Example schema:
```js
const testSchema = new Schema({
  number: { type: Number, max: 0 }
});
```

Update:
```js
await Test.updateOne(
  {},
  { $inc: { number: 1 } },
  { runValidators: true }
);
// ❌ No validation error.
// ✔ $inc bypasses validators completely.
// Even though number exceeds max: 0, the update succeeds.
```

### 17. Array Validation Limitation

- For array operators:
     - `$push`
     - `$addToSet`
     - `$pull`
     - `$pullAll`

- 👉 Validators run only on individual array elements,
- ❌ NOT on the array as a whole.

### 18. Array Length Validators Are Ignored

Schema:
```js
const testSchema = new Schema({
  arr: [{ message: { type: String, maxlength: 10 } }]
});

// Array-level validator
testSchema.path('arr').validate(function (v) {
  return v.length < 2;
});


// Update:

await Test.updateOne(
  {},
  { $push: [{ message: 'hello' }, { message: 'world' }] },
  { runValidators: true }
);


// ❌ No validation error
// ✔ Even though array length becomes ≥ 2.
// Why?
// Mongoose validates each pushed element.
// It does NOT validate the array itself.
// Q. What DOES Get Validated in Arrays ? 
// ✔ This fails:
// { message: 'this message is too long' }
// ❌ This does NOT fail:
// array length constraint.
```
### 20. Summary of Operator Behavior

| Operator    | Validators Run? |
| ----------- | --------------- |
| `$set`      | ✅ Yes           |
| `$unset`    | ✅ Yes           |
| `$push`     | ✅ Elements only |
| `$addToSet` | ✅ Elements only |
| `$pull`     | ✅ Elements only |
| `$pullAll`  | ✅ Elements only |
| `$inc`      | ❌ No            |
| `$mul`      | ❌ No            |
| `$rename`   | ❌ No            |


### 21. Practical Implication (Very Important)

- Numeric constraints `(min, max)` can be bypassed via `$inc`.
- Array `size constraints` are unsafe in update queries.

**Schema-level array validation ≠ update-time safety.**







