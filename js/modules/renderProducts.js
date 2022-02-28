import { addToCart } from "./addToCart.js";
import { getUserName } from "../utils/storage.js";
import { baseUrl } from "../utils/APIUrls.js";

export function renderProducts(productsToRender) {
  const container = document.querySelector(".products-container");
  const username = getUserName();

  container.innerHTML = "";

  productsToRender.forEach((product) => {
    const hasImage = product.image;
    container.innerHTML += `<div class="product-card">
                              <div class="product-card__image">
                              ${hasImage ? `<img class="product-card__img" src="${baseUrl}${product.image.url}"></img>` : `<div>No image yet</div>`}</div>
                              <div class="product-card__content">
                              <h3 class="product-card__title">${product.title}</h3>
                              <p class="product-card__price">$${product.price}</p>
                              <div class="btn-container">
                              <a class ="btn-secondary" href="product.html?id=${product.id}">Explore</a></div>
                              <div class="btn-container">
                              ${username ? `<a class="btn-main"href="edit.html?id=${product.id}" >Edit product</a>` : ""}</div></div>
                            </div>`;
  });

  const starFavBtn = document.querySelectorAll(".article__fav");
  starFavBtn.forEach((button) => {
    button.addEventListener("click", addToCart);
  });
}
