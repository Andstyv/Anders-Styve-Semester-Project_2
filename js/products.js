import { renderProducts } from "./components/renderProducts.js";
import { logout } from "./components/logout.js";
import { createNavMenu } from "./components/createNavMenu.js";
import { addNewProduct } from "./components/addNewProduct.js";
import { filterProducts } from "./components/filterProducts.js";
import { itemsInCartTracker } from "./components/itemsInCartTracker.js";
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
