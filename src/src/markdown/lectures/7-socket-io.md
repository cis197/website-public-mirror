---
number: 7
path: '/lectures/7-socket-io'
date: '2019-02-13'
title: 'Real Time Web Applications'
hidden: false
---

class: center, middle, block-text

# Lecture 7

## Real Time Web Applications

---

class: x-large

# Agenda

1. Servers in JavaScript
2. WebSocket Protocol
3. Socket.io

---

class: med-large

# What is a Server?

A server is any application that listens for incoming information _requests_ from clients over a network and returns an appropriate _response_. Servers and clients always communicate via network protocols, the most common of which is HTTP (<strong>H</strong>yper <strong>T</strong>ext <strong>T</strong>ransfer <strong>P</strong>rotocol).

Whenever you access a page on the internet, you're actually making an HTTP request to the server that hosts the page, which returns the document HTML as a response to you.

---

class: med-large

# WebSockets

While HTTP 1.1 is the backbone of the modern internet, there is another very interesting network protocol called WebSockets, which consists of bi-directional, long-lived and lightweight client-server communication channels. WebSockets make it very easy (and efficient!) for servers to push back information to clients without the need of a request to respond to.

What this means is that clients can be updated with new information whenever the server receives it, creating the core foundation for advanced real time network frameworks. Social media chat applications, multiplayer browser games and collaborative applications like Google Docs/Sheets all use WebSockets under the hood to power anything that happens in real time!

---

class: med-large

<img src="https://s3.amazonaws.com/riploventures/websockets.png" style="width:100%" alt="WebSockets Diagram"/>

---

class: med-large

# Servers in JavaScript

Traditionally, servers were written in languages like Java or PHP. However, NodeJS, built using Chrome's V8 engine, allows us to write high performance and scalable servers in pure JavaScript! This means we can write server and client side code all in the same language, in a beautifully unified full stack manner.

JavaScript used to be a language limited to in-browser execution, but full stack JavaScript developers today can write every part of a full web application entirely with existing JS knowledge.

---

class: med

# The Power of Open Source

