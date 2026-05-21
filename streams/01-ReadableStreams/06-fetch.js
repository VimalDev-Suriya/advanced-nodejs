// * Example of Readble stream
// As we are getting the data from incoming message

async function processStream(url) {
  const response = await fetch(url);

  // Directly iterate over the stream body
  for await (const chunk of response.body) {
    // Each 'chunk' is typically a Uint8Array
    console.log(`Received chunk of size: ${chunk.length}`);
  }

  console.log('Stream finished.');
}

processStream('https://jsonplaceholder.typicode.com/todos/1');
