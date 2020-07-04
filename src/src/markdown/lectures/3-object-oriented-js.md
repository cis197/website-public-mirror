---
number: 3
path: '/lectures/3-object-oriented-js'
date: '2019-01-29'
title: 'Object-Oriented JavaScript'
hidden: false
---

class: center, middle, block-text

# Lecture 3

## Object-Oriented JavaScript

---

class: med-large

### Waitlist update...

- Waitlist...it's still a thing. Keep on hangin' on.
- I'm inclined to just admit a bunch of people. Drop as necessary
- Today: Object Oriented JS, `this`, ES6, `Promises`
  - Excuse typos: I was up kinda late making this ~~lecuter~~ lecture
  - _Downs 4th cup of coffee_

---

class: large

# Why OOP?

Functional programming is powerful, but some concepts just make more sense if you think of them in object-oriented terms. They're both important tools in any programmer's toolkit.

- Besides like everything's an object in javascript right?

---

class: med-large

## Let's talk about `this`

```javascript
function foo() {
  console.log(this.a)
}

var a = 2

foo()
```

- What does this eval to?

---

class: med-large

## Exercise 1: What will this output?

```javascript
function foo() {
  console.log(this.a)
}

var obj = {
  a: 2,
  foo: foo,
}

var bar = obj.foo
var a = 'global'

bar()
```

---

class: med-large

## Exercise 2: What will _this_ output?

```javascript
function foo() {
  console.log(this.a)
}

function doFoo(fn) {
  fn()
}

var obj = {
  a: 2,
  foo: foo,
}

var a = 'global'

doFoo(obj.foo)
```

---

class: med-large

## What's the deal?

- What I am trying to get at is that there is a difference between scope and context
  - Scope deals with variables, Context deals with the object in which that function is invoked
- Execution context is _passed down through functions_

```javascript
function a() {
  function b() {
    function c() {
      console.log(this) // window object!
    }
    c()
  }
  b()
}
a()
```

---

class: med-large

## Call, Apply, and Bind

- In order to actually give an explicit context, you need to use one of these three functions.

```javascript
var person1 = { firstName: 'Jon', lastName: 'Kuperman' }
var person2 = { firstName: 'Kelly', lastName: 'King' }

function say(greeting) {
  console.log(greeting + ' ' + this.firstName + ' ' + this.lastName)
}

say.call(person1, 'Hello') // Hello Jon Kuperman
say.apply(person1, ['Hello']) // Hello Jon Kuperman
var sayHelloKelly = say.bind(person2)
sayHelloKelly() // Hello Kelly King
```

---

class: med-large

## Prototype Basics

Every object in JavaScript has an `__proto__` property known as its **prototype**. When JavaScript looks up a property on an object and doesn't find it, then it will try to look it up on the object's prototype instead.

If it's still not found, it will then look for the property on `__proto__.__proto__`, and so on and so forth until the prototype is `null` or `undefined`. This is known as 'looking up the prototype chain.'

What happens if the object _doesn't_ have the property in its prototype chain? Then it's `undefined` - as expected!

---

class: med-large

## Okay what do I mean by that?

- Let's look at an example:
  - Basically `prototype` and `__proto__` refer to the same thing.

```javascript
function Foo(name) {
  this.name = name
}

var b = new Foo('b')
var a = new Foo('a')

b.say = function () {
  console.log('Hi from ' + this.whoAmI())
}

console.log(a.__proto__ === Foo.prototype) // true
console.log(a.__proto__ === b.__proto__) // true
```

---

class: large

## Own vs Inherited Properties

- **Own Property** - Any property on an object that is on _that specific instance._
- **Inherited Property** - A property that is found on the _prototype_ of the object (or its prototype, and so on).

The `Object` method `hasOwnProperty()` tests whether an object has a given string as an "own property."

---

class: center, middle, block-text

# The `new` keyword

---

class: med-large

The `new` keyword is the last part of the prototypal inheritance equation - it sets up the prototype chain for inheritance. The following things happen when you execute `new Foo(...)`:

