import { addToCart } from "./addToCart.js";
import { createNavMenu } from "./createNavMenu.js";
import { logout } from "./logout.js";
import { getUserName } from "../utils/storage.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const baseUrl = "http://localhost:1337";
const productUrl = baseUrl + "/products/" + id;
const container = document.querySelector(".container");

createNavMenu();
logout();

async function fetchProductById(url) {
  try {
    const response = await fetch(url);
    const product = await response.json();
    const username = getUserName();
    let cssStar = "fas";

    console.log(product);
    container.innerHTML = `<div class="specific-product__card">
    <div class="specific-product__image">
    <img class="specific-product__img" src="${baseUrl}${product.image.url}"></img></div>
    <div class="specific-product__content">
    <h3 class="specific-product__title">${product.title}</h3>
    <p class="specific-product__price">$${product.price}</p>
    <p class="specific-product__desc">${product.description}</p>
    <i class="specific-product__cart ${cssStar} fa-shopping-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-description="${product.description}" data-imgurl="${product.image.url}"> Add to cart</i>
    ${username ? `<a href="edit.html?id=${product.id}" >Edit article</a>` : ""}
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
