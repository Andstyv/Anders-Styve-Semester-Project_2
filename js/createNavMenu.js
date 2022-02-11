import { getUserName } from "./storage.js";

export function createNavMenu() {
  const { pathname } = document.location;

  const username = getUserName();

  let authLink = `<li><a href="login.html" class="${pathname === "/login.html" ? "active" : ""}">Login</a></li>`;
  let logoutLink = "";

  if (username) {
    authLink = `<li><span>Logged in as: ${username}</span></li>`;
    logoutLink = `<li><button id="logout-btn">Log out</button></li>`;
  }

  const navContainer = document.querySelector(".nav-container");

  navContainer.innerHTML = `<ul>
    <li><a href="/" class="${pathname === "/" ? "active" : ""}">Home</a></li>
    <li><a href="products.html"class="${pathname === "/products.html" ? "active" : ""}">Products</a></li>
    <li><a href="cart.html"class="${pathname === "/cart.html" ? "active" : ""}">Cart</a></li>
    ${authLink}
    ${logoutLink}
</ul>`;
}
