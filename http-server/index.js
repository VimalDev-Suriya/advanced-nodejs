const http = require('node:http');
const fs = require('node:fs/promises');

const textResponse = (_, response) => {
  // To set the response header
  response.setHeader('Content-Type', 'text/plain');
  response.setHeader('My-Header', 'Suriya');

  // To send the response, we can use write to send the multiple set of responses
  response.write('Hello Dude!!!!');
  response.write('How are you?');
  response.end(); // Whenver we ue write we should be using end, to discard the TCP connection
};

const htmlResponse = async (req, resp) => {
  let path = '';

  if (req.url === '/') {
    path += 'index.html';
  } else if (req.url === '/home') {
    //  * Redirections
    resp.statusCode = 301;
    resp.setHeader('Location', '/');
    resp.end();
    return;
  } else if (req.url === '/about') {
    path += 'about.html';
  } else if (req.url === '/join') {
    path += 'join.html';
  } else {
    path += '404.html';
    resp.statusCode = 404;
  }

  console.log('path', path, req.url);
  try {
    const data = await fs.readFile(`${__dirname}/screens/${path}`);

    // * I can use end function to return the data if there is not much more data to return
    resp.end(data);
  } catch (error) {
    console.log(error);
  }
};

const server = http.createServer(async (request, response) => {
  console.log(request.url); // logs the request path
  console.log(request.method); // logs request method

  //   textResponse(null, response);
  await htmlResponse(request, response);
});

server.listen(3000, 'localhost', () => {
  console.log('server is running in post 3000');
});
