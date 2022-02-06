const net = require("net");
const serverline = require("serverline");

const server = net
  .createServer((connection) => {
    console.log("[+] Client connected");
    connection.on("data", (buf) =>
      console.log("[>] Client: " + buf.toString())
    );

    serverline.init("> ").on("line", (line) => connection.write(line));

    connection.on("end", () => console.log("[+] Client disconnected\n"));
    connection.on("error", (err) => console.log("[X] ", err.message));
  })
  .listen(3000, () => console.log("[$] Server listening on port 3000"));
