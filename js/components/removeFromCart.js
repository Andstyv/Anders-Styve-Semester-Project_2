import { getCartItems } from "./getCartItems.js";
import { renderCart } from "./renderCart.js";

export function RemoveFromCart() {
  const id = this.dataset.id;
  const currentInCart = getCartItems();

  const productExists = currentInCart.find(function (cartProducts) {
    return cartProducts.id === id;
  });

  if (productExists) {
    productExists.qty = productExists.qty - 1;
    if (productExists.qty >= 1) {
      saveCart(currentInCart);
      renderCart(currentInCart);
    } else {
      const newCartProducts = currentInCart.filter((prod) => prod.id !== id);
      saveCart(newCartProducts);
      renderCart(newCartProducts);
    }
  } else {
    alert(`Error: ${error}`);
  }
}

function saveCart(items) {
  localStorage.setItem("CartItems", JSON.stringify(items));
}
