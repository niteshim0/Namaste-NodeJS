# Redux Toolkit

## What is Redux ?
- Redux is a `pattern and library` for managing and updating `global application state`, where the UI triggers events called "actions" to describe what happened, and separate update logic called "reducers" updates the state in response. 

- It serves as a `centralized store for state` that needs to be used across your entire application, with rules ensuring that the s`tate can only be updated in a predictable fashion`.

- Redux at its core is a small standalone JS library. It is commonly used with several other packages: `Redux Toolkit` , `React-Redux` , `RTK Query`.

## What is Redux Toolkit ?
- Redux Toolkit is a recommended approach for writing `Redux logic`. 

- It contains packages and functions that we think are essential for building a Redux app. 

- Redux Toolkit builds in our suggested best practices, simplifies most Redux tasks, prevents common mistakes, and makes it easier to write Redux applications

## What is React-Redux ?

- Redux `can integrate with any UI framework`, and is most frequently used with React. 

- `React-Redux` is our official package that lets your React components interact with a Redux store by reading pieces of state and dispatching actions to update the store.

## Redux Terms and Concepts

### State Management

- An example to understand it. It tracks a number in component state, and increments the number when a button is clicked:

   ```js
     const Counter = () => {
       // State: a counter value
       const [counter,setCounter] = useState(0);
       
       // Action: code that causes an update to the state when something happen
       const increment = () => {
          setCounter(prevCounter => prevCounter+1);
       }
       
       // View: the UI definition
       return (
        <div>
            Value: {counter} <button onClick={increment}>Increment</button>
        </div>
       )
     }
     ```
- It is a self-contained app with the following parts:

     - The **`state`**, the `source of truth` that drives our app.
     - The **`view`**, a `declarative description of the UI` based on the current state.
     - The **`actions`**, the events that occur in the app based on user input, and `trigger updates in the state`.

- This is a small example of **"`one-way data flow`"**:

     - **`State`** `describes the condition of the app at a specific point in time`.
     - The UI is rendered based on that state.
     - When something happens (such as a user clicking a button), the state is updated based on what occurred.
     - The UI re-renders based on the new state.

         ![Data Flow](../photos/Redux-1%20Relation%20among%20State%20View%20Action.png)

- **Major Problem** 

    - This simplicity can break down when we have `multiple components that need to share and use the same state`, especially if `those components are located in different parts of the application`. 

    - Sometimes this can be solved by **"`lifting state up`"** to parent components, but that doesn't always help.

    - One way to solve this is to `extract the shared state from the components, and put it into a centralized location outside the component tree`. With this, our component tree becomes a big "view", and any component can access the state or trigger actions, no matter where they are in the tree!

    - By defining and separating the concepts involved in state management and `enforcing rules that maintain independence between views and states`, `we give our code more structure and maintainability`.

   - This is the ***`basic idea behind Redux`***: a single centralized place to contain the global state in your application, and specific patterns to follow when updating that state to make the code predictable.

## Redux Terminology

### Actions

- An action is a` plain JavaScript object that has a type field`. You can think of `an action as an event that describes something that happened in the application`.

- The `type field` should be a `string` that gives this` action a descriptive name`, like "todos/todoAdded". We usually write that type string like "domain/eventName", where the first part is the feature or category that this action belongs to, and the second part is the specific thing that happened.

- An action object can have `other fields with additional information` about what happened. By convention, we put that information in a field called ****`payload`****.

- A typical action object might look like this:

   ```js
     const addTodoAction = {
      type : 'todos/todoAdded',
      payload : 'Read about Redux Toolkit'
     }
   ```

### Action Creators

- An ***`action creator`*** is a function that creates and returns an action object. 

- We typically use these so we don't have to write the action object by hand every time:

    ```js
       const addTodo = (text) => {
        return (
          type : 'todos/todoAdded',
          payload : text
        )
       }
    ```

### Reducers

