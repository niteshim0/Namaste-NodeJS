const http = require('http'); // requiring http module

const server = http.createServer(
  function(req,res){
    if(req.url === '/getSecretData'){
      res.end("There is no any secret data");
      return;
        }
      res.end(
      "Hello , finally we are moving to coding part."
    )
  }
); // an instance of server

server.listen(3000);

// server creating using http module is not a best way it has lot of issues
// we use wrapper around this http module to create a framework express.js to make server which is developed on top of Node.js