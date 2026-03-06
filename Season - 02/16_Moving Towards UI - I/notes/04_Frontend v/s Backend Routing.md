# 1️⃣ What is Frontend Routing ?

- Frontend routing means changing the view (component/page) in the browser without reloading the whole page.

- In modern Single Page Applications (SPA) like apps built with React, Angular, or Vue.js, routing happens inside the browser using JavaScript.

Example URL:

```bash
/home
/profile
/dashboard
```

- Instead of requesting a new HTML page from the server, the frontend just swaps components.

Example in React Router:

```js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
```

When user visits /profile → React loads Profile component instead of refreshing page.

# 2️⃣ How Frontend Routing Works (Internally)

Steps:

- User clicks a link.

    ```bash
    /profile
    ```

- Router library catches it.

     Example: 
 
   ```js
     <Link to="/profile">Profile</Link>
   ```

- Browser URL changes.

      http://site.com/profile

- Router loads corresponding component.

       `Profile.jsx`

- ⚡ No full page reload happens.

- Browser API used:

   ```bash
   History API
   pushState()
   replaceState()
   ```

# 3️⃣ How Frontend Routing Affects the App

- 1️⃣ Faster Navigation
    - No full reload.

    ```bash
    Traditional website
    Click -> Server -> Reload page
    ```

    ```bash
    SPA
    Click -> JS changes component.
    ```

- 2️⃣ Better User Experience

    Feels like:
    - Mobile apps
    - Instant transitions
    
    Example apps:
    - Facebook
    - Netflix
    - Gmail

- 3️⃣ State is Preserved
    
      Example:

      Scroll position
      Form data
      App state

    remains intact because page doesn't reload.

# 4️⃣ Backend Routing

Backend routing happens on the server.

Example using Express.js

```js
app.get("/users", (req, res) => {
   res.send("User List");
});
```

- When browser requests:

      GET /users

- Server responds with:

      HTML
      JSON
      Data
    
<hr>

# 5️⃣ Frontend vs Backend Routing

| Feature | Frontend Routing | Backend Routing |
|--------|-----------------|----------------|
| **Where it runs** | Browser | Server |
| **Page reload** | ❌ No | ✅ Yes |
| **Purpose** | Show components | Serve data/pages |
| **Speed** | Very fast | Slower (network call) |
| **Example** | React Router | Express routes |

---

## Example Flow in a Modern Web App

```bash
User -> /dashboard
Frontend Router -> Dashboard component
Dashboard -> API call
Backend -> returns JSON
Frontend -> renders data
```

# 6️⃣ Real World Flow (Full Stack)

Example using React + Node.js + Express.js

```bash
User clicks /profile

Frontend Router
      ↓
Loads Profile component
      ↓
Component calls API
      ↓
GET /api/profile
      ↓
Backend returns JSON
      ↓
Frontend renders UI
```

# 7️⃣ Simple Analogy

- Think of `Frontend Routing like switching TV channels` : TV remains same → only channel changes.

- Backend routing is like : Going to a `different cinema hall for each movie` 🎬.