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
