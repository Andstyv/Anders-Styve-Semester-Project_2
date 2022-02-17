import { renderProducts } from "./modules/renderProducts.js";
import { logout } from "./modules/logout.js";
import { createNavMenu } from "./modules/createNavMenu.js";
import { getToken } from "./utils/storage.js";
import { addNewProduct } from "./modules/addNewProduct.js";
import { filterProducts } from "./modules/filterProducts.js";

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
