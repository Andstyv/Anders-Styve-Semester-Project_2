import { renderProducts } from "./renderProducts.js";
import { filterProducts } from "./filterProducts.js";
import { logout } from "./logout.js";
import { createNavMenu } from "./createNavMenu.js";
import { getToken } from "./storage.js";
import { addNewProduct } from "./addNewProduct.js";

const url = "http://localhost:1337/products/";

createNavMenu();
addNewProduct();

export async function fetchProducts() {
  try {
    const response = await fetch(url);
    const json = await response.json();

    let products = json;
    console.log(products);
    renderProducts(products);
    filterProducts(products);
    logout();

    const token = getToken();
  } catch (error) {
    console.log(error);
  }
}

fetchProducts();
