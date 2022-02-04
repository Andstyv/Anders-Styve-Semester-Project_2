import { renderProducts } from "./renderProducts.js";
import { getCartItems } from "./getCartItems.js";

let itemsInCart = getCartItems();
console.log(itemsInCart);

renderProducts(itemsInCart);
