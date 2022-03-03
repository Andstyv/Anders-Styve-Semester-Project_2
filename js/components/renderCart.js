import { RemoveFromCart } from "./removeFromCart.js";
import { baseUrl } from "../utils/APIUrls.js";

export function renderCart(productsToRender) {
  const cartContainer = document.querySelector(".cart-container");
  const sumContainer = document.querySelector(".sum-container");

  cartContainer.innerHTML = "";

  if (!productsToRender.length) {
    container.innerHTML = `<div class="cart-container__empty">Cart is empty</div>`;
  }

  let totalPrice = 0;
  for (let i = 0; i < productsToRender.length; i++) {
    totalPrice += productsToRender[i].price * productsToRender[i].qty;
  }
  sumContainer.innerHTML = `<p class="sum-container__total">Total price: $${totalPrice}</p>`;

  productsToRender.forEach((product) => {
    cartContainer.innerHTML += `
                            <div class="cart-card">
                            <div class="cart-card__head">
                            <img class="cart-card__img" src="${baseUrl}${product.image.url}" alt="${product.image.alternativeText}" ></img>
                            <h2 class="cart-card__title"><a class ="cart-product__link" href="product.html?id=${product.id}" >${product.title}</a></h2>
                            </div>
                            <div class="cart-card__qty">
                              <p>Qty:</p>
                              <p>${product.qty}</p>

                              </div>
                            
                            <div class="cart-card__price">
                              <p>Price:</p>
                              <p>$${product.price * product.qty}</p></div>

                            
                            <div class="cart-card__remove" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-description="${product.description}" data-imgurl="${
      product.image.url
    }"><i class="cart-card__icon fas fa-times-circle"></i>Remove</div>
                            </div>
                            `;
  });

  const removeBtn = document.querySelectorAll(".cart-card__remove");
  removeBtn.forEach((button) => {
    button.addEventListener("click", RemoveFromCart);
  });
}

// EDIT QUANTITY BTNS
// <button id="btn-down" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-description="${product.description}" data-imgurl="${product.image.url}">down</button>
// <button id="btn-up">up</button>

// const down = document.getElementById("btn-down");
// const up = document.getElementById("btn-up");

// down.addEventListener("click", RemoveFromCart);
