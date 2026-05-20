const fs = require('fs');
const http = require('http');
const PATH = './some-random-file.pdf';

// * Here I created the server, which can send the PDF file
// * Hit them using localhost:3000
// const server = http
//   .createServer((req, res) => {
//     // * Here I loaded the pdf file completely into my RAM and then processing it
//     fs.readFile(PATH, (err, data) => {
//       res.statusCode = 200;
//       res.end(data); // Http response
//     });
//   })
//   .listen(3000);

// * This is optmized approch
const server = http
  .createServer((req, res) => {
    const stream = fs.createReadStream(PATH);

    // res is the writable stream, because pipe will accept only the vb of writable stream
    // res will come under http.response message (Writable Stream)
    stream.pipe(res);
  })
  .listen(3000);
