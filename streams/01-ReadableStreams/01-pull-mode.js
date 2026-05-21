const fs = require('fs');
const PATH = '../some-random-file.pdf';

// * Here we are creating the Chunk of first 64KiB (highWaterMark) and stores the data to internal buffer of read streams
const fileReadStream = fs.createReadStream(PATH, {
  highWaterMark: 16, // in KiB - Default value is 64
});

// * Pull Mode, As we are trying to pull the chunks from the stream's internal buffer
fileReadStream.on('readable', () => {
  let chunk;

  while ((chunk = fileReadStream.read(16)) !== null) {
    // console.log(`Got ${chunk.length} bytes:`, chunk.toString());
  }
});

// * on Event emits when all the data was already flushed from source
// * EOF -> End of File
fileReadStream.on('end', () => {
  console.log('All Data was loaded');
});

// * Executes at last once all teh data was pulled
fileReadStream.on('close', () => {
  console.log('FD (File Directory) was released');
});

fileReadStream.on('error', () => {
  console.log('Failed to get the data');
});
