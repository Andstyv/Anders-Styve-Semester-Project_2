import { getCartItems } from "./getCartItems.js";

export function addToCart() {
  const id = this.dataset.id;
  const title = this.dataset.title;
  const price = this.dataset.price;
  const descr = this.dataset.description;
  const imgUrl = this.dataset.imgurl;

  const currentInCart = getCartItems();

  const productExists = currentInCart.find(function (cartProducts) {
    return cartProducts.id === id;
  });

  if (productExists === undefined) {
    const product = {
      id: id,
      title: title,
      price: parseFloat(price),
      description: descr,
      image: {
        url: imgUrl,
      },
    };
    currentInCart.push(product);
    saveCart(currentInCart);
  } else {
    const newCartProducts = currentInCart.filter((prod) => prod.id !== id);
    saveCart(newCartProducts);
  }
}

function saveCart(items) {
  localStorage.setItem("CartItems", JSON.stringify(items));
}
