const { AsyncLocalStorage } = require('async_hooks');

const store = new AsyncLocalStorage();

const log = (message) => {
  let context = store.getStore();

  console.log(`[${context?.requestId ?? 'no-ctx'}] ${message}`);
};

const getUserDetails = async (id) => {
  // * The Store is the first param of run function
  return await store.run({ requestId: id, startTime: Date.now() }, async () => {
    log('Getting the Data from DB');
    return await retriveDataFromDB();
  });
};

const retriveDataFromDB = async () => {
  // * Here I am retriving the details from the context, rather than passing it through params
  const context = store.getStore();

  const data = await new Promise((resolve) =>
    setTimeout(() => {
      resolve(
        `User details of ${context.requestId} was requested successfully`,
      );
    }, 2000),
  );

  console.log('data fetched successfully');
  return data;
};

const getAllData = async () => {
  const data = await Promise.all([
    getUserDetails('user-1'),
    getUserDetails('user-2'),
    getUserDetails('user-3'),
  ]);

  data.forEach((d) => console.log(d));
};

getAllData();

// **********************************************************************************

// * Sometims it happens that we cannot able to wrap all the asyn functionalities using store.run. On that occasion we can use store.enterWith. This will highly used in middleware kind of functionalities

// enterWith() sets the store for the current context AND
// all subsequent async operations — without a wrapping fn.
// Use it in middleware where you don't control the outer fn.
const als = new AsyncLocalStorage();

// enterWith() sets the store for the current context AND
// all subsequent async operations — without a wrapping fn.
// Use it in middleware where you don't control the outer fn.

class ExpressLikeMiddleware {
  static install(app) {
    app.use((req, res, next) => {
      // Can't use run() here — next() is called outside our fn
      // enterWith() is the escape hatch for middleware patterns
      als.enterWith({
        requestId: req.headers['x-request-id'] ?? randomUUID(),
        userId: req.user?.id ?? null,
      });
      next();
    });
  }
}

// getStore() anywhere downstream sees the middleware-set value
async function someDeepService() {
  const { requestId } = als.getStore() ?? {};
  // ... requestId is available with no argument threading
}
