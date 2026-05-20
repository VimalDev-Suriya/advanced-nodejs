const { Duplex } = require('stream');

const duplex = new Duplex({
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

// duplex.end();
