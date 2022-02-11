import { renderProducts } from "./renderProducts.js";
import { getCartItems } from "./getCartItems.js";
import { createNavMenu } from "./createNavMenu.js";
import { logout } from "./logout.js";

let itemsInCart = getCartItems();
console.log(itemsInCart);

createNavMenu();
logout();
renderProducts(itemsInCart);
