---
number: -1
path: '/lectures/old-react-lecture'
date: '2019-01-29'
title: 'ReactJS'
hidden: true
---

class: center, middle, block-text

# Lecture 16

## ReactJS

---

class: med-large

### So what is this react thing that everyone is talking about?

> "A JavaScript library for building user interfaces" - Facebook

- "But like jQuery does the same thing right?"
  - Kinda
  - Let's take a look at an example

---

class: med-large, center, middle

!['covfefe'](http://cdn.cnn.com/cnnnext/dam/assets/170531121403-trump-covfefe-tweet-screengrab-large-169.jpg)

What do you need to do when I click favorite or retweet?

---

class: med-large

```html
<div id="tweet" data-id="13091093">
  <div id="content">...</div>
  <div id="favorite">
    <icon class="heart"></icon>
    <p id="count">13K</p>
  </div>
</div>
```

```javascript
$('favorite').on('click', function () {
  var id = $($(this).parent()).data('id')
  incrementUpdateCountOnServer(id)
  var $count = $($(this).find('#count'))
  var countText = $count.text(countText) // do some logic to update count
  $($(this).find('#favorite')).addClass('active')
})
```

Oh crap...what if the user unfavorites a tweet

---

class: med-large

# jQuery gets out of hand really quickly

# But React is "scalable"

- Component based architecture
- Each component has its own state and is encapsulated
- React figures out how to update the page for you
- _Really fast_

---

class: small

```javascript
class Tweet extends Component {
  class constructor(props) { super(props) }

  onFavoriteClick() {
    if (this.state.isFavorite) {
      this.setState({ isFavorite: false })
    } else {
      sendServerRequest(this.state.tweetId)
      this.setState({ count: this.state.count++ })
    }
  }

  render() {
    let favorited = this.state.isFavorite ? 'active' : ''
    return (
      <>
        <div id="content">{this.state.content}</div>
        <div id="favorite" onClick={this.onFavoriteClick.bind(this)}>
          <icon class=`heart ${favorited}` />
          <p id="count">{this.state.count}</p>
        </div>
      </>
    )
  }
}
```

---

class: x-large

# Agenda

1. JSX
2. React
3. Redux
4. Why use React?

---

class: center, middle, block-text

# JSX

---

class: med-large, smaller-code

## JavaScript + HTML = JSX

JSX is a language extension that allows you to write HTML directly into your JavaScript files. Behind the scenes, it converts all the HTML text to React components.

This means that we use `ReactDOM.render` to render JSX. This function takes in a JSX object (which it renders) and a plain DOM element (which it renders the JSX inside of).

```js
let myDiv = <div class="jsx">Greetings from JSX world!</div>
ReactDOM.render(myDiv, getElementById('container'))
```

---

class: med-large

## The Transformation

JSX maps directly into React syntax, so you never actually have to dig down into the React element-creation API. Here's a side-by-side comparison of the JSX syntax and the equivalent JavaScript:

```html
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
- Custom attributes (any attribute not in the HTML spec) must have a `data-` prefix.
- Inline styles must be specified as objects, not strings. Properties are camelCased instead of kebab-case. Example: `<div style={{color: 'white', fontSize:'12px'}}>`

---

class: large

## Computed Expression Values

What makes JSX useful is that we don't need to know all the values of the attributes ahead of time. So we can use it as an easy templating engine. For instance, here's an example of a simple login/logout button.

```html
<a
  className="button"
  href={window.loggedIn ? '/logout' : '/login'}
>
  {window.loggedIn ? 'Log Out' : 'Log In'}
</a>
```

In reality, though, these values won't be global - they'll actually come from a React component!

---

class: large

## Components

Components are the basic building blocks of React. A React application is just a tree of components, each representing a different part of the DOM.

![React Component Illustration](https://i2.wp.com/programmingwithmosh.com/wp-content/uploads/2018/11/lnrn_0201.png?ssl=1)

---

class: large

# Creating Components _in ES6_

Syntactic sugar from ES6 means we can use the `class` syntax as follows.

```js
class HelloWorld extends Component {
  render() {
    // Return a heading to greet the user.
    return <h1>Hello {this.props.name}!</h1>
  }
}
```

---

class: med-large

# Rendering Components

Once we have a component, we can refer to it _as a JSX element_ using its variable name. Here's an example of rendering a `HelloWorld` component with a name `'CIS 197'`. An important caveat however, is to ensure that all React component names
are _capitalized_!

```js
ReactDOM.render(
  // Here's the name prop from the previous slide!
  <HelloWorld name={'CIS 197'} />,
  document.getElementById('container')
)
```

---

class: large

# State and Props

The previous example used `this.props` to access a value that was defined as a JSX attribute. These values are called **properties**, and they should be treated as immutable by their components (though, this being JavaScript, they're very mutable).

Mutable values are encapsulated as the **state** of a component. A component is allowed to mutate its state, usually in response to events.

---

class: large

# Changing State

Changing state implies that information encapsulated in your React component has changed, which means you should re-render the component to update the DOM. _You should never modify state directly!_ Instead, use React's `setState` function which does
this for you.

```js
class HelloWorld extends Component {
  updateGreeting() {
    this.setState({greeting: 'Goodbye World!'});
  },
  ...
  render() {
    // render code from before
  }
});
```

---

class: large

# Default State

You can set default state for React components using the `getInitialState` function, which returns an object to be assigned as initial state (`this.state`) for the component.

```js
class HelloWorld extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: 'Hello world'
    }
  }
  ...
  render() {
    // render code from before
  }
});
```

---

class: med-large, smaller-code

## Event Listeners

Event listeners are set up in JSX. They should refer to functions on the component, which will (almost always) then update the state of the component using `setState`.

```js
class LikeButton extends Component {
  constructor() {
    this.state = {liked: false}
  }
  toggle() {
    this.setState({liked: !this.state.liked});
  },
  render() {
    var txt = this.state.liked ? 'Unlike' : 'Like';
    var color = this.state.liked ? '#3b5998' : '#627AAC';
    return (
      <span onClick={this.toggle.bind(this)} style={{color: color}}>
        {'\ud83d\udc4d' + txt} // 👍
      </span>
    );
  }
});
```

---

class: med-large, smaller-code

## The Component Lifecycle

React components allow you to override certain functions that let you hook into different stages of a component's _lifecycle_. A few functions from the
[Component Docs](https://facebook.github.io/react/docs/react-component.html) are demonstrated below.

```js
class LikeButton extends Component
  componentDidMount() {
    // triggered the first time the component
    // is mounted into the DOM
    console.log('Mounted to the DOM!');
  },
  componentDidUpdate() {
    // triggered *after* props or state change
    console.log('Received new state and/or props!')
  },
  componentWillUnmount() {
    // triggered *before* component removed
    console.log('About to be removed from the DOM!')
  },
});
```

---

class: large

# Nesting Components

A component can have subcomponents, which can have components themselves, and so on. This allows for component re-use, and it's very intuitive, since a component is JSX looks just like any other element.

Generally a higher level component will change its subcomponents when it re-renders itself. Since React efficiently recomputes the DOM, this is much more efficient than it sounds!

---

class: center, middle, block-text

# Redux

---

class: large

# Managing Application State

Rather than using traditional models to manage our React application, we're going to do something a little different. Instead of keeping a model for every component, we're just going to keep track of the state of the whole app at once!

---

class: med-large

# How Redux Works

Redux keeps track of the state of your application behind of the scenes. To change the state, you can _dispatch actions_ (which are just arbitrary JS objects). The event is passed to the _reducer_, which is a function of type **(state, action) -> state**. Finally, you can use _subscribe_ to run a function whenever the state changes.

This is a lot like an event listener, but the difference is that with Redux, everything depends on the state. Subscribed functions don't have access to the event that caused the change to state.

---

class: med-large, smaller-code

## Quick Redux Example

```js
var redux = require('redux')

var reducer = function (state, action) {
  if (action.type === 'INCR') {
    return state + 1
  } else if (action.type === 'DECR') {
    return state - 1
  }
  return state
}

// create store with initial state 10
var store = redux.createStore(reducer, 10)
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

You don't _need_ to use React with Redux - they work fine on their own, or with other frameworks like Backbone. But the combination is really nice. Redux is a way of keeping track of state, and React components efficiently update based on their state. So if we just update the state of the top-level React component when the application state changes, we have a working app!

The tricky part is updating state based on events. To dispatch an action in response to event (like `click`), a component needs access to the store itself. For small applications, this isn't too bad; for larger ones, we may want to factor out this code into other modules.

---

class: x-large

# Example Code

Some example code for React is available on [the CIS 197 Github](https://github.com/cis197/react-examples). Be sure to reference this when completing the homework assignment!

---

class: x-large

# Coming Up

- Homework 7 - The Game of Life
- Start thinking up some final project ideas!
