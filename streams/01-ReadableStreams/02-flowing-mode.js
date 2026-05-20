const fs = require('fs');
const PATH = '../some-random-file.pdf';

const fileStream = fs.createReadStream(PATH, {
  highWaterMark: 16, // in KiB - Default value is 64
});

let totalBytes = 0;

// * Flowing Mode
// A simplest pattern, but it has the greater issue. This mode will flush the data automatically to the consumer as much as possible. If the consumer is slow, then data piles up in memory.
// So we can use pipe() and pipeline() — they handle backpressure.
fileStream.on('data', (chunk) => {
  totalBytes += chunk.length;
  process.stdout.write(chunk);
});

// * End Event emits when all the data was already flushed from source
fileStream.on('end', () => {
  console.log('All Data was loaded');
});

fileStream.on('error', () => {
  console.log('Failed to get the data');
});
