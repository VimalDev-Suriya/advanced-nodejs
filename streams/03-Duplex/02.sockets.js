// * Sockets are the real example of Duplex.

const net = require('net');

const server = net
  .createServer((socket) => {
    console.log('Client connect at', socket.remoteAddress);

    socket.on('data', (chunk) => {
      socket.write(chunk);
    });

    socket.on('error', () => {
      console.log('Error in receving the data');
    });

    socket.on('end', () => {
      console.log('closing the Server');
      socket.destroy();
    });
  })
  .listen(3000, () => console.log('server started in 3000'));

const client = net.createConnection({ port: 3000 }, () => {});
client.write('Hello Server');
