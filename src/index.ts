/* eslint-disable prefer-const */
/* eslint-disable complexity */
import out from './instructions/out';
import outc from './instructions/outc';
import r1 from './instructions/r1';
import r1a from './instructions/r1a';
import r1d from './instructions/r1d';
import r1e from './instructions/r1e';
import r1m from './instructions/r1m';
import r1p from './instructions/r1p';
import r2 from './instructions/r2';
import r2a from './instructions/r2a';
import r2d from './instructions/r2d';
import r2m from './instructions/r2m';
import r2p from './instructions/r2p';
import r2e from './instructions/r2e';
import r2r from './instructions/r2r';
import src from './instructions/src';
import r1r from './instructions/r1r';
import r1r2 from './instructions/r1r2';
import r2r1 from './instructions/r2r1';
import swap from './instructions/swap';
import s from './instructions/s';
import g from './instructions/g';

/** Registers r1 & r2 */
// eslint-disable-next-line prefer-const
export let registers: Record<'r1'|'r2', any> = {
  'r1': 0,
  'r2': 0,
};

/** List of instructions - Note, in most non-node implementations, its recommended to change out & outc */
export let instructions = {
  /** Writes register 1 to standard output | By default, this defaults to console.log */
  'out': out,
  /** Converts register 1 to ascii & writes to standard output | By default, this defaults to console.log */
  'outc': outc,
  /** @deprecated Non-functional in this implementation; outputs the source code */
  'src': src,
  /** Sets Register 1 */
  'r1': r1,
  /** Sets Register 2 */
  'r2': r2,
  /** Increments r1 */
  'r1+': r1p,
  /** Increments r2 */
  'r2+': r2p,
  /** Decrements r1 */
  'r1-': r1m,
  /** Decrements r2 */
  'r2-': r2m,
  /** r1*=r2 */
  'r1*': r1a,
  /** r2*=r1 */
  'r2*': r2a,
  /** r1/=r2 */
  'r1/': r1d,
  /** r2/=r1 */
  'r2/': r2d,
  /** Sets r1 to 0 */
  'r1=': r1e,
  /** Sets r2 to 0 */
  'r2=': r2e,
  /** Sets r1 to a random integer between 0 and 256, inclusive 0 & exclusive 256 */
  'r1#': r1r,
  /** Sets r1 to a random integer between 0 and 256, inclusive 0 & exclusive 256 */
  'r2#': r2r,
  /** Sets r1 to r2 */
  'r1r2': r1r2,
  /** Sets r2 to r1 */
  'r2r1': r2r1,
  /** Swaps r1 & r2 */
  'swap': swap,
  /** Saves variables */
  's': s,
  /** Loads variables */
  'g': g,
};

/** Unsafe Options, use with care! */
export let unsafe = {};

/** Labels | {[name: string] = line: number} */
export let labels = {};

/** Version */
export const version = '1.1.0';

/** Variables */
export let variables: Record<string, any> = {};

/**
 * Executes your code | Running multiple code snippets at once may break shit, as {@link registers register values} & {@link labels labels} are not seperated between executions.
 * @returns number {@link registers.r1 Value of Register 1} or argument passed to exit
 */
export const execute = (_code: string, maxInstructions = 2097152) => {
  const code = _code.replace(/;/gui, '\n').split('\r\n')
    .join('\n')
    .split('\n');
  if (maxInstructions === 2097152 && maxInstructions < code.length)
    maxInstructions = code.length * 2;
  let line = 0;
  let instructionCount = 0;
  while (line < code.length) {
    instructionCount++;
    if (instructionCount > maxInstructions)
      return;

    const args = code[line].trim().split(' ')
      .map(v => v.trim())
      .map(v => {
        for (const v2 in variables)
          v = v.split(v2).join(variables[v2]);
        return v;
      });
    const instruction = args.shift()?.trim();

    if (instruction)
      if (instructions[instruction])
        instructions[instruction](args);
      else
        switch (instruction) {
        /** Defines a label */
        case 'lbl':
          labels[args[0]] = line;
          break;
        /** Compares or smth */
        case 'cmp':
          if (registers.r1 <= registers.r2)
            line++;
          break;
        /** Jumps to the label args[0] */
        case 'jmp': {
          const ln = labels[args[0]];
          if (typeof ln !== 'number')
            throw new Error(`Cannot jump to label ${args[0]} (not a number - possibly undefined)`);
          line = ln;
          break;
        }
        /** Jump to a random line */
        case 'rjmp':
          line = Math.floor(Math.random() * code.length);
          break;
        /** Not part of the spec: jump to a specific line */
        case 'ljmp':
          line = Number(args[0]);
          break;
        /** not in spec | {@link https://esolangs.org/wiki/Quine Quine} */
        case 'q':
        case 'quine':
          console.log(_code);
          break;
        /** Exits */
        case 'exit':
          return args[0] ? args.join(' ') : registers.r1;
        }
    line++;
  }
};
