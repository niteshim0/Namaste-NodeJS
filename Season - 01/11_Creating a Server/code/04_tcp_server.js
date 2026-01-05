// tcp-server.js
const net = require('net');

const server = net.createServer((socket) => {
  console.log('Client connected');

  socket.on('data', (data) => {
    console.log('Received from client:', data.toString());
    socket.write(`Server says: ${data}`); // echo back
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

server.listen(8124, () => {
  console.log('TCP server listening on port 8124');
});
