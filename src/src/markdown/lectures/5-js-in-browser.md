---
number: 5
path: '/lectures/5-js-in-the-browser'
date: '2019-01-29'
title: 'JavaScript in the Browser'
hidden: false
---

class: center, middle, block-text

# Lecture 5

## JavaScript in the Browser

---

class: x-large

# Agenda

1. The DOM
2. jQuery
3. Browser Events

---

class: med-large

# Warm-up: Loading JavaScript

In Node, we used `require('module')` to load JavaScript files. In the browser, we need to use a special `<script>` tag.

```xml
<body>
  <!-- content and stuff -->
  <script src="path/to/script.js"></script>
</body>
```

Browsers load tags sequentially, so it's good practice to put the script tags last. That way users will see the bare-bones HTML page more quickly.

---

class: center, middle, block-text

# The DOM

---

class: large

# DOM Basics

- DOM = **D**ocument **O**bject **M**odel
- Tree of JavaScript objects representing the HTML document
  - Called _DOM nodes_
- Allows you to dynamically change the page using JavaScript

---

class: x-large

<div style="display: flex">
<div style="flex: 1;">
<h2>HTML</h2>

```html
<!DOCTYPE html>
<html>
  <head>
    ...
  </head>
  <body>
    <p>I'm a paragraph.</p>
    <div>And I'm a div!</div>
  </body>
</html>
```

</div>

<div style="width: 1rem;"></div>

<div style="flex: 1;">
<h2>DOM Tree</h2>

<img src="https://s3.amazonaws.com/riploventures/dom-tree.png" style="width:100%" alt="DOM tree"/>
</div>
</div>

---

class: large

# Chrome Dev Tools

- <kbd>Alt</kbd> + <kbd>&#8984;</kbd> + <kbd>j</kbd> in Chrome will let you access, visualize, and maniupulate the DOM
  - You can also right click and hit 'Inspect Element' to go straight to a specific node
- Other modern browsers have dev tools as well - get familiar with the toolset in your browser of choice, and you'll be able to debug a lot more effectively!

---

class: large

## The "Vanilla DOM"

There _is_ a native DOM API, but it's notoriously verbose and annoying to work with. It's very uncommon to write DOM manipulation code without using a library.

```js
var node = document.body.firstChild

if (node.nodeType === 3) {
  // Text node
  console.log('Content: ' + node.nodeValue)
} else {
  // Regular node
  var n = node.childNodes.length
  console.log('Tag: <' + node.nodeName + '>')
  console.log('Number of children: ' + n)
}
```

---

class: center, middle, block-text

# jQuery

### Or: The Almighty \$

---

class: large

# About jQuery

- Optimized, abstracted DOM manipulation
- Intuitive API and method syntax
- Expressive syntax driven by CSS selectors
- Pretty good syntax for web requests
- Works in nearly all browsers
- Probably the most popular JavaScript library ever

---

class: med-large

# jQuery Objects

The basic currency of jQuery is a **jQuery object**, a wrapper for DOM nodes and allows you to efficiently manipulate them. You can find elements to make into a jQuery object by using CSS selectors.

1. `$(selector)` - searches the whole document for nodes that match the selector
2. `$someNodes.find(selector)` - only finds children of `$someNodes` that match the selector

You can make a 'vanilla' DOM node into a jQuery object with `$(vanillaNode)`. In fact, jQuery does this internally; `$(selector)` is the same as calling `$(document).find(selector)`.

---

class: med-large

# jQuery Selector Examples

```js
// ID
var $myEl = $('#myEl')

// Tag name
var $allTables = $('table')

// Descendant of ID
var $lessons = $('#content lesson')
// Equivalently:
$lessons = $('#content').find('lesson')

// Pseudo-selectors
var $oddInputs = $('input:odd')
```

---

class: x-large, center, middle

# Simple jQuery Example

http://jsfiddle.net/webdevem/Q8KVC/

---

class: large

# Chaining

jQuery achieves a visually pleasing API through _method chaining_. This is accomplished through clever use of a `this` pointer.

```js
// Note: $.fn === $.prototype
$.fn.empty = function () {
  var elem, i

  for (i = 0; (elem = this[i]) != null; i++) {
    elem.innerHTML = ''
  }

  return this
}
```

---

class: large

# Creating Elements with jQuery

You can _create_ elements with jQuery just by passing in an HTML tag string. For example:

```js
$span = $('<span>').text('I am span.')
$myDiv.append($span)
```

This is pretty cool because it allows you to build a page dynamically.

---

class: center, middle, block-text

# Browser Events

---

class: med-large

# Browser Event Basics

