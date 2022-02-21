import { getCartItems } from "./getCartItems.js";

export function itemsInCartTracker() {
  const shopcart = document.querySelector(".shopcart");
  let itemsInCart = getCartItems();

  if (!itemsInCart.length) {
    shopcart.style.display = "none";
  } else {
    shopcart.style.display = "block";
  }

  shopcart.innerHTML = `<div class="cart-widget-content">
                            <i class="fas fa-shopping-bag"></i><span>${itemsInCart.length ? itemsInCart.length : ""}</span>
                        </div>`;
}
