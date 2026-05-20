// Its the global object
const stringBuffer = Buffer.from('Hello');

// * 'nameBuffer' is actually iteratable - very efficientwhile writing the data
const nameBuffer = Buffer.alloc(26, 'name'); // Creating the buffer with size 26 and filling with "name" string

console.log(stringBuffer.length); // 5
console.log(stringBuffer); // <Buffer 48 65 6c 6c 6f>
const originalSTring = stringBuffer.toString('utf-8');

console.log(originalSTring);
