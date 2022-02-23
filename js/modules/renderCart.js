import { RemoveFromCart } from "./removeFromCart.js";

const url = "http://localhost:1337";

export function renderCart(productsToRender) {
  const container = document.querySelector(".cart-container");
  const sumContainer = document.querySelector(".sum-container");

  container.innerHTML = "";

  if (!productsToRender.length) {
    console.log("empty");
    container.innerHTML = "Empty";
  }

  let totalPrice = 0;
  for (let i = 0; i < productsToRender.length; i++) {
    totalPrice += productsToRender[i].price * productsToRender[i].qty;
  }
  sumContainer.innerHTML = `<p class="sum-container__total">Total price: $${totalPrice}</p>`;

  productsToRender.forEach((product) => {
    container.innerHTML += `
                            <div class="cart__card">
                            <div class="cart-product__head">
                            <img class="cart-product__img" src="${url}${product.image.url}"></img>
                            <h3 class="cart-product__title"><a class ="cart-product__link" href="product.html?id=${product.id}" >${product.title}</a></h3>
                            </div>
                            <p class="cart-product__qty">Qty: ${product.qty}</p>
                            <p class="cart-product__price">$${product.price * product.qty}</p>

                            
                            <div class="cart-product__remove" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-description="${product.description}" data-imgurl="${
      product.image.url
    }"><i class="cart-product__icon fas fa-times-circle"></i>Remove</div>
                            </div>
                            `;
  });

  const starFavBtn = document.querySelectorAll(".cart-product__remove");
  starFavBtn.forEach((button) => {
    button.addEventListener("click", RemoveFromCart);
  });
}
