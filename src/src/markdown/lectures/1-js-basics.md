---
number: 1
path: '/lectures/1-js-basics'
date: '2020-01-15'
title: 'JavaScript Basics and Syntax'
hidden: false
---

class: center, middle, block-text

# Lecture 1

## JavaScript Basics and Syntax

---

class: large

# Literals

1. Numbers:`1, 2, 3, 1.28e4, NaN, Infinity`
2. Strings: `'xyz', 'foo \n', '\u2603'`
3. Boolean: `true, false`
4. Array: `[1, 2, 'ham', 'spam']`
5. Objects: `{ course: 'CIS 197', title: 'JavaScript' }`
6. Functions:

```javascript
var square = function (x) {
  return x * x
}
```

---

class: large

#Operators

1. Arithmetic:`+, -, *, /, %`
2. Comparison: `<, <=, >, >=, ==, ===, !=, !==`
3. Logical: `&&, ||, !`
4. Concatenation: `+`
5. Bitwise: `&, |, ~` (just fyi)

---

class: med-large

# Exercise #1: typeof

As the name would imply, the `typeof` function returns the type of the variable passed into it.

In your REPL, run the `typeof` function on `1`, `'string'`, `{ 'thisIs': 'anObject' }`, `[1,2,3]`

Example function call syntax for typeof

```javascript
typeof(1)
typeof('string')
...
```

### What do you get for the "array"?

---

class: med-large

#Gotcha

Arrays are technically objects. Keep this in mind for this homework and future ones as well. We can test for arrays explicitly using `Array.isArray(passInTheArrayHere)`.

We will get into this more formally during object oriented JS. But know that there is an `Array` constructor that `[1,2,...]` syntax is hiding with syntactic sugar.

---

class: med-large

# Numbers

