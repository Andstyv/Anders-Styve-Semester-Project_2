import { addToCart } from "./addToCart.js";
import { createNavMenu } from "./createNavMenu.js";
import { getUserName } from "./storage.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const baseUrl = "http://localhost:1337";
const productUrl = baseUrl + "/products/" + id;
const container = document.querySelector(".container");

createNavMenu();

async function fetchProductById(url) {
  try {
    const response = await fetch(url);
    const product = await response.json();
    const username = getUserName();
    let cssStar = "fas";

    console.log(product);
    container.innerHTML = `<div class="product__card">
    <img class="product__img" src="${baseUrl}${product.image.url}"></img>
    <h3 class="product__title">${product.title}</h3>
    <p class="product__price">Price: ${product.price}</p>
    <p class=""product__desc">${product.description}</p>
    <i class="article__fav ${cssStar} fa-shopping-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-description="${product.description}" data-imgurl="${product.image.url}">Add</i>
    ${username ? `<a href="edit.html?id=${product.id}" >Edit article</a>` : ""}
    </div>
    `;
    const starFavBtn = document.querySelectorAll(".article__fav");
    starFavBtn.forEach((button) => {
      button.addEventListener("click", addToCart);
    });
  } catch (error) {
    console.log(error);
  }
}

fetchProductById(productUrl);
