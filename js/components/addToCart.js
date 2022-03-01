import { getCartItems } from "./getCartItems.js";
import { itemsInCartTracker } from "./itemsInCartTracker.js";

export function addToCart() {
  const id = this.dataset.id;
  const title = this.dataset.title;
  const price = this.dataset.price;
  const descr = this.dataset.description;
  const imgUrl = this.dataset.imgurl;
  const quantity = 1;

  const currentInCart = getCartItems();

  const productExists = currentInCart.find(function (cartProducts) {
    return cartProducts.id === id;
  });

  if (productExists === undefined) {
    const product = {
      id: id,
      title: title,
      qty: quantity,
      price: parseFloat(price),
      description: descr,
      image: {
        url: imgUrl,
      },
    };
    currentInCart.push(product);
    saveCart(currentInCart);
    itemsInCartTracker();
  } else {
    productExists.qty = productExists.qty + quantity;
    saveCart(currentInCart);
    itemsInCartTracker();
  }
}

function saveCart(items) {
  localStorage.setItem("CartItems", JSON.stringify(items));
}
