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

## note
by default, the interpereter will perform a maximum of 2097152 instructions before aborting. this can be changed by adding the maximum amount as the 2nd argument to `.execute()` - if you don't care about hanging, set this to `Infinity`
