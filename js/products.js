import { renderProducts } from "./renderProducts.js";
import { filterProducts } from "./filterProducts.js";

const url = "http://localhost:1337/products/";

export async function fetchProducts() {
  try {
    const response = await fetch(url);
    const json = await response.json();

    let products = json;
    console.log(products);
    renderProducts(products);
    filterProducts(products);
  } catch (error) {
    console.log(error);
  }
}

fetchProducts();
