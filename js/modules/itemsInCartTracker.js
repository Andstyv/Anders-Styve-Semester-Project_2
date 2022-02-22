import { getCartItems } from "./getCartItems.js";

export function itemsInCartTracker() {
  const shopcart = document.querySelector(".shopcart");
  let itemsInCart = getCartItems();

  let totalNumberOfProducts = 0;
  for (let i = 0; i < itemsInCart.length; i++) {
    totalNumberOfProducts += itemsInCart[i].qty;
  }
  console.log(totalNumberOfProducts);

  if (!itemsInCart.length) {
    shopcart.style.display = "none";
  } else {
    shopcart.style.display = "block";
  }

  shopcart.innerHTML = `<div class="cart-widget-content">
                            <i class="fas fa-shopping-bag"></i><span>${itemsInCart.length ? totalNumberOfProducts : ""}</span>
                        </div>`;
}
