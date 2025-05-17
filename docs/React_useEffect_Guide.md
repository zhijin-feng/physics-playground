# Guidelines for Function Placement in React

---

## 1. What is `useEffect`?

`useEffect` is a React Hook used to handle **side effects** — operations that affect the outside world beyond the component itself, such as network requests, event subscriptions, manual DOM manipulations, etc.

---

## 2. When to Place Functions Inside `useEffect`

- **Side-effect logic**
  - Such as subscriptions, timers, animation loops, DOM operations, etc.
  - Depends on external state and needs to run on component mount and cleanup on unmount.

- **Code that needs to run on component mount or unmount**
  - Initialize resources, bind event listeners
  - Clean up timers, cancel subscriptions

- **Code that depends on certain props or state changes**
  - For example, refetching data when a specific variable changes

---

## 3. When NOT to Place Functions Inside `useEffect`

- **Event handler functions**
  - Button clicks, input changes, canvas clicks, etc.
  - Bound directly in JSX to respond immediately to user actions

- **Pure calculation functions**
  - Functions that compute results based on input without side effects
  - Examples: position updates, collision detection, data processing

- **State update calls**
  - Calls to `setState` should be made inside event handlers or other logic, not inside `useEffect` unless responding to side effects

---

## 4. Concrete Examples (Project Context)

| Function/Logic                      | Placement           | Explanation                                  |
|-----------------------------------|---------------------|----------------------------------------------|
| Animation loop `draw`               | Inside `useEffect`  | Depends on `requestAnimationFrame`, starts on mount, stops on unmount |
| Canvas click handler `handleCanvasClick` | Outside `useEffect`, in component body | Direct user event response, not a side effect |
| Velocity setter `handleSetVelocity`         | Outside `useEffect`, in component body | Bound to button click event                    |
| Ball collision and position update          | Inside `draw` function                | Pure calculation logic without side effects    |
| Delete ball function `handleDeleteLastBall` | Outside `useEffect`, in component body | User interaction handler                        |

---

## 5. Summary

- **Place side-effect-related functions inside `useEffect`**
- **Place user event handlers and pure calculation functions in the component body**
- **Declare state with `useState` and update state inside event handlers**

---
