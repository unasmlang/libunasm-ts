import { registers } from '..';

export const slots = {};
export default (args: string[]) => {
  const arg1 = args[0];
  slots[arg1] = {
    'r1': registers.r1,
    'r2': registers.r2
  };
};
