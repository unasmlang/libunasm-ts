import { registers } from '..';

export default () =>
  console.log(typeof registers.r1 !== 'number' ? registers.r1 : String.fromCharCode(registers.r1));
