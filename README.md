# libunasm
Simple [unasm](https://esolangs.org/wiki/Unasm) implementation in TypeScript.

This can also be used as a decent base for other instruction-based esolangs

## API
See [index.d.ts](dist/%E3%82%A4%E3%83%B3%E3%83%87%E3%83%83%E3%82%AF%E3%82%B9.d.ts)

## CLI
See [this repo](https://github.com/unasmlang/repl-cli-ts)

## Web
See [this](https://unasmlang.github.io/)

### Embedding into your own websites
#### With a bundler
Use <https://unasmlang.github.io/libunasm-ts/lib.js> or build it yourself
> Need ts mappings too? See <https://unasmlang.github.io/libunasm-ts/lib.d.ts>

#### Without a bundler
You're out of luck; use parceljs or similar. See the [demo repo](https://github.com/unasmlang/unasmlang.github.io) for a very minimal example.

## Synchronous
The TS/JS implementation of libunasm is fully synchronous; it will block the js event loop until the program is done running.

> This may change in a future version, to either support asynchronous functionality or become fully asynchronous. 

## Beyond the spec
If you want to extend the instruction set beyond the unasm spec, within the TS/JS implementaion of libunasm, you can do this using something similar to the following:
```js
const libunasm = require('./libunasm');
libunasm.instructions.custominstruction = (args) => // args is string[]
  console.log(`hello, ${args[0]} is ${libunasm.registers[args[0]]}`); // libunasm is Record<'r1'|'r2',number>
libunasm.execute('r1 2; custominstruction r1'); // -> logs hello, r1 is 2
```

### Expansaion Examples
###### UnAsm Eval
```js
libunasm.instructions.eval = (args) =>
  libunasm.registers.r1 = libunasm.execute(args.join(' ')); // this can only include single instructions as semis and newlines cant be escaped. See the workaround in js eval for an example workaround
```
###### JS Eval
```js
libunasm.instructions.jseval = (args) =>
  libunasm.registers.r1 = eval(args.join(' ').replace(/\:/gui,';'));
```
```unasm
jseval console.log('line 1'):console.log('line 2'):return -1; out; outputs -1
```
###### FS Read
```js
const fs = require('fs')
libunasm.instructions.get = (args)=> // spec name, you might want a different one
  libunasm.registers.r1 = fs.readFileSync(args, 'utf-8');
```

## note
by default, the interpereter will perform a maximum of 2097152 instructions before aborting. this can be changed by adding the maximum amount as the 2nd argument to `.execute()` - if you don't care about hanging, set this to `Infinity`