Luckily\* for JavaScript developers around the world, majority of the heavy lifting for pretty much everything exists as an [NPM](https://www.npmjs.com) package which can be downloaded and used for free! For instance, [Express](https://www.npmjs.com/package/express) (downloaded nearly 10 million times each month) provides a minimalistic HTTP web framework that can create a full web server in less than 50 lines of code.

When it comes to WebSockets there is little that beats [Socket.io](http://socket.io), which wraps real time communication into an _event driven_ engine for both clients and servers.

<hr />

\* _Blind reliance on open source can be dangerous!_ Read about [left-pad](https://www.theregister.co.uk/2016/03/23/npm_left_pad_chaos/) and my [favorite article](https://medium.com/friendship-dot-js/i-peeked-into-my-node-modules-directory-and-you-wont-believe-what-happened-next-b89f63d21558#.6xp3r6j4p) of all time.

---

class: center, middle, block-text

# Socket.io

---

class: med-large

# Socket.io

From their [official homepage](http://socket.io):

Socket.IO enables real-time bidirectional event-based communication.
It works on every platform, browser or device, focusing equally on reliability and speed. It's used by everyone, from Microsoft Office, Yammer, Zendesk, Trello... to hackathon winners and little startups.

---

class: med

# Barebones HTTP Server

Socket.io servers are built on top of HTTP servers since the intial handshake is made over HTTP. The `http` module (built into Node), lets you create very barebones server infrastructure with just 4 lines:

```javascript
var http = require('http')

var requestListener = function (request, response) {
  response.writeHead(200) // HTTP status code
  response.end('Hello, World!\n') // response body
}

var httpServer = http.createServer(requestListener)

// starts up the server at http://localhost:8080/
httpServer.listen(8080, function () {
  console.log('HTTP server is running...')
})
```

---

class: med

# Socket.io Server

Adding Socket.io is as simple as passing the server to the `io` constructor! It automatically wraps the HTTP server into a Websocket server.

```javascript
var http = require('http')
var io = require('socket.io')

var requestListener = function (request, response) {
  response.writeHead(200)
  response.end('Hello, World!\n')
}

var httpServer = http.createServer(requestListener)

httpServer.listen(8080, function () {
  console.log('HTTP server is running...')
})

var socketServer = io(httpServer)
```

---

class: med

# Listening for Socket Connections

The server can listen for new WebSocket client connections by registering a callback for the `connection` event.

```javascript
socketServer.on('connection', function (socket) {
  // 'socket' represents the bi-directional channel
  // between the server and connected client
})
```

The connection event is fired for each new client connection and represents the completion of the HTTP handshake. Information between the server and each connected client can then be transferred using the bi-directional WebSocket stream.

---

class: med

# Socket.io for Clients

Every client in a real time application runs the same code in the browser. To include Socket.io on the frontend it's best to use a [CDN distributed](https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js) version of the library.

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- include socket.io using a CDN source -->
    <script src="socket.io.min.js"></script>
  </head>
  <body>
    <!-- client side code -->
    <script src="client.js" type="text/javascript"></script>
  </body>
</html>
```

---

class: med

# Connecting to the Socket Server

After loading Socket.io onto the page, the `io` constructor for clients automatically attempts to connect to the locally hosted socket server. For example, inside `client.js`:

```javascript
// socket represents the bi-directional channel
// between this client and the server
var socket = io('http://localhost:8080')

socket.on('connect', function () {
  console.log('Connected to the central server!')
})

socket.on('disconnect', function () {
  console.log('Disconnected from the central server')
})
```

---

class: med

# WebSocket Communication

Information can be sent between server and client by emitting events. Sending information from either side uses the `emit` function and receiving information means registering a listener for that event.

On the client:

```javascript
var socket = io()
socket.emit('message', 'hello world!')
```

On the server:

```javascript
socketServer.on('connection', function (socket) {
  socket.on('message', function (data) {
    console.log(data) // hello world!
  })
})
```

---

class: med-large

# Emitting from Servers

Servers can emit information to specific clients the same way a client does to the server, using a specific socket.

```javascript
socketServer.on('connection', function (socket) {
  // other event listeners...
  socket.emit('message', 'hello world')
})
```

But they can also emit information to **all connected clients**.

```javascript
socketServer.emit('update', newData)
```

---

class: med-large

# Broadcasting

Servers can send information back to every other connected client except one using the `broadcast` flag on the socket itself.

```javascript
socketServer.on('connection', function (socket) {
  socket.on('update', function (data) {
    socket.broadcast.emit('updated_data', data)
  })
})
```

The above code shows how you can relay all updates from a single client to all other connected clients as they happen...in real time!

---

class: med-large

# Namespaces

Socket.IO allows you to _namespace_ your sockets and serve different endpoints that clients can connect to. The default namespace is `'/'`, which is what client sockets attempt to connect to.

Namespaces are created on servers...

```javascript
var socketServer = io(httpserver)
var nsp = socketServer.of('/my-namespace')
nsp.on('connection', function () {
  /* ... */
})
```

...and connected to by clients.

```javascript
var socket = io('my-namespace')
socket.emit('message', 'Connected to namespace!')
```

---

class: med-large

# Rooms

Within each namespace, you can create _rooms_ or collections of sockets. Servers add clients to rooms and can emit information to entire rooms of clients.

```javascript
socketServer.on('connection', function (socket) {
  // add new client to the chatroom!
  socket.join('chatroom')

  // alert everyone in the room
  var chat = socketServer.sockets.in('chatroom')

  chat.emit('new_client', socket.id)
})
```

---

class: small

# Cheat Sheet

```javascript
// sending to sender—client only
socket.emit('message', 'this is a test')

// sending to all clients, include sender
io.emit('message', 'this is a test')

// sending to all clients except sender
socket.broadcast.emit('message', 'this is a test')

// sending to all clients in 'game' room(channel) except sender
socket.broadcast.to('game').emit('message', 'nice game')

// sending to all clients in 'game' room(channel), include sender
io.in('game').emit('message', 'cool game')

// sending to sender client, only if they are in 'game' room(channel)
socket.to('game').emit('message', 'enjoy the game')

// sending to all clients in namespace 'myNamespace', include sender
io.of('myNamespace').emit('message', 'gg')

// sending to individual socketid
socket.broadcast.to(socketid).emit('message', 'for your eyes only')
```
