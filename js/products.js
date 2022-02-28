import { renderProducts } from "./modules/renderProducts.js";
import { logout } from "./modules/logout.js";
import { createNavMenu } from "./modules/createNavMenu.js";
import { addNewProduct } from "./modules/addNewProduct.js";
import { filterProducts } from "./modules/filterProducts.js";
import { itemsInCartTracker } from "./modules/itemsInCartTracker.js";
import { productsUrl } from "./utils/APIUrls.js";

createNavMenu();
addNewProduct();
itemsInCartTracker();

export async function fetchProducts() {
  try {
    const response = await fetch(productsUrl);
    const json = await response.json();

    let products = json;

    renderProducts(products);
    filterProducts(products);
    logout();
  } catch (error) {
    console.log(error);
  }
}

fetchProducts();
