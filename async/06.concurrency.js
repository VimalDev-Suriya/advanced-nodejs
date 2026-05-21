// * Structured concurrency — controlling parallel work
// Structured concurrency means parallel async work has a defined start, a defined boundary, and always completes (or is cancelled) before you move on. No fire-and-forget, no leaked promises.

// Below code can handle 1000API calls, but it will handle gracefully with 5 API request to get processed and rest where queued

// Helper: Rejects after a specified timeout
const timeoutSignal = (ms) =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Request Timeout')), ms),
  );

function createPool(concurrency) {
  let active = 0;
  const queue = [];

  // Added timeoutMs default of 10000ms (10 seconds)
  async function run(fn, timeoutMs = 10000) {
    if (active >= concurrency) {
      await new Promise((resolve) => queue.push(resolve));
    }

    active++;
    try {
      // Race the actual task against the timeout promise
      return await Promise.race([fn(), timeoutSignal(timeoutMs)]);
    } catch (error) {
      // Catch error here so individual failures don't crash Promise.all
      return { status: 'failed', error: error.message };
    } finally {
      active--;
      if (queue.length > 0) {
        queue.shift()();
      }
    }
  }

  return { run };
}

const pool = createPool(5); // Max 5 concurrent tasks
const timeoutDuration = 5000; // 5 seconds per request limit

const rawResults = await Promise.all(
  urls.map((url) =>
    pool.run(() => fetch(url).then((r) => r.json()), timeoutDuration),
  ),
);

// Separate successes from failures
const successfulDownloads = rawResults.filter(
  (res) => res?.status !== 'failed',
);
const failedDownloads = rawResults.filter((res) => res?.status === 'failed');

console.log(`Success count: ${successfulDownloads.length}`);
console.log(`Failure count: ${failedDownloads.length}`);
