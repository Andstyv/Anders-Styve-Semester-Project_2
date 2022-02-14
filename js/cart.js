import { getCartItems } from "./getCartItems.js";
import { createNavMenu } from "./createNavMenu.js";
import { logout } from "./logout.js";
import { renderCart } from "./renderCart.js";

let itemsInCart = getCartItems();
console.log(itemsInCart);

createNavMenu();
logout();
renderCart(itemsInCart);
