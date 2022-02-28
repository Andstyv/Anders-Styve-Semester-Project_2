import { RemoveFromCart } from "./removeFromCart.js";
import { baseUrl } from "../utils/APIUrls.js";

export function renderCart(productsToRender) {
  const container = document.querySelector(".cart-container");
  const sumContainer = document.querySelector(".sum-container");

  container.innerHTML = "";

  if (!productsToRender.length) {
    console.log("empty");
    container.innerHTML = `<div class="cart-container__empty">Cart is empty</div>`;
  }

  let totalPrice = 0;
  for (let i = 0; i < productsToRender.length; i++) {
    totalPrice += productsToRender[i].price * productsToRender[i].qty;
  }
  sumContainer.innerHTML = `<p class="sum-container__total">Total price: $${totalPrice}</p>`;

  productsToRender.forEach((product) => {
    container.innerHTML += `
                            <div class="cart-card">
                            <div class="cart-card__head">
                            <img class="cart-card__img" src="${baseUrl}${product.image.url}"></img>
                            <h3 class="cart-card__title"><a class ="cart-product__link" href="product.html?id=${product.id}" >${product.title}</a></h3>
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
    }"><i class="cart-product__icon fas fa-times-circle"></i>Remove</div>
                            </div>
                            `;
  });

  const starFavBtn = document.querySelectorAll(".cart-card__remove");
  starFavBtn.forEach((button) => {
    button.addEventListener("click", RemoveFromCart);
  });
}

// EDIT QUANTITY BTNS
// <button id="btn-down" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-description="${product.description}" data-imgurl="${product.image.url}">down</button>
// <button id="btn-up">up</button>

// const down = document.getElementById("btn-down");
// const up = document.getElementById("btn-up");

// down.addEventListener("click", RemoveFromCart);
