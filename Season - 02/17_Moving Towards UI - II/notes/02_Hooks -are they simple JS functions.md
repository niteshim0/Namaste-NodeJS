# Hooks

- Hooks are `functions` that let you “hook into” React state and lifecycle features from `function components`. 

- They were introduced in React 16.8 and `let you use features like state, side effects, context, refs, etc., without writing class components.`

- Hooks are just functions, but React lets them tap into `internal features (state management, effects etc.)` that were possible only in class components before.

- You can use built‑in hooks like` useState`, `useEffect`,` useContext`, etc.

- You can also `create your own custom hooks` to reuse stateful logic.

**Example** :

```js
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // useState hook for state

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

# Types of Hooks

## State Hooks

- State lets a component `remember` information like user input. For example, a form component can use state to store the input value, while an image gallery component can use state to store the selected image index.

- To add state to a component, use one of these Hooks:

    - **useState** declares a state variable that you can `update directly`.
    - **useReducer** declares a state variable with the `update logic inside a reducer function`.

- ### useState vs useReducer

| Feature | useState | useReducer |
|---------|----------|------------|
| **Purpose** | For simple state management | For complex state logic or multiple related state variables |
| **Syntax** | `[state, setState] = useState(initialValue)` | `[state, dispatch] = useReducer(reducer, initialState)` |
| **State Updates** | Directly via `setState` | Updates via actions dispatched to a` reducer function` |
| **Best For** | Simple counters, toggles, single values | Forms, multiple fields, or state with complex updates and conditions |
| **Scalability** | Not ideal if state grows complex | Very scalable, easy to manage multiple actions and state transitions |

- **Example:**
    
```js
   // already done deal with useState Hook , moving on when useReducer gets used
   import React, { useReducer } from 'react';

// 1. Initial state for the form
const initialState = {
  name: '',
  email: '',
  password: ''
};

// 2. Reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET_FORM':
      return initialState;
    default:
      throw new Error('Unknown action type');
  }
}

function SignupForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    dispatch({ type: 'UPDATE_FIELD', field: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', state);
    dispatch({ type: 'RESET_FORM' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={state.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={state.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={state.password}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

  export default SignupForm;
```

## Effect Hooks

- Effects let a component `connect to and synchronize with external systems`. This includes dealing with `network, browser DOM, animations, widgets written using a different UI library`, and other non-React code.

- ### useEffect Hook

   - useEffect is a React hook that lets functional components `perform side effects` - things like `fetching data`, `subscribing to events`, `updating the DOM`, or r`unning timers` - similar to lifecycle methods in class components (componentDidMount, componentDidUpdate, componentWillUnmount).

  - `useEffect` connects a component to an external system.

  - Runs after the component renders.

  - Can run once, on specific state/prop changes, or on every render depending on the dependency array.

  - Can return a cleanup function to avoid memory leaks (like unsubscribing or clearing timers).

```js
import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);

    // Cleanup function
    return () => clearInterval(interval);
  }, []); // empty array: run once on mount

  return <p>Seconds: {seconds}</p>;
}

export default Timer;
```

- Effects are an `“escape hatch”` from the React paradigm. Don’t use Effects to orchestrate the data flow of your application.If you’re not interacting with an external system, you might not need an Effect.

- Effects are an `“escape hatch”` from the React paradigm. What does it mean ?

  - Sometimes you need to do things that React doesn’t manage automatically, like:

  - Fetching data from an API

  - Subscribing to a WebSocket

  - Manually manipulating the DOM (e.g., focus an input)

  - Setting timers or intervals.

  - React is about declarative UI and effect hooks let us change it.

  - These actions are imperative, meaning you tell the system exactly what to do step by step, instead of declaring the desired end state.

- There are two rarely used variations of useEffect with differences in timing:

  - **`useLayoutEffect`** fires before the browser repaints the screen. You can measure layout here.
  - **`useInsertionEffect`** fires before React makes changes to the DOM. Libraries can insert dynamic CSS here.

- You can also separate events from Effects:

  - **`useEffectEvent`** creates a non-reactive event to fire from any Effect hook.

- ### useLayoutEffect Hook

   - **Purpose** : Runs synchronously after DOM mutations but before the browser paints.
   - **Use case** : Measure DOM elements or update layout to prevent flicker.
   - **Runs**: Before the screen updates.
   - ✅ Key: Use when you need synchronous DOM reads/writes. Avoid heavy logic here as it blocks painting.

  **Example:**
    ```js
    import { useLayoutEffect, useRef, useState } from 'react';

   function Box() {
  const boxRef = useRef();
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    // Measure DOM element width before painting
    setWidth(boxRef.current.offsetWidth);
  });

  return <div ref={boxRef}>Box width: {width}px</div>;
  }  
    ```

- ### useInsertionEffect (React 18+)

  - **Purpose:** Run before layout and paint, mainly to `inject CSS` safely (like styled-components).

  - Rarely used: Only for low-level CSS injection or library authors.

  - ✅ Key: Runs before layout and paint, even earlier than useLayoutEffect.

  - **Example (simplified)**:

```js
    import { useInsertionEffect } from 'react';

  function StyledComponent() {
    useInsertionEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `.red { color: red; }`;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return <p className="red">Hello Red</p>;
}
```

- ### useEffectEvent (React 18.3+, experimental)
  - **Purpose:** Create `stable event callbacks` that always have the `latest state/props` without re-creating effects.

  - **Use case:** Event handlers that don’t need dependency arrays but always access `fresh state`.

  - ✅ Key: Solves stale closures problem in callbacks, `without re-running effects`.

**Example**
```js
import { useState, useEffectEvent } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = useEffectEvent(() => {
    setCount(c => c + 1); // always has latest state
  });

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

>**TODO** :other hooks i will deal if i come across them in this project , if not then after that.

