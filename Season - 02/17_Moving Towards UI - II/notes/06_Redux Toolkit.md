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




