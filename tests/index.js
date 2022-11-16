const lib = require('../dist/インデックス');
const fs = require('fs');
let output = '';
lib.instructions.outc = ()=>output += String.fromCharCode(lib.registers.r1);
lib.execute(fs.readFileSync('./tests/hello-world.unasm', 'utf-8'));
if (output !== 'Hello World!')
  throw new Error('Hello World program did not output hello world');
else
  console.log('Hello World: Success');
output = '';
