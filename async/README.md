# Async operations in Node JS:

## AsyncLocalStorage

`AsyncLocalStorage` - a Thread local storage for all async functionalities, which keeps track through await and native async primitives.

- Without this it will be very tough for us to track the corresponding user id. This plays a key role during the `concurrent` execution of data.
- AsyncLocalStorage gives you a `per-async-execution-chain store` that propagates automatically through every await, callback, setTimeout, and event emitter in that chain — without threading arguments through every function call.

```js
// * Creating the instance
const store = new AsyncLocalStorage();

store.run(storeObject, cb);

store.enterWith(storeObject);

// StoreObject is the actual data that should be keep in context for all set of data
// cb is the place where all async operations will take place
```

## AsyncResources:

When we need to maintain the context for EventEmitters, 3rd party libraries , then we can use `AsyncResouces`, this will help us to bind the context.
