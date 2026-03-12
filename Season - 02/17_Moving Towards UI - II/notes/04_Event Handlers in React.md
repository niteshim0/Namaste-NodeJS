## Common React Event Handlers

| Event Category      | Event Handler (React)            | Example Usage                                                                 |
|--------------------|---------------------------------|-------------------------------------------------------------------------------|
| **Mouse Events**    | `onClick`, `onDoubleClick`, `onMouseEnter`, `onMouseLeave` | `<button onClick={handleClick}>Click</button>`                               |
| **Keyboard Events** | `onKeyDown`, `onKeyUp`, `onKeyPress`                         | `<input onKeyDown={handleKeyDown} />`                                        |
| **Form Events**     | `onChange`, `onSubmit`, `onFocus`, `onBlur`                 | `<input onChange={handleChange} value={value} />` <br> `<form onSubmit={handleSubmit}>` |
| **Focus Events**    | `onFocus`, `onBlur`                                         | `<input onFocus={handleFocus} onBlur={handleBlur} />`                        |
| **Clipboard Events**| `onCopy`, `onCut`, `onPaste`                                | `<input onPaste={handlePaste} />`                                           |
| **Other Events**    | `onScroll`, `onResize`, `onLoad`, `onError`                 | `<div onScroll={handleScroll}></div>`                                        |

### ✅ Notes:
- Always pass a **function reference**: `onClick={handleClick}`  
- Use **arrow functions** to pass parameters: `onClick={() => handleClick(param)}`  
- React uses **SyntheticEvent**, which normalizes events across browsers.

## 1. What Are onChange, onClick, and Similar Functions?

- These are `event handler functions` in React (and similarly in `plain JavaScript`).

- They are `callbacks` that run when a specific event occurs on an element.

- **Examples of events:**

   - `Mouse events: onClick, onDoubleClick, onMouseEnter, onMouseLeave`

  - `Keyboard events: onKeyDown, onKeyUp, onKeyPress`

  - `Form events: onChange, onSubmit, onFocus, onBlur`

  - `Other events: onScroll, onResize, onLoad`

- **Category:** They belong to `event handler functions / callback functions`.

## 2. How to Use Them in React

- Define a function to handle the event.
- `Attach it to the element via JSX props`, e.g., onClick={handleClick}.
- Optionally pass parameters to the function.

## 3. Examples

- **a)  `onClick (Mouse Event)`**
```js
function ButtonExample() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return <button onClick={handleClick}>Click Me</button>;

// ✅ Explanation:
// handleClick is called only when the button is clicked.
// No parentheses () in JSX; React calls it internally when the event happens.
}
```



- **b) `onChange (Form Event)`**
```js
import { useState } from "react";

function InputExample() {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value); // update state
  };

  return (
    <input
      type="text"
      value={name}
      onChange={handleChange}
      placeholder="Enter your name"
    />
  );
}

// ✅ Explanation:

// oChange triggers whenever the input value changes.
// event.target.value gives the current input text.
// Using state ensures React re-renders the component when the value changes.
```

**c) `onSubmit (Form Event)`**
```js
function FormExample() {
  const handleSubmit = (event) => {
    event.preventDefault(); // prevent page reload
    alert("Form submitted!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Type something" />
      <button type="submit">Submit</button>
    </form>
  );
}

✅ Explanation:
onSubmit handles form submission.
event.preventDefault() stops the default page reload.
```

## 4. Key Points to Remember

- `Always pass a function reference (not function())`, e.g., onClick={handleClick}, not onClick={handleClick()} `unless you’re calling an inline function`.

- Can pass parameters using an arrow function:
```js
    <button onClick={() =>handleClick("Hello")}>Click</button>
```

- `React normalizes events via SyntheticEvent`, so you don’t have to worry about cross-browser differences


