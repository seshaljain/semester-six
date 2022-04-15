var fs = require('fs')

var readable = fs.createReadStream(null, { fd: 3 })

readable.pipe(process.stdout)
fs.createWriteStream(null, { fd: 4 }).write('Sending a message back.\n')
