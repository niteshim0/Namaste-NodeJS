const socket = new WebSocket("ws://localhost:8080");

socket.onopen = () => {
  socket.send("Hello Server");
};

socket.onmessage = (event) => {
  console.log(event.data);
};
