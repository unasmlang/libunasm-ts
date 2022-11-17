import { registers } from '..';
import { slots } from './saveVars';

export default (args: string[]) => {
  const arg1 = args[0];
  const slot = slots[arg1];
  if (!slot)
    return;
  registers.r1 = slot.r1;
  registers.r2 = slot.r2;
};
