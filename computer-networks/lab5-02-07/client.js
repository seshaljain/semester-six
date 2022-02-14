const net = require('net')
const sl = require('serverline')
sl.init({ prompt: '> ' })

const connection = net.createConnection({ port: 3000 }, () => {
  console.log('[+] Server connected')

  connection.on('data', (buf) => console.log(buf.toString()))
  connection.on('error', (err) => console.log('[-] ', err.message))

  sl.on('line', (line) => {
    connection.write(line)
    line === 'exit' && connection.destroy() ? process.exit(0) : null
  })
})
