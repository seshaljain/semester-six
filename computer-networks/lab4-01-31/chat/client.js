const net = require("net");
const serverline = require("serverline");

const connection = net.createConnection({ port: 3000 }, () => {
  console.log("[+] Server connected");
  connection.on("data", (buf) => console.log("[>] Server: " + buf.toString()));
  connection.on("error", (err) => console.log("[-] ", err.message));

  const sl = serverline.init({ prompt: "> " });
  sl.on("line", (line) => {
    connection.write(line);
    line === "exit" && connection.destroy() ? process.exit(0) : null;
  });
});
