---
number: -1
path: '/lectures/6-backbone-js'
date: '2019-01-29'
title: 'Backbone.js'
hidden: true
---

class: center, middle, block-text

# Lecture 6

## Backbone.js

---

class: x-large

# Agenda

1. Backbone
1. Design Philosophy
1. Model
1. Collection
1. Events
1. View
1. Router

---

class: center, middle, block-text

# Design Philosophy

---

class: large

# Data/DOM Separation

## For a large application, you don't want all of your state to be stored in the DOM (like it was in the last homework). In Backbone, you represent your data as **models** and your display logic as **views**. These communicate via **events**, which allow views to update whenever their models change (for instance, when a user interacts with the UI).

class: large

# Minimalism

Backbone is an unopinionated _microframework_ - it's designed to be compatible with whatever libraries you prefer. The tradeoff is that you have to write some bits of code yourself - for instance, the _render_ method of a view must be entirely user-supplied.

---

class: large

# Dependencies

Backbone requires [Underscore.js](http://underscorejs.org/) as a hard dependency. For HTTP syncing, DOM manipulation, and the router, Backbone also requires [jQuery](https://api.jquery.com/).

---

class: center, middle, block-text

# [Backbone.Model](http://backbonejs.org/#Model)

---

class: large

From the Backbone docs:

> Models are the heart of any JavaScript application, containing the
> interactive data as well as a large part of the logic surrounding it:
> conversions, validations, computed properties, and access control. You
> extend `Backbone.Model` with your domain-specific methods, and `Model`
> provides a basic set of functionality for managing changes.

---

class: med-large

# Backbone.Model.extend

Backbone provides a specific way to create a _subclass_ of `Model`: the `extend` method. This correctly sets up the prototype chain, so you can further extend your own model classes.

```js
var Note = Backbone.Model.extend({
  initialize: function() { ... },
  allowedToEdit: function () {
    return true;
  }
});

var PrivateNote = Note.extend({
  allowedToEdit: function (account) {
    return account.owns(this);
  }
});
```

---

class: med-large

# Attributes

The state of a model is determined by its **attributes** - an internal hash that specifies its properties and values. You can set _default_ attributes when you create a model class.

```js
var Note = Backbone.Model.extend({
  initialize: function () {...},
  allowedToEdit: function () {
    return true;
  },
  defaults: {
    'title': 'Unknown Title',
    'author': 'Unknown Author',
    'content': 'No content available.'
  }
});
```

---

class: med-large

# Using the Constructor

When creating an instance of the model, you can pass the initial attributes that will be set on the model object. If you specified an **initialize** function, it will also be called when the model is created.

```js
new Note({
  title: 'A Note on the Confinement Problem',
  author: 'Butler W. Lampson',
})
```

---

class: med-large

## Accessing Model Attributes

Backbone provides several attribute-related properties on models:

- **has**, which tests whether a model has a given attrribute.
- **get**, which returns the value of a given attribute.
- **set**, which lets you specify or change the value of an attribute.
- **unset**/**clear**, which let you delete a single attribute or _all_ attributes, respectively.
- **toJSON**, which returns a shallow copy of the model's attributes. Note that this does not return a JSON string, but an object.

There is also the **.attributes** property, which lets you get directly at the internal attributes hash. It's not good practice to use this - it's intended to be private in Backbone.

---

class: med-large

# Attributes Example

```js
var note = new Note({
  title: 'A Note on the Confinement Problem',
  author: 'Butler W. Lampson',
})

console.log(note.has('title')) // --> true
console.log(note.get('author')) // --> 'Butler W. Lampson'
note.set('author', 'Chad')
console.log(note.get('author')) // --> 'Chad'
note.clear()
console.log(note.has('title')) // --> false
```

---

class: center, middle, block-text

# [Collections](http://backbonejs.org/#Collection)

---

class: med-large

# Collection Basics

Collections are ordered sets of models. When you create a collection, you pass in a constructor function for a model, and an optional _comparator function_ that defines how models are sorted.

```js
var NoteCollection = Backbone.Collection.extend({
  model: Note,
  comparator: function (note) {
    return note.get('title')
  },
})
```

You can then create a collection by passing in an array of models or model data.

```js
var notes = new NoteCollection([note1, note2])
```

---

class: med-large

# Using Collections

There are a number of methods that deal with adding/removing models from collections.

- `add` - add a model (or array of models) to the collection, firing an "add" event. You can also pass raw attributes objects, which rely on the model property being set appropriately.
- `remove` - Remove a model (or array of models) from the collection, firing a "remove" event with the previous index as a property on the event options.
- `reset` - replace existing models with a new array, firing a "reset" event.
- `set` - like `reset`, but "smart:" only adds new models, only removes models that aren't included anymore, and updates in-common models. Fires all appropriate "remove", "add", "change" events.

---

class: block-text, center, middle

# [Backbone.Events](http://backbonejs.org/#Events)

---

class: med-large

# Registering Listeners

Like other examples we've seen before, Backbone uses `.on()` to bind callback functions to events.

```js
note.on('change:title', function (note, title) {
  someView.render()
})
```

You can also pass in a context value for `this` as a third argument.

```js
note.on(
  'change:author',
  function (note, author) {
    this.render()
  },
  someView
)
```

---

class: med-large

# Listening For Events

It's often more idiomatic for some object to listen to events on _another_ object. Backbone provides a `listenTo()` method for this common case.

```js
view.listenTo(note, 'change:author', view.render)
```

The callback is always called with the object as context - so this example is equivalent to the previous one.

---

class: med-large

# Triggering Events

You can kick off events on an object manually by using the `trigger()` method.

```js
note.trigger('change:author')
```

Any subsequent arguments to `trigger()` will be passed along to the event callbacks. Also, you aren't limited to predefined events &mdash; you can pass any string.

```js
note.trigger('dance', {
  type: 'polka',
})
```

.footnote[\* jQuery also has a trigger method - we used it to write unit tests for your last homework.]

---

class: med-large

# Other Events Methods

- `once()` - just like `on()`, but only runs the callback _one time_.
- `listenToOnce()` - just like `listenTo()` but only runs once.
- `off()` - unbinds callbacks that were bound with `on()`. If called with no arguments, removes all callbacks.
- `stopListening()` - undoes `listenTo()`. If called with no arguments, object stops listening to all events.

Unbinding events is important because not doing so can create a _memory leak_. For instance, say you remove a view from the DOM, but you used `on()` to bind it to some model as context. If you don't use `off`, the view will stay around as long as the model does - which can cause a major slowdown if it happens often enough.

For more on Backbone memory leaks, check out [this thorough blog post](https://unspace.ca/dev/2013/avoiding-memory-leaks-in-backbone-js) on the subject.

---

class: center, middle, block-text

# [Views](http://backbonejs.org/#View)

---

class: med-large

# Creating Views

Much like models, a View class is created by extending `Backbone.View`.

```js
var NoteView = Backbone.View.extend({
  tagName: 'li',
  className: 'note',
  events: {
    'click .title': 'expand'
  },
  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },
  render: function () {...},
  expand: function () {...}
});
```

---

class: large

# View Elements

A view in backbone always has the `el` and `$el` properties, which represent the view as a DomNode and jQuery element, respectively. Properties like `tagName, className, id, attributes` are used to define this element's properties. In the example, a `NoteView` will have an element that looks like

```html
<li class="note"></li>
```

---

class: med-large

# Rendering

The default implementation of `render()` in Backbone does nothing - you must define the rendering behavior yourself. This makes Backbone flexible regarding rendering techniques: Underscore templates, Mustache.js, and jQuery element creation are common.

In general, `render()` should reference `this.model` (or `this.collection`) so that the view reflects the state of the underlying model. The view can `listenTo()` the model so that when the state changes, the view is re-rendered.

---

class: large

# Events

View events are specified as a simple object mapping _event descriptions_ to _method names_ (both strings). Event descriptions consist of the event type and a selector; the method names must be defined as functions somewhere in the class.

For instance, we saw the `click .title` string used a few slides back, corresponding to an `expand` method.

---

class: med-large

# Constructing a View

A new view is created similar to a new model. There are several properties that will be attached directly to the new object if passed in: `model, collection, el, id, className, attributes, events`. You generally only use `model` and `collection`, and sometimes `el` if the view's element already exists in the DOM.

```js
var noteView = new NoteView({
  model: note,
  el: existingEl,
})
```

When it's time to get rid of a view, you call the `remove()` method, which removes the element from the DOM and causes the view to stop listening to all events.

---

class: block-text, center, middle

# [Router](http://backbonejs.org/#Router)

---

class: med-large, smaller-code

It's nice to be able to provide a direct link to a certain part of the application, but what if this 'part' only exists client-side? Backbone provides a router that lets you define this behavior for your app.

```js
var MyRouter = Backbone.Router.extend({
  routes: {
    'help':                 'help',    // #help
    'search/:query':        'search',  // #search/kiwis
    'search/:query/p:page': 'search'   // #search/kiwis/p7
  },
  help: function () {...},
  search: function (query, page) {
    // note that query and page are passed as parameters
  }
});

var myRouter = new MyRouter();
```

---

class: med-large

# The Routes Hash

The "routes" hash maps URLs to functions on your router. It can contain:

- Regular strings (`help/me`)
- Parameters (`:param`), which match a single URL component between slashes
- Splats (`*splat`), which match any number of URL components
- Optional parts `(/:optional)`

Parameters and splats will be passed to the handler function as arguments in the order in which they appear, even if they are optional.

**Note**: `help` and `help/` are _not_ treated the same by Backbone. If you want them to be equivalent, use `help(/)`.

---

class: med-large

# Router Methods

- **navigate(fragment, [options])** - used to update the page to a given URL fragment. To also call the appropriate router function, pass the option `{trigger: true}`; if you don't want to create an entry in the browser history, call with `{replace: true}`.
- **route(route, name, [callback])** - Manually creates a route for the router. `route` can be either a string or a _regular expression_. `name` is used to create an event string for this route, of the form "route:name". `callback` can be either a function or a string corresponding to a method on the router object; it will be called with the parameters from the `route` string.

---

class: med-large

# Backbone.History

Once all your routers are instantiated, you must call `Backbone.History.start()` to begin dispatching routes. You can pass the following parameters to this method:

- **pushState** - old browsers can only listen to routes of the form `rootUrl#foo/bar/baz`, while modern browsers can use `rootUrl/foo/bar/baz` through the [History API](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history). Passing `{pushState: true}` tells Backbone to use the modern standard where possible.
- **root** - if your application isn't served from the root URL (`/`), you must tell History where the root really is by passing `{root: 'some/url/somewhere'}`.

---

class: large

# Up Next

1. This week - Backbone assignment! Focus is on Models, Views, and Collections - with a little router bit thrown in for good measure.
1. Due next Sunday
1. Next week - HTTP and server-side JavaScript with Express!
