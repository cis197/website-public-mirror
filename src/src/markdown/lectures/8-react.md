---
number: 8
path: '/lectures/8-react'
date: '2019-01-29'
title: 'ReactJS'
hidden: false
---

class: center, middle, block-text

# Lecture 8

## ReactJS

---

class: med-large

# Hype, hype, hype!

Why React?

1. It uses a Virtual DOM to make page rendering blazing fast
1. It reduces code complexity and increases readability
1. It lets you write isomorphic code
1. It makes it easy to write modular, reusable code
1. It can be used to write web apps, mobile apps, and native desktop apps
1. It's just JS, so it's quick to pick up

In case this wasn't enough, it's maintained by the fine folk at Facebook and in
use all across Netflix ([60 FPS in the browser](https://www.youtube.com/watch?v=g01dGsKbXOk)),
Airbnb, Khan Academy, NYT, Dropbox's
Carousel, WhatsApp Web etc etc.

---

class: x-large

# Agenda

1. Why use React?
1. JSX
1. React

---

class: center, middle, block-text

# Why React?

---

# The V

Many frameworks use the [Model-View-Controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) design pattern.

- **Model:** stores state (~ your database)
- **View:** takes in state and renders updates to the user
- **Controller:** manipulates state

React is _only_ the **view**, and it does that one job very, very well. You can use any state management library and model (database, local storage on the user's device to in memory objects, etc.) and React can handle showing information to the user.

---

# Modularity

We build a React app by constructing a virtual DOM. Basically, a wrapper on normal DOM nodes that we wrote in HTML over the past few homeworks. We can then "inject" this virtual DOM into the user's browser by replacing an existing DOM node with our React-wrapped ones.

This means you _could_ have multiple React apps on a single page. Or, if you have an existing legacy app and you want to port it over to React, you can do it bit by bit without having to do a single rewrite.

React apps can also be built in small chunks called **components** which we link together to build the full virtual DOM.

---

# Performance

- React keeps track of all **properties** and **state** (information) in your app
- It knows what virtual DOM nodes depend on what parts of this information
- When that information changes, instead of re-rendering the whole React app, it only re-renders _exactly_ the subset of the DOM which depends on this information
- This saves a lot of compute on the user's device, meaning we can build very complex apps with complex state and know that React can handle it

---

class: center, middle, block-text

# JSX

---

class: med-large, smaller-code

## JavaScript + HTML = JSX

JSX is a language extension that allows you to write HTML directly into your JavaScript files. Behind the scenes, it converts all the HTML text to React components.

We use `ReactDOM.render` to render JSX. This function takes in a JSX object (which it renders) and a plain DOM element (which it renders the JSX inside of). Behind the sceens it's basically converting the React virtual DOM to an actual HTML DOM.

```js
const myDiv = <div className="this-is-jsx">Greetings from JSX world!</div>
ReactDOM.render(myDiv, getElementById('container'))
```

---

class: med-large

## The Transformation

JSX maps directly into React syntax, so you never actually have to dig down into the React element-creation API. Here's a side-by-side comparison of the JSX syntax and the equivalent JavaScript:

```jsx
<ul id="list">
  <li>One thing</li>
  <li>another</li>
</ul>
```

```js
React.createElement(
  'ul',
  { id: 'list' },
  React.createElement('li', null, 'One thing'),
  React.createElement('li', null, 'another')
)
```

---

class: med-large

## JSX Syntax

It's pretty much HTML, with a few key differences:

- Some common attribute names (like `class` and `for`) are reserved in JavaScript, so they have different names in JSX (`className` and `htmlFor`, respectively).
- Inline styles must be specified as objects, not strings. Properties are camelCased instead of kebab-case. Example:

```jsx
<p style={{ color: 'red', fontSize: '12px' }}>I'm some red text, size 12!</p>
```

---

class: large

## Computed Expression Values

Any text inside curly braces (`{...}`) get's executed as JavaScript. This means we can put variables into our JSX at runtime. So we can use it as an easy _templating engine_.

For example, often if a user is logged in we want to show a link to log out, but if the user is not logged in we want to show them a button to log in:

```jsx
<a className="button" href={window.loggedIn ? '/logout' : '/login'}>
  {window.loggedIn ? 'Log Out' : 'Log In'}
</a>
```

In reality, though, these values won't be global (defined on the window)—they'll actually come from a React component!

---

class: med-large

## Side Note: How JSX is transformed

We use bundlers to transpile modern JS code and things like JSX into JS code which not-cutting edge browsers can understand. Popular options are [Webpack](https://webpack.js.org/) and [Parcel](https://parceljs.org/).

With these bundlers and with pretty minimal config, we just use the same syntax that we're used to from Node in terms of importing packages from npm.

<div style="width: 100%; position: relative; display: flex; align-items: center;">
  <div style="flex: 1; width: auto;">
    <img alt="Parcel logo" src="https://user-images.githubusercontent.com/19409/31321658-f6aed0f2-ac3d-11e7-8100-1587e676e0ec.png" />
  </div>
  <div style="flex: 1; width: auto;">
    <img alt="Webpack logo" src="https://jonathanmh.com/wp-content/uploads/2017/01/webpack-logo.png" style="flex: 1; width: auto;" />
  </div>
</div>

---

class: center, middle, block-text

# React

---

class: large

# Remember, React Puts the "V" in "MVC"

React is used as the View in a Model-View-Controller architecture. It's a really efficient way to update the DOM in response to state changes because it only re-renders things that have changed, rather than just re-rendering everything.

React doesn't really have any utilities for modeling data. It can easily be used with any model framework.

---

class: large

## Components

Components are the basic building blocks of React. A React application is just a tree of components, each representing a different part of the DOM. Basically, we split the app up into a bunch of small, reusable pieces.

![React Component Illustration](https://raw.githubusercontent.com/westeezy/ReactJS-Bootcamp/master/walkthroughs/slides/day2/img/react_component_hierarchy.png)

---

class: large

# Before we proceed...

- React is a fairly new framework and encourages modern syntax standards.
- Docs for React are written in [ES6](https://en.wikipedia.org/wiki/ECMAScript#6th_Edition_-_ECMAScript_2015), the latest (but not yet fully supported!) syntax standard for JavaScript.
- ES6 adds in support for Classes, auto bound prototype functions and arrow syntax.

---

class: large

# Creating Components

There are two types of components, **class components** and **functional components**. We prefer functional components because they are simpler and tend to have more top-to-bottom readability.

```jsx
const HelloWorld = (props) => <h1>Hello {props.name}!</h1>
```

We also often use [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) for our props:

```jsx
const HelloWorld = ({ name }) => <h1>Hello {name}!</h1>
```

---

# Class component

The equivalent of this as a class component would be:

```js
class HelloWorld extends React.Component {
  render() {
    const { name } = this.props
    return <h1>Hello {name}!</h1>
  }
}
```

Note that, within the class, we use `this` whereas `this` in the functional component would simply be the `window`. In the function case we are given the `props` as a parameter to our function.

---

class: med-large

# Rendering Components

Once we have a component, we can refer to it _as a JSX element_ using its variable name. Here's an example of rendering a `HelloWorld` component with a name `'CIS 197'`. Make sure you name your components in PascalCase (camelCase with the first letter capitalized too):

```js
const root = document.getElementById('container')

ReactDOM.render(
  // Here's the name prop from the previous slide!
  <HelloWorld name="CIS 197" />,
  root
)
```

---

class: large

# State and Props

"Props" is short for "**properties**"—data that is passed to this component in key-value pairs.

The previous example used its `props` to access a value that was defined as a JSX attribute. Props should be treated as immutable by their components (though they may be mutable _outside_ of this component).

Mutable values are encapsulated as the **state** of a component. A component is allowed to mutate its state, usually in response to events like clicks or a user typing.

---

class: large

# Changing State in Class Components

Changing state implies that information encapsulated in your React component has changed, which means you should re-render the component to update the DOM. _You should never modify state directly!_ Instead, use React's `setState` function which does this for you. This is how React knows when it should try to re-render parts of the DOM.

```js
class HelloWorld extends React.Component {
  updateGreeting() {
    this.setState({ greeting: 'Goodbye World!' });
  }
  ...
  render() {
    // render code from before
  }
}
```

---

# Default State

You can set default state for React components using the `getInitialState` function, which returns an object to be assigned as initial state (`this.state`) for the component.

```js
class HelloWorld extends React.Component {
  getInitialState() {
    return { greeting: 'Hello World!' }
  }

  // ...

  render() {
    // render code from before
  }
}
```

---

# Default State

We can also do this through the constructor:

```js
class HelloWorld extends React.Component {
  constructor(props) {
    super(props)
    this.state = { greeting: 'Hello World!' }
  }

  // ...

  render() {
    // render code from before
  }
}
```

---

# React Hooks

React Hooks are a relatively new feature of React which let us perform similar state operations in functional components.

```js
const HelloWorld = () => {
  const [greeting, setGreeting] = useState('Loading...')
  // ...
  setGreeting('Yooo what is good World?!')
  return <h1>{greeting}</h1>
}
```

`useState` takes in the default value (in this case `'Loading...'`). It returns an _array_. This seems strange, but it's basically how a function in JS can return multiple values. The first item in the array is the stateful value, and the second item in the array is a setter for that state.

Notice how we destructure out these two returned items from the array.

---

class: med-large, smaller-code

## Event Listeners

Event listeners are set up in JSX. They should refer to functions on the component, which will (almost always) then update the state of the component using `setState`.

```jsx
class LikeButton extends React.Component {
  getInitialState() {
    return { liked: false }
  }

  toggle() {
    const { liked } = this.state
    this.setState({ liked: !liked })
  }

  render() {
    const { liked } = this.state
    const txt = liked ? 'Unlike' : 'Like'
    const color = liked ? '#3b5998' : '#627AAC'
    return (
      <span onClick={() => this.toggle()} style={{ color }}>
        {`👍 ${txt}`}
      </span>
    )
  },
}
```

---

# Functionally...

Note how this code is shorter and more to the point:

```jsx
const LikeButton = () => {
  const [liked, setLiked] = useState(false)
  const txt = liked ? 'Unlike' : 'Like'
  const color = liked ? '#3b5998' : '#627AAC'
  return (
    <span onClick={() => setLiked(!liked)} style={{ color }}>
      {`👍 ${txt}`}
    </span>
  )
}
```

---

class: med-large, smaller-code

## The Component Lifecycle

React components allow you to override certain functions that let you hook into different stages of a component's _lifecycle_. A few functions from the
[Component Docs](https://facebook.github.io/react/docs/react-component.html) are demonstrated below.

```js
class LikeButton extends React.Component {
  componentDidMount() {
    // triggered the first time the component
    // is mounted into the DOM
    console.log('Mounted to the DOM!')
  }
  componentDidUpdate() {
    // triggered *after* props or state change
    console.log('Received new state and/or props!')
  }
  componentWillUnmount() {
    // triggered *before* component removed
    console.log('About to be removed from the DOM!')
  }
  // ...
}
```

---

## The Component Lifecycle Functionally

In functional components, we don't have access to these lifecycle methods. Instead, we use a different hook called `useEffect` where the passed in function is run every time variables which the effect depends on change.

```js
const [isDoneLoading, setIsDoneLoading] = useState(true)

useEffect(() => {
  if (!isDoneLoading) return // Do nothing
  console.log('We finished loading!')
  // ...
}, [isLoading])

// ...
setIsDoneLoading(true)
```

The first parameter to `useEffect` is a callback function, and the second is a list of dependencies.

---

class: large

# Let's take a breather

The above topics are unique concepts which take advantage of things we have already learned but in unique ways. It takes time to get familiar with the syntax and when to use what.

<u>The core idea is that React makes it possible for us to have full control over when and how our data changes and how our frontend app should respond to these changes.</u>

---

class: large

# Nesting components

A component can have subcomponents, which can have components themselves, and so on. This allows for component re-use, and it's very intuitive, since a component is JSX looks just like any other element.

Generally a higher level component will change its subcomponents when it re-renders itself. Since React efficiently recomputes the DOM, this is much more efficient than it sounds!

---

## Wrapper components

Components placed inside of a wrapper component are known as `children` and they are passed as props:

```jsx
const Container = ({ children }) => (
  <div style={{ paddingLeft: '25%', paddingRight: '25%' }}>{children}</div>
)

const App = () => (
  <Container>
    <h1>Dope page</h1>
    <p>That has padding around it because of the container</p>
  </Container>
)
```

---

class: x-large

# Example Code

**Note:** these are a little antiquated, but the logic is still useful today!

Some example code for React is available on [the CIS 197 Github](https://github.com/cis197/react-examples). Be sure to reference this when completing the homework assignment!

We will also post code from lecture [here.](https://github.com/cis197/live-code)

---

class: x-large

# Coming Up

- Homework: React Comments App which you build from scratch
- Start thinking up some final project ideas!
