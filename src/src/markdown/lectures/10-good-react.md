---
number: 10
path: '/lectures/10-good-react'
date: '2019-10-31'
title: '"Good" React'
hidden: false
---

class: center, middle, block-text

# "Good" React

## SRP, React All the Things, and Qualifications

---

class: med

# Agenda

1. Single Responsibility Principle (SRP)
   - What is "good" JS?
2. Why React is "good"
3. Where is React useful
4. How can we write better React code?

---

class: center, middle, block-text

# 1. Single Responsibility Principle (SRP)

---

class: large

# Single Responsibility Principle (SRP)

"Every module, class, or function should have responsibility over a single part of the functionality provided by the software, and that responsibility should be entirely encapsulated by the class, module or function"

- [Wikipedia](https://en.wikipedia.org/wiki/Single_responsibility_principle)

---

class: med

Doing everything in one method can get really, really long. Imagine if we want to do anything more than this:

```javascript
post('/users/new', (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || username.length < 2 || ....)
        if ...
        if ...
        const user = new User(username, password)
        if (!user) ...
        res.status(200)
        res.send({ success: true, user: user })
    } catch (err) {
        let status
        if (err) ...
          status = ...
        else ...
        res.status(status)
        res.send({ error: err.message || 'Something borko' })
    }
})
```

---

class: med

# Purely-JS helper functions

Easier to read, easier to test, easier to reuse:

```javascript
// Helper functions...

function handleCreateNewUser(req, res) {
    try {
        validateUserInput(req, res)
        const user = await createUserInDatabase(req)
        return handleSendResponse(user, res)
    } catch (err) {
        handleError(err, res)
    }
}

post('/users/new', handleCreateNewUser)
```

---

# So what can we do

Harder in the shortest of short runs, easier every step after:

- Handle errors in their own functions
- Frontend should only render
- Split out sending API requests
- Split out cleaning user input
- Split out interacting with databases, other services
- ...

---

class: center, middle, block-text

# 2. Why is React "good"?

---

# Why is React "good"?

- Huge open source community, many packages → can build off of the work of others
- Used by big companies everywhere → not as susceptible to "flavor of the week" changes in JS frameworks
- React is an example of the SRP: it is only the "view" of MVC frameworks
- Can be used everywhere (more on this in a sec)
- Really good at handling events and state changes
- "Good" React can be really concise

---

# React can take information and render it

```javascript
export default ({ name, bio }) => (
  <div className="profile">
    <h1>{name}</h1>
    <p>{bio}</p>
  </div>
)
```

---

# React can handle updates really easily

I don't think it's possible to get (non-negligibly) more concise than this in _any_ framework:

```javascript
export default ({ name, bio }) => {
  const [score, setScore] = useState(0)
  return (
    <div className="profile">
      <h1>{name}</h1>
      <p>{bio}</p>
      <p onClick={() => setScore(score + 1)}>{score}</p>
    </div>
  )
}
```

If this is a little confusing, sorry...

---

# That `useState` function is a funky thing called "hooks"

- Hooks were added in React 16
- They make it easier to manage state without needing to create formal classes
- Hooks are an example of what React embraces as a framework: SRP and conciseness!

---

class: small

## This code does the same thing as the hooks example

```javascript
class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = { score: 0 }
    this.updateScore = this.updateScore.bind(this)
  }

  updateScore() {
    const { score } = this.state
    this.setState({ score: score + 1 })
  }

  render() {
    const { name, bio } = this.props
    return (
      <div className="profile">
        <h1>{name}</h1>
        <p>{bio}</p>
        <p onClick={this.updateScore}>{score}</p>
      </div>
    )
  }
}

export default Profile
```

---

# Big idea here

React can be as robust as you need it to be

- Few state updates, rendering content → use Hooks, and "functional components"
- Taking user input, making many requests, dealing with many helper functions → use "class components"

In my experience, React does a really good job of being lightweight compared to other frameworks.

---

class: center, middle, block-text

# 3. Where is React useful?

---

# Where is React useful?

React is a framework for writing views. What these views actually are (HTML elements, iOS code, etc.) can be determined by a compiler from React to native code.

Thus, we can use React just about everywhere:

- Dynamic web apps
- Fully "static" web apps
- Server side web apps
- Mobile apps
- Lightweight apps
- Progressive Web Apps
- Native (desktop) apps

How is this possible?

---

# Dynamic Web App: Bundler + React

Common options: either [Webpack](https://webpack.js.org/) or [Parcel](https://parceljs.org/) + React

<div style="text-align: center">
<img width="50%" style="display: inline-block" src="https://cdn.hashnode.com/res/hashnode/image/upload/v1548922329296/rJb10Xg44.png"></img>
</div>

General workflow:

1. Server builds a JS bundle + has simple HTML
2. Sends simple bundle + HTML to user's browser
3. Browser renders the HTML, the HTML tells the browser to run the bundle
4. Bundle injects React components onto the DOM

---

# Issues with bundles

- They can be really big, some users have poor internet connection or cheap phones
- Search engines, social media sites can only crawl static content

→ bundles are only good for apps which don't have to be searched for or shared; normally, we send a user a bundle once they log into our app

---

# Static Web App: Gatsby.js

<div style="text-align: center">
<img width="50%" style="display: inline-block" src="https://miro.medium.com/max/1000/1*G9aVAI3aezHLw_JsiCfB1Q.jpeg"></img>
</div>

1. Developer writes React code
2. Gatsby "builds" React code into optimized HTML + JS + CSS
3. Deploy static HTML + CSS + JS to static hosting place
   - GitHub Pages, Amazon S3, Netlify, ...
4. Users directly download HTML + CSS + JS

Additional perks: lazy images loading, preload pages, all out of the box → absurdly fast static sites which feel dynamic (shameless plug for [the course website](https://www.cis.upenn.edu/~cis197/))

---

# Server-Side Web App: Next.js

<div style="text-align: center; margin-bottom: -2rem;">
<img width="50%" style="display: inline-block" src="https://i.ytimg.com/vi/Fnw3lNeH-XI/maxresdefault.jpg"></img>
</div>

1. Developer writes React code
2. Developer defines routes (like in Express) and matches them with React components
   - Routes can pull data from API's in real time
3. Deploy as a server
4. Server gets request from user, pulls data from APIs, pushes data into React template, generates HTML + CSS + JS
5. Server sends HTML + CSS + JS to user

Blurs the line between client and server

---

# Mobile App: React Native

<div style="text-align: center">
<img width="50%" style="display: inline-block" src="https://d117h1jjiq768j.cloudfront.net/images/default-source/blogs/2019/2019-10/the-react-native-sdk-for-kinvey-is-now-available_870_450.png?sfvrsn=296e1008_0"></img>
</div>

1. Developer writes React code
2. Developer can test code on their Android or iOS phone during dev as a JS bundle
3. React Native compiles JS bundle into iOS and Android packages
4. Developer can submit packages to Apple Store and Google Play Store
5. Users can download native iOS and Android apps

---

# Lightweight App: Preact

<div style="text-align: center">
<img width="50%" style="display: inline-block" src="https://ourcodeworld.com/public-media/articles/articleocw-59957f9652ac5.png"></img>
</div>

1. Developer writes React code (without a few bells and whistles)
2. Developer should use fewer NPM dependencies
3. Bundler builds (significantly smaller) bundler
4. Server sends HTML + bundle to user
5. More users can download bundle signficantly quicker, even on slow internet speeds or on small devices

---

# Progressive Web Apps (PWA)

- Developer configures app to be able to be downloaded and work offline
- User goes to website and chooses to download it to their phone
- User can open website directly from their phone without going to a browser
- User can run website even when it's offline (doesn't have to talk to server)

---

# Native Desktop App: Electron

<div style="text-align: center">
<img width="20%" style="display: inline-block" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Electron_Software_Framework_Logo.svg/1200px-Electron_Software_Framework_Logo.svg.png"></img>
</div>

1. Developer writes React code
2. Electron runs in Chromium JS engine as a native app
3. Electron can build MacOS, Windows, Linux packages
4. User can download package from their OS and run app from their desktop

Atom, WhatsApp, Slack, VSCode, Microsoft Teams, others are all written in Electron.

---

# Conclusion: React all the things

- Developers can be more productive across platforms
- Can re-use logic and components between platforms

BUT when you have a hammer, everything looks like a nail...

---

class: center, middle, block-text

# 4. How can we write better React code?

---

# How can we write better React code?

Counter-intuitive solution: use React for as little as possible and only for what it is good at:

- Render data
- Handle events

---

# Do not do this with React

- Sending requests
- Sanitizing input
- Error handling
- Parsing request responses

Instead, call purely-JS helper functions

---

# To go back to our Express API handler from earlier

We receive the request and connect helper functions together. None of the nitty gritty work is done in our actual API handler method.

We want our React components to do the same.

```javascript
function handleCreateNewUser(req, res) {
    try {
        validateUserInput(req, res)
        const user = await createUserInDatabase(req)
        return handleSendResponse(user, res)
    } catch (err) {
        handleError(err, res)
    }
}
```

---

class: small

# Simple, reusable components

```javascript
const ErrorMessage = ({ message }) => {
  if (!message) return null
  return (
    <div className="error-message">
      <p>{message}</p>
    </div>
  )
}
```

Now in the top of all forms we can have:

```javascript
export default () => {
  // ...
  const { error } = this.state
  return (
    <form onSubmit={...}>
      <ErrorMessage message={error}>
      ...
    </form>
  )
}
```

---

# Production code demo
