const { Transform } = require('stream');

const someDelay = new Promise((resolve) => setTimeout(resolve, 5000));

const uppercase = new Transform({
  transform(chunk, enc, cb) {
    console.log('Inside transform');
    const mutatedValue = chunk.toString().toUpperCase();

    this.push(mutatedValue);
    cb(); // tells give me the next chunk - if not provided - then its the issue
  },
});

// Getting the Data from the command prompt
// Passing into the uppercase transforms -> it changes the values
// Return the data to the command prompt value
process.stdin.pipe(uppercase).pipe(process.stdout);

// *************** Example 2 ***************
const filterEven = new Transform({
  objectMode: true,
  transform(num, enc, cb) {
    // Push NOTHING for odd numbers — filter them out
    if (num % 2 === 0) {
      this.push(num); // push once for even numbers
    }
    // Push MULTIPLE outputs for special values
    if (num === 0) {
      this.push('zero!');
      this.push('found it!');
    }
    cb(); // without this you will only get value of 1 item
  },
});

// * data event runs after the transform function
filterEven.on('data', (d) => console.log(d));
[0, 1, 2, 3, 4, 5, 6].forEach((n) => filterEven.write(n)); // Here writing the data
filterEven.end();

// *************** Example 3 ***************

const strictJson = new Transform({
  transform(chunk, enc, cb) {
    try {
      const jsonSting = JSON.parse(chunk.toString());

      // * the returned value should be proper string/ Buffer type
      this.push(JSON.stringify(jsonSting, null, 2));
      cb();
    } catch (error) {
      cb(error);
    }
  },
});

strictJson.on('error', (error) => console.log(error));
strictJson.on('data', (chunk) => process.stdout.write(chunk));

strictJson.write('{"name":"Alice","age":30}');
strictJson.write('not json at all'); // triggers error
