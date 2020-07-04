---
number: 14
path: '/lectures/14-nextjs-gatsbyjs'
date: '2020-04-01'
title: 'NextJS and GatsbyJS'
hidden: false
---

class: center, middle, block-text

# Lecture 14

## NextJS and GatsbyJS

---

class: x-large

# Agenda

1. How is content rendered in the browser
2. Client-side Rendering vs Server-side Rendering: Why we need something more than just React?
3. How NextJS and GatsbyJS achieve SSR
4. How do we use NextJS and GatsbyJS in our projects

---

class: center, middle, block-text

# How is content rendered in the browser

---

class: med-large

# How is content shown on the webpage

- When rendering content on the webpage, the browser uses the rendering engine.
- Each browser typically has its own rendering engine: Gecko(Firefox), Webkit(Safari), Blink(Google).
- While the details of how these rendering engines work depends on which one you are using, these rendering engines follow a common framework which consists of several steps on how content is rendered.

---

class: med-large

# Step 1: Build the Docment Object Model (DOM) Tree

- After you type in a url and hit enter, the browser sends requests to the server hosting the website for the HTML. And whenever it sees a CSS/ JS link attached in the HTML files or some other assests, it will send a request to fetch those data.

![Step 1](https://miro.medium.com/max/1164/1*Il_mDUzygEpvPB9vc02M2w.png)

---

class: med-large

# Step 2: Build the CSS Object Model

- So now the browser has all the literal information about the webpage, but it also needs to know how these different HTML elements should be styled before it can finally render the full content.

![Step 2](https://miro.medium.com/max/1164/1*zfg0K6BD0PJEJRRpJrp2Zw.png)

---

class: med-large

# Step 3-5: Outputting everything we have

- Step 3 (The Render Tree): the browser, having both the DOM and CSS Object Model, will combine these two together to create a finalized tree that includes both the literal information and the styles
- Step 4 (Layout): the browser will now calculate the size and positions of each visible element on the page
- Step 5 (Paint): as the name of this step suggests, the browser literally takes whatever it has computed from Step 3 and Step 4 to paint things on the screen so the users can now see the actual stuff :)

---

class: med-large

# What will happen to the rendering path when JS files come along

- **JS is blocking the critical path**: When the browser sees a script tag, it blocks the DOM construction, waits for the JS files to be fetched and parsed by the JS engine before it goes to to CSS Object Model and finalizing the DOM tree.

![what happens when JS comes along](https://miro.medium.com/max/1400/1*gouuTGXzSY2lDn_CS2cAfw.png)

---

class: center, middle, block-text

# Client-side Rendering vs Server-side Rendering

## Why we need something more than just React?

---

class: med-large

# How are assets loaded on the webpage

- In general, there are two ways to process along the rendering path: Client-side Rendering (CSR) and Server-side Rendering (SSR).
- Everything we have built so far using React fall under **Client-side Rendering (CSR)**.

![CSR](https://miro.medium.com/max/1400/1*CRiH0hUGoS3aoZaIY4H2yg.png)

---

class: med-large

# SSR

- In contrast, there is another way of processing along the rendering path: Server-side Rendering (SSR).

![SSR](https://miro.medium.com/max/1400/1*jJkEQpgZ8waQ5P-W5lhxuQ.png)

---

class: med-large

# Advantages of SSR

- shorter loading time, better performance
- better Seach Engine Optimization (SEO): crawler can better fetch information from SSR websites
- In Chrome, try `site:[some url]`

![pennbasics](https://i.ibb.co/wywKm73/Screen-Shot-2020-04-02-at-9-06-21-AM.png)

![cis160](https://i.ibb.co/VjcHF6m/cis160.png)

---

class: center, middle, block-text

# How NextJS and GatsbyJS achieve SSR

---

class: med-large

# GatsbyJS

- compiles all React `jsx` files into static files: HTML, CSS, and JS
- the static files are readily available from the server hosting the website
- E.g. website https://www.aslezak.com/ is built using GatsbyJS and good SEO can be seen by running `site:https://www.aslezak.com/` in Chrome browser

---

class: med-large

# NextJS

- creates a server file on its own and render client React apps from the server by calling `res.render` (Recall that this is the technique we used for rendering in the _Campuswire-lite_ homework)
- there are even more advantages with NextJS such as minimal configuration, code splitting, etc

---

class: center, middle, block-text

# Live Coding: How to use NextJS

---

class: med-large

# Reference

- [List of Browser Engines](https://en.wikipedia.org/wiki/Browser_engine#Layout_and_rendering)
- [Understanding rendering path](https://medium.com/@luisvieira_gmr/understanding-the-critical-rendering-path-rendering-pages-in-1-second-735c6e45b47a)
- [CSR vs SSR](https://medium.com/walmartlabs/the-benefits-of-server-side-rendering-over-client-side-rendering-5d07ff2cefe8)
