const fs = require('fs');
const PATH = '../some-random-file.pdf';

const fileStream = fs.createReadStream(PATH, {
  highWaterMark: 16, // in KiB - Default value is 64
});

let totalBytes = 0;

// * Flowing Mode
fileStream.on('data', (chunk) => {
  totalBytes += chunk.length;
  process.stdout.write(chunk);

  // * Pause and resume can be done in here
  fileStream.pause();

  console.log('The Data was paused due to some internale reasons');

  setTimeout(() => {
    fileStream.resume();
  }, 5000);
});

// * End Event emits when all the data was already flushed from source
fileStream.on('end', () => {
  console.log('All Data was loaded');
});

fileStream.on('error', () => {
  console.log('Failed to get the data');
});
