## What do you mean by Frontend Routing ?

- Frontend routing enables navigation within a web application without requiring full page reloads, creating a smoother, app-like experience.  

- It is managed client-side using JavaScript frameworks like React, Angular, or Vue, leveraging the HTML5 History API to update the URL and browser history dynamically. 

## How it works: 

- When a user navigates between routes (e.g., from /home to /profile), the browser does not request a new page from the server. 
Instead, the frontend router updates only the necessary parts of the DOM and modifies the URL in the address bar.

## Key benefits:

- `Faster navigation`: No full page reloads.

- `Improved UX`: Smooth transitions and responsive interactions.

- `SEO compatibility`: Modern frameworks like Next.js support server-side rendering (SSR) or static site generation (SSG), allowing search engines to index routes properly.

- `Implementation`: Libraries like React Router, Vue Router, or Angular Router handle route definitions, component rendering, and URL synchronization. 

- `Server setup requirement:` For SPAs (Single Page Applications), the server must serve index.html for all routes (e.g., /about, /contact) to allow the client-side router to take over. This is often handled via a reverse proxy like Nginx or a Node.js server. 

⚠️ Important: If a user directly accesses a deep route (e.g., /profile) after a page refresh, the server must return index.html instead of returning a 404. This ensures the frontend router can handle the route. 