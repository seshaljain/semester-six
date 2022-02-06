const net = require("net");

const connection = net.createConnection({ port: 3000 }, () => {
  console.log("[+] Server connected");

  const writer = require("fs").createWriteStream("./output.txt");
  connection.on("data", (buf) => writer.write(buf));

  connection.on("error", (err) => console.log("[-] ", err.message));
  connection.on("end", () => console.log("[+] File transfer complete"));
});
