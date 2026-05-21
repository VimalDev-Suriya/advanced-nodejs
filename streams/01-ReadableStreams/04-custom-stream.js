const { Readable } = require('stream');

// *From method accepts the iteratable

// From a plain array
const fromArray = Readable.from(['line 1\n', 'line 2\n', 'line 3\n']);

// From a string
const fromString = Readable.from('hello world');

// From a Set, Map, any iterable
const fromSet = Readable.from(new Set([1, 2, 3, 4]));

// From an async generator — the most powerful form
async function* weatherData() {
  const cities = ['Chennai', 'Mumbai', 'Delhi'];
  for (const city of cities) {
    await new Promise((r) => setTimeout(r, 500)); // simulate API call
    yield { city, temp: Math.round(20 + Math.random() * 15) };
  }
}

// * Here the
const weatherStream = Readable.from(weatherData(), { objectMode: true });

// weatherStream.on('data', (record) => {
//   console.log(`${record.city}: ${record.temp}°C`);
// });

// *********** Default way to access teh Data ************
// const getData = async () => {
//   const data = weatherData();

//   for await (let d of data) {
//     console.log(d);
//   }
// };

// getData();
