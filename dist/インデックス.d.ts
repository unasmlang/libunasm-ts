/** Registers r1 & r2 */
export let registers: Record<'r1' | 'r2', any>;
/** List of instructions - Note, in most non-node implementations, its recommended to change out & outc */
export let instructions: {
    /** Writes register 1 to standard output | By default, this defaults to console.log */
    out: () => void;
    /** Converts register 1 to ascii & writes to standard output | By default, this defaults to console.log */
    outc: () => void;
    /** @deprecated Non-functional in this implementation; outputs the source code */
    src: () => void;
    /** Sets Register 1 */
    r1: (args: string[]) => void;
    /** Sets Register 2 */
    r2: (args: string[]) => number;
    /** Increments r1 */
    'r1+': () => number;
    /** Increments r2 */
    'r2+': () => number;
    /** Decrements r1 */
    'r1-': () => number;
    /** Decrements r2 */
    'r2-': () => number;
    /** r1*=r2 */
    'r1*': () => number;
    /** r2*=r1 */
    'r2*': () => number;
    /** r1/=r2 */
    'r1/': () => number;
    /** r2/=r1 */
    'r2/': () => number;
    /** Sets r1 to 0 */
    'r1=': () => number;
    /** Sets r2 to 0 */
    'r2=': () => number;
    /** Sets r1 to a random integer between 0 and 256, inclusive 0 & exclusive 256 */
    'r1#': () => number;
    /** Sets r1 to a random integer between 0 and 256, inclusive 0 & exclusive 256 */
    'r2#': () => number;
    /** Sets r1 to r2 */
    r1r2: () => any;
    /** Sets r2 to r1 */
    r2r1: () => any;
    /** Swaps r1 & r2 */
    swap: () => void;
    /** Saves variables */
    s: (args: string[]) => void;
    /** Loads variables */
    g: (args: string[]) => void;
};
/** Unsafe Options, use with care! */
export let unsafe: {};
/** Labels | {[name: string] = line: number} */
export let labels: {};
/** Version */
export const version = "1.1.0";
/** Variables */
export let variables: Record<string, any>;
/** Other options */
export let options: {
    /** Should we error on unknown instructions? Defaults to false per spec */
    shouldErrorOnUnknownInstruction: boolean;
};
/**
 * Executes your code | Running multiple code snippets at once may break shit, as {@link registers register values} & {@link labels labels} are not seperated between executions.
 * @returns number {@link registers.r1 Value of Register 1} or argument passed to exit
 */
export const execute: (_code: string, maxInstructions?: number) => any;

//# sourceMappingURL=インデックス.d.ts.map
