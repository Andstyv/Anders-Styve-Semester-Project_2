import { addToCart } from "./addToCart.js";

const url = "http://localhost:1337";

export function renderProducts(productsToRender) {
  const container = document.querySelector(".container");

  container.innerHTML = "";

  productsToRender.forEach((product) => {
    let cssStar = "fas";
    console.log(product.image);
    container.innerHTML += `<div class="product__card">
                            <img class="product__img" src="${url}${product.image.url}"></img>
                            <h3 class="product__title">${product.title}</h3>
                            <p class="product__price">Price: ${product.price}</p>
                            <a class ="product__link" href="product.html?id=${product.id}" >Link to product</a>
                            <i class="article__fav ${cssStar} fa-shopping-cart" data-id="${product.id}" data-title="${product.title}"></i></div>
                            `;
  });

  const starFavBtn = document.querySelectorAll(".article__fav");
  starFavBtn.forEach((button) => {
    button.addEventListener("click", addToCart);
  });
}
