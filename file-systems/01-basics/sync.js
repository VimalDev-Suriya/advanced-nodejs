const fs = require('node:fs');

try {
  // Write data synchronously
  fs.writeFileSync('example.txt', 'Hello World!', 'utf8');

  // Read data synchronously
  const data = fs.readFileSync('example.txt', 'utf8');
  console.log(data);
} catch (error) {
  console.error('Synchronous error:', error.message);
}
