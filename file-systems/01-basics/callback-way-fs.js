// * Below we are using the standard NodeJS syntaxes to handle the file functionality
// * Below code is the Async, but follows the callback stratefy to handle the file
// * Below code as the major flaw, as each functionality should be dependent of each other, as the nested callback results in 'pyramid of dom'

const fs = require('fs');

const newFolderPath = `${__dirname}/docs`;

console.log('Code Execution Started');

// * existsSync determines, whether the current path is actully present or not
// * This will prevent the error like "file/folder" already exists
if (!fs.existsSync(newFolderPath)) {
  console.log(
    `The following path is not found ${newFolderPath}, so creating the new one`,
  );
  // * Will create the Folder in the current directory
  // It is the async function
  fs.mkdir(newFolderPath, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('Folder SUccessfully Created');
    }
  });

  console.log('ExistsSync executed successfully');
}

// ************* To Create the file  *************
console.log('Going to create a new file');

const filepath = `${newFolderPath}/text.txt`;

fs.writeFile(filepath, 'Hello Suriya!!', (err) => {
  if (err) {
    console.log('Error thrown during write', err);
  }

  console.log('Completed the write successfully');
});
console.log('Write completion done, but this log will be executed first');

// ************* To Read the file  *************
console.log('Lets start reading about the file which we created');

// * Determining whether the file to be read is exist or not
if (fs.existsSync(filepath)) {
  // * Reading the file
  fs.readFile(filepath, (err, data) => {
    if (err) {
      console.log('Failed to read the content');
    } else {
      // * The data will be in Buffer, to convert them into the data we will be using toString()
      console.log(data.toString());
    }
  });
}

console.log('FIle read from code executed, but will be executed first');

// ************* To Delete the file  *************

if (fs.existsSync(filepath)) {
  fs.unlink(filepath, (err) => {
    if (err) {
      console.log('failed to remove teh file');
    } else {
      console.log('file removed successfully');
    }
  });
}

if (fs.existsSync(newFolderPath)) {
  fs.rmdir(newFolderPath, (err) => {
    if (err) {
      console.log('failed to remove teh folder');
    } else {
      console.log('folder removed successfully');
    }
  });
}
