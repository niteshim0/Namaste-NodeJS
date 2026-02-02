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
