const fs = require('fs');
const PATH = './output.txt';

// * Preffered way to handle the write
const writeSafe = async (ws, chunks) => {
  try {
    for (let chunk of chunks) {
      // validating the return statement is more important
      const ok = ws.write(chunk);

      if (!ok) {
        // * Delaying untill the internal buffer frees up / drain

        // * drain is the event which will be executed once intenal buffer is free to get more chunks
        await new Promise((resolve) => ws.once('drain', resolve));
      }
    }

    ws.end(); // States that all teh chuncks where written into destination

    await new Promise((resolve, reject) => {
      ws.on('finish', resolve);
      ws.on('error', reject);
    });
  } catch (error) {
    console.log('SOme Error', error);
  }
};

const ws = fs.createWriteStream(PATH, {
  highWaterMark: 16,
});
const chunks = Array.from({ length: 10 }, () => Buffer.alloc(10, 'X'));
writeSafe(ws, chunks);
