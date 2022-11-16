import { registers } from '..';

export default () =>
  registers.r2 = Math.floor(Math.random() * 256);
