// * Handling the Paginated API
// Consider the scenario, where we need to find the Order ID, for that we have given the API which are paginated.
// * Also if we want to determine the first possible data and neeed to terminate the rest, we can use them heer

// * To Handle this situation, we can use Generator fucntion to fetch the data.

async function* fetchProducts() {
  let currentPage = 0;
  let hasMore = true;

  while (hasMore) {
    try {
      const rawData = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${currentPage * 10}`,
      );

      const { products, total } = await rawData.json();

      if (products?.length > 0) {
        yield products;
      }

      if (total > currentPage * 10) {
        currentPage++;
      } else {
        hasMore = false;
      }
    } catch (error) {
      throw error;
    }
  }
}

const processAPIData = async () => {
  try {
    let inStock;
    const products = await fetchProducts();

    for await (let page of products) {
      inStock = page.reduce(
        (acc, product) => {
          const { category, stock } = product;

          acc[category] = (acc[category] && acc[category] + stock) || stock;
          return acc;
        },
        { ...inStock },
      );
    }

    return inStock;
  } catch (error) {
    console.log('Some error', error);
  }
};

const stockElements = processAPIData();
console.log(stockElements);
// Result
// {
//   beauty: 392,
//   fragrances: 280,
//   furniture: 245,
//   groceries: 1417,
//   'home-decoration': 220,
//   'kitchen-accessories': 1656,
//   laptops: 258,
//   'mens-shirts': 307,
//   'mens-shoes': 188,
//   'mens-watches': 349,
//   'mobile-accessories': 531,
//   motorcycle: 180,
//   'skin-care': 223,
//   smartphones: 695,
//   'sports-accessories': 871,
//   sunglasses: 198,
//   tablets: 201,
//   tops: 245,
//   vehicle: 341,
//   'womens-bags': 300,
//   'womens-dresses': 156,
//   'womens-jewellery': 128,
//   'womens-shoes': 240,
//   'womens-watches': 158
// }
