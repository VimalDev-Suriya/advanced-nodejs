const { Duplex } = require('stream');

const duplex = new Duplex({
  allowHalfOpen: false,
  read(size) {
    this.push('data from read side');
    this.push(null); // EOF on read side
  },

  // write side is called when someone tries to write to us
  write(chunk, encoding, callback) {
    console.log('write side received:', chunk.toString());
    callback(); // signal ready for next chunk
  },
});

// Use it as a Readable
duplex.on('data', (chunk) => console.log('read side:', chunk.toString()));

duplex.write('hello write side', () => {
  duplex.write('writting again');
});

// * By default once all process ends, the duplex strema will be close
// duplex.on('end', () => {
//   duplex.end(); // Closing the duplex stream manually
// });

// ****************************** Example 2

const duplex_2 = new Duplex({
  read() {
    this.push(String(this._count++ || (this._count = 1)));

    if (this._count > 6) this.push(null);
  },

  write(chunk, encoding, cb) {
    // console.log(chunk.toString());
    process.stdout.write(chunk);
  },
});

duplex_2.on('data', (chunk) => {
  console.log('Chunk', chunk.toString());
});

duplex_2.write('Suriya');
