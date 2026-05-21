// * TCP server — socket is the real example of Duplex.

const net = require('net');

// ***************************** Server Code ***********************************
const server = net
  .createServer((socket) => {
    console.log('Client connect at', socket.remoteAddress);

    // * Reading the Data from the client
    socket.on('data', (chunk) => {
      console.log('Server Recived:', chunk.toString());

      // * Here we are sending the data back to Client
      socket.write('Server: Echo' + chunk);
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

// *********************** Client Code Starts ***********************
const client = net.createConnection({ port: 3000 }, () => {
  console.log('Client Connected to Server');
});

// WRITE side — send data to server
client.write('Client: hello server!');
client.write('Client: how are you?');
client.end(); // signal we're done writing (read side stays open)

// READ side — receive data from server
client.on('data', (chunk) => {
  console.log('server says:', chunk.toString());
});

client.on('end', () => {
  console.log('server closed connection'); // post client end, trigger the server close
  server.close();
});
