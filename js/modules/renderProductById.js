import { addToCart } from "./addToCart.js";
import { createNavMenu } from "./createNavMenu.js";
import { logout } from "./logout.js";
import { getUserName } from "../utils/storage.js";
import { itemsInCartTracker } from "./itemsInCartTracker.js";
import { baseUrl, productsUrl } from "../utils/APIUrls.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const productUrl = productsUrl + "/" + id;
const container = document.querySelector(".specific-product-container");

createNavMenu();
logout();
itemsInCartTracker();

async function fetchProductById(url) {
  try {
    const response = await fetch(url);
    const product = await response.json();
    const username = getUserName();
    const hasImage = product.image;

    console.log(product);

    container.innerHTML = `
    <a class="btn-secondary "href="products.html">Back</a>
    <div class="specific-product">
    <div class="specific-product__image">
    ${hasImage ? `<img class="specific-product__img" src="${baseUrl + product.image.url}" alt="${product.image.alternativeText}"></img>` : `<img class="specific-product__img">No image yet</img>`}</div>

    <div class="specific-product__content">
    <h3 class="specific-product__title">${product.title}</h3>
    <p class="specific-product__price">$${product.price}</p>
    <p class="specific-product__desc">${product.description}</p>
    <div class="btn-main specific-product__cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-description="${product.description}" data-imgurl="${
      hasImage ? product.image.url : ""
    }"><i class="specific-product__cart--icon fas fa-shopping-cart"></i>Add to cart</div>
    ${username ? `<a class="btn-secondary" href="edit.html?id=${product.id}" >Edit product</a>` : ""}
    </div></div>
    `;
    const starFavBtn = document.querySelectorAll(".specific-product__cart");
    starFavBtn.forEach((button) => {
      button.addEventListener("click", addToCart);
    });
  } catch (error) {
    console.log(error);
  }
}

fetchProductById(productUrl);
