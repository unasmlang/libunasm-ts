import { registers } from '..';

export default () =>
  registers.r1 = Math.floor(Math.random() * 256);
