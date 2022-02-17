import { getCartItems } from "./getCartItems.js";
import { renderCart } from "./renderCart.js";

export function RemoveFromCart() {
  const id = this.dataset.id;

  const currentInCart = getCartItems();

  const productExists = currentInCart.find(function (cartProducts) {
    return cartProducts.id === id;
  });

  if (productExists) {
    const newCartProducts = currentInCart.filter((prod) => prod.id !== id);
    saveCart(newCartProducts);
    renderCart(newCartProducts);
  } else {
    console.log("error");
  }
}

function saveCart(items) {
  localStorage.setItem("CartItems", JSON.stringify(items));
}
