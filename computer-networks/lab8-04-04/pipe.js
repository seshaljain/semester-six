const stream = require("stream");

const s = new stream.Readable();
const w = new stream.Writable();

s._read = () => { };
w._write = (chunk, encoding, next) => {
  console.log("Reading from pipe: ", chunk.toString());
  next();
};

s.pipe(w);

const pipeUtil = (...args) => {
  args.map((arg) => s.push(arg) && console.log("Writing to pipe: ", arg));
  s.push(null);
};

pipeUtil("Seshal Jain", "191112436", "lorem ipsum dolor sit amet");
