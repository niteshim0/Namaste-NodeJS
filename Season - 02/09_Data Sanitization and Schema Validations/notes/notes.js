/*
Q. What is Data Sanitization ?
A. Data sanitization is the process of cleaning, filtering, and controlling data so that it is safe, accurate, and appropriate to store, process, or display.

It is mainly used to:

1.Prevent security attacks (like SQL Injection, XSS).
2.Remove sensitive or unwanted information.
3.Ensure data consistency and correctness.

Q. What is the use cases of Data Sanitization ?
A. 1) Data Sanitization in Security(Most Common Use)
Here, sanitization means making user input safe before using it.
Example: SQL Injection Prevention
Sanitization ensures special characters (' " ; --) don’t change query behavior.
*/
const userInput = req.body.username;
// Bad ❌
query = "SELECT * FROM users WHERE name = '" + userInput + "'";

// Good ✅
query = "SELECT * FROM users WHERE name = ?";

/*
Example: XSS Prevention
Sanitization removes or escapes scripts before rendering on the frontend.
*/
<!-- User input -->
<script>alert('Hacked')</script>



/*
Q. What is Schema Validation ?
A. i) Schema validation is the mechanism of enforcing structure, data types, and constraints on data to ensure consistency and correctness before storage or processing.
ii) It ensures your data is structured, complete, and valid.


// Frontend vs Backend Schema Validation
| Layer    | Purpose                      |
| -------- | ---------------------------- |
| Frontend | User-friendly error messages |
| Backend  | Security & final authority   |
| Database | Last line of defense         |


Q. Why schema validation is needed ?

A. I) Without validation:

i) Wrong data types get stored ("age": "twenty").
ii) Required fields may be missing.
iii) Invalid or malicious data can enter your system.

II) With validation:

i) Data integrity is maintained.
ii) Bugs are reduced.
iii) APIs and databases become more reliable.


Q. What a schema usually validates ?

A. A schema can enforce:

1. Data types
--> String, Number, Boolean, Date, Array, Object

2. Required fields
--> Ensures mandatory fields are present

3. Value constraints
---> Min / Max values
---> Length of strings
--->Enum (allowed values only)

4. Format rules
-->Email, URL, regex patterns.

5.Custom rules
--->Business logic validations.

*/