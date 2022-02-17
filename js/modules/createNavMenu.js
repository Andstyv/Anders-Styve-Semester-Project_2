import { getCartItems } from "./getCartItems.js";
import { getUserName } from "../utils/storage.js";

export function createNavMenu() {
  let itemsInCart = getCartItems();
  const { pathname } = document.location;

  const username = getUserName();

  let authLink = `<li><a href="login.html" class="${pathname === "/login.html" ? "active" : ""}">Login</a></li>`;
  let logoutLink = "";

  if (username) {
    authLink = `<li><span>Logged in as: ${username}</span></li>`;
    logoutLink = `<li><button id="logout-btn">Log out</button></li>`;
  }

  const navContainer = document.querySelector(".nav-container");

  navContainer.innerHTML = `
  <div class="nav__logo"><i class="fab fa-pushed">shoos</i></div>
  <div class="nav__left">
    <ul class="nav__list">
      <li class="nav__item"><a href="/" class="${pathname === "/" ? "nav__link--active" : "nav__link"}">Home</a></li>
      <li class="nav__item"><a href="products.html"class="${pathname === "/products.html" ? "nav__link--active" : "nav__link"}">Products</a></li>
      <li class="nav__item"><a href="cart.html"class="${pathname === "/cart.html" ? "nav__link--active" : "nav__link"}">Cart - <span>${itemsInCart.length ? itemsInCart.length : ""}</span></a></li>
    </ul>
  </div>
<div class="nav__right">
<ul class="nav__list">
${authLink}
${logoutLink}
</ul>
</div>`;
}
