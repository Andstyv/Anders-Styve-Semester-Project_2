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

  console.log(productExists);

  if (productExists === undefined) {
    const product = {
      id: parseFloat(id),
      title: title,
      price: parseFloat(price),
      qty: quantity,
      description: descr,
      image: {
        url: imgUrl,
      },
    };

    console.log(product);
    currentInCart.push(product);
    saveCart(currentInCart);
    itemsInCartTracker();
  } else {
    console.log("Not existing");
  }
}

function saveCart(items) {
  localStorage.setItem("CartItems", JSON.stringify(items));
}

// const productExists = currentInCart.find(function (cartProducts) {
//   return cartProducts.id === id;
// });

// if (productExists === undefined) {
//   const product = {
//     id: id,
//     title: title,
//     price: parseFloat(price),
//     description: descr,
//     image: {
//       url: imgUrl,
//     },
//   };
//   currentInCart.push(product);
//   saveCart(currentInCart);
//   itemsInCartTracker();
// } else {
//   const newCartProducts = currentInCart.filter((prod) => prod.id !== id);
//   saveCart(newCartProducts);
//   itemsInCartTracker();
// }

// let sums = {};
// for (let i = 0; i < currentInCart.length; i++) {
//   let obj = currentInCart[i];
//   sums[obj.id] = sums[obj.id] === undefined ? 0 : sums[obj.id];
//   sums[obj.id] += obj.price;
// }
// console.log(sums);
