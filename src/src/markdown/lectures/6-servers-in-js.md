---
number: 6
path: '/lectures/6-servers-in-js'
date: '2020-02-13'
title: 'Servers in JavaScript'
hidden: false
---

class: center, middle, block-text

# Lecture 6

## Servers in JavaScript

---

class: x-large

# Agenda

1. HTTP

- HTTP Verbs
- REST APIs

2. Express

- Basics
- Middleware
- Router
- Request
- Response

---

class: center, middle, block-text

# HTTP

---

class: large

# HTTP Basics

- HTTP is a client-server protocol for _hypertext_
  - This is the "HT" in "HTML" too
- The **client** (web browser, phone app, or computer) sends a **request** for a page over the Internet to a specific address
- The **server** corresponding to that address receives the request, computes a **response**, and delivers it to the client
- The conversation can be encrypted (HTTPS, aka SSL aka TLS), and there's a lot going on behind the scenes (TCP/IP, DNS translation), but it's always a request and response

---

class: large

# HTTP Verbs

An HTTP request has a lot of associated information, but at the most basic level, there is always a **verb** associated with the request.

Here are the most common ones (we'll only use these on the homeworks):

1. `GET`
2. `POST`
3. `PUT`
4. `DELETE`

---

class: x-large

# HTTP GET

**`GET`** is used when requesting information from a server. It should never change a server's application state\*.

Example: Typing a URL into your browser sends a GET request that returns the webpage.

---

class: x-large

# HTTP POST

**`POST`** is used to request the creation of a new object on the server.

Example: When you create a new status on Facebook, that would be a POST request.

---

class: x-large

# HTTP PUT

**`PUT`** is used to request the replacement of an existing object on the server with new data.

Example: If you go back and change the content of an existing Facebook status, then that would be a PUT request.

---

class: x-large

# HTTP DELETE

**`DELETE`** is used to request that an existing object on the server be removed completely.

Example: If you delete your Facebook status, then that would be a DELETE request.

---

class: med-large

# Sending Data

- The verb is only one part of an HTTP request. There are also _headers_, a _querystring_, and a _body_.
  - **Headers** are used to send meta-data about the request
    - Common examples: security tokens, cookies, browser info
  - The **body** contains information that the server needs to process the request.
    - Common example: file upload, JSON object
    - Used to pass data with **POST**, **PUT**, **DELETE** verbs
  - A **querystring** is a bunch of key-value pairs after a URL - e.g. `http://google.com/search?q=cats&key=1234`
    - The key-value pairs are `{q: 'cats', key: '1234'}`
    - Used to pass data with **GET** verb

---

class: large

# REST APIs

- **REST** = <strong>RE</strong>presentational <strong>S</strong>ate <strong>T</strong>ansfer
- Server exposes HTTP _endpoints_ which clients can use to communicate with it
- Cacheable, layered, uniform interface
- **Stateless** - server keeps no information after request is completed
  - Instead, the body or querystring is used to pass information
- REST is widely used because it is simple and scalable

---

class: large

# REST in jQuery (AJAX)

Super simple syntax:

```js
var request = $.ajax({
  url: 'path/to/resource',
  type: 'POST',
  data: { id: someId }, // sent as *query string*
  success: onSuccessFunction,
  error: onErrorFunction,
})
```

---

class: center, middle, block-text

# Express

---

class: large

# Express...

- ...is a package - must install via `npm`
- ...handles **URL routing**, **requests** and **responses**
- ...is oriented around **middlewares** and **handler functions**
- ...provides minimal building blocks which you arrange to make a complex application

---

class: large

# Hello World with Express

At its simplest, an Express server can fit on one slide:

```js
var express = require('express')

var app = express()
var port = process.env.PORT || 3000

app.get('/', function (req, res) {
  return res.send('hello world!')
})

// Start listening for requests
app.listen(port, function () {
  console.log('Listening on port ' + port)
})
```

---

class: large

## Anatomy of an Express App

![Express diagram](https://s3.amazonaws.com/riploventures/express-diagram.png)

---

class: center, middle, block-text

# Middleware

---

class: med, smaller-code

## Middleware

- A **middleware function** is a function that handles a request. They are _chained together_ so that multiple middlewares run on the same request.

```js
var noOpMiddleware = function (req, res, next) {
  next()
}
```

- Middleware parameters:
  - `req` - an object representing the request.
  - `res` - an object representing the response. Has several methods <br>(`.render`, `.send`, `.json`) to send data and complete the request.
  - `next` - a callback (!) that passes control to the next middleware.
- You can modify the `req` and `res` object directly - they are the actual objects that will be passed to other middlewares.

---

class: med-large

## Adding Middleware in Express

Adding middleware to an Express app is just a matter of calling `app.use()`.

Note that the middlewares will run **in the order you add them.**

```js
app.use(function (req, res, next) {
  console.log('I am a middleware!')
  next()
})
```

You can also specify middleware for a specific endpoint:

```js
app.use('/special', function (req, res, next) {
  console.log('I only run on /special')
  next()
})
```

---

class: large

## Adding Middleware, Continued

You can register multiple middleware functions in one single call:

```js
var setFoo = function (req, res, next) {
  req.foo = 'some value'
  next()
}

var logFoo = function (req, res, next) {
  console.log(req.foo)
  next()
}

app.use(setFoo, logFoo)
```

---

class: large

# Commonly Used Middlewares

- [body-parser](https://github.com/expressjs/body-parser) - provides middleware for parsing JSON text, URL encoding, and more into a nice `req.body`
- [cookie-parser](https://github.com/expressjs/cookie-parser) - provides middleware to parse the `Cookie` header. Also supports signed cookies with a key of your choice.
- [morgan](https://github.com/expressjs/morgan) - log all incoming HTTP requests
- [csurf](https://github.com/expressjs/csurf) - used to prevent cross-site request forgery
- [express.static](http://expressjs.com/guide/using-middleware.html#middleware.built-in) - serve a directory as static content

---

class: large

# Handling Errors with Middleware

Sometimes errors happen. When they do, you can pass in an error argument to the `next()` callback to pass it off to your _error handling middleware_.

```js
var explode = function (req, res, next) {
  next(new Error('Something exploded!'))
}
```

---

class: med-large

## Handling Errors, Continued

An _error handling middleware_ takes the error it's handling as its first argument, along with the usual `req`, `res`, `next`. They should be registered **after** all the other middleware in your app.

The extra `err` argument is the ONLY difference between a regular middleware and an error-handling middleware, so be careful!

```js
var logError = function (err, req, res, next) {
  console.error(err.stack)
  next(err)
}

var sendErrorMsg = function (err, req, res, next) {
  res.status(500).send('There was an error!')
}

app.use(logError, sendErrorMsg)
```

---

class: center, middle, block-text

# Router

---

class: med-large

# The Express Router

From the docs:

> A router object is an isolated instance of middleware and routes. You can think of it as a "mini-application," capable only of performing middleware and routing functions. Every Express application has a built-in app router.
>
> A router behaves like middleware itself, so you can use it as an argument to app.use() or as the argument to another router's use() method.

Routers are used to **modularize your code** by defining subsections that only run on specific paths.

---

# Router Example

```js
var router = express.Router()

router.use(function (req, res, next) {
  console.log('I am running from a router!')
  next()
})

router.get('/', function (req, res, next) {
  res.send('Hello from the router!')
})

app.use('/router', router)
```

---

class: med-large

# Router Methods

We've already seen that routers can 1) use middleware, and 2) handle "get" requests. You can actually handle ANY HTTP verb just by calling `router.verb()`. Supported methods include:

- `router.use()`
- `router.get()`
- `router.post()`
- `router.put()`
- `router.patch()`
- `router.delete()`
- `router.route()` - This lets you chain other verbs (`.get`, `.post`) at the same URL. Handy for avoiding typos!

---

class: large

# Route Parameters

By putting a colon before a section of a route, you can create a _parametrized route_ (with the parameter values available on `req.params`). For example, if you have the route `/user/:id`, then it will match:

```
/user/1234   ->  req.params.id = '1234'
/user/ccabo  ->  req.params.id = 'ccabo'
/user/id     ->  req.params.id = 'id'
```

This is extremely useful for crafting a RESTful API, since these parameters will often correspond to objects in the database.

---

class: center, middle, block-text

# Requests

---

class: large

# Requests

The request object is passed in to every middleware function in order, so most of its properties are set by the middleware themselves. For instance:

- The `req.body` property is set by the [body-parser](https://github.com/expressjs/body-parser) middleware
- The `req.cookies` property is set by the [cookie-parser](https://github.com/expressjs/cookie-parser) middleware

---

class: med-large

# Default Request Fields

- We've already seen it, but `req.params` contains all the route parameters along with their values
  - Example: say we are listening for GET requests on `/groups/:id/:message`
  - GET `/groups/3/49` &rarr; req.params = `{id: '3', message: '49'}`
- `req.query` is similar to `req.params`, but it contains _query string_ values
  - Example: say we are listening for GET requests on `/queries`
  - GET `/queries?animal=ferret&name=tobi` &rarr; req.query = `{animal: 'ferret', name: 'tobi'}`

---

class: center,middle, block-text

# Responses

---

class: med-large

# Responses

Responses are a little bit more in-depth than requests, but still pretty easy. Let's start off with the basic methods first.

- `res.set()` - sets a header value. Useful for allowing your app to be used from any site.
  - `res.set('Access-Control-Allow-Origin', '*')`
- `res.status()` - set the HTTP status code to indicate an error.
  - `res.status(404)` for Not Found errors
- `res.send()` - send a string, object, or Array as data.
  - `res.send({error: 'Mocha exploded!'})`
- `res.redirect()` - redirect the user to another page.
  - `res.redirect('/login')` - redirect to login page

---

class: large

# Rendering

The response object can render _templates_ based on _local values_. For instance, if two different users request their profile pages, then you'd probably want to use the same template. However, you'd want their names and profile pictures to be different!

To do this, you'll need to know about three things:

- `res.locals`
- `res.render()`
- The Express "view engine"

---

class: large

# Local Variables

To specify the values for variables in your template, just modify `res.locals`. This can be done with some middleware:

```js
app.use(function (req, res, next) {
  res.locals.title = 'My Awesome Express App'
  next()
})
```

---

class: large

# Rendering

Once you've set up your local variables, call `res.render(template)`, and it'll render the template using the local values. You can also pass in more local variables at call time.

```js
app.get('/', function (req, res) {
  res.render('index', { greeting: 'hi' })
})
```

---

class: large

# View Engine

Express expects your templates to be in a `views` folder, but you can use any (or many) libraries to process those templates.

For instance, let's say we want to use [EJS](http://www.embeddedjs.com/) (Embedded JavaScript) to render our `.ejs` templates, and also as the default. But we also want to render `.jade` files with [Jade](http://jade-lang.com/). Here's how:

```js
app.engine('jade', require('jade').__express)
app.engine('ejs', require('ejs').renderFile)
app.set('view engine', 'ejs')
```

---

class: center, middle, block-text, x-large

# Cookies

![http://i.imgur.com/5Hr1rvD.gif?1](http://i.imgur.com/5Hr1rvD.gif?1)

---

class: large

# Session state

It's pretty common to want to keep information about a user's session between requests. For instance, we want to keep track of the fact that a user is logged in - otherwise they'd have to put in their password on every page.

But HTTP is _stateless_. The server gets a request and always uses the same code path (i.e. middleware chain) to evaluate it. So we need a way to keep track of a user's session securely in this stateless environment using _cookies_.

---

class: med-large

# Cookies

A cookie is nothing but a set of key-value pairs sent by the server along with the HTTP response. The browser then sends back the cookie, unmodified, with the next request to that server. So you can keep session state (e.g. a session ID) in the cookie, and then just read it again when the user sends it with the next request!

<div style="text-align: center">

![http://i.imgur.com/HO3k0N0.png](http://i.imgur.com/HO3k0N0.png)

</div>

---

class: large

# Signed Cookies

Of course, a cookie isn't much use if a malicious user could modify it with any values they want! So in practice, a _signed cookie_ is used to prevent tampering.

The key-value pairs of the cookie are augmented by one final KV pair: an hash of all other key-value pairs, plus a secret key. This hash is checked against the key-value pairs when the cookie is sent back. If tampering occurred, they won't match, and the request is rejected!

Conveniently, the [cookie-session](https://github.com/expressjs/cookie-session) middleware will do a lot of this for us! We'll use it on the homework.

---

class: x-large

# Example Code

Example code is available in [this repository](https://github.com/cis197-2015S/express-examples). Make sure to check the different branches!

---

class: x-large

# Coming Up

- Homework 5: "Campuswire Lite" - a web app built in Handlebars and Express
- Next week: back to the browser with ReactJS.
