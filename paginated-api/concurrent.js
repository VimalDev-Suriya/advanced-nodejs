// * This is suitable if we dont have any rate limits from the consuming API end
// Then we can use concurrent method to fetch the data

// Here we are hitting 20APi calls the time

const fetchData = async () => {
  try {
    // * to get the total pages, performing 1 API call.
    const rawData = await fetch(`https://dummyjson.com/users?limit=10`);
    const { users, total } = await rawData.json();

    const totalPages = Math.floor((total - 1) / 10); // because in each API call we will have 10 data

    // * + 1 due to the index starts with 0
    const map = Array.from({ length: totalPages }, (_, i) => i + 1);

    const result = await Promise.all(
      map.map((i) => {
        return fetch(
          `https://dummyjson.com/users?limit=10&skip=${i * 10}`,
        ).then((data) => data.json());
      }),
    );

    const parsedData = result.map((page) => page.users).flat();

    return [...users, ...parsedData];
  } catch (error) {
    console.log('SOme error', error);
  }
};

const finalResult = fetchData();
console.log(finalResult);
