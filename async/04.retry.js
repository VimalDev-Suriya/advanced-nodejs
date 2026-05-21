async function withRetry(
  fn,
  {
    retries = 3,
    baseDelay = 100,
    maxDelay = 5000,
    signal,
    onRetry = () => {},
  } = {},
) {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    signal?.throwIfAborted();

    try {
      return await fn({ attempt, signal });
    } catch (err) {
      lastError = err;

      // Don't retry cancellations or client errors
      if (err.name === 'AbortError') throw err;
      if (err.status >= 400 && err.status < 500) throw err;
      if (attempt === retries) break;

      const delay = Math.min(baseDelay * 2 ** attempt, maxDelay);
      const jitter = Math.random() * delay * 0.2; // ±20% jitter
      onRetry({ attempt, delay, err });

      await new Promise((res, rej) => {
        const t = setTimeout(res, delay + jitter);
        signal?.addEventListener(
          'abort',
          () => {
            clearTimeout(t);
            rej(signal.reason);
          },
          { once: true },
        );
      });
    }
  }

  throw lastError;
}

// Usage
const data = await withRetry(({ signal }) => fetch('/api/flaky', { signal }), {
  retries: 5,
  baseDelay: 200,
  signal: AbortSignal.timeout(30_000),
  onRetry: ({ attempt, delay }) =>
    logger.warn(`retry ${attempt} in ${delay}ms`),
});
