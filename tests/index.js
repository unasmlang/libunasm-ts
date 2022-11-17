const lib = require('../dist/インデックス');
const fs = require('fs');
let output = '';
lib.instructions.outc = () =>
  output += String.fromCharCode(lib.registers.r1);
lib.instructions.out = ()=>output += lib.registers.r1;

lib.execute(fs.readFileSync('./tests/hello-world.unasm', 'utf-8'));
if (output !== 'Hello World!')
  throw new Error(`Hello World program did not output hello world\nOutputted:${output}`);
else
  console.log('Hello World: Success');
output = '';

lib.execute(fs.readFileSync('./tests/hello-world-2.unasm', 'utf-8'));
if (output !== 'Hello World!')
  throw new Error(`Hello World 2 did not output hello world\nOutputted:${output}`);
else
  console.log('Hello World 2: Success');
output = '';

let didCallCustomInstruction = false;
lib.instructions.custominstruction = () => didCallCustomInstruction = true;
lib.execute('custominstruction');
if (!didCallCustomInstruction)
  throw new Error('Did not call custom instruction `custominstruction`');
else
  console.log('Custom Instruction: Success');
output = '';

lib.execute('r1 1; r2 2; swap');
if (lib.registers.r1 !== 2)
  throw new Error('Did not swap registers (r1 !== 2)');
else if (lib.registers.r2 !== 1)
  throw new Error('Did not swap registers (r2 !== 1)');
else
  console.log('Swap: Success');
output = '';

lib.execute(fs.readFileSync('./tests/variables.unasm', 'utf-8'));
if (lib.variables.var1 !== -2)
  throw new Error('Did not set var to r1');
else if (lib.variables.var2 !== 'a')
  throw new Error('Did not set var to input arg (1)');
else if (lib.variables.var3 !== 'abc def')
  throw new Error('Did not set var to input arg (2)');
else if (lib.variables.var4 === '%var3%')
  throw new Error('Did not substitute correctly');
else if (lib.variables.var4 !== 'abc def')
  throw new Error('Did not set var to input arg (3)');
else
  console.log('Proper Variables: Success');
output = '';

if (lib.execute('r1 1;exit') !== 1)
  throw new Error('Did not exit with r1');
else if (lib.execute('exit h') !== 'h')
  throw new Error('Did not exit with input arg');
else
  console.log('Exit: Success');

if (lib.execute(fs.readFileSync('./tests/catvars.unasm', 'utf-8')) !== 3)
  throw new Error('Did not save/load correctly');
else
  console.log('Proper Variables: Success');
output = '';

if (lib.execute(fs.readFileSync('./tests/hang.unasm', 'utf-8'), 1) === 'did not exit')
  throw new Error('Hang Protection Failed: Did not exit after maximum instruction count');
else
  console.log('Hang Protection: Success');
