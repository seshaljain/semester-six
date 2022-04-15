var child_process = require('child_process')

var opts = {
  stdio: [process.stdin, process.stdout, process.stderr, 'pipe', 'pipe'],
}

var child = child_process.spawn('node', ['./child.js'], opts)
child.stdio[3].write('First message.\n', 'utf8')
child.stdio[3].write('Second message.\n', 'utf8')

child.stdio[4].pipe(process.stdout)
