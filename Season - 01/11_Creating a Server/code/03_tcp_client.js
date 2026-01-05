// tcp-client.js
const net = require('net');

const client = net.createConnection({ port: 8124 }, () => {
  console.log('Connected to server');
  client.write('Hello TCP server!');
});

client.on('data', (data) => {
  console.log('Received from server:', data.toString());
  client.end(); // disconnect after receiving response
});

client.on('end', () => {
  console.log('Disconnected from server');
});
