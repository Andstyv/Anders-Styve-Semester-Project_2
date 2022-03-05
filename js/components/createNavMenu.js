import { getUserName } from "../utils/storage.js";

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

  navContainer.innerHTML = `
  <div class="nav-content">
  <a href="/"class="nav-content__logo"><img src="../../img/shoos_logo1.png" alt="Shoos logo"></img></a>
  <div class="nav-content__main">
    <ul class="nav-content__list">
      <li class="nav-content__item"><a href="/" class="${pathname === "/" ? "nav-content__link--active" : "nav-content__link"}">Home</a></li>
      <li class="nav-content__item"><a href="products.html"class="${pathname === "/products.html" || pathname === "/product.html" ? "nav-content__link--active" : "nav-content__link"}">Products</a></li>
      <li class="nav-content__item"><a href="cart.html"class="${pathname === "/cart.html" ? "nav-content__link--active" : "nav-content__link"}">Cart</a></li>
    </ul>
  </div>
<div class="nav-content__admin">
<ul class="nav-content__adminlist">
${authLink}
${logoutLink}
</ul>
</div>
</div>`;
}

//<a href="index.html"class="nav-content__logo"><i class="fab fa-pushed"></i><div class="nav-content__logo--txt">shoos</div></a>
