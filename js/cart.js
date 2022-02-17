import { getCartItems } from "./modules/getCartItems.js";
import { createNavMenu } from "./modules/createNavMenu.js";
import { logout } from "./modules/logout.js";
import { renderCart } from "./modules/renderCart.js";

let itemsInCart = getCartItems();
console.log(itemsInCart);

createNavMenu();
logout();
renderCart(itemsInCart);
