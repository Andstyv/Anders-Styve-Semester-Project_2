import { addToCart } from "./addToCart.js";
import { getCartItems } from "./getCartItems.js";
import { RemoveFromCart } from "./removeFromCart.js";
import { getUserName } from "./storage.js";

const url = "http://localhost:1337";

export function renderCart(productsToRender) {
  console.log("RenderCart");
  const container = document.querySelector(".container");
  const username = getUserName();

  container.innerHTML = "";

  console.log(productsToRender);

  if (!productsToRender.length) {
    console.log("empty");
    container.innerHTML = "Empty";
  }

  productsToRender.forEach((product) => {
    let cssStar = "fas";
    container.innerHTML += `<div class="product__card">
                            <img class="product__img" src="${url}${product.image.url}"></img>
                            <h3 class="product__title">${product.title}</h3>
                            <p class="product__price">Price: ${product.price}</p>
                            <p class="product__descr">${product.description}</p>
                            <i class="article__fav ${cssStar} fa-shopping-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-description="${product.description}" data-imgurl="${
      product.image.url
    }">Remove</i>
                            ${username ? `<a href="edit.html?id=${product.id}" >Edit article</a>` : ""}
                            </div>
                            `;
  });

  const starFavBtn = document.querySelectorAll(".article__fav");
  starFavBtn.forEach((button) => {
    button.addEventListener("click", RemoveFromCart);
  });
}
