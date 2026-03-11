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