## Difference between JavaScript Variables and State Variables

| Aspect | JavaScript Variables | State Variables (React) |
|--------|-------------------|------------------------|
| **Definition** | Ordinary variables declared using `var`, `let`, or `const` | Variables managed by React using `useState` (functional) or `this.state` (class) |
| **Persistence on Re-render** | **Do not persist**; reset on every render | **Persist** across renders; React remembers their value |
| **Update Mechanism** | Direct assignment (`x = 5`) | Use setter function (`setX(5)` in functional components) |
| **UI Update** | Changing them **does not automatically update the UI** | Changing state **automatically updates the UI** |
| **Scope** | Normal JS scope (function or block) | Component scope; tied to React lifecycle |

- ✅ Key takeaway:

  - `JS variables` = ephemeral, UI unaware.
  - `State variables` = persistent, UI-reactive.

**Example:**
```js
// JavaScript variable
let count = 0;

function increment() {
  count += 1; // UI won't re-render
  console.log(count);
}

// State variable in React
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1); // UI re-renders automatically
  return <button onClick={increment}>{count}</button>;
}
```

## Why Javascript Variables doesn't persist across renders ?

JavaScript variables don’t persist in React components across renders because of how React works:

  - Every time a component re-renders, React calls the component function again from scratch.

  - `Normal JS variables are just local to that function call, so they get re-initialized every render`.

  - Only state variables (useState/useReducer) or refs (useRef) are stored by React between renders.

**Example:**
```js
function Counter() {
  let count = 0; // JS variable

  const increment = () => {
    count += 1;
    console.log(count);
  };

  return <button onClick={increment}>Increment</button>;
}
```
- Clicking the button logs 1 every time, because count resets to 0 on each render.
- If count was a `state variable`, React would `remember its value between renders` and `update the UI`.