- Stored internally as a 64-bit value (like Java's `double` type)
- `NaN` represents a non-number result
  - For example, `Number('xyz')` returns `NaN`
  - _CANNOT_ be compared using equality operators &ndash; <br>
    only `Number.isNaN()` may be used
- `Infinity` represents all numbers larger than `Number.MAX_VALUE`

---

class: med-large

# Strings

- Strings can be written with single quotes or double quotes. **Use single quotes** - it's bad style to mix them.
  - _Exception_: Strings like `"I don't like double quotes"` that have single quotes inside them
- Escape characters use backslash, like Java: `'\n \t \\'`
- Strings are _immutable_ - once created, you can't change them
  - Concatenating them with the `+` operator returns a new string
- No `char` type - just use strings of length 1
- Many useful methods/properties &ndash; `.length, substring(), toLowerCase(), toUpperCase()` ...
  - See the full list in the [MDN string documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

class: med-large

# Booleans

- `true` and `false`
- Standard logical operators (`&&, ||, !`)
  - Also bitwise operators (`&, |, ~`) - _don't use these!_ (well...you can if you know what you're doing)

---

class: med-large

# Quick Aside

JavaScript is weakly typed - you can use ANY value with a logical operator (fun...right?)

- _Falsy_ values: `false, null, undefined, 0, NaN, ''`
- Any other value is _truthy_ (including `'false', [], {}`)

---

class: small

# Equality and Coercion

- `==` vs `===`
- Rule of thumb, use `===`
- Why?
  - `==` is _abstract equality comparison_
    - Will try and coerce both sides to the same type and make a comparison
  - `===` is the _strict equality comparison_
    - Won't attempt to coerce both sides to do a comparison. Just compares as is

```javascript
console.log(3 == '3') // true
console.log(3 === '3') // false
```

- _But_ when talking about objects both `==` and `===` will return `false` unless both sides refer to the exact same object.

---

class: med-large

# Arrays

- Literal notation uses square brackets: `['foo', 'bar', baz']`
- Can be heterogenous: `['foo', 1, true]` is valid
  - Contrast with Java, where elements must have the same type
- Elements accessed with square bracket notation: `arr[0]`
- Because arrays are instances of objects, they are passed referentially to functions!
- Convenience methods like `push(), pop(), slice(), shift(), unshift()`
  - See the full list in the [MDN Array documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

---

class: med-large

## Objects

- Lightweight, mutable key-value stores
- Literal notation uses curly braces: `{foo: 'bar', 'baz': 2}`
- Property names can be strings: `{'foo': 'bar'}`
- Access with `obj.propertyName` **or** `obj['propertyName']`

```javascript
var obj = {
  someProperty: 'abcdef',
  nestedObject: { a: 1, b: 2, c: 3 },
  func: function () {
    return 0
  },
}

obj.someProperty // --> 'abcdef'
obj['nestedObject'].a // --> 1
```

---

class: med-large

# Functions

- First-class JS object (this allows JavaScript to take advantage of functional programming techniques)
- Functions can return a value with the `return` keyword
  - If no value is returned, then the function returns `undefined`

```javascript
var square = function (x) {
  return x * x
}
```

---

class: med-large

# Defining Functions

```javascript
function Name(params) {
  // function body with optional return
}
```

- Excluding the name makes a function anonymous.

```javascript
var anonymous = function (x) {
  return x + x
}
```

- If you name the function, it gives you more informational stack traces in the event of errors.

```javascript
var dblFunc = function Double(x) {
  return x + x
}
```

---

class: large

# Functions vs Calls

Don't get confused about the difference between a function call and the function itself! Remember, the call will always end with some parentheses.

```javascript
var square = function (x) {
  return x * x
}

console.log(square) // function
console.log(square(2)) // function call
```

---

class: large

# Loops

For loop

```js
for (var i = 0; i < Infinity; i++) {
  console.log('nihar is cool af')
}
```

While loop

```js
var niharIsCool = true
while (niharIsCool) {
  console.log('nihar is cool af')
}
```

---

class: med-large

# Hoisting

1. Before JavaScript executes a function, it looks for all `var` declarations within the current scope.
2. It then _declares_ all those variables but doesn't assign them (effectively executing the statement `var foo` at the top of the function).
3. Only then does the function block get executed. Assignment of a variable occurs when the function execution reaches the line where you actually assign a variable.

---

class: med-large

# Fun with Hoisting

```javascript
var foo = 100

var show = function () {
  console.log(foo)

  if (true) {
    var foo = 123
  }
}

show()
```

Declaring `var foo` causes `foo` to be shadowed for the `console.log()` statement &ndash; even though this is clearly not the intention!

---

class: med-large

# Behind the scenes

```javascript
var foo // hoist foo to top, undefined as of now
var foo = 100 // we define foo...in this scope

var show = function () {
  var foo // hoist foo *IN THIS SCOPE* to the top
  console.log(foo) // --> undefined

  if (true) {
    var foo = 123 // now we define it...
  }
}

show()
```

---

class: med-large

# Fixed Version

```javascript
var foo = 100

var show = function () {
  console.log(foo) // --> "100"

  if (true) {
    foo = 123
  }
}

show()
```

---

class: med-large

# Fixed behind the scenes

```javascript
// same as before
var foo = 100

var show = function () {
  // ah now we don't have any new var declarations
  // so we'll just default to parent scopes
  console.log(foo) // --> "100" (from parent)

  if (true) {
    foo = 123
  }
}

show()
```

---

class: small

# Exercise \#2

Do you know what value will be alerted if the following is executed as a JavaScript program?

```javascript
var foo = 1
function bar() {
  if (!foo) {
    var foo = 10
  }

  alert(foo)
}

bar()
```

---

That previous one outputs 10. How about this one?

```javascript
var a = 1
function b() {
  a = 10
  return
  function a() {}
}
b()
alert(a)
```

Try it out for yourself. An important thing to note here is that functions that are defined in the syntax form `function a() {}` are hoisted _in their entirety_ to the top of that scope.

Here `function a() {}` within `b()` is hoisted to the top, so the `a=10` assignment is just redefining the function `a` within `b` but not the `var a` in the parent scope

---

class: large

# Closures

Variables stay in scope when you create a nested function. For example, the variable `x` below is still available in the function `y`.

```js
var someFun = function () {
  var x = 123
  var y = function () {
    console.log(x)
  }
  y()
}
someFun() // --> 123
```

---

class: med-large

# Closures, continued

Closures are very useful for creating private state - variables that are not acccessible by any outside code. For instance, here's how we'd use a closure to write a counting function:

```js
var createCounter = function () {
  var count = 0
  return function () {
    count++
    return count
  }
}

var counter = createCounter()
counter() // --> 1
counter() // --> 2
```

---

class: center, middle, block-text

# Objects and `this`

---

class: med-large

# Everything is an Object

- Aside from the primitive types (String, boolean, and Number) - everything in JS is a kind of object
  - Even primitives can behave like objects (Strings, for example, have properties/methods)
- Array is an object with integer keys and specific methods (e.g. `splice(), indexOf()`)
- Functions are also object-like, and can have properties and methods
  - Can be thought of as _executable objects_

---

class: large

# The Global Object

- The highest-level parent entity
- If a function isn't assigned to an object, then its `this` context will be the _global object_ (`window` in a browser, `global` in Node).
- If a variable isn't declared within a function, it is assigned to the _global object_

---

class: med-large

## Scoping - or, Always Use Var

- Declaring a variable without `var` assigns it to the **global object** - `window` in the browser, `global` in Node
  - Declaring a variable **with** `var`, at the top level, also assigns to the global object...
- This is generally not what you want, and can cause issues.

```javascript
i = 4

// later, in another file
for (i = 0; i < 10; i++) {
  // 'i' unintentionally overridden!
}
```

---

class: med-large

# Using `this`

- If a function is a property on an object, then we can access the parent object from within that function using `this`. Simple!

```js
var obj = {
  prop: 'I am a property.',
  printProp: function () {
    console.log(this.prop)
  },
}

obj.printProp() // --> 'I am a property.'
```

---

class: large

Since functions are objects, you might be wondering what happens if we reference `this` inside a function object itself.

```js
var func = function () {
  return this
}

console.log(func())
// [LOTS OF TEXT]
```

So what does `func()` actually return?

---

class: med-large

## Diagnosing Global Object Errors

```js
var numberPrinter = {
  num: 3,
  print2xNum: function () {
    var doubleThisNum = function () {
      return 2 * this.num
    }
    console.log(doubleThisNum())
  },
}

numberPrinter.print2xNum() // --> NaN
```

We wanted `2 * 3` -- what's going on here?

---

class: med-large

## Solution

```js
var numberPrinter = {
  num: 3,
  print2xNum: function () {
    var printer = this // new
    var doubleThisNum = function () {
      return 2 * printer.num
    }
    console.log(doubleThisNum())
  },
}

numberPrinter.print2xNum() // --> 6
```

---

class: large

Often, you'll see `var self = this` - which can be hard to read when it's overused. It's better to name the variable something that reflects its type (like `printer` in the previous example).

---

# Even better solution

Use the built-in `Function.bind()` to manually assign the internal function the correct `this` context!

```js
var numberPrinter = {
  num: 3,
  print2xNum: function () {
    var doubleThisNum = function () {
      return 2 * this.num
    }.bind(this) // new
    console.log(doubleThisNum())
  },
}

numberPrinter.print2xNum() // --> 6
```

---

# JavaScript Modules

`file1.js`

```js
var x = 12
// module.exports is what can be imported from this file elsewhere
module.exports = x
```

`file2.js`

```js
var file1var = require('./file1') // --> no '.js'
console.log(file1var) // --> 12
```

<!--

class: center, middle, block-text

# NPM (Node Package Manager)

# ---

class: med-large

# Node Modules

* In Node, dependencies are represented as [*modules*](http://
.org/api/modules.html#modules_module_require_id)
* Each file gets a `module` object representing the current module (duh)
  - Properties: `module.exports, module.require(), module.id, module.filename, module.loaded, module.parent, module.children`

```js
// myModule.js
var foo = [1, 2, 3, 4];

module.exports = foo;
// or, equivalently
exports = foo;
```

# ---

class: med-large

# Node Packages

* Each NPM package is a folder representing a Node module
  - Hence the directory name: `node_modules`
* Each module has a `package.json` file with meta-information about the package
  - Including the main file to load with `require()`
* Packages are installed with `npm install package-name`
  - `npm install` installs dependencies from `package.json`
  - `npm install -g` installs a *global package*
  - `npm install --save` writes the package into the local `package.json` as a dependency

# ---

class: med-large

# Load Order
`require('X')` from module at path Y.

1. If X is a core module, then return X.
2. If X begins with './', '/', or '../'
  1. If X is a file, then load Y + X as a file.
      * "X.json" → object
      * "X.node" → binary add-ons
      * "X.js" or "X" → JavaScript file
  2. If X is a directory, then load Y + X as a directory.
      * If "X/package.json" exists and has a "main" field,
        then load that file.
      * Else try to load "X/index.js", "X/index.json",
        and "X/index.node" (in that order).
3. Try loading X using LOAD_NODE_MODULES.
4. Throw a "Not Found" error.

# ---

class: med-large

# Loading Order, Part II

Again, `require('X')` from path Y.

```text
function LOAD_NODE_MODULES:
1. let PARTS = split_directory_path(Y)
2. let IDX = PARTS.length - 1
3. while IDX >= 0:
  1. if PARTS[IDX] == "node_modules" then continue
  2. let DIR = join_path(PARTS[0 ... IDX] + "node_modules")
      * Try loading "DIR/X" as a file
      * Try loading "DIR/X" as a directory
  3. let IDX = IDX - 1
```

**TAKEAWAY:** Node will attempt to load up the directory chain if it doesn't find a module locally. It will bubble all the way up to your global NPM folder (`~/node_modules`) &mdash; which can cause unexpected behavior.

# ---

class: center, middle, block-text

# WTF JavaScript

# ---
-->

---

class: center, middle

#[WAT](https://www.destroyallsoftware.com/talks/wat)

---

class: med-large

# We should talk about that...

But maybe we won't have enough time:

https://gist.github.com/abhisuri97/da6b6a7d584d192dfd65456fcf92e8a6

---

class: center, middle

# Extended Memery

<iframe width="760" height="410" src="//www.youtube.com/embed/et8xNAc2ic8" frameborder="0" allowfullscreen></iframe>

---

class: x-large

# Next time:

Callbacks and asynchronous programming
