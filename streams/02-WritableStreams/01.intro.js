const fs = require('fs');

const PATH = './output.txt';

const ws = fs.createWriteStream(PATH, {
  highWaterMark: 16,
});

const dataBuffer = Buffer.alloc(1, 'x');

for (let i = 0; i < 20; i++) {
  const ok = ws.write(dataBuffer);
  console.log(`write ${i + 1}: buffer ok = ${ok}`);

  // When ok === false, the internal buffer exceeded 16 KB
  // If you keep writing anyway, data queues in memory unchecked!
}
