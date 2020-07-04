---
number: 13
path: '/lectures/13-redux-and-routing'
date: '2019-01-29'
title: 'Advanced Redux + Frontend Routing'
hidden: true
---

class: center, middle, block-text

# Lecture 13

## Advanced Redux + Frontend Routing

## Aka: The lecture Abhi is really going to geek out on

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

## Is this good?

```javascript
// some other file
let store = createStore(reducer)
render() {
  return (
    <X store={store}/>
  )
}
// this file
class X extends Component {
  constructor(props) { super(props) }

  componentDidMount() {
    this.props.store.subscribe(function() {
      this.setState(this.props.store.getState())
    })
  }

  render() { ... }
}
```

---

## What does X really need to know?

- Right now `X` will set its state _every_ time the central store changes
  - Cri...Bad b/c every call to setState will trigger React to calculate render logic
    - Even if X doesn't actually render certain properties.
    - Since we setState on the component, React likes to be #extra and does work to generate a virtual tree and check for diffs
  - But let's say our state looks something like

```javascript
// store state
{
   X: { da: 'ting', goes: 'skrrrahh' },
   Y: { ... },
   Z: { ... },
}
```

- Conceivably, we would like have X just listen to whenever the store state's X property changes.
- But how do?

---

## Contexts

- Let's remove the need to explicitly pass down store
- React introduced a 'contexts' API in 15.x that allows you to pass down objects to children, grandchildren... components. You just need to implement `getChildContext` and specify `ComponentName.childContextTypes`

```javascript
class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store,
    }
  }
  render() {
    return this.props.children
  }
}
Provider.childContextTypes = {
  store: React.PropTypes.object,
}
```

---

class: med-large

## Re-evaluating X

```javascript
// some other file
let store = createStore(reducer)
render() {
  return (
    <Provider> <X/> </Provider>
  )
}
// this file
class X extends Component {
  constructor(props) { super(props) }

  componentDidMount() {
    this.context.store.subscribe(function() {
      this.setState(this.context.store.getState())
    })
  }

  render() { ... }
}
X.contextTypes = { store: React.PropTypes.object }
```

---

## Okay so now what

- We've figured out that no longer need to explicitly pass down store as a prop
- But how do we stop unnecessary state calculations?
- React-Redux

```javascript
import { Provider } from 'react-redux';
render() {
  <Provider><X/></Provider>
}
// other file
import { connect } from 'react-redux';
class X extends Component {
  constructor(props) { super(props) }
  render() { ... }
}

mapStateToProps = (state) => { ... }
mapDispatchToProps = (dispatch) => { ... }

export default
  connect(mapStateToProps, mapDispatchToProps)(X)
```

---

class: center, middle
![confuzzled](https://i.imgflip.com/26w8zr.jpg)

---

## `connect` in depth...ish

- `connect` connects your components to your store via some specific methods
- Previously, we get the entire state and must store it locally
- Now we can shift to relying on the props to provide us state
  - Good b/c we're minimizing multiple states!
- Weird syntax tho...
  - `connect(..., ...)(Component)` wat?
  - Currying!
  - <img src="https://c-5uwzmx78pmca09x24ax2eplvcfx2ekwu.g00.sfgate.com/g00/3_c-5eee.anoibm.kwu_/c-5UWZMXPMCA09x24pbbx78ax3ax2fx2fa.plvcf.kwux2fx78pwbwax2f45x2f14x2f12x2f92320375x2f3x2f708f708.rx78ox3fq98k.uizsx3dquiom_$/$/$/$/$/$/$/$" height="200px">
  - Not that type

---

## Function Currying

Consider the following

```javascript
const add = (x, y) => {
  return x + y
}
add(1, 2) // => 3
add(1) // NaN
```

How about

```javascript
const add2 = (x) => {
  return (y) => {
    return x + y
  }
}
add2(1)(2) // => 3
add2(1) // function
```

Boom, you just got curry'd

---

## cOoL sToRy...but how does this work w/ React?

- Higher Order Component (HOC)

```javascript
const connect = (mstp, mdtp) => {
  return (wrap) => {
    return class ConnectedComponent extends Component {
      render() {
        <wrap
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

```javascript
// from earlier
...

const mapStateToProps = (state) => {
  return state.X
}

const mapDispatchToProps = (dispatch) =>  {
  return {
    increment: () => {
      dispatch(someIncrementAction())
    }
  }
}

export default
  connect(mapStateToProps, mapDispatchToProps)(X)
```

---

## Accessing these within the component?

```javascript
class X extends Component() {
  render() {
    return (
      Da {this.props.X.da} goes {this.props.X.goes}
      <button onClick={this.props.increment}
    )
  }
}
```

- Everything is passed in via props!
- No local state management needed!
- Everything is in the store

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

```javascript
import { combineReducers } from 'redux'

const reducerA = (state={ testA: 'A' }, action) => {

}
const reducerB = (state={ testB: 'B' }, action) => {
  ...
}
const reducerC = (state={ testC: 'C' }, action) => {
  ...
}

const finalReducer = combineReducers({
  A: A,
  B: B,
  C: C
})
// in main script
let store = createStore(finalReducer)
// in connect
const mstp = (state) => { return state.A }
connect(mstp, null)
```

---

class: center

## Mmk...that's cool and all. But what if you want to dispatch an async action?

![cri](https://3.bp.blogspot.com/--Db-esueXgI/VdWCSwMewZI/AAAAAAAATRs/mfthDsaKuwc/s1600/kid-crying-interview.gif)

---

## The Problem

```javascript
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

```javascript
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

```javascript
const thunk = (store) => (next) => (action) => {
  typeof action === 'function' ? action(store.dispatch) : next(action)
}
// add middleware to store
let store = createStore(finalReducer, applyMiddlewware(thunk))
```

```javascript
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

```javascript
// in main app component
class App extends Component {
  ...
  render() {
    return (
      <div class="navigationBar">
        <p>OtherStuffYouWantToShowConsistently</p>
          <Route path="/someRoute"
                 component={someComponent}/>
          <Route path="/person/:id?"
                 component={someComponent}/>
        </div>
      </div>
    )
  }
}

```
