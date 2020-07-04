---
number: 9
path: '/lectures/9-redux'
date: '2019-02-27'
title: 'Redux'
hidden: false
---

class: center, middle, block-text

# Redux

---

class: large

# Managing Application State

In React, if we have a deep tree of components render components, it can be annoying to share state between very distant parts of the tree.

Ideally, parts of our application state which are shared between these distant parts of the tree can be shared rather than explicitly passed up and down the tree.

---

class: med-large

# State in React-only apps

When a child component needs to change a parent component's state, it needs to be able to access functions that can manipulate parent component's state. This gets tricky. What if the parent has many ancestors? We'd have to pass the handlers everywhere. Gets messy...

```js

import React, {useState} from 'react'

const ChildComponent = (props) => {
  const {changeParentBool} = props
  return (
    <button onClick={() => changeParentBool(true)}/>
  )
}

const ParentComponent = (props) => {
  const [someBool, setBoolFunction] = useState(true)
  return (
    <ChildComponent changeParentBool={setBoolFunction}>
  )
}



```

---

# Motivating Redux

Originally, React managed state as well as rendering a frontend based on that state.

Hard to manage!

Redux stores all of our state, handles mutations to that state, and can push state changes to React. Now, React doesn't need to manage any state - it can simply use the state from Redux and render a frontend appropriately.

---

class: med-large

# How Redux Works

Redux vocabulary

- _state_: (typically) an object that stores our application's state
- _store_: an object that holds the _state_ and has several other functions that help manipulate the state
- _subscribe_: a function (available on the _store_) that executes whenever the _state_ changes. Like an event listener!
- _action_: an object that describes how the state should change
- _dispatch_: a verb - to _dispatch_ an action
- _reducer_: a function that takes in (state, action) pairs and returns a new state. Think about it as applying a transformation, as indicated by the action, to the state.

---

class: med-large, smaller-code

## Quick Redux Example

```js
import redux from 'redux'

const reducer = (state, action) => {
  if (action.type === 'INCR') {
    return state + 1
  } else if (action.type === 'DECR') {
    return state - 1
  }
  return state
}

// Create store with initial state 10
const store = redux.createStore(reducer, 10)
store.subscribe(function () {
  console.log(store.getState())
})

store.dispatch({ type: 'INCR' })
store.dispatch({ type: 'INCR' })
store.dispatch({ type: 'DECR' })
store.dispatch({ type: 'DECR' })
```

---

class: med-large

# Using React with Redux

You don't _need_ to use React with Redux - they work fine on their own. But the combination is really nice. Redux is a way of keeping track of state, and React components efficiently update based on their state.

The tricky part is updating state based on events. To dispatch an action in response to event (like `click`), a component needs access to the store itself. For small applications, this isn't too bad; for larger ones, we may want to factor out this code into other modules.

---

class: med-large

## Taking a closer look at Redux

- Basic Components:
  - Store
  - Reducer
  - Actions
    - dispatching
- Advanced Components (today)
  - Thunks
  - `connect` API
  - combineReducers

---

class: med-large

## Connecting React and Redux

React already has capabilities to re-render components based on changes to `props`. All we need to do is provide Redux state as `props` to React componnets.

High-level:

- `mapStateToProps` : specifies how Redux state should be provided to React via `props`
- `mapDispatchToProps` : provides functions (via `props`) to React components that let them dispatch actions
- `connect` : a function that connects React to redux
- `Provider` : a component that connects React to redux

[Example link](https://github.com/cis197/react-redux-example)

---

## cOoL sToRy...but how does this work w/ React?

- Higher Order Component (HOC)

```js
const connect = (mstp, mdtp) => {
  return (Wrap) => {
    return class ConnectedComponent extends Component {
      render() {
        <Wrap
          {...this.prop}
          {...mstp(store.getState()}
          {...mdtp(store.dispatch)
        />
      }
    }
  }
}
```

- Is it a little clearer what `mstp` and `mdtp` are doing?

---

## Formally defining `connect`

- Takes in two arguments `mapStateToProps` and `mapDispatchToProps`
  - `mapStateToProps` is a function that takes in the state (and current properties optionally) and returns an object that is the part of the state that you want the component to keep track of. Injects this state into the props of the component.
  - `mapDispatchToProps` is a function that takes in `dispatch` (defined by the store) and returnsa n object containing _action creators_ i.e. functions "preloaded" with dispatch and injects them into the props of the component

---

## Multiple Reducers

- So now that we have some way of separating concerns in our app and seeing what components listen to which parts of our state, we should also organize our store as well.
- General rule for each part of your app, you should have a reducer that handles that part e.g.
  - Error reducer
  - Authentication reducer
  - Tweet reducer
  - etc.
- Primary advantage is that you can isolate behavior!

---

```js
import { combineReducers } from 'redux'

const reducerA = (state = { testA: 'A' }, action) => {
  // ...
}
const reducerB = (state = { testB: 'B' }, action) => {
  // ...
}
const reducerC = (state = { testC: 'C' }, action) => {
  // ...
}

const finalReducer = combineReducers({
  A: A,
  B: B,
  C: C,
})

// in main script
let store = createStore(finalReducer)

// in connect
const mstp = (state) => {
  return state.A
}
connect(mstp, null)
```

---

class: center

## Mmk...that's cool and all. But what if you want to dispatch an async action?

![cri](https://3.bp.blogspot.com/--Db-esueXgI/VdWCSwMewZI/AAAAAAAATRs/mfthDsaKuwc/s1600/kid-crying-interview.gif)

---

## The Problem

```js
const asyncCall = () => {
  setTimeout(() => {
    return {
      type: 'ASYNC_ACTION'
      data: resultFromServer
    }
  }, 1000)
}

dispatch(someAsyncCall())
```

What'll be sent to our store?

---

## Nothing

- Our async call wouldn't finish by the time that dispatch will send whatever over.
- Monkeypatch solution 1:

```js
const makeAsyncDispatch = (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: 'ASYNC_ACTION',
      data: resultFromServer,
    })
  })
}

makeAsyncDispatch(this.props.dispatch)
```

- Kinda...but its different from our normal method of calling dispatches (we're passing it into a function rather than calling it directly.

---

## Brief note about redux middleware

```js
const thunk = (store) => (next) => (action) => {
  typeof action === 'function' ? action(store.dispatch) : next(action)
}

// Add middleware to store
const store = createStore(finalReducer, applyMiddlewware(thunk))
```

```js
const asyncCall = (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: 'ASYNC_ACTION'
      data: resultFromServer
    })
  }, 1000)
}
```

- You can use a formal `thunk` from the `redux-thunk` library

---

## React-Router Reacs Only

- Redux Break
- Big Picture:
  - We covered the notion of an API Server
    - How is it diff than regular server?
    - How do we change pages?
    - Option 1:
      - Create a compile bundle for each page of components, put in separate directories, and serve those
      - Cons, lots of build steps, painful dev time, more bundles to keep track of.
      - Pros...lol
    - Option 2:
      - Keep our single bundle
      - Have the browser somehow read what's in the URL bar + be able to change it
      - Mount and unmount components as you change the URL bar!
      - This is React Router

---

## Example

In a main app component:

```jsx
const App = () => (
  <div class="navigationBar">
    <p>This will always be here</p>
    <Route path="/some-route" component={someComponent} />
    <Route path="/person/:id?" component={someComponent} />
  </div>
)
```
