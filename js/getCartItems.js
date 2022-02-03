export function getCartItems() {
  const productsInCart = localStorage.getItem("CartItems");

  if (productsInCart === null) {
    return [];
  } else {
    return JSON.parse(productsInCart);
  }
}
