---
number: 11
path: '/lectures/11-app-from-scratch'
date: '2019-01-29'
title: 'Building an Application from Scratch'
hidden: true
---

class: center, middle, block-text

# Lecture "I lost count"

## Building an Application from Scratch

#### Aka Removing the the training wheels

---

class: med

# Agenda

1. How does the web work
2. What do you _need_
3. Break down simple app (Penn Course Review Lite)
4. Break down more complex app (Twitter for Birds)

- Build Systems for React
  - Webpack
  - Create React App (CRA)
  - Integrating server into this

5. Hosting with Heroku

---

class: med

# How does the web work

![web](https://web.stanford.edu/class/msande91si/www-spr04/readings/week1/InternetWhitepaper_files/ruswp_diag3.gif)

- Bottom line, you _always_ connect to some form of a server when serving pages

- What's localhost:
  - A local server
  - What happens when someone else tries to access http://localhost:3000 ?

---

class: med

# There are exceptions

- file://....
  - Drag and drop any index.html file into a browser and it has a file:// protocol URL
  - Basically can view any local file you have on your system
  - Neat little trick. Download any website:
    `wget -p -k --no-check-certificate https://www.penncoursereview.com`
  - Can I protect against this? Not really. Anyone who accesses your site also has access to the files you send along with it (including script
    requires etc)

---

class: med

# So ... server?

- Yep.
- What have we been using in class to make a server?
- What does this line do?

```javascript
app.listen(3000, () => {
  console.log('listening on 3000'));
});
```

- More minute, what can be wrong with that?

---

class: med

# Fix!

```javascript
app.listen(process.env.PORT || 3000, () => {
  console.log('listening on ' + (process.env.PORT || 3000))
})
```

---

class: large

# Planning your JS app

---

## Planning

Decide the core features of your application.

- Data the user can see or interact with.
- Actions the user can carry out.
- Connections with other services/APIs?

Start by building a **minimum viable product** that incorporates all of your essential features.
Move into cool features once that's stable, but try to avoid _feature bloat_!

---

<img src="https://cdn.techinasia.com/wp-content/uploads/2015/10/MVP-1024x784.png" style="width:100%" alt="MVP"/>

---

class: med-large

## Example: Penn Course Review Lite

What do we want this app to have (necessary features in **bold**)

- **Login**, with different authentication levels
- **Add/Read Reviews**
- Search/Browse Reviews
- Integration with PennInTouch
- Etc.

When developing this app, we'll aim to get the necessary features done first, and then add additional features in subsequent iterations

Note that what's "necessary" is somewhat subjective; this is why it's important to have a clear idea of what your app's purpose is.

---

class: center, middle, block-text

# Choosing your tech stack!

---

class: med-large

# Selecting a tech stack

Pretty much any application you build is going to have 4 main building blocks:

- A runtime environment (node.js)
- A server (express)
- An app framework (backbone, react, angular, etc.)
- A database for persistence (mongodb, mysql, etc.)

One quintessential setup is the MEAN stack (mongo, express, angular, node)

---

class: large

# How do I know what to choose?

That's a tough question, and generally depends on some mix of what the project demands and personal preference.

For our purposes, you should ALWAYS use Node and Express!

Frameworks are a bit more nuanced and complicated...

---

class: med

# Choosing an app framework

First you should decide how robust a framework you need; choose the simplest solution to your problem.

- Templating Engines (What do they do?) - **EJS** - **Handlebars**
- More robust frameworks - **React**: generally more intuitive, although there are some weird quirks to using react components - **Angular/Vue/Ember/etc.** - we don't recommend using other frameworks on the final unless you have a lot of experience with them, and even then, don't expect that the TA's will be able to help you if it breaks

However, beyond obvious functionality, choice of framework generally comes down to what _you_ find most intuitive for the task at hand.

---

class: med-large

# MongoDB vs. MySQL

For any app, you'd probably like a way to persist data

There are tons of database options, but the two most popular are MongoDB and mySQL

- mySQL is a traditional **relational database**
- MongoDB is **non-relational**

If you don't know the difference, just use Mongo. There are tradeoffs to each, however at the scale of your final projects there should be no difference.

We'll be covering MongoDB in more detail next week.

---

class: med-large

# Example: Penn Course Review Lite

We chose to use EJS + MongoDB (on top of express and node)

- Express routes provide most of the user interaction
- EJS allows us to generate barebones html pages using templates found in 'views'
- MongoDB lets us write, store, and retrieve reviews

I strongly urge all of you to go through the project files from this assingment as well as others in order to understand how apps are built.

---

class: med

# Additional Functionality

Additionally, you might need some more complex functionality

- Real-time communication? **Socket.io**
- Data visualization? **D3**
- Managing state? **Redux**
- Everything? **jQuery**

One of the great things about Javascript is that there's a library for essentially anything you can think of.

---

class: center, middle, block-text

# Misc. Considerations

---

class: med-large

# Writing your app

I won't go into to much detail about writing your app, since you've been learning just that for the past 9 weeks, however I wanted to highlight some important details to consider when you're writing full apps versus fill out stubbed hw implementations.

Although, if you're using a similar tech stack to previous weeks' homeworks, feel free to copy the stub.

---

class: med-large

# Setting up the project directory

Make sure you set up your directory for GitHub

- use a _.gitignore_ file

Setting up the directory

```bash
npm init
npm install [package]
npm install --save [package]
npm install --save-dev [package]
```

---

class: med

# Module Systems - Organizing Your Project

"Require" is node's default module system. It allows you to break your code up into different files and folders, then import this code as needed. It's also how you import libraries.

**Exporting (on the node side)**

```js
const express = require('express')
const router = express.Router()

router.route('new').get(function (req, res) {
  res.render('addreview')
})
module.exports = router
```

---

class: med

# Module Systems - Organizing Your Project

**Importing**:

```js
const express = require('express')
const reviews = require('./routes/reviews')
```

Check past homeworks for more examples of how to use module systems

Note that you will need to use a bundler like browserify or webpack to require pacakges in browser (such as for React projects)

---

class: med-large

# Dressing up the front-end

- While it's not necessarily JS, after you finish writing your basic app functionality you might want to improve the front-end to increase usability
- You can be as involved in this as you want - Use a plain css stylesheet - Use compiled css (SASS/LESS) - Use a front-end "framework" (Bootstrap, Bourbon, Foundation)

---

class: med

# For the love of god use Git

- Tbh really shocking that this _isn't_ a part of the beginning CS curriculum at Penn
- Pretty simple
  - go to directory you want to start out in
  - `git init` (you may need to install git...but most systems come with it already
  - `git add filename(s)`. Once you 'add' a file, it is marked as being tracked. You can do `git status` to see all such tracked and untracked files
  - Anytime you add a new file run `git add filename` otherwise, just doing `git add -u` will stage all changes in tracked files in a commit
  - `git commit -m "message"`
  - `git push someLocation someBranch`

---

class: med

# What are 'someLocation' and 'someBranch'

- Go to github. Set up an account
- Create a new repository (on github)
- There will be a URL
- In terminal, do `git remote add origin URLHERE`
- So now you have a location (someLocation) equal to the repo hosted on github (kinda like backing up your work)
- Not every commit has to be pushed!

---

class: med, center

# React apps

![richard_and_mortimer](https://i.imgur.com/uD0mSsm.gif)

---

class: med

# Let's look at Twitter for Birds

<img src="https://i.imgur.com/bFvWIWs.png" style="height: 500px">

---

class: med

Things I've been hiding from you

- webpack.config.js

```javascript
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.join(__dirname, 'public', 'js');
var APP_DIR = path.join(__dirname, 'src');

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      ...
    ],
  },
};

module.exports = config;
```

---

# Da Rules

```javascript
rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react'],
            plugins: ['transform-object-rest-spread']
          },
        },
      },
    ],
```

---

# Also .babelrc for good measure

```javascript
{
  "presets" : ["es2015", "react"],
  "plugins" : ["transform-object-rest-spread"]
}
```

---

# Distinction between T4B and PCR lite?

- No explicit views to render
  - With T4B, just send over index.html
  - index.html requires a /js/bundle.js
  - which webpack generates
  - which in turn is served by express
  - in the case that none of the requests match the previous paths
  - spoooky inception!

---

class: med

# Create React App (Aka blessing and a curse)

- Blessing because everything is done for you with regards to webpack optimization etc
- Curse because it runs its own server...while you also run a server (cri)
- How to get around that
  - https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/

---

class: center, middle, block-text

# Deploying with Heroku

---

class: med-large

# Heroku Fast Facts

- Heroku is a web hosting platform that works over Git. You commit your app, push it to Heroku, and it's automatically deployed.
- Supports add-ons for databases, logging, caching, monitoring, metrics, etc.
- Easy to use, easy to scale.

---

class: med-large

## Getting started with Heroku

Assuming you already have an Express app working locally...

- Sign up for an account at [heroku.com](https://www.heroku.com/).
- Download the [Heroku Toolbelt](https://toolbelt.heroku.com/).
- Commit your app into Git on the master brach.
- Create a [Procfile](https://devcenter.heroku.com/articles/procfile) and commit that too.
  - Usually your Procfile will just be one line: `web: node app.js`

Heroku has an [online tutorial](https://devcenter.heroku.com/articles/getting-started-with-nodejs) with all this information, but some of their steps are unnecessary.

---

class: large

Now run some commands from the terminal to deploy everything:

```bash
heroku create <YOUR APP NAME>
git push heroku master
heroku ps:scale web=1
heroku open # Open your app in the browser
```

Heroku will automatically detect your dependencies from `package.json` and install them for you, then run the command from your Procfile to start your app. If things go wrong, you can display the logs with

```bash
heroku logs
```

---

class: large

## Making Changes

It's really, really easy to make changes to your Heroku app. Just commit to master and push to Heroku again, and it'll auto-update for you!

```bash
git add -A .
git commit -m "Made some changes"
git push heroku master
```

---

class: x-large

# Example

Let's deploy an app to Heroku for practice.

We'll use [this improved version of the Socket.io example app](https://github.com/sibnerian/cis197-chat-example).

---

class: med

# A word of warning

A couple of important considerations for Heroku instances:

- If your app goes unused for more than 15 minutes, the server instance dies an will need to be spun up again the next time a user connects
- Processes longer than 30 seconds are killed
- No static uploads. So if you want to use pictures, for instance, you would have to upload them to another service like Amazon S3 instead of directly to Heroku

---

class: center, middle, block-text

# Deploying with Amazon Web Services

tldr: don't do this unless you know what you're doing

---

class: med-large

# Intro to AWS

- Amazon Web Services is the largest enterprise cloud hosting platform in the world. They provide everything: servers, databases, storage, DNS and networking, deployment...
- If you don't know SSH and Unix terminal, then you'll need to review that.
- A bit harder to use than Heroku, but...
  - Cheaper
  - Faster
  - You can run anything on AWS.
    - **ANYTHING**

For an app like what you'd use for the final project, we'd recommending hosting it on an EC2 instance, which lets you provision a virtual server running in one of Amazon's gigantic server farms.

---

class: med

# Disclaimer

Only try this if you are otherwise **completely finished** with your final project.

Deploying to AWS can be a major pain and carries with it a whole set of important considerations.

We won't go into details here because AWS changes very often. However, there are plenty of resources avaliable online and we are more than happy to help you out if you finish early.

---

class: med-large

# Why does anyone want to use AWS anyway?

Well, AWS gives you control over an entire virtual server. You can run jobs in the background, customize your environment, and much more **without** having to use a third-party "add-on."

Plus, AWS stays on 24/7 with free tier...whereas Heroku will spin down your app after a few minutes of inactivity.

Heroku great for rapid prototyping, but if you need custom functionality, multiple servers, or 99.99% uptime is crucial - then use AWS.
