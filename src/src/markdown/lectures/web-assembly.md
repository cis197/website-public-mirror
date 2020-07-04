---
number: -1
path: '/lectures/14-web-assembly'
date: '2019-01-29'
title: 'Web Assembly'
hidden: true
---

class: center, middle, block-text

# Lecture 14

## Web Assembly

---

class: center, middle, block-text

# Logistics

---

class: med-large

# WASM

- run programming languages outside of JS in the web browser
- can use it in parallel with JS

---

class: center, middle, block-text

# JS isn't fast

---

class: large

### Browser Wars

So from 1995-2008 everything was pretty slow in browsers

<img src="https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/02/01-01-perf_graph05.png" height="400">

---

class: large

## JS is now used for things

- Node.js => only reason it is a thing is because of Chrome developing a JS engine that uses a JIT

---

class: x-large

## But step back

- what happens to the code you put on a webpage in JS?

  - parse
  - compiling + optimization
  - reoptimization
  - execution
  - garbage collection

---

class: large

# But if we were to use webassembly...

We skip some steps because things are compiled for us already!

So now its just

- decode
- compile + optimize
- execute

---

class: large

## But what does the JIT do?

- disconnect between JS and 1s and 0s.
- interpreters vs compilers

<img src="https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2017/02/02-01-alien03.png" height="300px">

---

class: med-large

## In the Browser what do we want?

- Initially browsers employed interpreters to execute JS code
- slow behavior
  - Introduction of a "Monitor" and early compilers in browsers:
    - Warm Functions
    - Stubs & the baseline compiler

---

class: large

## No Guarantees

- compiled code does a check to make sure things fit the assumptions it has made
- if not -> deoptimize/bail out and throw away optimized compiled code
- usually these optimizing compilers will make code quicker
  - but scenario of code that is hot (but repetitively enters cycle of getting hot -> bailing out) will take _longer_ than usual to execute.
  - JITs will keep track of this and prevent bail outs

---

class: large

## How do we make things faster?

- get rid of dynamic types
  - but thats what makes js so great
- we don't need to change things in JS!

I'm very excited about the "Internet of Things."

---

class: large

## Assembly Crash Course

- ALU = arithmetic + logic unit
- short term memory = registrars
- longer term = random access memory
- ALU + registers = CPU

---

class: large

## Steps

- so we can go from C -> Intermediate representation -> Wasm -> x86/ARM
- The step from C -> IR (refered to as the "front end") can be done via tools like clang/gcc.
- From there, we can use emscripten to go from IR -> wasm
- We eventually get .wasm
- Let's say you're calling a wasm function from JS. wasm functions can only take in wasm types as parameters (right now its just numbers)

---

class: med-large

# Okay so why is wasm faster?

- its a bit more compact
- parsing takes less time
- normally JS -> interpreter -> AST -> bytecode
- but wasm is already in bytecode! just needs to be decoded (which is quick)
- compiling takes a lot less time bc its done ahead of time
- no bail outs
- 10-800% faster
- garbage collection is manual though :/
- you can use it!
  - asm for older browser (its just JS)

---

class: med-large

## Examples

[https://websightjs.com/](https://websightjs.com/)

[https://wasdk.github.io/WasmFiddle/?uhvxz](https://wasdk.github.io/WasmFiddle/?uhvxz)
