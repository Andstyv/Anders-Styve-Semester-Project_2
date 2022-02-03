import { renderProducts } from "./renderProducts.js";

const url = "http://localhost:1337/";

export async function fetchFeaturedProducts() {
  try {
    const productsURL = url + "products/";

    const response = await fetch(productsURL);
    const json = await response.json();

    let products = json;

    const featuredProducts = products.filter(function (product) {
      if (product.featured) {
        return true;
      }
    });
    console.log(featuredProducts);
    console.log(products);
    renderProducts(featuredProducts);
  } catch (error) {
    console.log(error);
  }
}

fetchFeaturedProducts();
