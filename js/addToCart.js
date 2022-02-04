import { getCartItems } from "./getCartItems.js";

export function addToCart() {
  const counter = document.querySelector(".counter");
  const id = this.dataset.id;
  const title = this.dataset.title;
  const price = this.dataset.price;
  const imgUrl = this.dataset.imgurl;

  const currentInCart = getCartItems();

  const productExists = currentInCart.find(function (cartProducts) {
    return cartProducts.id === id;
  });

  if (productExists === undefined) {
    const product = {
      id: id,
      title: title,
      price: price,
      image: {
        url: imgUrl,
      },
    };
    currentInCart.push(product);
    saveCart(currentInCart);
    counter.innerHTML = currentInCart.length;
  } else {
    const newCartProducts = currentInCart.filter((prod) => prod.id !== id);
    saveCart(newCartProducts);
    counter.innerHTML = newCartProducts.length;
  }
}

function saveCart(items) {
  localStorage.setItem("CartItems", JSON.stringify(items));
}
