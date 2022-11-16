import { registers } from '..';

export default () => {
  const r2 = registers.r2;
  registers.r2 = registers.r1;
  registers.r1 = r2;
};
