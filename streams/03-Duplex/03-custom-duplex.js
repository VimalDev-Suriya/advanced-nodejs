const { Duplex } = require('stream');

class Channel extends Duplex {
  #_inbox = [];
  name = '';
  #waiting = null;

  constructor(name) {
    super({
      allowHalfOpen: true,
    });

    this.name = name;
  }

  _read(size) {
    if (this.#_inbox.length > 0) {
      const chunk = this.#_inbox.shift();
      this.push(chunk);
    } else {
      // * Here we are parking for anything to be displayed if there is new message
      this.#waiting = () => {
        this.#waiting = null;
        this._read(size);
      };
    }
  }

  _write(chunk, encoding, cb) {
    const msg = `[${this.name}] ${chunk.toString()}`;
    this.#_inbox.push(msg);

    if (this.#waiting) this.#waiting(); // unblock the reader

    cb?.();
  }
}

const myChannel = new Channel('general');

myChannel.write('Hello Serevr');
myChannel.write('Hello Serevr');
myChannel.write('Hello Serevr');
myChannel.write('Hello Serevr');

myChannel.on('data', (msg) => console.log('received:', msg.toString()));

myChannel.on('end', () => {
  console.log('Channel CLosed');
});
