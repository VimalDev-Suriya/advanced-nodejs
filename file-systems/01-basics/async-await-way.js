const fs = require('node:fs/promises');
const fsAsync = require('node:fs');

const projectFolder = `${__dirname}/docs`;

const createDirectory = async () => {
  try {
    if (!fsAsync.existsSync(projectFolder)) return;

    // * if Recursive is false, then mkdir returns 'undefined'
    // If true, then 'actual path'
    const createDir = await fs.mkdir(projectFolder, { recursive: true });

    console.log(`created ${createDir}`); // created \\?\D:\Developement_Avecto\Learnings\NODEJS\advanced-nodejs\file-systems\01-basics\docs

    const path = await fs.realpath(createDir);
    console.log(path); // D:\Developement_Avecto\Learnings\NODEJS\advanced-nodejs\file-systems\01-basics\docs

    // * Wrote the data into the file, in async manner
    const filePath = `${path}/test.txt`;
    await fs.writeFile(filePath, 'Hello Dude');

    console.log('File written');

    // * utf-8 tells that the data should be in string format
    // If not it will be in Buffer type, we shoudl be using toString()
    const data = await fs.readFile(filePath, {
      encoding: 'utf-8',
    });

    console.log('Read data', data);
  } catch (err) {
    console.error(err.message);
  }
};

createDirectory();
