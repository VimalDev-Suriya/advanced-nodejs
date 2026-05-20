const fs = require('fs');
const { pipeline } = require('stream/promises');
const zlib = require('zlib');

const WRITE_PATH = './archive.gz';
const READ_PATH = '../some-random-file.pdf';

const ws = fs.createWriteStream(WRITE_PATH, {
  highWaterMark: 16,
});

const rs = fs.createReadStream(READ_PATH, {
  highWaterMark: 16,
});

const execute = async () => {
  // * pipeline is the one which helps to orchestrate the flow
  // Reading -> zipping -> writing
  await pipeline(rs, zlib.createGzip(), ws);
};

rs.on('end', () => {
  console.log('Successfully Read the data');
});

// * A place where we can give 95% of process got completed
// may be notification
ws.on('finish', () => console.log('Write stream Finished'));

// * A final place where I can perform the action into the newly created file
ws.on('close', () => console.log('Write stream closed'));

execute();
