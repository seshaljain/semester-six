const net = require("net");

const server = net
  .createServer((connection) => {
    console.log("[+] Client connected");

    const reader = require("fs").createReadStream("./input.txt");

    reader.on("readable", () => {
      while ((data = reader.read())) {
        connection.write(data);
      }
    });

    reader.on("end", () => {
      connection.end();
    });

    connection.on("end", () => console.log("[+] Client disconnected\n"));
    connection.on("error", (err) => console.log("[X] ", err.message));
  })
  .listen(3000, () => console.log("[$] Server listening on port 3000"));
