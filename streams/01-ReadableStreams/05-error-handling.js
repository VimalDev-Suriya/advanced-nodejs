const { pipeline } = require('stream/promises');
const fs = require('fs');

// Pattern 1 — for await with try/catch (cleanest)
async function process(file) {
  const rs = fs.createReadStream(file);

  try {
    // * This is equivalent to handle the streams in "on data mode (flowing mode)"
    for await (const chunk of rs) {
      await handleChunk(chunk); //
    }
  } catch (err) {
    // catches both stream errors AND errors thrown inside the loop
    console.error('Processing failed:', err.message);
    rs.destroy(); // ensure the fd is released
  }
}

// Pattern 2 — event listeners (when you can't use async/await)
const rs = fs.createReadStream('file.txt');

rs.on('error', (err) => {
  console.error('Stream error:', err.code); // e.g. ENOENT, EACCES
  // stream auto-closes on error — no need to call .destroy()
});

// Pattern 3 — .destroy() to abort a stream mid-flight
const rs = fs.createReadStream('huge.file');
rs.on('data', (chunk) => {
  if (foundWhatWeNeeded(chunk)) {
    rs.destroy(); // immediately stop — 'close' event fires, no 'end'
  }
});

rs.on('close', () => console.log('Stream closed (may be before EOF)'));
rs.on('end', () => console.log('Stream ended (always at EOF)'));
