const dgram = require("dgram"),
  util = require("util"),
  port = 3000,
  clients = [];

let server = dgram.createSocket("udp4", (data, rinfo) => {
  data = JSON.parse(data);
  message = new Message(data.type, data.message, rinfo);

  process.stdin.resume();

  process.stdin.removeAllListeners("data");
  process.stdin.on("data", function (chunk) {
    let buffer = Buffer.from(
      `Server => ${chunk.toString().replace(/\n|\n/g, "")} `
    );

    clients.forEach(function (current) {
      server.send(buffer, 0, buffer.length, current.port, current.address);
    });
  });
});

server.bind(port, function () {
  console.log("Server listening on port", port);
});

function Message(type, message, rinfo) {
  let self = this;
  this.type = type;
  this.message = message;
  this.rinfo = rinfo;

  this.typeConnect = function () {
    let _message = util.format("New connection on port", this.rinfo.port);
    clients.push(rinfo);
    this.broadcast(_message);
    console.log(_message);
  };

  this.typeDisconnect = function () {
    let _message = util.format("Disconnected from port ", this.rinfo.port);
    clients.splice(clients.indexOf(this.rinfo), 1);

    this.broadcast(_message);
    console.log(_message);
  };

  this.typeMessage = function () {
    let _message = util.format("%d => %s", this.rinfo.port, this.message);

    this.broadcast(_message);
    console.log(_message);
  };

  this.broadcast = function (message) {
    let _buffer = Buffer.from(message);

    clients.forEach(function (current) {
      if (current.port != self.rinfo.port) {
        server.send(_buffer, 0, _buffer.length, current.port, current.address);
      }
    });
  };

  switch (type) {
    case "connect":
      this.typeConnect();
      break;

    case "disconnect":
      this.typeDisconnect();
      break;

    case "message":
      this.typeMessage();
      break;

    default:
      // nothing
      break;
  }
}
