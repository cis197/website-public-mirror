---
number: 2
path: '/lectures/2-callbacks-events-async'
date: '2019-01-29'
title: 'Callbacks, Events, and Asynchronous Programming'
hidden: false
---

class: center, middle, block-text

# Lecture 2

## Callbacks, Events, and Asynchronous Programming

---

class: medium

## `console.log('pre lecture logistics')`

- `<plug>`Penn Labs`</plug>`
- Office Hours finalized, updating soon
- Waitlist is wild, still resolving
- Poll for homework/submission issues?

---

class: medium

#[WAT](https://www.destroyallsoftware.com/talks/wat)

---

class: med-large

#Agenda

- How JS processes functions that take a long time
- Understanding callbacks & "callback hell"
- How we can use the `async` library to avoid that
- Diving into promises
- If there is time: async/await

---

class: med-large

## I've hear about these callback things?

```javascript
// Usage: callbackFn takes `user` as first argument
function getUserFromDatabase(userId, callbackFn) {
  // some code that takes a while
  // gets user from database
  callbackFn(user)
}
```

---

class: med-large

## But how do we use it?

```javascript
var userId = 1234
var cb = function (user) {
  user.pets.push('Doggo')
}
getUserFromDatabase(userId, cb)
```

---

class: med-large

## OR

```javascript
var userId = 1234
getUserFromDatabase(userId, function (user) {
  user.pets.push('Doggo')
})
```

---

class: med-large

## I've hear about these callback things?

```javascript
function asyncfunction (param1, param2, ..., callbackFn) {
  // some code that takes a while does stuff
  // and produces a result
  callbackFn(result)
}
```

---

class: med-large

## So what's async about this?

```javascript
var userId = 1234
getUserFromDatabase(userId, function (user) {
  user.pets.push('Doggo')
})
var user2Id = 5678
```

What exactly is happening _in your app_ while `getUserFromDatabase` is running?

---

class: med-large

# In most languages...nothing

- Java, Python, etc. by default wait for every line to finish executing before going onto the next one
  - Blocking architecture.
  - What are some disadvantages to that?
  - How do people get around that? And what are the issues around doing those methods to get around blocking constraints?
- As you can probably guess (based on previous trends), JavaScript likes to be the odd one out
  - Nonblocking

---

class: med-large

Question:

## We return

```javascript
var userId = 1234
getUserFromDatabase(userId, function (user) {
  user.pets.push('Doggo')
})
var user2Id = 5678
```

---

class: center, middle, block-text

**`Me:`** JavaScript...what are you?

**`JavaScript:`** I'm a single-threaded non-blocking asynchronous concurrent language

**`Me:`** <iframe src="https://giphy.com/embed/4pMX5rJ4PYAEM" width="300" height="200" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/homer-simpson-the-simpsons-bush-4pMX5rJ4PYAEM">via GIPHY</a></p>

**`JavaScript:`** I have a call stack, an event loop, a callback queue, and some other APIs and stuff

**`Me:`** Ah...when are your office hours?

---

class: med-large

# What is asynchronous programming?

So far, most (if not all) of the programs you've written are _synchronous programs_. You write code, and each line is executed one after another.

However, this isn't a good model for situations where you need to wait for something to happen, or when you want two things to happen at once. In that case, you need _asynchronous programming_. This is surprisingly common:

- User clicking on a button
- Making an HTTP request to a website
- Fetching data from a database

---

class: large

# JavaScript is built for async

Thanks to its functional nature, JavaScript makes asynchronous programming pretty easy. We can bind functions to asynchronous calls, then handle the data we get back.

The simplest unit of async control flow is a **callback**. We'll get to that later, but a brief bit about the JS environment

---

class: medium

### Call Stack, Web APIs, Callback Queue, and what exactly is Synchronous and Asynchronous

- Synchronous Example:

```javascript
var sync = function () {
  console.log('first')
  console.log('second')
}
sync() // -> what does this output?
```

- Asynchronous Example:

```javascript
var async = function () {
  console.log('first')
  setTimeout(function () {
    console.log('i was running late')
  }, 5000)
  console.log('second')
}
async() // -> how about now?
```

---

class: med-large

## Let's talk call stacks

