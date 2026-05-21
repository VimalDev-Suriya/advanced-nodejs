// * A Real world example of handling the proxy
// This are just a 2 way communication, but both of them are not aware of each other

const net = require('net');
const fs = require('fs');
const { Transform } = require('stream');

const UPSTREAM_HOST = 'www.google.com';
const LOCAL_PORT = 3000;

function makeLogger(label, logStream) {
  return new Transform({
    transform(chunk, enc, cb) {
      logStream.write(`[${label}] ${chunk.length} bytes
`);
      this.push(chunk); // pass data through unchanged
      cb?.();
    },
  });
}

const log = fs.createWriteStream('traffic.log');

const proxy = net
  .createServer((clientSocket) => {
    const serverSocket = net.createConnection({
      port: 80,
      host: UPSTREAM_HOST,
    });

    // S -> C
    serverSocket.pipe(makeLogger('S -> C', log)).pipe(clientSocket);

    // C -> S
    clientSocket.pipe(makeLogger('C -> S', log)).pipe(serverSocket);

    clientSocket.on('connectionAttempt', (stream) => {
      console.log('someone connected');
    });

    clientSocket.on('error', () => serverSocket.destroy());
    serverSocket.on('error', () => {
      console.log('Server error');
      clientSocket.destroy();
    });

    console.log('proxying:', clientSocket.remoteAddress);
  })
  .listen(LOCAL_PORT, () => {
    console.log(`Proxy listening on :${LOCAL_PORT}`);
  });
