const { pipeline } = require('stream/promises');
const fs = require('fs');
const zlib = require('zlib');

// These two are equivalent:

// — Classic Transform class —
const upperTransform = new Transform({
  transform(chunk, enc, cb) {
    this.push(chunk.toString().toUpperCase());
    cb();
  },
});

// — Async generator (much simpler) —
async function* upper(source) {
  for await (const chunk of source) {
    yield chunk.toString().toUpperCase();
  }
}

// Use the generator directly in pipeline
await pipeline(
  fs.createReadStream('input.txt'),
  upper, // async generator function
  fs.createWriteStream('output.txt'),
);
