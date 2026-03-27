## Optimistic UI Update

### What it means ?

- Update UI before `server` confirms success.
- You assume API will succeed → show result instantly.

### Why Its Used ?

- Removes delay (no waiting for API)
- Feels fast + smooth
- Used in:
    - LinkedIn (like, connect)
    - Instagram (like)
    - WhatsApp (sending message)

### My Code Example

applied in Request.jsx  component , see the code folder

```js
setRemovingIds((prev) => [...prev, senderId]);
```

👉 Immediately:

- Card starts disappearing.
- User feels action is done.

### Typical Flow

```cmd
1. User clicks Accept
2. UI updates immediately (remove item / change state)
3. API call runs in background
4. If success → nothing extra
5. If fail → rollback (IMPORTANT)
```

### Generic Pattern (Machine Coding Round)

```js
const handleClick = async (id) => {
  const prevData = data;

  // ✅ Optimistic update
  setData(data.filter(item => item.id !== id));
  // before calling the api , i am updating the UI

  try {
    await apiCall(id);
    // IF API Call Success -> DO NOTHING
  } catch (err) {
    // ❌ rollback
    setData(prevData);
    // IF API Call FAILS -> GO BACK TO PREVIOUS STATE
  }
};
```

**🎯 Key Interview Points**

Say this:
- “Improves perceived performance”
- “Reduces latency impact”
- “Needs rollback handling for consistency”

## Rollback on Failure

- If API fails -> undo `optimistic` changes.

### Why needed ?

Without rollback:

- UI shows `wrong state`.
- Data becomes `inconsistent`.
- Haven't you read Transactions and Concurreny Control in DBMS.

### My Code

```js
catch (err) {
  setRemovingIds((prev) =>
    prev.filter((id) => id !== senderId)
  );
}
```

**👉 This:**

- Stops animation.
- Brings item back visually.

### Generic Pattern of Rollback

```js
const prevRequests = [...requests];

try {
  // optimistic update
} catch {
  dispatch(addRequest(prevRequests)); // restore old data
}
```

### Types of Rollback

There are 2 types of rollback:

**1. `UI Rollback` (I did)**
  - Reverse animation
  - Show item again

**2. `Data Rollback` (stronger)**
  - Restore previous state completely

-------------------**`Best systems do both`**-------------------------------


## 🔥 Real-World Example

- Instagram Like 👍(aren't you seeing reels, story and photos of others)
- Tap ❤️ → instantly red (optimistic)
- If API fails → turns back to white (rollback)

## 🧠 Interview Questions They Ask

- **Q1: What is optimistic UI?**
  - Updating UI before server response to improve user experience

- **Q2: What if API fails?**
  - We rollback using previous state and show error

- **Q3: Trade-offs?**
  - Pros: fast UX
  - Cons: complexity, possible inconsistency

- **Q4: When NOT to use it?**
  - Payments 💸
  - Critical transactions
  - Banking apps






“`Optimistic UI updates improve user experience by instantly reflecting changes in the UI before server confirmation. However, to maintain consistency, we store previous state and rollback changes if the API fails`.”