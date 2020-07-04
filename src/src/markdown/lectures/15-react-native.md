---
number: 15
path: '/lectures/15-react-native'
date: '2020-04-16'
title: 'React Native'
hidden: false
---

class: center, middle, block-text

# Lecture 15

## React Native

---

class: x-large

# Agenda

1. What is React Native?
2. Developing in React Native
3. CRA and CRNA

---

class: center, middle, block-text

# What is React Native?

---

class: med-large

# The React Native framework

- As a framework, React Native promises the impossible: the ability to build native mobile apps _using JavaScript and React!_

* With React Native, you don't build a “mobile web app”, an “HTML5 app”, or a “hybrid app”. You build a real mobile app that's indistinguishable from an app built using Objective-C, Swift or Java.

- React Native uses the same fundamental UI building blocks as regular iOS and Android apps, put together using JavaScript and React.

- Created to attract more web developers to create applications and experiences for mobile.

This lecture covers React Native iOS applications only.

---

class: center, middle, block-text

# Developing in React Native

## Option 1: Xcode

---

class: med-large

# React Native iOS Setup

Install [Watchman](https://facebook.github.io/watchman) through Homebrew to enable hot-reloading during development.

```bash
brew install watchman
```

Install the React Native CLI to control your project from the command line.

```bash
npm install -g react-native-cli
```

Install the latest version of Xcode from the [Mac App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=12). You will also need to ensure this comes with the Xcode Command Line Tools package.

---

class: med-large

## Using the CLI

Once everything is installed, you can create a barebones iOS or Android application using the React Native CLI. The following commands create a new React Native starter project and build & deploy the base application **for Android/iOS separately**.

```bash
react-native init TestApp
cd TestApp

# building for iOS
react-native run-ios

# building for Android
react-native run-android
```

Running for iOS will pull up a live preview of the application in the Xcode iOS simulator as if it were opened on a mobile device.

---

class: med

## Making Changes

<img src="https://facebook.github.io/react-native/img/iOSSuccess.png" style="float: left">

`react-native run-ios` runs the application in an interactive simulator within Xcode.

To make changes, edit the default root file for the React Native iOS project: `index.ios.js`.

Hitting `Command + R` within the simulator or re-building the project from within Xcode will update your application.

Logs from the application also show up inside the simulator, along with any system crash reports.

---

class: med, smaller-code

## Hello World!

Inside `index.ios.js` we can swap back to JS and write an iOS application in React!

```js
import React, { Component } from 'react'
import { Text, AppRegistry } from 'react-native'

class TestApp extends Component {
  render() {
    return <Text>Hello, React!</Text>
  }
}

AppRegistry.registerComponent('TestApp', () => TestApp)
```

---

class: med, smaller-code

## So what's new?

**No more DOM**! Since we're now developing for mobile environments, we no longer have DOM node elements to render our Components into. Retaining the tag-based hierarchial structure of our favorite tree, we now render into custom React Native elements, like `Text`.

```js
class TestApp extends Component {
  render() {
    return <Text>Hello, React!</Text>
  }
}
```

The top most Component needs to be _registered_ with the `AppRegistry` so that build system knows which component to mount when the app starts.

```js
AppRegistry.registerComponent('TestApp', () => TestApp)
```

---

class: small, smaller-code

## What about writing native code?

Inside the header file for your native module:

```objectivec
// React bridge protocol!
#import <React/RCTBridgeModule.h>

@interface CalendarManager : NSObject <RCTBridgeModule>
@end
```

And inside the module itself:

```objectivec
#import "CalendarManager.h"
#import <React/RCTLog.h>

@implementation CalendarManager

RCT_EXPORT_MODULE(); /* export to js via React bridge! */

RCT_EXPORT_METHOD(addEvent:(NSString *)name
{
  RCTLogInfo(@"Created event %@!", name);
}
```

---

class: med, smaller-code

## Using native modules in React Native

Now that we've exported the `CalendarManager` native module via the React Bridge Protocol, we can access and treat it like a normal JS module inside our application!

```javascript
import { NativeModules } from 'react-native'

const CalendarManager = NativeModules.CalendarManager

CalendarManager.addEvent('CIS 197 - React Native Lecture')
// -> Created event CIS 197 - React Native Lecture!
```

Mixing and matching native modules is a very powerful feature of React Native, which allows you to write convenient and easy to read JavaScript for majority of your application and swap in more powerful Objective-C or C++ modules when the need arises.

There are a lot of experimental features in this area, like bridging callbacks, promises and thread management. Read more in the [native modules official docs](https://facebook.github.io/react-native/docs/native-modules-ios.html).

---

class: center, middle, block-text

# Developing in React Native

## Option 2: No Xcode?!

---

class: med-large

## A Brief Aside - CRA

Getting set up with React and all the tools/infrastructure can be a non-trivial task. However, the fine folks over at Facebook open sourced [Create React App](https://github.com/facebookincubator/create-react-app) which sets up an entire React application for you in 3 lines of code!

```bash
# instally globally once
npm install -g create-react-app

create-react-app my-react-webapp
cd my-react-webapp
npm start
```

- Auto deploys to http://localhost:3000/
- Transpiles ES6 code using Babel Webpack
- NPM/Yarn scripts for building and testing
- Industry standard configurations and build systems.

---

class: med-large

## A Brief Aside - CRA

Bootstrapping your project with CRA provides you with the following project directory...

```bash
my-react-webapp/
  README.md     # stub README
  index.html    # barebones starter page
  node_modules/ # **already installed!**
  package.json
  src/
    App.css
    App.js
    index.css
    index.js
```

---

class: med-large

## A Brief Aside - CRA

...and a very minimal `package.json` file.

```js
{
   "name": "my-react-webapp",
   "version": "0.0.1",
   "devDependencies": {
     "react-scripts": "0.1.0"
   },
   "dependencies": {
     "react": "^15.2.1",
     "react-dom": "^15.2.1"
   },
   "scripts": {
     "start": "react-scripts start",
     "build": "react-scripts build",
     "eject": "react-scripts eject"
   }
}
```

---

class: med-large

## Create React Native App (CRNA)

Create React App was **so successful** that [Create React Native App](https://github.com/react-community/create-react-native-app) was born (in March 2017). Along with just bootstrapping your project set up, CRNA attempts to make your development workflow more streamlined than ever before.

Make sure you have Node 6 or later installed. _No Xcode or Android Studio installation is required_.

```bash
$ npm install -g create-react-native-app
$ create-react-native-app my-app
$ cd my-app/
$ npm start
```

Powered by a magical application called [Expo](https://expo.io). Download it now!

---

class: med

## Instant pairing and hot reloading!

<img src="http://tc.sinaimg.cn/maxwidth.2048/tc.service.weibo.com/upload_images_jianshu_io/80bb6da0b0b80f98b97badf7bf87dac9.gif" style="width: 85%; display: block; margin: auto;">

---

class: med-large

## React Native

Part of a venture to make React a _universal_ framework and design philosophy for building applications on all platforms.

When you write a mobile application you're writing an application using a React-based mindset, and this is automatically transpiled down into the correct low-level code needed for either iOS or Android.

#### Q: What does it take to become a React Native developer?

_Understanding React as a framework. QED, you're all already React Native developers!_

---

class: center, middle, block-text

# Let's get building!

---

class: med, smaller-code

## JSX in React Native

```javascript
import React, { Component } from 'react'
import { AppRegistry, Text, View } from 'react-native'

class BasicApp extends Component {
  render() {
    return (
      <View>
        <Text>Hello, React</Text>
      </View>
    )
  }
}

AppRegistry.registerComponent('BasicApp', () => BasicApp)
```

`View` and `Text` are React Components that have been packaged and made available to you (along with many others) in React Native. They can be used independently of the platform you're developing for! Read more about them in the [official docs](https://facebook.github.io/react-native/docs/view.html).

---

class: med, smaller-code

## Style in React Native

```javascript
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

class LotsOfStyles extends Component {
  render() {
    return (
      <View>
        <Text style={styles.bigblue}>Big Blue Text</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontSize: 30,
  },
})
```

[`Stylesheets`](https://facebook.github.io/react-native/docs/style.html) let you decorate, align and beautify elements in pure JS!

---

class: med, smaller-code

## Text Input in React Native

```javascript
import React, { Component } from 'react'
import { TextInput, Text, View } from 'react-native'

class InputApp extends Component {
  render() {
    return (
      <View>
        <TextInput onChangeText={this.onUpdate.bind(this)} />
        <Text>{this.state.inputText}</Text>
      </View>
    )
  }

  onUpdate(updatedText) {
    this.setState({ inputText: updatedText })
  }
}
```

[`TextInputs`](https://facebook.github.io/react-native/docs/style.html) come with the `onChangeText` prop which lets you hook into changes to the input box. Passing in updated text to `setState` lets your app update seamlessly.

---

class: med, smaller-code

## Touch Input in React Native

```javascript
import React, { Component } from 'react'
import { TouchableHighlight, Text, View } from 'react-native'

class TouchInputApp extends Component {
  render() {
    return (
      <View>
        <TouchableHighlight onPress={this.onPress} />
        <Text>{this.state.inputText}</Text>
      </View>
    )
  }

  onPress() {
    console.log('Button tapped!')
  }
}
```

[`TouchableHighlight`](https://facebook.github.io/react-native/docs/handling-touches.html) come with the `onPress` prop which tell you when the user taps or touches an element in the app.

---

class: large

## Tech Stacks and React Native

React Native allows you to use existing skills in web development to create new types of _clients_ for your tech stack - mobile devices.

Apps built in React Native should integrate **seamlessly** into existing tech stacks. You can connect them to Express servers, online APIs and all existing server side infrastructure that any web client can access!

---

class: med-large, smaller-code

## Communicating Via HTTP

React Native provides the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) for your networking needs which is a futuristic version of XMLHttpRequest from the web browser. Fetches are wrapped in `Promises` and can be used as follows:

```javascript
function getGradesFromApiAsync() {
  return (
    fetch('https://cis197.com/api/grades.json')
      // convert response to JSON and chain to next handler
      .then((response) => response.json())

      // only return the grades section of the JSON
      .then((responseJson) => {
        return responseJson.grades
      })

      // catch and log any networking related errors
      .catch((error) => {
        console.error(error)
      })
  )
}
```

---

class: med-large, smaller-code

## Communicating Via WebSockets

React Native also comes bundled with WebSocket support, for full-duplex communication! Remember Socket.io?

```javascript
var ws = new WebSocket('ws://cis197.com/realtimechat')

ws.onopen = () => {
  ws.send('Hello real time world!') // send a message
}

ws.onmessage = (e) => {
  // a message was received
  console.log(e.data)
}

ws.onerror = (e) => {
  console.log(e.message)
}

ws.onclose = (e) => {
  console.log(e.code, e.reason)
}
```

---

class: large

## Looking Forward

React Native is becoming hugely popular for developers of all spheres. It's easy to use, has low overhead and an amazing open source community surrounding it.

Check out the [React Native Showcase](https://facebook.github.io/react-native/showcase.html) and read user stories to see how it's changing the way mobile development works from the ground up.
