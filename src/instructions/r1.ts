import { registers } from '..';

export default (args: string[]) => {
  registers.r1 = Number(args[0]);
};