- [Demo](http://latentflip.com/loupe/?code=dmFyIGEgPSBmdW5jdGlvbigpIHsKICBjb25zb2xlLmxvZygnZmlyc3QnKTsKICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyAKICAgIGNvbnNvbGUubG9nKCdpIHdhcyBydW5uaW5nIGxhdGUnKTsKICB9LCA1MDAwKTsKICBjb25zb2xlLmxvZygnc2Vjb25kJyk7Cn07CmEoKTs%3D!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)
- Anytime a JS function is called, it is added to the callstack. That call stack will process functions until there are none left.
- If that function being processed is a WebAPI or C++ API function (e.g. setTimeout, AJAX requests, etc), that function is called off the call stack, handled by the web API and inserted into a task queue.
- There is a constantly running event loop that checks to see if the call stack is empty.
  - If it is, it will remove elements from the task queue (FIFO style)

---

class: med-large

# What'll happen here?

```javascript
setTimeout(function () {
  console.log('woah')
}, 1000)

var x = 1
while (x < 10000000000) {
  x = x + 1
}
```

---

class: med-large

# What is a callback?

A callback is a function that's bound to a single asynchronous call. It is passed as an argument to another function, with the expectation that it will be executed once some async task is finished.

Here's a very simple example using the built-in `setTimeout` function. It runs its callback after waiting a specified amount of time.

```js
var cb = function () {
  console.log('callback ran!')
}

// wait 500ms, then run the callback
setTimeout(cb, 500)
// --> 'callback ran!'
```

---

class: med-large

# Node-Style Callbacks

- Since so many operations rely on callbacks, a standard callback style has emerged in NodeJS:

```js
var cb = function (err, results...) {...}
```

- `err` contains an error, if one occurred; otherwise it should be `null`
- After `err`, there can be any number of results arguments containing data for the callback to consume.
- This standardization makes it possible to transform callbacks into more expressive formats.<!-- , such as [complex async operations](https://github.com/caolan/async), [Promises](http://mattgreer.org/articles/promises-in-wicked-detail/), or [Highland.js](http://highlandjs.org/) streams. -->

---

class: med-large

## The Async Library: Motivations

Let's say I have several asynchronous functions that need to execute in series (i.e., one after the other). This would be necessary if, say, I'm writing logs to a file and I want them in order.

We _could_ do it by chaining callbacks, but this quickly gets messy:

```js
writeLogLine('This is the first line', function () {
  writeLogLine('This is the second line', function () {
    writeLogLine('This is the third line', function () {
      console.log('Done writing the logs.')
    })
  })
})
```

And I'm not even handling errors here. That would make this even messier.

---

class: med-large

# The Async Solution

We can do better than this by taking advantage of the standard callback format. Rather than those 'marching callbacks', we'll pass an array of functions into `async.series`.

```js
async.series(
  [
    function (callback) {
      writeLogLine('This is the first line', callback)
    },
    function (callback) {
      writeLogLine('This is the second line', callback)
    },
    function (callback) {
      writeLogLine('This is the third line', callback)
    },
  ],
  function () {
    console.log('Done writing the logs')
  }
)
```

A higher-order function that generates callbacks could save us some work here - do you see how?

---

class: med-large, shrink-top

## Wait, how does that work?

The idea behind `async.series` is actually quite simple. The trick is to call the asynchronous functions _recursively_. Here's a simple implementation that doesn't handle errors:

```js
var series = function (arr, finalCB) {
  var seriesHelper = function (index) {
    if (index === arr.length) {
      finalCB(null)
    } else {
      arr[index](function () {
        seriesHelper(index + 1)
      })
    }
  }
  seriesHelper(0)
}
```

---

class: med-large

## Exercise/Live Code Demo

Create a `asyncMap` function that accepts two parameters -- an array of async functions and a callback function. After all the callbacks are done, `asyncMap` should invoke the callback on the collection of results.

---

class: med-large

## Expected Behavior:

```javascript
var job1 = function (cb) {
  setTimeout(function () {
    cb('first')
  }, 900)
}

var job2 = function (cb) {
  setTimeout(function () {
    cb('second')
  }, 100)
}

var job3 = function (cb) {
  setTimeout(function () {
    cb('third')
  }, 300)
}

var jobs = [job1, job2, job3]
var callback = function (results) {
  console.log(results)
}

asyncMap(jobs, callback) //-> first, second, third
```

---

class: med-large

# Promises

Promises, built into all modern JS environments, solve the issues with callbacks. A promise can be thought of as a future value, and as such can be in one of three states: pending, fulfilled, or rejected. Promises are pending once first created, and, once they are either fulfilled or rejected, cannot be further changed. They take a function, that in turn is passed two functions, commonly named resolve and reject. You use these to set the state of the promise.

```js
var myPromise = new Promise(function (resolve, reject) {
  setTimeout(resolve, 3000)
})
```

This creates a promise that becomes fulfilled after three seconds.

---

class: med

# Anatomy of a Promise

You can instantiate a promise by calling `new Promise()`. The functions `resolve` and `reject` are used to determine whether to continue to the next `.then()` or the next `.catch()`

```js
new Promise(function (resolve, reject) {
  setTimeout(resolve, 3000)
})
  .then(function () {
    /* triggered if resolve was called */
    console.log('timer completed')
  })
  .catch(function () {
    /* triggered if reject was called */
    console.log('error caught')
  })
```

Note: Bluebird is a powerful promise library that offers additional features, similar to what the async library does for callbacks.

---

class: med-large

# Composing Promises

Promises are easy to compose. Let's say you wanted to run tasks doA and doB and the same time, and then run C when they are both done. Assuming the functions doA and doB both return promises:

```js
Promise.all([doA(), doB()])
  .then(function () {
    doC()
  })
  .catch(function () {
    console.log('error caught')
  })
```

The above code with callbacks is much more complex!

---

class: x-large

# Next time

1. Object-Oriented JavaScript
2. Implement Promises from scratch
3. ES6 + ES2017
