import { RemoveFromCart } from "./removeFromCart.js";
import { getUserName } from "./storage.js";

const url = "http://localhost:1337";

export function renderCart(productsToRender) {
  const container = document.querySelector(".container");
  const sumContainer = document.querySelector(".sum");
  const username = getUserName();

  container.innerHTML = "";

  if (!productsToRender.length) {
    console.log("empty");
    container.innerHTML = "Empty";
  }

  let totalPrice = 0;
  for (let i = 0; i < productsToRender.length; i++) {
    totalPrice += productsToRender[i].price;
  }
  sumContainer.innerHTML = `Total price: ${totalPrice}`;

  productsToRender.forEach((product) => {
    let cssStar = "fas";

    container.innerHTML += `
                            <div class="product__card">
                            <img class="product__img" src="${url}${product.image.url}"></img>
                            <h3 class="product__title">${product.title}</h3>
                            <p class="product__price">Price: ${product.price}</p>
                            <a class ="product__link" href="product.html?id=${product.id}" >Link to product</a>
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
