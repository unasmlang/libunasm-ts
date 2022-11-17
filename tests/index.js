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
let didCallCustomInstruction = false;
lib.instructions.custominstruction = () => didCallCustomInstruction = true;
lib.execute('custominstruction');
if (!didCallCustomInstruction)
  throw new Error('Did not call custom instruction `custominstruction`');
else
  console.log('Custom Instruction: Success');
