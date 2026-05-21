const cluster = require('cluster');
const os = require('os');
const http = require('http');

const cpus = os.cpus(); // Returns the list of active cores
const cpusLength = cpus.length;

// console.log('Number of CPUS present is, ', cpusLength);

// * Returns boolean value, this helps to differentiate the workers and manager process
// If it is a primary/manager process thsn it will be true
// If it is a child process,then it will be false.
// Use Cases - Used to shift between the primary and workers process
// console.log(cluster.isPrimary);

if (cluster.isPrimary) {
  //   console.log(`Primary ${process.pid} running — forking ${cpusLength} workers`);

  // * Forking the Child workers for every CPUS
  for (let i = 0; i < cpusLength; i++) {
    cluster.fork(); // spinning up the cores
  }

  cluster.on('online', (worker) => {
    console.log(`${worker.id} is now online`);
  });

  // * listening for the worker , if failes gracefully re-staring
  cluster.on('exit', (worker, code, signal) => {
    console.log(`${worker.id} was failed`);
    cluster.fork();
  });
} else {
  // WORKER: each runs a full HTTP server
  // The OS distributes connections between workers
  http
    .createServer(() => {})
    .listen(3000, () => {
      //   console.log('Server running in port 3000');
    });

  console.log(`Worker ${process.id} started`);
}

// * When we ran this, we will be seeing.
// We are spawning 8 http server in all CPUS.
// Each worker created by the primary process runs in its *Own Memory* and *Event Loop*.
// The Primary and Worker process will communicate with IPA
