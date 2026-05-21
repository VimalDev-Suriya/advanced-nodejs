// This code sets up a multi-core Node.js HTTP server that uses Inter-Process Communication (IPC) to send data back and forth between a control process and its worker processes.

// It does two main things:
// * Broadcasts data (Top-Down): The primary process sends a configuration update to all workers every 10 seconds.
// * Reports metrics (Bottom-Up): The workers count incoming HTTP requests and send a message back to the primary process every 100 requests.

const http = require('http');
const cluster = require('cluster');
const os = require('os');

const CPUS = os.cpus().length;

// * Explicity setting the round-robin approch to balamce the request to all workers
// Because in windows, the last spawned worker will tries to swallow all the incoming request (taht is worker 8)
// To fix that we can set the round-robin approch
// By Default it will be SCHED_NONE in Windows alone.
cluster.schedulingPolicy = cluster.SCHED_RR;

if (cluster.isPrimary) {
  const workers = [];

  // * Spawning the core
  for (let i = 0; i < CPUS; i++) {
    const worker = cluster.fork();

    // * having the workers list, to help to iterate over all workers while brodcasting
    workers.push(worker);

    // Attaching event listeners to individual workers, so once they message this event will track
    // Receive message from all workers
    worker.on('message', (msg) => {
      if (msg.type === 'metrics') {
        console.log(`Worker ${worker.id} handled ${msg.requests} requests`);
      }
    });
  }

  function broadcast(message) {
    for (const worker of Object.values(cluster.workers)) {
      worker.send(message);
    }
  }

  // Broadcast config updates to all workers for every 10 seconds
  setInterval(() => {
    broadcast({ type: 'config', rateLimit: 100 });
  }, 10000);
} else {
  let requests = 0;

  // * Workers On receiving the message from Primary
  process.on('message', (msg) => {
    if (msg.type === 'config') {
      console.log(`Config updated: rateLimit=${msg.rateLimit}`);
    }
  });

  http
    .createServer((req, res) => {
      requests++;
      // Report metrics to primary every 100 requests
      if (requests % 100 === 0) {
        process.send({ type: 'metrics', requests });
      }
      res.end('ok');
    })
    .listen(3000);
}