1. A new object is created, with its `__proto__` property set to `Foo.prototype`.
2. The constructor function `Foo` is called with the given arguments and `this` bound to the newly created object.
   - `new Foo` is equivalent to `new Foo()`, but it's bad style to leave out the parentheses.
3. The object returned by the constructor function becomes the result of the whole new expression. If the constructor function doesn't explicitly return an object, the object created in step 1 is used instead.

**This is simple, but a bit arbitrary. I've found it's best just to memorize it.**

From the [MDN documentation.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new#Specifications)

---

class: x-large

Note - the `__proto__` property should _never_ be modified in your code. Modify the appropriate constructor prototype instead.

---

class: med

## Example

```js
var Person = function Person(name) {
  this.name = name
}

Person.prototype.getGreeting = function () {
  return 'hello!'
}

var instructorsOf197 = new Person('Ian Devesh Abhi Nihar')
console.log(instructorsOf197, instructorsOf197.getGreeting())
// --> Person { name: 'Ian Devesh Abhi Nihar' } 'hello!'

console.log(instructorsOf197.toString())
// --> [object Object]
```

.med[Wait, did we ever define that `toString()` property? Nope - no need. The default prototype is an empty object, and `toString()` is defined there.]

---

class: med-large

## Inheriting & Sub-classes

Now that you know how the prototype chain works, it's pretty simple to see how Java-style inheritance is implemented. Let's implement a `Professor` class that extends `Person`:

```js
var Professor = function Professor(name) {
  this.name = name
}

Professor.prototype = new Person()
Professor.prototype.greet = function () {
  console.log("Hi, I'm Professor " + this.name)
}

var joe = new Professor('Joe Devietti')
console.log(joe instanceof Person) // --> true
```

---

class: med-large, shrink-top

## Why `new Person()`?

Here's what the prototype chain looks like in this setup:

```js
new Professor('Joe Devietti')
│
└── __proto__ (Professor.prototype)
   │
   └── new Person()
      │
      └── __proto__ (Person.prototype)
         │
         └── {}
             │
             └── null
```

The `new Person()` is there just for its `__proto__` property, allowing Joe to inherit the prototype methods of `Person`.

---

class: med-large, shrink-top

# Improving Inheritance

Creating a `new Person()` with no arguments isn't great. For instance, what if we throw an error for insufficient arguments? Luckily, there is a way around this in the ES5 standard.

```js
var Professor = function Professor(name) {
  this.name = name
}

Professor.prototype = Object.create(Person.prototype)
Professor.prototype.greet = function () {
  console.log("Hi, I'm Professor " + this.name)
}

var joe = new Professor('Joe Devietti')
console.log(joe instanceof Person) // --> true
```

---

class: med-large, shrink-top

# Improving Inheritance II

The body of the constructor didn't change between `Person` and `Professor`, so it would be nice if we didn't have to rewrite it. We can make use of `Function.call()` here:

```js
var Professor = function Professor(name) {
  Person.call(this, name)
}

Professor.prototype = Object.create(Person.prototype)
Professor.prototype.greet = function () {
  console.log("Hi, I'm Professor " + this.name)
}

var joe = new Professor('Joe Devietti')
console.log(joe instanceof Person) // --> true
```

---

class: large

# Why is this cool?

The prototype is just an object, so we can mix in different functionality however we want. This means, essentially, that a class can inherit from _multiple supertypes_. For instance, we could mix in `get` and `set` methods, or event listeners, without ever having to rewrite the code. This isn't possible with classical inheritance!

---

class: med

# ES6 Classes

ES6 introduces syntactic sugar for constructor functions and prototypes with the `class` keyword. To build a prototype chain between Cat and Animal, you can simply do:

```js
class Cat extends Animal {
  constructor(animalProperty, catProperty) {
    super(animalProperty)
    this.catProperty = catProperty
  }
}
```

`constructor()` is used to invoke code that runs when a cat is constructed. `super()` is used to invoke the parent constructor.

---

class: med

# ES6 Class Methods

We can also define class methods with es6 syntax.

```js
class Car {
  constructor() {
    /* */
  }
  drive() {
    console.log('Car is driving')
  }
  static isCar(possibleCar) {
    return possibleCar instanceof Car
  }
}
```

There are two ways to define methods. The `drive` function ends up on Car.prototype, so it is called directly off `Car` objects. The isCar method is defined as static, so it is called off the Car class itself, via `Car.isCar`.

---

class: med

# `let` and `const`

ES6 introduces new syntax for defining variables. The `let` keyword is like `var`, except let is block scoped while `var` is function scoped. This likely the behavior you are already used to from other programming languages. The `const` keyword is also block scoped, but variables declared with const cannot be reassigned after initialization.

```js
for (let i = 1; i < 4; i++) {
  console.log(i)
}
console.log(i) // Error
```

The above code would work if we used var instead.

---

class: med

# Arrow functions

Arrow functions are written with the `() => {}` syntax. The main difference is unlike normal functions, arrow functions cannot be named, and arrow functions use the `this` value in the outer context.

```js
class foo {
  constructor(name) {
    this.name = name
  }
  waitAndPrintName() {
    setTimeout(() => {
      console.log(this.name) // Uses the `this` value in `waitAndPrintName()`
    }, 2000)
  }
}
```

If we used normal `function` syntax, we'd need to use `.bind()` here

---

class: med-large

## Temporal Dead Zone (TDZ)

```js
function readThere() {
  return there
}
let there = 'dragons'
console.log(readThere())
```

```js
function readThere() {
  return there
}
console.log(readThere())
let there = 'dragons'
```

---

class: med

# Importing

ES6 allows you to import subsets of files with the `import` keyword.

```js
// Import all functions from React
import React from 'react'

// Only import the calcPrice function from Store
import { calcPrice } from 'Store'

// Import all functions as an object called 'utils'
import * as utils from './utilities'
```

Importing subsets of files makes file hotloading a lot more efficient.

---

# Object Accessors and `{ ...objectSpread }`

General idea is that prior to ES6, if you wanted to access a property of the object, you had to do

```js
var obj = { a: 'a', b: 'b' }
var a = obj.a
var a = obj.b
console.log(a, b)
```

In ES6 you can do

```js
var obj = {
  /* same as before */
}

var { a, b } = obj
console.log(a, b)
```

---

How about adding a new element into our object?

```js
obj.c = 'c' // Old
obj = { ...obj, c: 'c' } // New

var newObj = Object.assign({}, obj)
var newObjES6 = { ...obj }
```

---

## Promises

Intuitive-ish way of reasoning about syntax

- Keywords: fulfilled, rejected, pending, settled

```js
var promise = new Promise(function (resolve, reject) {
  // Do a thing, possibly async, then…

  if (/* Everything OK */) {
    resolve('Stuff worked!')
  } else {
    reject(Error('It broke'))
  }
})

promise.then(function (result) {
  console.log(result) // 'Stuff worked!'
}, function (err) {
  console.log(err)    // Error: 'It broke'
})
```

---

## Promises in Action

Grab GitHub info

```js
fetch('https://api.github.com/users/abhisuri97/repos')
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((err) => console.log('err'))
```

---

## How about a bunch of promises we want to execute at once?

```js
var users = ['abhisuri97', 'ccabo1']

users = users.map((i) => {
  return fetch(`https://api.github.com/users/${i}/repos`).then((res) =>
    res.json()
  )
})

Promise.all(users).then(console.log)
```

---

## Async/Await

- Before:

```javascript
const makeRequest = () => {
  getJSON().then((data) => {
    console.log(data)
    return 'done'
  })
}
makeRequest()
```

- After

```js
const makeRequest = async () => {
  console.log(await getJSON())
  return 'done'
}
makeRequest()
```

---

class: x-large

# Next Time

1. HTML/CSS review
2. Bootstrap and reactive frameworks