- A `reducer is a function` that receives the current state and an action object, decides how to update the state if necessary, and `returns the new state: (state, action) => newState`. 

- You can `think of a reducer as an event listener` which handles events based on the received action (event) type.

- Reducers must always follow some specific rules:

  - They should only calculate the new state value based on the `state` and `action` arguments.
  - They are not allowed to modify the existing state. Instead, they must make `immutable updates`, by copying the existing state and making changes to the copied values.
  - They must be "`pure`" - they cannot do any asynchronous logic, calculate random values, or cause other "`side effects`".

- The logic inside reducer functions typically follows the same series of steps:

  - Check to see if the reducer cares about this action.
    - If so, make a copy of the state, update the copy with new values, and return it.
  - Otherwise, return the existing state unchanged.

- How Reducer Works Example :: 
   ```js
     const inititalState : {value : 0};
     function counterReducer(state = initialState,action){
        // Check to see if the reducer cares about this action
      if(action.type == 'counter/increment'){
        // If so, make a copy of `state`
        return {
          ... state,
          // and update the copy with the new value
          value : state.value + 1
        }
      }
      // otherwise return the existing state unchanged
      return state;
     }
   ```
- Reducers can use any kind of logic inside to decide what the new state should be: `if/else, switch, loops`, and so on.


### Store

- The current Redux application state lives in an object called the `store` .

- The store is created by passing in a reducer, and has a method called `getState` that returns the current state value:

  ```js
    import { configureStore } from '@reduxjs/toolkit'

    const store = configureStore({ reducer: counterReducer })

    console.log(store.getState())
    // {value: 0}
  ```

### Dispatch

- The Redux store has a method called `dispatch`. 
- The only way to update the state is to call `store.dispatch()` and pass in an action object. 
- The store will run its reducer function and save the new state value inside, and we can call `getState()` to retrieve the updated value:
     
    ```js
      store.dispatch({ type: 'counter/increment' })
      console.log(store.getState())
      // {value: 1}
    ```

- Think of dispatching actions as **"`triggering an event`"** in the application. Something happened, and we want the store to know about it.

 
- Reducers `act like event listeners`, and when they hear an action they are interested in, they update the state in response.

- We typically call action creators to dispatch the right action:

    ```js
      const increment = () => {
      return {
          type: 'counter/increment'
        }
      }     
      store.dispatch(increment())
      console.log(store.getState())
       // {value: 2}
    ```

### Selectors

- Selectors are functions that know how to `extract specific pieces of information from a store state value`. 

- As an application grows bigger, this can help avoid repeating logic as different parts of the app need to read the same data:

    ```js
      const selectCounterValue = state => state.value
      const currentValue = selectCounterValue(store.getState())
      console.log(currentValue)
       // 2
    ```

## Redux Application Data Flow

- ### Intitial Setup
    
  - A Redux store is created using a root reducer function.

  - The store calls the root reducer once, and saves the return value as its initial state.

  - When the UI is first rendered, UI components access the current state of the Redux store, and use that data to decide what to render. They also subscribe to any future store updates so they can know if the state has changed.

- ### Updates

  - Something happens in the app, such as a user clicking a button. 

  - The app code dispatches an action to the Redux store, like 
    ```js 
    dispatch({type: 'counter/increment'}).
    ```

  - The store runs the reducer function again with the `previous state` and the `current action`, and saves the return value as the `new state`.

  - The store notifies all parts of the UI that are subscribed that the store has been updated.

  - Each UI component that needs data from the store checks to see if the parts of the state they need have changed.

  - Each component that sees its data has changed forces a re-render with the new data, so it can update what's shown on the screen

- ### Visual Data Flow 
      
    ![Redux Data Flow](../photos/Redux-2%20Redux%20Data%20Flow.gif)

## Getting Started With Redux Toolkit

**For Already Exisiting React App**

- Install Redux Toolkit

  ```cmd
     npm install @reduxjs/toolkit
  ```
- Install React Bindings
  
  ```cmd
    npm install react-redux
  ```




