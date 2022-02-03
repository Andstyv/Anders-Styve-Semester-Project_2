import { getCartItems } from "./getCartItems.js";

export function addToCart() {
  console.log("click");
  const id = this.dataset.id;
  const title = this.dataset.title;

  const currentInCart = getCartItems();

  const product = {
    id: id,
    title: title,
  };
  currentInCart.push(product);
  saveCart(product);
}

function saveCart(items) {
  localStorage.setItem("Cart", JSON.stringify(items));
}
