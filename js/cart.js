import { getCartItems } from "./components/getCartItems.js";
import { createNavMenu } from "./components/createNavMenu.js";
import { logout } from "./components/logout.js";
import { renderCart } from "./components/renderCart.js";

let itemsInCart = getCartItems();

createNavMenu();
logout();
renderCart(itemsInCart);
