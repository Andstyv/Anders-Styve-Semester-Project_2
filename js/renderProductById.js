const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const baseUrl = "http://localhost:1337";
const productUrl = baseUrl + "/products/" + id;
const container = document.querySelector(".container");

async function fetchProductById(url) {
  try {
    const response = await fetch(url);
    const product = await response.json();

    console.log(product);
    container.innerHTML = `<div class="product__card">
    <img class="product__img" src="${baseUrl}${product.image.url}"></img>
    <h3 class="product__title">${product.title}</h3>
    <p class="product__price">Price: ${product.price}</p>
    </div>
    `;
  } catch (error) {
    console.log(error);
  }
}

fetchProductById(productUrl);
