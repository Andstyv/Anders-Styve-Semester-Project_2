import { renderProducts } from "./renderProducts.js";
import { filterProducts } from "./filterProducts.js";
import { logout } from "./logout.js";
import { createNavMenu } from "./createNavMenu.js";

const url = "http://localhost:1337/products/";

createNavMenu();

export async function fetchProducts() {
  try {
    const response = await fetch(url);
    const json = await response.json();

    let products = json;
    console.log(products);
    renderProducts(products);
    filterProducts(products);
    logout();
  } catch (error) {
    console.log(error);
  }
}

fetchProducts();
