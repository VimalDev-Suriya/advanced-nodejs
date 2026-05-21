const { AsyncLocalStorage, AsyncResource } = require('async_hooks');
const EventEmitter = require('events');

const als = new AsyncLocalStorage();
const emitter = new EventEmitter();

// ******************************** Error ***************************
// Eventhough the emmiter was registered within the als.run, we still wont get the store details
// als.run({ requestId: 'req-1' }, () => {
//   console.log('inside run:', als.getStore().requestId); // req-1

//   emitter.on('event', () => {
//     console.log('store:', als.getStore()); // undefined
//   });
// });

// process.nextTick(() => {
//   emitter.emit('event'); // fires listener — context LOST
// });
// ******************************** Error ***************************

als.run({ requestId: 'req-1' }, () => {
  console.log('inside run:', als.getStore().requestId); // req-1

  emitter.on(
    'event',
    AsyncResource.bind(() => {
      // * It will bind the context to cb
      console.log('store:', als.getStore()); // { requestId: 'req-1' }
    }),
  );
});

// * Process.nextTick to simulate the async funtionalities
process.nextTick(() => {
  emitter.emit('event'); // Context will be maintained
});
