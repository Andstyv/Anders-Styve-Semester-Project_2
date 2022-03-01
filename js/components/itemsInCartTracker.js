import { getCartItems } from "./getCartItems.js";

export function itemsInCartTracker() {
  const cartWidgetLink = document.querySelector(".cart-widget__link");
  const cartWidget = document.querySelector(".cart-widget");
  let itemsInCart = getCartItems();

  let totalNumberOfProducts = 0;
  for (let i = 0; i < itemsInCart.length; i++) {
    totalNumberOfProducts += itemsInCart[i].qty;
  }

  if (!itemsInCart.length) {
    cartWidgetLink.style.display = "none";
    cartWidget.style.display = "none";
  } else {
    cartWidgetLink.style.display = "flex";
    cartWidget.style.display = "flex";
  }

  cartWidgetLink.innerHTML = `<div class="cart-widget__content">
                            <i class="fas fa-shopping-bag"></i><span>${itemsInCart.length ? totalNumberOfProducts : ""}</span>
                        </div>`;
}
