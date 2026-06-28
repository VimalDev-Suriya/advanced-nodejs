// * both __dirname and __filename will fail in ES6 Module system

console.log(global);
// console.log(__dirname);
// console.log(__filename);

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname); // D:\Developement_Avecto\Learnings\NODEJS\advanced-nodejs\npm
console.log(__filename); // D:\Developement_Avecto\Learnings\NODEJS\advanced-nodejs\npm\index.js

// * We can use the below syntax from import stateent to retrive the same
console.log(import.meta.dirname);
console.log(import.meta.filename);
console.log(import.meta.url); // file:///D:/Developement_Avecto/Learnings/NODEJS/advanced-nodejs/npm/commonjs.js
console.log(import.meta.main); // true
