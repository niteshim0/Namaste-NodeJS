# Ways of Data Fetching on Frontend

## RESTful APIs
- RESTful APIs are the` most common method`, where the frontend sends HTTP requests (like GET, POST) to specific backend endpoints to retrieve or send data.  
- This is typically done using the `fetch API` or `libraries like Axios` in JavaScript.

# Fetch API(Built-in)

- ## Overview

  * **Fetch API**: Modern JavaScript interface for making HTTP requests.
  * Replaces `XMLHttpRequest`; promise-based instead of callback-based.
  * Integrated with modern web features like **CORS** and **service workers**.
  * Global function: `fetch()` available in `window` and` worker contexts`.
  * Returns a **Promise** fulfilled with a `Response` object.

---

- ## Basic Usage

```js
async function getData() {
  const url = "https://example.org/products.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}
```

---

- ## Making a Request

  - ### URL / Resource

    * Can pass:

      * String URL
      * `URL` object
      * `Request` instance
    * Optional second argument: request options.

  - ### HTTP Method

    ```js
    await fetch("https://example.org/post", { method: "POST" });
    ```

  - ### Request Body

    * Used in `POST`, `PUT`, etc.
    * Types: `string`, `ArrayBuffer`, `Blob`, `File`, `URLSearchParams`, `FormData`, `ReadableStream`.

    ```js
    await fetch("https://example.org/post", {
    method: "POST",
    body: JSON.stringify({  username: "example" }),
    });

  ```

* For URL-encoded form:

```js
await fetch("https://example.org/post", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({ username: "example", password: "password" }),
});
```

* **Note**: Request/response bodies are streams → can’t be read twice. Use `Request.clone()` if needed.

### Headers

```js
const headers = new Headers();
headers.append("Content-Type", "application/json");

await fetch("https://example.org/post", {
  method: "POST",
  headers,
  body: JSON.stringify({ username: "example" }),
});
```

### Sending data in GET

```js
const params = new URLSearchParams({ username: "example" });
await fetch(`https://example.org/login?${params}`);
```

---

## Cross-Origin Requests (CORS)

* `mode` option: `cors` (default), `same-origin`, `no-cors`.
* `cors`: server must set `Access-Control-Allow-Origin`.
* `no-cors`: limited headers/methods; response is opaque.
* `same-origin`: blocks cross-origin requests.

### Credentials

* `credentials` option: `omit`, `same-origin` (default), `include`.
* Only sends cookies/tokens if allowed by server headers (`Access-Control-Allow-Credentials`).

---

## Request Objects

* Can use `Request()` constructor instead of passing options to `fetch()`.

```js
const req = new Request("https://example.org/post", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username: "example" }),
});
await fetch(req);
```

* Can clone request and modify:

```js
const req2 = new Request(req, { body: JSON.stringify({ username: "example2" }) });
```

---

## Canceling Requests

* Use **AbortController**:

```js
const controller = new AbortController();
fetch("https://example.org/get", { signal: controller.signal });
controller.abort(); // cancels fetch
```

---

## Handling Response

### Check Status

```js
if (!response.ok) throw new Error(`Response status: ${response.status}`);
```

### Response Types

* `basic`: same-origin
* `cors`: cross-origin
* `opaque`: cross-origin no-cors
* `opaqueredirect`: manual redirect

### Headers

```js
const contentType = response.headers.get("content-type");
```

### Reading Body

* Methods: `arrayBuffer()`, `blob()`, `formData()`, `json()`, `text()`

```js
const data = await response.json();
```

### Streaming Response

```js
const stream = response.body.pipeThrough(new TextDecoderStream());
for await (const chunk of stream) console.log(chunk);
```

### Reading Large Text Files Line by Line

```js
async function* makeTextFileLineIterator(fileURL) {
  const response = await fetch(fileURL);
  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
  // ... iterate over lines
}
```

---

## Locked and Disturbed Streams

* Streams can only be read once.
* Reading twice → `Body has already been consumed`.
* Use `Response.clone()` if you need multiple reads.

### Caching Example with Service Workers

```js
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) return cachedResponse;

  const networkResponse = await fetch(request);
  if (networkResponse.ok) {
    const cache = await caches.open("MyCache_1");
    cache.put(request, networkResponse.clone());
  }
  return networkResponse;
}
```
