import { registers } from '..';

export default (args: string[]) =>
  registers.r2 = Number(args[0]);
