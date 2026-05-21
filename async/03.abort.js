let abortInstance;

const fetchData = async (url) => {
  if (abortInstance) abortInstance.abort();

  // * We can use settimout, but also AbortSignal.timeout which is more relaibale than timeout
  let abortTimeout = AbortSignal.timeout(3000);
  abortInstance = new AbortController();

  // * Combining multiple Abort signals
  const combinedSignal = AbortSignal.any([abortTimeout, abortInstance.signal]);

  abortInstance.signal.addEventListener('abort', () => {
    console.log('aborted');
  });

  try {
    const rawData = await fetch(url, {
      signal: combinedSignal,
    });
    const data = await rawData.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

fetchData('https://dummyjson.com/users?limit=10&skip=1&delay=5000');
fetchData('https://dummyjson.com/users?limit=10&skip=1&delay=5000');
fetchData('https://dummyjson.com/users?limit=10&skip=1&delay=5000');
fetchData('https://dummyjson.com/users?limit=10&skip=1&delay=5000');