- User interactions are modelled with an _event-based_ system; browsers have a JavaScript API to hook into these events.
- Just like the event listeners we looked a few weeks ago - functions are registered as _event listeners_ and receive arguments with event information (e.g. which key was pressed).
- Many different event types:
  - [Mouse](https://developer.mozilla.org/en/DOM/MouseEvent): `mousedown, mouseup, click, dblclick, mousemove, mouseover, mousewheel, mouseout, contextmenu`
  - [Touch](https://developer.mozilla.org/en/DOM/MouseEvent): `touchstart, touchmove, touchend, touchcancel`
  - [Keyboard](https://developer.mozilla.org/en/DOM/KeyboardEvent): `keydown, keypress, keyup`
  - Forms: `focus, blur, change, submit`
  - Window: `scroll, resize, hashchange, load, unload`

---

class: large

# Handlers in HTML

It's technically possible to define event handlers directly in your HTML like so:

```html
<button class="submit" onclick="submitForm();">
  Submit
</button>
```

This is fine when there's only one simple event on a page - say, a login form with validation. It is **not** a good idea to do this in any other context; JavaScript code should stay in `.js` files, separate from the markup.

---

class: med-large

# Handlers in JavaScript

The event handler API is pretty easy to work with, even without jQuery. Don't worry, we'll get to jQuery in a few slides - but let's use the Vanilla DOM for a little while:

`domNode.addEventListener(eventType, eventListener)`

With this syntax, the submit button handler becomes:

```js
var buttons = document.getElementsByTagName('button')

buttons[0].addEventListener('click', function () {
  submitForm()
})
```

---

class: med-large

# Event Objects

Event handlers are passed an _event object_ with the properties of the relevant event. For example, a mouse event would have `clientX` and `clientY` properties indicating the mouse coordinates.

Many events also have a `target` property containing the triggering DOM node, which makes it much easier to reuse listeners.

```js
document.addEventListener('click', function (e) {
  console.log('X: ' + e.clientX)
  console.log('Y: ' + e.clientY)
  console.log('Target: ' + e.target)
})
```

---

class: med-large

# Cross-Browser Sadness

IE8 and below use a completely different API for attaching events:

```js
domNode.attachEvent('onclick', function () {
  // do stuff
})
```

Plus, the callback gets no event object - the properties are attached to a **global event object** called `window.event`.

If only there were a better, cross-browser way...

---

class: med-large

# Events with jQuery

Once again, jQuery provides a convenient solution to a DOM-related problem. You can bind handlers to jQuery objects using methods corresponding to the event type: `click(), mousein(), keyup()...`

```js
$('button').click(function (e) {
  // Triggering node passed as "this" context
  $(this).attr('hovered', true)
})
```

---

class: large

# jQuery Event Objects

jQuery event objects have all the same objects as the standard DOM events. However, they're now standardized across browsers, which is very convenient.

Also, in jQuery events, the triggering node is available as `this`, which is quite useful.

---

class: med-large

# Propagation (Bubbling)

Events don't stop on the initially-triggering element. They "bubble up," or propagate, up the DOM tree until they get to the root (`document`). Consider the example of clicking one of the links in the HTML below:

```html
<body>
  <a href="/foo">foo</a>
  <a href="/bar">bar!</a>
</body>
```

The `<a>` `click` handlers will run first, followed by `<body>` handlers, and finally `document` handlers - one of which follows the link.

---

class: large

# Stopping Propagation

You can call `event.preventDefault()` to ignore only the browser-specific functionality (like navigating to a page), or `event.stopPropagation()` to stop the bubbling entirely.

```js
// Prevent users from clicking links to navigate
$('a').click(function (e) {
  e.preventDefault()
})
```

[Live example](https://jsfiddle.net/8389r5k3/3/)

---

class: med-large, shrink-top

# Advanced jQuery Events

The `on()` method is a more general way of handling jQuery events. The simplest version you've seen before: it registers a listener for a given name. But there is also a three-argument version, which runs the listener when **any matching descendent** of the parent node receives the event.

```js
// Run handler on existing matching elements
$('#menu option').on('hover', onHover)

// Run handler on any children of #menu
// that match the selector
$('#menu').on('option', 'hover', onHover)

// Run handler on any nodes in the entire document
// which match the selector
$(document).on('#menu option', 'hover', onHover)
```

---

class: med-large, shrink-top

# Document Ready Event

After a browser parses an HTML document, it must do work to lay out elements on the page. There's a delay (only a few milliseconds) between content first _appearing_ and the DOM _actually_ being ready. If your JavaScript tries to manipulate the page before it's ready, it won't work!

Your best bet, again, is to use jQuery to hook into the document's ready state event:

```js
$(document).ready(function () {
  // Do stuff
})

// Equivalent, preferred syntax
$(function () {
  // Do stuff
})
```

---

class: large

# Up Next

- Homework 4 - Pokémon Map Builder
  - HTML/CSS, DOM, jQuery, and events
  - One of the most fun homeworks, but start early 🤠
