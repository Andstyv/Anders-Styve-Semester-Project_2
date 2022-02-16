import { addToCart } from "./addToCart.js";
import { getUserName } from "./storage.js";

const url = "http://localhost:1337";

export function renderProducts(productsToRender) {
  const container = document.querySelector(".container");
  const username = getUserName();

  container.innerHTML = "";

  productsToRender.forEach((product) => {
    let cssStar = "fas";
    const hasImage = product.image;
    container.innerHTML += `<div class="product__card">
                              <div class="product__image">
                              ${hasImage ? `<img class="product__img" src="${url}${product.image.url}"></img>` : `<div>No image yet</div>`}</div>
                              <div class="product__content">
                              <h3 class="product__title">${product.title}</h3>
                              <p class="product__price">$${product.price}</p>
                              <a class ="product__link" href="product.html?id=${product.id}">Explore</a>   
                              ${username ? `<a href="edit.html?id=${product.id}" >Edit article</a>` : ""}</div>
                            </div>`;
  });

  const starFavBtn = document.querySelectorAll(".article__fav");
  starFavBtn.forEach((button) => {
    button.addEventListener("click", addToCart);
  });
}

{
  /* <i class="article__fav ${cssStar} fa-shopping-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-description="${product.description}" data-imgurl="${
  hasImage ? product.image.url : ""
}">Add</i> */
}
