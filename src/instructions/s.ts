import {
  registers, variables
} from '..';

export default (args: string[]) => {
  const name = args.shift();
  if (!name)
    throw new Error('No name specified!');
  const value = args.join(' ') || registers.r1;
  variables[name] = value;
};
